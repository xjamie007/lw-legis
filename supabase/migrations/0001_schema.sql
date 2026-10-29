-- ===========================================================================
-- LW LEGIS — Datenmodell
-- ---------------------------------------------------------------------------
-- Region: EU (Frankfurt). Alle Inhalte liegen in der Europaeischen Union.
--
-- Mehrsprachigkeit: jedes Textfeld ist `jsonb` mit den Schluesseln
-- lb, de, fr, en. Fehlt eine Sprache, steht dort kein Wert — nie eine
-- automatische Uebersetzung und nie stillschweigend Franzoesisch.
--
-- Jeder Inhaltsdatensatz traegt `statut`, `updated_at`, `updated_by`.
-- Jede Aenderung schreibt die Vorfassung nach `revisions` und einen
-- Eintrag nach `audit_log` — beides durch Trigger, nicht durch die
-- Anwendung, damit es sich nicht umgehen laesst.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Aufzaehlungen
-- ---------------------------------------------------------------------------
do $$ begin
  create type statut_contenu as enum ('entwurf', 'veroeffentlicht');
exception when duplicate_object then null; end $$;

do $$ begin
  create type role_utilisateur as enum ('owner', 'editor');
exception when duplicate_object then null; end $$;

do $$ begin
  create type type_document as enum ('dossier', 'conference');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Hilfsfunktionen
-- ---------------------------------------------------------------------------

-- Ist in diesem jsonb-Feld die Sprache belegt?
create or replace function public.a_valeur(champ jsonb, langue text)
returns boolean
language sql
immutable
as $$
  select coalesce(btrim(champ ->> langue), '') <> '';
$$;

-- Die Sprachen, in denen alle uebergebenen Felder belegt sind.
create or replace function public.langues_completes(variadic champs jsonb[])
returns text[]
language sql
immutable
as $$
  select coalesce(array_agg(l order by l), '{}')
  from unnest(array['lb','de','fr','en']) as l
  where not exists (
    select 1 from unnest(champs) as c where not public.a_valeur(c, l)
  );
$$;

-- Woerter zaehlen, Auszeichnung ignorieren. Grundlage der 400-Wort-Schranke.
create or replace function public.compter_mots(variadic champs text[])
returns integer
language sql
immutable
as $$
  select coalesce(
    array_length(
      regexp_split_to_array(
        btrim(regexp_replace(concat_ws(' ', variadic champs), '<[^>]*>', ' ', 'g')),
        '\s+'
      ),
      1
    ),
    0
  );
$$;

-- ---------------------------------------------------------------------------
-- Konten und Rollen
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  nom         text not null default '',
  role        role_utilisateur not null default 'editor',
  -- Sprache des Adminbereichs: Deutsch oder Franzoesisch.
  langue_admin text not null default 'de' check (langue_admin in ('de','fr')),
  cree_le     timestamptz not null default now()
);

comment on table public.profiles is
  'Konten des Redaktionsbereichs. Keine oeffentliche Registrierung: Konten '
  'entstehen ausschliesslich per Einladung durch einen owner.';

-- Rolle des angemeldeten Kontos — Grundlage aller RLS-Regeln.
create or replace function public.mon_role()
returns role_utilisateur
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.est_owner()
returns boolean
language sql
stable
as $$
  select public.mon_role() = 'owner';
$$;

create or replace function public.est_redacteur()
returns boolean
language sql
stable
as $$
  select public.mon_role() in ('owner', 'editor');
$$;

-- ---------------------------------------------------------------------------
-- Einstellungen, Navigation, Seiten
-- ---------------------------------------------------------------------------
create table if not exists public.settings (
  cle         text primary key,
  valeur      jsonb not null default '{}'::jsonb,
  -- Nur ein owner darf diese Zeile aendern (Rechtstexte, Empfaenger, NAP).
  reserve_owner boolean not null default false,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

create table if not exists public.navigation (
  id          text primary key,
  emplacement text not null default 'principale' check (emplacement in ('principale','pied')),
  cle_i18n    text not null,
  segment     text not null,
  ordre       integer not null default 0,
  visible     boolean not null default true,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

create table if not exists public.pages (
  id          text primary key,
  titre       jsonb not null default '{}'::jsonb,
  chapeau     jsonb not null default '{}'::jsonb,
  corps       jsonb not null default '{}'::jsonb,
  statut      statut_contenu not null default 'entwurf',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

-- Sektionen der Startseite: Reihenfolge und Sichtbarkeit sind aenderbar.
create table if not exists public.sections (
  id          text primary key,
  page_id     text not null references public.pages(id) on delete cascade,
  titre       jsonb not null default '{}'::jsonb,
  chapeau     jsonb not null default '{}'::jsonb,
  corps       jsonb not null default '{}'::jsonb,
  ordre       integer not null default 0,
  visible     boolean not null default true,
  -- Hero und Kontakt lassen sich nicht ausblenden.
  verrouille  boolean not null default false,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

-- ---------------------------------------------------------------------------
-- Taetigkeitsgebiete
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id          text primary key,
  slug        jsonb not null default '{}'::jsonb,
  terme       jsonb not null default '{}'::jsonb,
  definition  jsonb not null default '{}'::jsonb,
  texte       jsonb not null default '{}'::jsonb,
  -- Zwei, drei Woerter fuer die dunkle Leiste unter dem Hero.
  kurz        jsonb not null default '{}'::jsonb,
  marge_terme jsonb not null default '{}'::jsonb,
  marge_texte jsonb not null default '{}'::jsonb,
  matieres    jsonb not null default '[]'::jsonb,
  ordre       integer not null default 0,
  statut      statut_contenu not null default 'entwurf',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

-- ---------------------------------------------------------------------------
-- Situationsmatrix
-- ---------------------------------------------------------------------------
create table if not exists public.situation_options (
  id             text primary key,
  axe            text not null check (axe in ('pays','projet')),
  slug           jsonb not null default '{}'::jsonb,
  etiquette      jsonb not null default '{}'::jsonb,
  dans_la_phrase jsonb not null default '{}'::jsonb,
  code           text,
  themes         jsonb not null default '[]'::jsonb,
  ordre          integer not null default 0,
  visible        boolean not null default true,
  updated_at     timestamptz not null default now(),
  updated_by     uuid references auth.users
);

create table if not exists public.situations (
  id          text primary key,
  pays        text not null references public.situation_options(id),
  projet      text not null references public.situation_options(id),
  titre       jsonb not null default '{}'::jsonb,
  worum       jsonb not null default '{}'::jsonb,
  cadre       jsonb not null default '{}'::jsonb,   -- Rechtsinhalt
  notre_role  jsonb not null default '{}'::jsonb,
  vos_pieces  jsonb not null default '{}'::jsonb,
  themes      jsonb not null default '[]'::jsonb,
  famille     text references public.services(id),
  ordre       integer not null default 0,
  statut      statut_contenu not null default 'entwurf',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users,
  unique (pays, projet)
);

comment on column public.situations.cadre is
  'Was in Luxemburg gilt. Rechtsinhalt — wird ausschliesslich vom Anwalt '
  'geschrieben. Ohne diesen Abschnitt wird die Konstellation nicht gebaut.';

-- In welchen Sprachen ist diese Konstellation veroeffentlichungsreif?
-- Dieselbe Schranke wie im Build: vier Abschnitte plus rund 400 Woerter.
create or replace function public.situation_langues_pretes(s public.situations)
returns text[]
language sql
stable
as $$
  select coalesce(array_agg(l order by l), '{}')
  from unnest(array['lb','de','fr','en']) as l
  where s.statut = 'veroeffentlicht'
    and public.a_valeur(s.titre, l)
    and public.a_valeur(s.worum, l)
    and public.a_valeur(s.cadre, l)
    and public.a_valeur(s.notre_role, l)
    and public.a_valeur(s.vos_pieces, l)
    and public.compter_mots(
          s.worum ->> l, s.cadre ->> l, s.notre_role ->> l, s.vos_pieces ->> l
        ) >= 400;
$$;

-- ---------------------------------------------------------------------------
-- Fonds documentaire
-- ---------------------------------------------------------------------------
create table if not exists public.publication_tags (
  id          text primary key,
  slug        jsonb not null default '{}'::jsonb,
  etiquette   jsonb not null default '{}'::jsonb,
  ordre       integer not null default 0,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

create table if not exists public.publications (
  id               text primary key,
  type             type_document not null default 'dossier',
  slug             jsonb not null default '{}'::jsonb,
  titre            jsonb not null default '{}'::jsonb,
  resume           jsonb not null default '{}'::jsonb,
  corps            jsonb not null default '{}'::jsonb,
  -- PFLICHTFELD fuer die Veroeffentlichung. Ein undatiertes Steuerpapier
  -- schadet der Kanzlei mehr, als es ihr nuetzt.
  etat_du_droit    date,
  date_publication date,
  auteur           text not null default 'Alain Lorang',
  langue_originale text not null default 'fr',
  pdf_chemin       text,
  pdf_octets       bigint,
  themes           jsonb not null default '[]'::jsonb,
  ordre            integer not null default 0,
  statut           statut_contenu not null default 'entwurf',
  updated_at       timestamptz not null default now(),
  updated_by       uuid references auth.users
);

comment on column public.publications.etat_du_droit is
  'Rechtsstand. Pflichtfeld: ohne dieses Datum wird das Dokument nicht '
  'veroeffentlicht. Erzwungen durch den Trigger publications_garde.';

-- Ein Dokument darf nicht auf 'veroeffentlicht' gehen, solange der
-- Rechtsstand fehlt. Das steht hier und nicht nur in der Oberflaeche,
-- damit es sich auch ueber die API nicht umgehen laesst.
create or replace function public.publications_garde()
returns trigger
language plpgsql
as $$
begin
  if new.statut = 'veroeffentlicht' and new.etat_du_droit is null then
    raise exception
      'Ohne Rechtsstand kann dieses Dokument nicht veroeffentlicht werden (%).', new.id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists publications_garde on public.publications;
create trigger publications_garde
  before insert or update on public.publications
  for each row execute function public.publications_garde();

-- ---------------------------------------------------------------------------
-- Team und haeufige Fragen
-- ---------------------------------------------------------------------------
create table if not exists public.team (
  id             text primary key,
  nom            text not null default '',
  fonction       jsonb not null default '{}'::jsonb,
  barreau_depuis integer,
  langues        jsonb not null default '[]'::jsonb,
  photo_id       uuid,
  ordre          integer not null default 0,
  statut         statut_contenu not null default 'entwurf',
  updated_at     timestamptz not null default now(),
  updated_by     uuid references auth.users
);

create table if not exists public.faq (
  id          text primary key,
  question    jsonb not null default '{}'::jsonb,
  reponse     jsonb not null default '{}'::jsonb,
  ordre       integer not null default 0,
  statut      statut_contenu not null default 'entwurf',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

-- ---------------------------------------------------------------------------
-- Rechtstexte — nur der owner
-- ---------------------------------------------------------------------------
create table if not exists public.legal_pages (
  id          text primary key,
  titre       jsonb not null default '{}'::jsonb,
  chapeau     jsonb not null default '{}'::jsonb,
  blocs       jsonb not null default '[]'::jsonb,
  corps       jsonb not null default '{}'::jsonb,
  statut      statut_contenu not null default 'entwurf',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

comment on table public.legal_pages is
  'Impressum, Datenschutz, Geschaeftsbedingungen. Nur der owner darf sie '
  'aendern: sie sind oeffentliche Rechtsangaben der Kanzlei.';

-- ---------------------------------------------------------------------------
-- Bilder und Dateien
-- ---------------------------------------------------------------------------
create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  bucket       text not null default 'media' check (bucket in ('media','documents')),
  chemin       text not null,
  type_mime    text not null,
  octets       bigint not null default 0,
  largeur      integer,
  hauteur      integer,
  -- Bildausschnitt in Prozent, fuer object-position.
  point_x      numeric not null default 50 check (point_x between 0 and 100),
  point_y      numeric not null default 50 check (point_y between 0 and 100),
  -- Alt-Text in allen vier Sprachen ist Pflicht vor der Veroeffentlichung.
  alt          jsonb not null default '{}'::jsonb,
  variantes    jsonb not null default '[]'::jsonb,
  statut       statut_contenu not null default 'entwurf',
  updated_at   timestamptz not null default now(),
  updated_by   uuid references auth.users,
  unique (bucket, chemin)
);

-- Ein Bild darf nicht veroeffentlicht werden, solange nicht in allen vier
-- Sprachen ein Alt-Text steht.
create or replace function public.media_garde()
returns trigger
language plpgsql
as $$
declare
  manquantes text[];
begin
  if new.statut = 'veroeffentlicht' and new.bucket = 'media' then
    select coalesce(array_agg(l order by l), '{}') into manquantes
    from unnest(array['lb','de','fr','en']) as l
    where not public.a_valeur(new.alt, l);

    if array_length(manquantes, 1) > 0 then
      raise exception
        'Alt-Text fehlt in: %. Ein Bild ohne Alt-Text wird nicht veroeffentlicht.',
        array_to_string(manquantes, ', ')
        using errcode = 'check_violation';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists media_garde on public.media;
create trigger media_garde
  before insert or update on public.media
  for each row execute function public.media_garde();

-- ---------------------------------------------------------------------------
-- Suchmaschinen-Angaben
-- ---------------------------------------------------------------------------
create table if not exists public.seo_meta (
  id          text primary key,
  titre       jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  og_image_id uuid references public.media(id),
  noindex     boolean not null default false,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users
);

-- ---------------------------------------------------------------------------
-- Anfragen aus dem Formular
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  recu_le       timestamptz not null default now(),
  nom           text not null,
  courriel      text not null,
  telephone     text,
  pays          text not null,
  projet        text not null,
  echeance      date,
  sans_echeance boolean not null default false,
  message       text not null,
  langue        text not null default 'fr',
  page          text,
  -- Loeschfrist: Anfragen ohne Mandat werden nach zwoelf Monaten geloescht.
  -- So steht es in der Datenschutzerklaerung, und so wird es gemacht.
  supprimer_le  date not null default (current_date + interval '12 months'),
  traite        boolean not null default false,
  note          text
);

comment on table public.inquiries is
  'Jede Anfrage wird zusaetzlich zur E-Mail hier abgelegt, damit nichts '
  'verloren geht, wenn eine Mail im Spam landet. Aufbewahrung zwoelf '
  'Monate — siehe supprimer_le und die Datenschutzerklaerung.';

-- ---------------------------------------------------------------------------
-- Fassungen und Protokoll
-- ---------------------------------------------------------------------------
create table if not exists public.revisions (
  id           bigserial primary key,
  table_nom    text not null,
  enregistrement_id text not null,
  donnees      jsonb not null,
  ecrit_le     timestamptz not null default now(),
  ecrit_par    uuid references auth.users
);

create index if not exists revisions_cible
  on public.revisions (table_nom, enregistrement_id, ecrit_le desc);

create table if not exists public.audit_log (
  id           bigserial primary key,
  table_nom    text not null,
  enregistrement_id text not null,
  action       text not null check (action in ('insert','update','delete')),
  acteur       uuid references auth.users,
  quand        timestamptz not null default now(),
  champs       text[] not null default '{}'
);

create index if not exists audit_log_quand on public.audit_log (quand desc);

-- Ein Trigger fuer alle Inhaltstabellen: schreibt die VORFASSUNG nach
-- `revisions` und den Vorgang nach `audit_log`. In der Anwendung laesst
-- sich das nicht vergessen, weil es nicht in der Anwendung steht.
create or replace function public.journaliser()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  cible_id text;
  modifies text[] := '{}';
begin
  -- Nicht jede Tabelle hat eine Spalte `id`: `settings` wird ueber `cle`
  -- geschluesselt. Ohne dieses coalesce schrieb der Trigger NULL in
  -- audit_log.enregistrement_id und die erste Aenderung an den Stammdaten
  -- schlug fehl. Beim Einspielen der Erstbefuellung ist genau das passiert.
  if tg_op = 'DELETE' then
    cible_id := coalesce(to_jsonb(old) ->> 'id', to_jsonb(old) ->> 'cle');
    insert into public.revisions (table_nom, enregistrement_id, donnees, ecrit_par)
      values (tg_table_name, cible_id, to_jsonb(old), auth.uid());
    insert into public.audit_log (table_nom, enregistrement_id, action, acteur)
      values (tg_table_name, cible_id, 'delete', auth.uid());
    return old;
  end if;

  cible_id := coalesce(to_jsonb(new) ->> 'id', to_jsonb(new) ->> 'cle');

  if tg_op = 'UPDATE' then
    -- Die Vorfassung sichern, damit sie sich wiederherstellen laesst.
    insert into public.revisions (table_nom, enregistrement_id, donnees, ecrit_par)
      values (tg_table_name, cible_id, to_jsonb(old), auth.uid());

    select coalesce(array_agg(k), '{}') into modifies
    from jsonb_each(to_jsonb(new)) as n(k, v)
    where to_jsonb(old) -> k is distinct from v;
  end if;

  insert into public.audit_log (table_nom, enregistrement_id, action, acteur, champs)
    values (tg_table_name, cible_id, lower(tg_op), auth.uid(), modifies);

  return new;
end;
$$;

-- `updated_at` und `updated_by` selbst setzen, nicht dem Client ueberlassen.
create or replace function public.marquer_modification()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'settings','navigation','pages','sections','services','situation_options',
    'situations','publication_tags','publications','team','faq','legal_pages',
    'media','seo_meta'
  ]
  loop
    execute format(
      'drop trigger if exists %I_marquer on public.%I;
       create trigger %I_marquer before insert or update on public.%I
       for each row execute function public.marquer_modification();',
      t, t, t, t);
    execute format(
      'drop trigger if exists %I_journal on public.%I;
       create trigger %I_journal after insert or update or delete on public.%I
       for each row execute function public.journaliser();',
      t, t, t, t);
  end loop;
end $$;
