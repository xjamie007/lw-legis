/**
 * src/lib/sommaire.ts — Inhaltsverzeichnis und PDF eines langen Textes.
 *
 * Die Texte der Taetigkeiten und Dossiers sind lang. Oben auf der Seite
 * steht deshalb „Sur cette page“ mit den Zwischenueberschriften, und ein
 * PDF, das im Text verlinkt ist, wird oben als Knopf angeboten statt erst
 * am Ende.
 */
import { statSync } from 'node:fs';
import { join } from 'node:path';

export interface Sommaire {
  html: string;
  titres: { id: string; texte: string }[];
  pdfs: { href: string; libelle: string; octets: number | null }[];
}

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

const texte = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();

/** Versieht jede h2 mit einer id und sammelt Ueberschriften und PDFs. */
export function sommaire(html: string): Sommaire {
  const titres: Sommaire['titres'] = [];
  const vus = new Set<string>();
  const avecIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_, attrs: string, inner: string) => {
    let id = slug(inner) || 'section';
    for (let n = 2; vus.has(id); n++) id = `${slug(inner)}-${n}`;
    vus.add(id);
    titres.push({ id, texte: texte(inner) });
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  const pdfs: Sommaire['pdfs'] = [];
  for (const m of html.matchAll(/<a[^>]+href="(\/[^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/g)) {
    if (pdfs.some((p) => p.href === m[1])) continue;
    let octets: number | null = null;
    try {
      octets = statSync(join(process.cwd(), 'public', m[1])).size;
    } catch {
      /* Datei fehlt: ohne Groessenangabe */
    }
    pdfs.push({ href: m[1], libelle: texte(m[2]), octets });
  }

  return { html: avecIds, titres, pdfs };
}
