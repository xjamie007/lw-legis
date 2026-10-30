-- ===========================================================================
-- 0005 — Inhalte der alten Website
--
-- Die Seite folgt jetzt dem Aufbau von cabinet-avocats-lorang.com:
-- Taetigkeiten, Fachdossiers, Konferenzunterlagen, Anwaelte, Partner.
-- Situationsmatrix, Honorare und haeufige Fragen werden nicht mehr gebaut;
-- ihre Tabellen bleiben stehen, damit nichts verloren geht.
-- ===========================================================================

-- Anwaelte: Anrede, Werdegang und Bildplatz.
alter table public.team
  add column if not exists titre_civil text,
  add column if not exists bio jsonb not null default '{}'::jsonb,
  add column if not exists photo text;

-- Konferenzen verweisen auf ein PDF, ein Dossier oder eine Veranstaltungsseite.
alter table public.publications
  add column if not exists dossier text references public.publications(id) on delete set null,
  add column if not exists lien_externe text;

-- Die alte Website nennt bei keinem Dokument einen Rechtsstand. Die
-- Sperre „ohne Rechtsstand keine Veroeffentlichung“ haette jedes einzelne
-- blockiert. Bedingung ist jetzt: Ein Dossier braucht einen Text, eine
-- Konferenz ein Ziel (PDF, Dossier oder Veranstaltungsseite).
create or replace function public.publications_garde()
returns trigger
language plpgsql
as $$
begin
  if new.statut = 'veroeffentlicht' then
    if new.type = 'dossier' and coalesce(new.corps ->> 'fr', '') = '' then
      raise exception 'Ein Dossier braucht einen Text, bevor es veroeffentlicht wird.';
    end if;
    if new.type = 'conference' and new.pdf_chemin is null and new.dossier is null and new.lien_externe is null then
      raise exception 'Eine Konferenz braucht ein PDF, ein Dossier oder eine Veranstaltungsseite.';
    end if;
  end if;
  return new;
end;
$$;

comment on column public.publications.etat_du_droit is
  'Rechtsstand, falls bekannt. Kein Pflichtfeld mehr (siehe 0005).';

-- Das Formular der alten Seite fragt Firma und Adresse ab.
alter table public.inquiries
  add column if not exists societe text,
  add column if not exists adresse text;

-- Die Website hat zwei Sprachen. Bildbeschreibungen und Vollstaendigkeit
-- werden nur noch fuer Franzoesisch und Englisch verlangt.
create or replace function public.langues_completes(variadic champs jsonb[])
returns text[]
language sql
immutable
as $$
  select coalesce(array_agg(l order by l), '{}')
  from unnest(array['fr','en']) as l
  where not exists (
    select 1 from unnest(champs) as c where not public.a_valeur(c, l)
  );
$$;

create or replace function public.media_garde()
returns trigger
language plpgsql
as $$
declare
  manquantes text[];
begin
  if new.statut = 'veroeffentlicht' and new.bucket = 'media' then
    select coalesce(array_agg(l order by l), '{}') into manquantes
    from unnest(array['fr','en']) as l
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
