/**
 * src/lib/jsonld.ts — Strukturierte Daten.
 *
 * Zwei Regeln, die hier durchgehalten werden:
 *
 * 1. Jede Angabe im JSON-LD muss woertlich mit dem uebereinstimmen, was
 *    auf der Seite steht. Deshalb kommen Name, Adresse und Telefon aus
 *    derselben Quelle wie die sichtbare Ausgabe (settings), und nicht aus
 *    einer zweiten, handgepflegten Liste.
 *
 * 2. Unbestaetigte Angaben werden NICHT ausgezeichnet. Die Oeffnungszeiten
 *    stammen bisher nur aus dem Google-Profil; solange die Kanzlei sie
 *    nicht bestaetigt hat, erscheint keine `openingHoursSpecification`.
 *    Eine falsche Oeffnungszeit in den strukturierten Daten laesst Google
 *    „jetzt geoeffnet“ anzeigen, waehrend niemand da ist.
 *
 * Ausdruecklich NICHT enthalten: `aggregateRating` und `review`. Ob das
 * Standesrecht des Barreau de Luxembourg Mandantenstimmen ueberhaupt
 * zulaesst, ist ungeklaert — siehe OFFENE-PUNKTE.md.
 */
import { contenu } from './content';
import { absolu, SITE } from './seo';
import { LANG_BALISE, type Lang, type Multi } from './langs';
import { BASE, prefixer } from './base';

type Noeud = Record<string, unknown>;

const s = contenu.settings;

function texte(champ: Multi | undefined, lang: Lang): string | undefined {
  const v = champ?.[lang];
  return typeof v === 'string' && v.trim() !== '' ? v.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : undefined;
}

/** Die Postadresse, exakt wie auf der Seite. */
function adressePostale(): Noeud {
  return {
    '@type': 'PostalAddress',
    streetAddress: s.adresse.rue,
    addressLocality: s.adresse.ville,
    postalCode: s.adresse.code_postal,
    addressCountry: s.adresse.pays_code,
  };
}

export function idKanzlei(): string {
  return `${SITE}${BASE}/#etude`;
}

const idPersonne = (id: string) => `${SITE}${BASE}/#${id}`;

/** Die Kanzlei als LegalService. */
export function legalService(lang: Lang, languesDisponibles: Lang[]): Noeud {
  return {
    '@type': 'LegalService',
    '@id': idKanzlei(),
    name: s.nom,
    url: absolu(prefixer(`/${lang}/`)),
    address: adressePostale(),
    telephone: s.telephone.affiche,
    email: s.courriel,
    areaServed: s.territoires.map((c: string) => ({ '@type': 'Country', name: c })),
    availableLanguage: languesDisponibles.map((l) => LANG_BALISE[l]),
    employee: contenu.team.filter((m) => m.statut === 'publie').map((m) => ({ '@id': idPersonne(m.id) })),
    geo: { '@type': 'GeoCoordinates', latitude: s.adresse.latitude, longitude: s.adresse.longitude },
  };
  // Kein aggregateRating, kein review: die Kanzlei veroeffentlicht keine Mandantenstimmen.
}

/** Die Anwaelte als Attorney. */
export function attorneys(lang: Lang): Noeud[] {
  return contenu.team
    .filter((m) => m.statut === 'publie')
    .map((m) => ({
      '@type': 'Attorney',
      '@id': idPersonne(m.id),
      name: m.nom,
      jobTitle: texte(m.fonction, lang),
      worksFor: { '@id': idKanzlei() },
      address: adressePostale(),
    }));
}

/** Ein Taetigkeitsfeld als Service. */
export function service(famille: { terme: Multi; definition: Multi }, lang: Lang, url: string): Noeud {
  return {
    '@type': 'Service',
    name: texte(famille.terme, lang),
    description: texte(famille.definition, lang),
    url: absolu(url),
    provider: { '@id': idKanzlei() },
    areaServed: s.territoires.map((c: string) => ({ '@type': 'Country', name: c })),
  };
}

/** Ein Dokument der Bibliothek als Article. */
export function article(pub: any, lang: Lang, url: string): Noeud {
  const n: Noeud = {
    '@type': 'Article',
    headline: texte(pub.titre, lang),
    description: texte(pub.resume, lang),
    url: absolu(url),
    inLanguage: LANG_BALISE[lang],
    author: { '@id': idKanzlei() },
    publisher: { '@id': idKanzlei() },
    isAccessibleForFree: true,
  };
  if (pub.date_publication) n.datePublished = pub.date_publication;
  if (pub.etat_du_droit) n.dateModified = pub.etat_du_droit;
  return n;
}

export function fildAriane(elements: { nom: string; url: string }[]): Noeud | null {
  if (elements.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: elements.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      item: absolu(e.url),
    })),
  };
}

export function webSite(lang: Lang, url: string): Noeud {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}${BASE}/#site-${lang}`,
    name: s.nom,
    url: absolu(url),
    inLanguage: LANG_BALISE[lang],
    publisher: { '@id': idKanzlei() },
  };
}

/** Packt alle Knoten in einen @graph. */
export function graphe(noeuds: (Noeud | null | undefined)[]): string {
  const propres = noeuds.filter((n): n is Noeud => Boolean(n));
  return JSON.stringify(
    { '@context': 'https://schema.org', '@graph': propres },
    null,
    0,
  ).replace(/</g, '\\u003c');
}
