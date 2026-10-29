-- ===========================================================================
-- LW LEGIS — Ablagen fuer Bilder und Dokumente
-- ---------------------------------------------------------------------------
-- Zwei Eimer: `media` fuer Bilder, `documents` fuer PDF.
-- Oeffentlich lesbar (die Website liegt statisch davor), beschreibbar nur
-- fuer angemeldete Redakteure.
-- ===========================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 26214400,
   array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml']),
  ('documents', 'documents', true, 104857600,
   array['application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "lecture publique media" on storage.objects;
create policy "lecture publique media" on storage.objects
  for select to public
  using (bucket_id in ('media','documents'));

drop policy if exists "ecriture redacteurs" on storage.objects;
create policy "ecriture redacteurs" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('media','documents') and public.est_redacteur());

drop policy if exists "remplacement redacteurs" on storage.objects;
create policy "remplacement redacteurs" on storage.objects
  for update to authenticated
  using (bucket_id in ('media','documents') and public.est_redacteur())
  with check (bucket_id in ('media','documents') and public.est_redacteur());

drop policy if exists "suppression redacteurs" on storage.objects;
create policy "suppression redacteurs" on storage.objects
  for delete to authenticated
  using (bucket_id in ('media','documents') and public.est_redacteur());
