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
import { contenu, estRefOuverte } from './content';
import { absolu, SITE } from './seo';
import { LANG_BALISE, type Lang, type Multi } from './langs';
import { BASE, prefixer } from './base';

type Noeud = Record<string, unknown>;

const s = contenu.settings;
const a = contenu.avocat;

/** Gibt den Wert nur zurueck, wenn er belegt ist — nie eine Lueckenmarkierung. */
function sur<T>(v: T | { __ouvert: string } | null | undefined): T | undefined {
  if (v === null || v === undefined) return undefined;
  if (estRefOuverte(v)) return undefined;
  return v as T;
}

function texte(champ: Multi | undefined, lang: Lang): string | undefined {
  const v = champ?.[lang];
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
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

/**
 * Oeffnungszeiten — nur bei bestaetigten Angaben.
 * `horaires.statut` ist eine offene Referenz, solange nichts bestaetigt ist.
 */
function horaires(): Noeud[] | undefined {
  if (estRefOuverte(s.horaires?.statut)) return undefined;
  const v = s.horaires?.valeurs;
  if (!Array.isArray(v) || v.length === 0) return undefined;
  return v.map((h: any) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.jours.map((j: string) => `https://schema.org/${j}`),
    opens: h.ouvre,
    closes: h.ferme,
  }));
}

export function idKanzlei(): string {
  return `${SITE}${BASE}/#etude`;
}

export function idPersonne(): string {
  return `${SITE}${BASE}/#alain-lorang`;
}

/** Die Kanzlei als LegalService. */
export function legalService(lang: Lang, languesDisponibles: Lang[]): Noeud {
  const n: Noeud = {
    '@type': 'LegalService',
    '@id': idKanzlei(),
    name: s.nom,
    url: absolu(prefixer(`/${lang}/`)),
    address: adressePostale(),
    telephone: s.telephone.central,
    email: s.courriel,
    areaServed: s.territoires.map((c: string) => ({ '@type': 'Country', name: c })),
    availableLanguage: languesDisponibles.map((l) => LANG_BALISE[l]),
    employee: { '@id': idPersonne() },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s.adresse.latitude,
      longitude: s.adresse.longitude,
    },
  };

  const h = horaires();
  if (h) n.openingHoursSpecification = h;

  const sameAs = [s.profils?.google, s.profils?.linkedin].filter(
    (u): u is string => typeof u === 'string' && u.length > 0,
  );
  if (sameAs.length > 0) n.sameAs = sameAs;

  const tva = sur<string>(s.tva);
  if (tva) n.vatID = tva;

  // Kein aggregateRating, kein review. Siehe Kopfkommentar.
  return n;
}

/** Me Lorang als Attorney. */
export function attorney(lang: Lang): Noeud {
  return {
    '@type': 'Attorney',
    '@id': idPersonne(),
    name: a.nom_complet,
    givenName: a.prenom,
    familyName: a.nom,
    jobTitle: texte(a.titre, lang) ?? 'avocat à la cour',
    worksFor: { '@id': idKanzlei() },
    address: adressePostale(),
    telephone: a.telephone,
    knowsAbout: contenu.familles
      .map((f) => texte(f.terme, lang))
      .filter((x): x is string => Boolean(x)),
  };
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
    author: { '@type': 'Person', name: pub.auteur, '@id': idPersonne() },
    publisher: { '@id': idKanzlei() },
    isAccessibleForFree: true,
  };
  if (pub.date_publication) n.datePublished = pub.date_publication;
  if (pub.etat_du_droit) n.dateModified = pub.etat_du_droit;
  return n;
}

export function faqPage(entrees: { question: string; reponse: string }[]): Noeud | null {
  if (entrees.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: entrees.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.reponse },
    })),
  };
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
