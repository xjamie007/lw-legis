/**
 * content/source/seo.mjs — Titel und Beschreibung fuer Google.
 *
 * Titel und Beschreibungen der Hauptseiten stammen aus den <title>- und
 * Description-Angaben der alten Website. Wo dort nichts Brauchbares stand
 * (Partner, Rechtstexte, englische Anwaltsseite mit veraltetem Namen),
 * bleibt das Feld leer: Dann nimmt die Seite ihren Titel und den ersten
 * Satz ihres eigenen Textes.
 *
 * Detailseiten (Taetigkeiten, Dossiers) bekommen ihren Titel aus dem
 * Inhalt und der Vorlage `MODELES.detail`, ihre Beschreibung aus dem
 * Kurztext.
 */

export const SEO = {
  accueil: {
    titre: {
      fr: 'Cabinet d’avocats au Luxembourg – Étude d’Avocats LW LEGIS',
      en: 'Law firm in Luxembourg – The Law Firm LW LEGIS',
    },
    description: {
      fr: 'L’étude d’Avocats LW LEGIS est spécialisée en droit des sociétés au Luxembourg et en fiscalité internationale, elle conseille ses clients dans les domaines de la constitution et de la gestion de structures sociétaires adaptées à leurs besoins au Grand-Duché du Luxembourg.',
      en: 'The Law Firm LW LEGIS specialises in Real Estate and Patrimonial law, Luxembourg Company Law and International Taxation. We advise our entrepreneur clients in the areas of constitution, management and domiciliation of corporate structures adapted to their needs in the Grand Duchy of Luxembourg.',
    },
  },
  avocats: {
    titre: { fr: 'Les avocats de l’étude LW LEGIS', en: 'The lawyers from the Law Firm LW LEGIS' },
    description: {
      fr: 'Le cabinet est composé d’avocats expérimentés sous la responsabilité de Maître Alain LORANG. Flexibilité, compétences transversales, conseils experts.',
      en: null,
    },
  },
  activites: {
    titre: {
      fr: 'Les activités de notre cabinet d’avocats au Luxembourg',
      en: 'The activities of our law firm in Luxembourg',
    },
    description: {
      fr: 'Le cabinet dispose d’une large palette de compétences en droit luxembourgeois, français et européen : dépôts, brevets, marques, banque, finance, domiciliation des entreprises, assurance et indemnisation, recouvrement de créances.',
      en: 'The firm has a wide range of skills in Luxembourg, French and European law: deposits, patents, trademarks, banking, finance, domiciliation of companies, insurance and compensation, debt collection.',
    },
  },
  dossiers: {
    titre: {
      fr: 'Les dossiers thématiques de l’étude d’avocats LW LEGIS',
      en: 'Thematic files – The Law Firm LW LEGIS',
    },
    description: {
      fr: 'Immobilier, économie, fiscalité, finance, recouvrement, créance, conformité avec la loi, procédure anti-blanchiment : un cabinet d’expertise en droit luxembourgeois.',
      en: 'Real estate, economy, taxation, finance, recovery, debt, compliance with the law, anti-money laundering procedure: an expertise firm in Luxembourg law.',
    },
  },
  conferences: {
    titre: {
      fr: 'Les conférences de l’avocat Lorang au Luxembourg',
      en: 'Conferences – The Law Firm LW LEGIS',
    },
    description: { fr: null, en: null },
  },
  partenaires: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  index: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  contact: {
    titre: {
      fr: 'Contact – Étude d’Avocats LW LEGIS, cabinet d’avocats au Luxembourg',
      en: 'Contact – The Law Firm LW LEGIS, law firm in Luxembourg',
    },
    description: {
      fr: 'Étude d’Avocats LW LEGIS, 41, avenue du X Septembre, B.P. 1734, L-2551 Luxembourg. Téléphone +352 44 71 76 1, contact@cabinet-avocats-lorang.com.',
      en: 'The Law Firm LW LEGIS, 41, avenue du X Septembre, B.P. 1734, L-2551 Luxembourg. Phone +352 44 71 76 1, contact@cabinet-avocats-lorang.com.',
    },
  },
  mentions: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  donnees: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  cookies: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  conditions: { titre: { fr: null, en: null }, description: { fr: null, en: null } },
  recu: { titre: { fr: null, en: null }, description: { fr: null, en: null }, noindex: true },
};

/** Titelvorlage fuer alles ohne eigenen Titel. */
export const MODELES = {
  detail: { titre: { fr: '%titre% – Étude d’Avocats LW LEGIS', en: '%titre% – The Law Firm LW LEGIS' } },
};

export const LIMITES = {
  titre: { min: 30, max: 65 },
  description: { min: 70, max: 160 },
};
