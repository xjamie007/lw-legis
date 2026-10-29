-- ===========================================================================
-- LW LEGIS — Row Level Security
-- ---------------------------------------------------------------------------
-- Grundsatz: alles ist zu, bis es ausdruecklich geoeffnet wird.
--
-- Die oeffentliche Website liest NICHTS aus dieser Datenbank — sie ist
-- statisch und wird vorab gebaut. Lesen darf hier nur, wer angemeldet ist.
-- Der Build liest mit dem Service-Role-Schluessel, der RLS umgeht und
-- ausschliesslich in GitHub Actions liegt.
--
-- Zwei Rollen:
--   owner  (Me Lorang)  — alles, auch Rechtstexte, Einstellungen, Konten
--   editor (Sekretariat) — Inhalte, Dokumente, Bilder; NICHT Rechtstexte,
--                          NICHT Einstellungen, NICHT Konten
-- ===========================================================================

alter table public.profiles          enable row level security;
alter table public.settings          enable row level security;
alter table public.navigation        enable row level security;
alter table public.pages             enable row level security;
alter table public.sections          enable row level security;
alter table public.services          enable row level security;
alter table public.situation_options enable row level security;
alter table public.situations        enable row level security;
alter table public.publication_tags  enable row level security;
alter table public.publications      enable row level security;
alter table public.team              enable row level security;
alter table public.faq               enable row level security;
alter table public.legal_pages       enable row level security;
alter table public.media             enable row level security;
alter table public.seo_meta          enable row level security;
alter table public.inquiries         enable row level security;
alter table public.revisions         enable row level security;
alter table public.audit_log         enable row level security;

-- ---------------------------------------------------------------------------
-- Konten
-- ---------------------------------------------------------------------------
drop policy if exists profiles_lire on public.profiles;
create policy profiles_lire on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.est_owner());

drop policy if exists profiles_ecrire on public.profiles;
create policy profiles_ecrire on public.profiles
  for all to authenticated
  using (public.est_owner())
  with check (public.est_owner());

-- Jeder darf seine eigene Adminsprache aendern — sonst nichts an sich selbst.
drop policy if exists profiles_ma_langue on public.profiles;
create policy profiles_ma_langue on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = public.mon_role());

-- ---------------------------------------------------------------------------
-- Inhalte, die beide Rollen bearbeiten duerfen
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'navigation','pages','sections','services','situation_options',
    'situations','publication_tags','publications','team','faq',
    'media','seo_meta'
  ]
  loop
    execute format('drop policy if exists %I_lire on public.%I;', t, t);
    execute format(
      'create policy %I_lire on public.%I for select to authenticated
       using (public.est_redacteur());', t, t);

    execute format('drop policy if exists %I_ecrire on public.%I;', t, t);
    execute format(
      'create policy %I_ecrire on public.%I for all to authenticated
       using (public.est_redacteur()) with check (public.est_redacteur());', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Rechtstexte — nur der owner
-- ---------------------------------------------------------------------------
drop policy if exists legal_lire on public.legal_pages;
create policy legal_lire on public.legal_pages
  for select to authenticated
  using (public.est_redacteur());

drop policy if exists legal_ecrire on public.legal_pages;
create policy legal_ecrire on public.legal_pages
  for all to authenticated
  using (public.est_owner())
  with check (public.est_owner());

-- ---------------------------------------------------------------------------
-- Einstellungen — Lesen fuer beide, Schreiben je nach Zeile
-- ---------------------------------------------------------------------------
drop policy if exists settings_lire on public.settings;
create policy settings_lire on public.settings
  for select to authenticated
  using (public.est_redacteur());

drop policy if exists settings_ecrire on public.settings;
create policy settings_ecrire on public.settings
  for all to authenticated
  using (public.est_owner() or (public.est_redacteur() and not reserve_owner))
  with check (public.est_owner() or (public.est_redacteur() and not reserve_owner));

-- ---------------------------------------------------------------------------
-- Anfragen
-- ---------------------------------------------------------------------------
-- Eingetragen werden sie ausschliesslich von der Edge Function
-- `send-inquiry` mit dem Service-Role-Schluessel. Ueber die oeffentliche
-- API kann niemand schreiben — sonst waere das Formular ein offenes Tor.
drop policy if exists inquiries_lire on public.inquiries;
create policy inquiries_lire on public.inquiries
  for select to authenticated
  using (public.est_redacteur());

drop policy if exists inquiries_marquer on public.inquiries;
create policy inquiries_marquer on public.inquiries
  for update to authenticated
  using (public.est_redacteur())
  with check (public.est_redacteur());

drop policy if exists inquiries_supprimer on public.inquiries;
create policy inquiries_supprimer on public.inquiries
  for delete to authenticated
  using (public.est_owner());

-- ---------------------------------------------------------------------------
-- Fassungen und Protokoll: lesen ja, aendern nein
-- ---------------------------------------------------------------------------
drop policy if exists revisions_lire on public.revisions;
create policy revisions_lire on public.revisions
  for select to authenticated
  using (public.est_redacteur());

drop policy if exists audit_lire on public.audit_log;
create policy audit_lire on public.audit_log
  for select to authenticated
  using (public.est_owner());

-- Niemand darf das Protokoll aendern oder loeschen. Es gibt bewusst keine
-- entsprechende Policy, und RLS verbietet damit alles Uebrige.

-- ---------------------------------------------------------------------------
-- Eine frühere Fassung wiederherstellen
-- ---------------------------------------------------------------------------
-- Spielt eine Zeile aus `revisions` zurueck. Das Zurueckspielen ist selbst
-- eine Aenderung und landet deshalb wieder in `revisions` — auch das
-- Rueckgaengigmachen laesst sich rueckgaengig machen.
create or replace function public.restaurer(revision_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.revisions;
  tables_permises text[] := array[
    'navigation','pages','sections','services','situation_options',
    'situations','publication_tags','publications','team','faq',
    'media','seo_meta','legal_pages','settings'
  ];
begin
  if not public.est_redacteur() then
    raise exception 'Nicht berechtigt.' using errcode = '42501';
  end if;

  select * into r from public.revisions where id = revision_id;
  if not found then
    raise exception 'Diese Fassung gibt es nicht (%).', revision_id;
  end if;

  if not (r.table_nom = any (tables_permises)) then
    raise exception 'Tabelle % kann nicht zurueckgespielt werden.', r.table_nom;
  end if;

  -- Rechtstexte und Einstellungen darf nur der owner zurueckspielen.
  if r.table_nom in ('legal_pages','settings') and not public.est_owner() then
    raise exception 'Nur der Inhaber darf Rechtstexte zuruecksetzen.'
      using errcode = '42501';
  end if;

  -- Dieselbe Schluesselspalte wie in journaliser(): `settings` heisst `cle`.
  execute format(
    'update public.%I set (%s) = (select %s from jsonb_populate_record(null::public.%I, $1)) where %I = $2',
    r.table_nom,
    (select string_agg(quote_ident(column_name), ', ')
       from information_schema.columns
      where table_schema = 'public' and table_name = r.table_nom
        and column_name not in ('id','cle','updated_at','updated_by')),
    (select string_agg(quote_ident(column_name), ', ')
       from information_schema.columns
      where table_schema = 'public' and table_name = r.table_nom
        and column_name not in ('id','cle','updated_at','updated_by')),
    r.table_nom,
    case when r.table_nom = 'settings' then 'cle' else 'id' end
  ) using r.donnees, r.enregistrement_id;

  return r.donnees;
end;
$$;

revoke all on function public.restaurer(bigint) from public;
grant execute on function public.restaurer(bigint) to authenticated;
