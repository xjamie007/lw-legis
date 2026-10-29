/**
 * content/source/publications.mjs — Fonds documentaire.
 *
 * Zehn Fachdossiers und neunzehn Konferenzunterlagen. Das ist das
 * ungewoehnlichste Kapital dieser Kanzlei: zwei Jahrzehnte oeffentliches
 * Erklaeren luxemburgischen Rechts, das auf der alten Seite in einer
 * undatierten PDF-Liste verschwindet.
 *
 * WAS HIER STEHT
 * Titel, Art, Themen-Tags und Adressen — alles davon ist Ordnung, keine
 * Rechtsaussage. Uebersetzt sind die Titel, damit die Dokumente auch auf
 * Deutsch und Englisch auffindbar sind.
 *
 * WAS FEHLT
 *   corps          — der Volltext, aus dem die lesbare HTML-Fassung wird
 *   etat_du_droit  — Pflichtfeld. Ohne Rechtsstand wird nicht veroeffentlicht.
 *   pdf            — die Datei selbst
 *
 * Ein undatiertes Steuerpapier von 2009 schadet der Kanzlei mehr, als es
 * ihr nuetzt. Deshalb ist der Rechtsstand eine harte Bedingung und keine
 * Empfehlung: `etat_du_droit` leer heisst, die Seite wird nicht gebaut.
 *
 * Datiert ist bisher genau eine Unterlage: conference-07-2025.pdf.
 * Welche der neunzehn das ist, geht aus dem Dateinamen nicht hervor —
 * siehe OFFENE-PUNKTE.md.
 */

/** Themen-Tags. Sie verbinden Bibliothek und Situationsmatrix. */
export const THEMES = [
  {
    id: 'immobilier',
    slug: { fr: 'immobilier', de: 'immobilien', en: 'property', lb: null },
    etiquette: { fr: 'Immobilier', de: 'Immobilien', en: 'Property', lb: null },
  },
  {
    id: 'societes',
    slug: { fr: 'societes', de: 'gesellschaften', en: 'companies', lb: null },
    etiquette: { fr: 'Sociétés', de: 'Gesellschaften', en: 'Companies', lb: null },
  },
  {
    id: 'fiscalite',
    slug: { fr: 'fiscalite', de: 'steuern', en: 'tax', lb: null },
    etiquette: { fr: 'Fiscalité', de: 'Steuern', en: 'Tax', lb: null },
  },
  {
    id: 'successions',
    slug: { fr: 'successions', de: 'erbfolge', en: 'inheritance', lb: null },
    etiquette: { fr: 'Successions', de: 'Erbfolge', en: 'Inheritance', lb: null },
  },
  {
    id: 'recouvrement',
    slug: { fr: 'recouvrement', de: 'forderungseinzug', en: 'debt-recovery', lb: null },
    etiquette: {
      fr: 'Recouvrement',
      de: 'Forderungseinzug',
      en: 'Debt recovery',
      lb: null,
    },
  },
  {
    id: 'propriete-intellectuelle',
    slug: {
      fr: 'propriete-intellectuelle',
      de: 'geistiges-eigentum',
      en: 'intellectual-property',
      lb: null,
    },
    etiquette: {
      fr: 'Propriété intellectuelle',
      de: 'Geistiges Eigentum',
      en: 'Intellectual property',
      lb: null,
    },
  },
  {
    id: 'blanchiment',
    slug: {
      fr: 'blanchiment',
      de: 'geldwaesche',
      en: 'money-laundering',
      lb: null,
    },
    etiquette: {
      fr: 'Lutte anti-blanchiment',
      de: 'Geldwäschebekämpfung',
      en: 'Anti-money laundering',
      lb: null,
    },
  },
  {
    id: 'banque',
    slug: { fr: 'banque', de: 'banken', en: 'banking', lb: null },
    etiquette: { fr: 'Banque et finance', de: 'Bank und Finanz', en: 'Banking and finance', lb: null },
  },
  {
    id: 'assurance',
    slug: { fr: 'assurance', de: 'versicherung', en: 'insurance', lb: null },
    etiquette: { fr: 'Assurance', de: 'Versicherung', en: 'Insurance', lb: null },
  },
  {
    id: 'contentieux',
    slug: { fr: 'contentieux', de: 'rechtsstreit', en: 'litigation', lb: null },
    etiquette: { fr: 'Contentieux', de: 'Rechtsstreit', en: 'Litigation', lb: null },
  },
];

/** Dokumentarten. */
export const TYPES = {
  DOSSIER: 'dossier',
  CONFERENCE: 'conference',
};

/**
 * Die zehn Fachdossiers.
 * `titre.fr` ist der Originaltitel der alten Seite, unveraendert.
 */
const DOSSIERS = [
  {
    id: 'droit-des-successions',
    titre: {
      fr: 'Le droit des successions',
      de: 'Das Erbrecht',
      en: 'The law of succession',
      lb: null,
    },
    themes: ['successions'],
  },
  {
    id: 'recouvrement-international',
    titre: {
      fr: 'Recouvrement international de créances',
      de: 'Internationaler Forderungseinzug',
      en: 'International debt recovery',
      lb: null,
    },
    themes: ['recouvrement'],
  },
  {
    id: 'rendement-locatif',
    titre: {
      fr: 'Calcul du rendement locatif',
      de: 'Berechnung der Mietrendite',
      en: 'Calculating rental yield',
      lb: null,
    },
    themes: ['immobilier'],
  },
  {
    id: 'constitution-soparfi',
    titre: {
      fr: 'Constitution d’une SOPARFI (société de participations financières)',
      de: 'Gründung einer SOPARFI (société de participations financières)',
      en: 'Setting up a SOPARFI (financial participations company)',
      lb: null,
    },
    themes: ['societes', 'fiscalite'],
  },
  {
    id: 'spf-patrimoine-familial',
    titre: {
      fr: 'Société de gestion de patrimoine familial (SPF)',
      de: 'Gesellschaft zur Verwaltung von Familienvermögen (SPF)',
      en: 'Family wealth management company (SPF)',
      lb: null,
    },
    themes: ['societes', 'fiscalite'],
  },
  {
    id: 'exonerations-propriete-intellectuelle',
    titre: {
      fr: 'Exonérations fiscales et droits de propriété intellectuelle',
      de: 'Steuerbefreiungen und Rechte des geistigen Eigentums',
      en: 'Tax exemptions and intellectual property rights',
      lb: null,
    },
    themes: ['fiscalite', 'propriete-intellectuelle'],
  },
  {
    id: 'constituer-dossier-recouvrement',
    titre: {
      fr: 'Constituer un dossier de recouvrement de créance',
      de: 'Eine Forderungsakte aufbauen',
      en: 'Building a debt recovery file',
      lb: null,
    },
    themes: ['recouvrement'],
  },
  {
    id: 'dossier-recouvrement-mise-en-demeure',
    titre: {
      fr: 'Le dossier de recouvrement et la mise en demeure',
      de: 'Die Forderungsakte und die Mahnung',
      en: 'The recovery file and the formal notice',
      lb: null,
    },
    themes: ['recouvrement'],
  },
  {
    id: 'conformite-fiscale-blanchiment',
    titre: {
      fr: 'Conformité fiscale des clients et blanchiment',
      de: 'Steuerliche Konformität der Mandanten und Geldwäsche',
      en: 'Clients’ tax compliance and money laundering',
      lb: null,
    },
    themes: ['blanchiment', 'fiscalite'],
  },
  {
    id: 'legislation-procedure-anti-blanchiment',
    titre: {
      fr: 'Législation et procédure anti-blanchiment',
      de: 'Gesetzgebung und Verfahren zur Geldwäschebekämpfung',
      en: 'Anti-money laundering legislation and procedure',
      lb: null,
    },
    themes: ['blanchiment'],
  },
];

/** Die neunzehn Konferenzunterlagen. Referent jeweils Me Alain Lorang. */
const CONFERENCES = [
  {
    id: 'investissement-immobilier-luxembourg',
    titre: {
      fr: 'Investissement immobilier au Luxembourg',
      de: 'Immobilieninvestition in Luxemburg',
      en: 'Property investment in Luxembourg',
      lb: null,
    },
    themes: ['immobilier'],
  },
  {
    id: 'acquisition-biens-non-residents',
    titre: {
      fr: 'L’acquisition de biens immobiliers au Luxembourg par des non-résidents',
      de: 'Der Erwerb von Immobilien in Luxemburg durch Nichtansässige',
      en: 'The acquisition of property in Luxembourg by non-residents',
      lb: null,
    },
    themes: ['immobilier'],
  },
  {
    id: 'traitement-fiscal-sci',
    titre: {
      fr: 'Traitement fiscal de la SCI',
      de: 'Steuerliche Behandlung der SCI',
      en: 'Tax treatment of the SCI',
      lb: null,
    },
    themes: ['immobilier', 'fiscalite'],
  },
  {
    id: 'sa-ou-sci',
    titre: {
      fr: 'Investissement immobilier : société anonyme ou société civile immobilière',
      de: 'Immobilieninvestition: Aktiengesellschaft oder société civile immobilière',
      en: 'Property investment: public limited company or société civile immobilière',
      lb: null,
    },
    themes: ['immobilier', 'societes'],
  },
  {
    id: 'assurance-vie-luxembourg',
    titre: {
      fr: 'Assurance vie au Luxembourg',
      de: 'Lebensversicherung in Luxemburg',
      en: 'Life assurance in Luxembourg',
      lb: null,
    },
    themes: ['assurance'],
  },
  {
    id: 'conseil-fiscal-banques',
    titre: {
      fr: 'Conseil fiscal pour banques',
      de: 'Steuerberatung für Banken',
      en: 'Tax advice for banks',
      lb: null,
    },
    themes: ['fiscalite', 'banque'],
  },
  {
    id: 'constitution-personnes-morales',
    titre: {
      fr: 'Constitution de personnes morales au Luxembourg',
      de: 'Gründung juristischer Personen in Luxemburg',
      en: 'Formation of legal entities in Luxembourg',
      lb: null,
    },
    themes: ['societes'],
  },
  {
    id: 'convention-franco-luxembourgeoise',
    titre: {
      fr: 'Convention franco-luxembourgeoise',
      de: 'Französisch-luxemburgisches Abkommen',
      en: 'The France–Luxembourg convention',
      lb: null,
    },
    themes: ['fiscalite'],
  },
  {
    id: 'detentions-immobilieres-non-residents',
    titre: {
      fr: 'Détentions immobilières par non-résidents',
      de: 'Immobilienbesitz von Nichtansässigen',
      en: 'Property holdings by non-residents',
      lb: null,
    },
    themes: ['immobilier'],
  },
  {
    id: 'echange-information-fiscale',
    titre: {
      fr: 'Échange d’information fiscale',
      de: 'Steuerlicher Informationsaustausch',
      en: 'Exchange of tax information',
      lb: null,
    },
    themes: ['fiscalite'],
  },
  {
    id: 'legislation-anti-blanchiment-luxembourg',
    titre: {
      fr: 'Législation anti-blanchiment au Luxembourg',
      de: 'Geldwäschegesetzgebung in Luxemburg',
      en: 'Anti-money laundering legislation in Luxembourg',
      lb: null,
    },
    themes: ['blanchiment'],
  },
  {
    id: 'obligation-de-conseil',
    titre: {
      fr: 'Obligation de conseil du professionnel',
      de: 'Beratungspflicht des Berufsträgers',
      en: 'The professional’s duty to advise',
      lb: null,
    },
    themes: ['contentieux'],
  },
  {
    id: 'punissabilite-luxembourg',
    titre: {
      fr: 'La punissabilité au Luxembourg',
      de: 'Die Strafbarkeit in Luxemburg',
      en: 'Criminal liability in Luxembourg',
      lb: null,
    },
    themes: ['contentieux'],
  },
  {
    id: 'recouvrement-de-creances',
    titre: {
      fr: 'Recouvrement de créances',
      de: 'Forderungseinzug',
      en: 'Debt recovery',
      lb: null,
    },
    themes: ['recouvrement'],
  },
  {
    id: 'intermediaires-financiers-apporteurs',
    titre: {
      fr: 'Relations entre intermédiaires financiers et apporteurs',
      de: 'Beziehungen zwischen Finanzintermediären und Vermittlern',
      en: 'Relations between financial intermediaries and introducers',
      lb: null,
    },
    themes: ['banque'],
  },
  {
    id: 'risques-poursuites-penales',
    titre: {
      fr: 'Risques de poursuites pénales',
      de: 'Risiken der Strafverfolgung',
      en: 'Risks of criminal prosecution',
      lb: null,
    },
    themes: ['contentieux'],
  },
  {
    id: 'spf-conference',
    titre: {
      fr: 'Société de gestion de patrimoine familiale (SPF)',
      de: 'Gesellschaft zur Verwaltung von Familienvermögen (SPF)',
      en: 'Family wealth management company (SPF)',
      lb: null,
    },
    themes: ['societes', 'fiscalite'],
  },
  {
    id: 'societes-commerciales',
    titre: {
      fr: 'Les sociétés commerciales',
      de: 'Die Handelsgesellschaften',
      en: 'Commercial companies',
      lb: null,
    },
    themes: ['societes'],
  },
  {
    id: 'utilisation-personnes-morales',
    titre: {
      fr: 'L’utilisation de personnes morales au Luxembourg',
      de: 'Die Verwendung juristischer Personen in Luxemburg',
      en: 'The use of legal entities in Luxembourg',
      lb: null,
    },
    themes: ['societes'],
  },
];

/** Macht aus einem Titel ein Adress-Segment. */
export function slugifier(titre) {
  return (
    titre
      // Deutsche Umlaute ZUERST umschreiben. Wuerde erst normalisiert und
      // entakzentuiert, waere aus "Gruendung" ein "grundung" geworden —
      // die Adresse waere falsch geschrieben und nicht mehr aussprechbar.
      .replace(/ß/g, 'ss')
      .replace(/[äÄ]/g, 'ae')
      .replace(/[öÖ]/g, 'oe')
      .replace(/[üÜ]/g, 'ue')
      // Erst danach die restlichen Akzente (franzoesisch, englisch).
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72)
      .replace(/-+$/g, '')
  );
}

/**
 * Sorgt dafuer, dass Adressen eindeutig bleiben.
 *
 * Zwei Dokumente tragen fast denselben Titel — das Fachdossier
 * "Société de gestion de patrimoine familial (SPF)" und die gleichnamige
 * Konferenzunterlage. Auf Deutsch und Englisch faellt der Unterschied
 * (familial / familiale) weg und die Adressen kollidieren.
 *
 * Bei einer Kollision wird die Dokumentart angehaengt. Das ist nicht nur
 * fuer diese beiden noetig: Me Lorang kann im Adminbereich jederzeit ein
 * zweites Dokument mit gleichem Titel anlegen, und dann darf der Build
 * nicht zwei Seiten auf dieselbe Adresse schreiben.
 */
export function assurerSlugsUniques(documents, langues = ['fr', 'de', 'en', 'lb']) {
  for (const lang of langues) {
    const vus = new Map();
    for (const doc of documents) {
      const base = doc.slug?.[lang];
      if (!base) continue;
      if (!vus.has(base)) {
        vus.set(base, doc.id);
        continue;
      }
      let candidat = `${base}-${doc.type}`;
      let n = 2;
      while (vus.has(candidat)) {
        candidat = `${base}-${doc.type}-${n}`;
        n += 1;
      }
      doc.slug[lang] = candidat;
      vus.set(candidat, doc.id);
    }
  }
  return documents;
}

/** Baut alle 29 Dokumente als Entwurf. */
export function construirePublications() {
  const faire = (liste, type, offset) =>
    liste.map((d, i) => ({
      id: d.id,
      type,
      ordre: offset + i,
      statut: 'entwurf',
      titre: d.titre,
      slug: {
        fr: d.titre.fr ? slugifier(d.titre.fr) : null,
        de: d.titre.de ? slugifier(d.titre.de) : null,
        en: d.titre.en ? slugifier(d.titre.en) : null,
        lb: null,
      },
      // Kurzfassung fuer die Uebersichtsseite und die Meta-Description.
      resume: { fr: null, de: null, en: null, lb: null },
      // Der Volltext, aus dem die lesbare HTML-Fassung entsteht.
      corps: { fr: null, de: null, en: null, lb: null },
      // Pflichtfeld. Ohne diesen Wert wird nicht veroeffentlicht.
      etat_du_droit: null,
      date_publication: null,
      auteur: 'Alain Lorang',
      langue_originale: 'fr',
      pdf: null, // { chemin, octets }
      themes: d.themes,
      ouvert: 'documents_texte',
      updated_at: null,
    }));

  return [
    ...faire(DOSSIERS, TYPES.DOSSIER, 1),
    ...faire(CONFERENCES, TYPES.CONFERENCE, 101),
  ];
}

/** Die Felder, die fuer eine Veroeffentlichung belegt sein muessen. */
export const CHAMPS_REQUIS = ['titre', 'corps', 'resume'];
