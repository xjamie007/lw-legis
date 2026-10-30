/**
 * src/pages/lw-legis.vcf.ts — Die Kanzlei als Kontaktkarte.
 *
 * „Ajouter aux contacts“ auf der Kontaktseite: ein Tipp, und Name,
 * Anschrift, Telefon und E-Mail stehen im Adressbuch — ohne Abtippen und
 * ohne Tippfehler. Gebaut aus denselben Stammdaten wie die Seite.
 */
import type { APIRoute } from 'astro';
import { contenu } from '../lib/content';
import { SITE } from '../lib/seo';

export const GET: APIRoute = () => {
  const s = contenu.settings;
  const echappe = (v: string) => v.replace(/[\\,;]/g, (c) => `\\${c}`);
  const lignes = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${echappe(s.nom)}`,
    `ORG:${echappe(s.nom)}`,
    `ADR;TYPE=WORK:;;${echappe(s.adresse.rue)};${echappe(s.adresse.ville)};;${s.adresse.code_postal};Luxembourg`,
    `TEL;TYPE=WORK,VOICE:${s.telephone.lien}`,
    `EMAIL;TYPE=WORK:${s.courriel}`,
    `URL:${SITE}`,
    'END:VCARD',
  ];
  return new Response(lignes.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
