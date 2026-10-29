-- ===========================================================================
-- LW LEGIS — Wartung
-- ---------------------------------------------------------------------------
-- Bewusst eine eigene Migration, getrennt von 0003_storage.sql.
--
-- Grund: die Storage-Migration greift auf `storage.buckets` zu, eine
-- Tabelle, die der Storage-Dienst von Supabase anlegt. Laeuft sie in einer
-- Umgebung ohne diesen Dienst, bricht sie ab — und alles, was in derselben
-- Datei danach stuende, entstuende nie. Genau das ist beim Pruefen
-- passiert: `purger_anfragen()` fehlte, obwohl mit Ablagen nichts zu tun
-- hat. Wartungsfunktionen stehen deshalb hier.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Aufraeumen: Anfragen nach Ablauf der Frist loeschen.
-- Wird taeglich vom Sicherungslauf in GitHub Actions aufgerufen.
-- ---------------------------------------------------------------------------
create or replace function public.purger_anfragen()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  delete from public.inquiries where supprimer_le < current_date;
  get diagnostics n = row_count;
  return n;
end;
$$;

comment on function public.purger_anfragen() is
  'Loescht Anfragen, deren Aufbewahrungsfrist abgelaufen ist. Die Frist '
  'steht in der Datenschutzerklaerung — sie muss auch eingehalten werden.';
