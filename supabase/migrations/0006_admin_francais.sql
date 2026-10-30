-- Der Redaktionsbereich startet fuer neue Konten auf Franzoesisch, wie die
-- Kanzlei arbeitet. Umstellen laesst es sich weiter unter „Plus → Langue“.
alter table public.profiles alter column langue_admin set default 'fr';
