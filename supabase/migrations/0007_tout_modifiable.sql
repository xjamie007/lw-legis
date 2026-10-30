-- ===========================================================================
-- LW LEGIS — Alles auf der Website im Redaktionsbereich aenderbar
-- ---------------------------------------------------------------------------
-- 1. `settings.libelles`: geaenderte feste Texte der Oberflaeche
--    (Ueberschriften, Knoepfe, Menue). Verschachtelt wie der Schluessel in
--    src/i18n/*.json; was hier fehlt, kommt aus diesen Dateien.
-- 2. `services.groupe`: eine neu angelegte Taetigkeit waehlt ihren Bereich
--    auf der Uebersicht selbst (src/lib/groupes.ts).
-- ===========================================================================

insert into public.settings (cle, valeur, reserve_owner)
values ('libelles', '{}'::jsonb, false)
on conflict (cle) do nothing;

alter table public.services add column if not exists groupe text;
