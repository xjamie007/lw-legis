/**
 * content/source/seo.mjs — Title und Description je Seite und Sprache.
 *
 * Title 50–60 Zeichen, Description 150–160 Zeichen. Im Adminbereich sind
 * beide pro Sprache editierbar, mit Zeichenzaehler und Warnung ausserhalb
 * dieser Grenzen. `scripts/check-content.mjs` prueft die Laengen beim Build.
 *
 * Die Suchbegriffe sind aus dem Briefing uebernommen: das, wonach Leute
 * tatsaechlich suchen, nicht das, was die Kanzlei ueber sich sagen wuerde.
 * Kein Stichwortstapel — jede Description ist ein Satz, den ein Mensch liest.
 */

export const SEO = {
  accueil: {
    titre: {
      fr: 'Avocat à Luxembourg — immobilier, sociétés, successions',
      de: 'Anwalt in Luxemburg — Immobilien, Gesellschaften, Erbrecht',
      en: 'Lawyer in Luxembourg — property, companies, inheritance',
      lb: null,
    },
    description: {
      fr: 'Étude LW LEGIS, au barreau de Luxembourg depuis 1982. Immobilier, droit des sociétés, fiscalité internationale et recouvrement. Réponse directe de l’avocat.',
      de: 'Kanzlei LW LEGIS, seit 1982 am Barreau de Luxembourg. Immobilien, Gesellschaftsrecht, Steuerrecht und Forderungseinzug. Am Telefon antwortet der Anwalt.',
      en: 'LW LEGIS, at the Luxembourg bar since 1982. Property, company law, international tax and debt recovery for non-residents. You speak to the lawyer himself.',
      lb: null,
    },
  },

  situations: {
    titre: {
      fr: 'Votre situation au Luxembourg — avocat pour non-résidents',
      de: 'Ihre Situation in Luxemburg — Anwalt für Nichtansässige',
      en: 'Your situation in Luxembourg — lawyer for non-residents',
      lb: null,
    },
    description: {
      fr: 'Acheter, créer une société, hériter ou recouvrer au Luxembourg depuis la France, la Belgique, l’Allemagne ou ailleurs. Choisissez votre pays et votre projet.',
      de: 'Kaufen, gründen, erben oder eintreiben in Luxemburg — aus Frankreich, Belgien, Deutschland oder anderswo. Wählen Sie Ihr Land und Ihr Vorhaben dazu aus.',
      en: 'Buying, incorporating, inheriting or recovering in Luxembourg from France, Belgium, Germany or elsewhere. Choose your country and what you want to do.',
      lb: null,
    },
  },

  services: {
    titre: {
      fr: 'Domaines d’activité — avocat d’affaires à Luxembourg',
      de: 'Tätigkeitsgebiete — Wirtschaftsanwalt in Luxemburg',
      en: 'Practice areas — business lawyer in Luxembourg City',
      lb: null,
    },
    description: {
      fr: 'Immobilier et patrimoine, sociétés et fiscalité, successions internationales, recouvrement de créances et marques. Quatre domaines, une même Étude à Belair.',
      de: 'Immobilien und Vermögen, Gesellschaften und Steuern, internationales Erbrecht, Forderungseinzug und Marken. Vier Felder, eine Kanzlei in Luxemburg-Belair.',
      en: 'Property and assets, companies and tax, international succession, debt recovery and trademarks. Four fields, one firm in Luxembourg-Belair since 1982.',
      lb: null,
    },
  },

  etude: {
    titre: {
      fr: 'L’Étude LW LEGIS — Me Alain Lorang, avocat à la cour',
      de: 'Die Kanzlei LW LEGIS — Me Alain Lorang, avocat à la cour',
      en: 'LW LEGIS — Me Alain Lorang, avocat à la cour, 1982',
      lb: null,
    },
    description: {
      fr: 'Alain Lorang, au barreau de Luxembourg depuis 1982, expert judiciaire près la Cour d’Appel. Une Étude restée volontairement petite, à Luxembourg-Belair.',
      de: 'Alain Lorang, seit 1982 am Barreau de Luxembourg, vereidigter Sachverständiger bei der Cour d’Appel. Eine klein gehaltene Kanzlei in Luxemburg-Belair.',
      en: 'Alain Lorang, at the Luxembourg bar since 1982 and sworn judicial expert at the Court of Appeal. A firm kept deliberately small, in Luxembourg-Belair.',
      lb: null,
    },
  },

  publications: {
    titre: {
      fr: 'Fonds documentaire — droit luxembourgeois expliqué',
      de: 'Dokumente — luxemburgisches Recht erklärt | LW LEGIS',
      en: 'Library — Luxembourg law explained, in full | LW LEGIS',
      lb: null,
    },
    description: {
      fr: 'Dix dossiers et dix-neuf supports de conférence sur la SOPARFI, la SPF, l’immobilier, les successions et le recouvrement au Luxembourg. À lire en entier.',
      de: 'Zehn Fachdossiers und neunzehn Konferenzunterlagen zu SOPARFI, SPF, Immobilien, Erbrecht und Forderungseinzug in Luxemburg. Vollständig hier zu lesen.',
      en: 'Ten legal briefings and nineteen conference papers on SOPARFI, SPF, property, succession and debt recovery in Luxembourg. Readable in full, on the page.',
      lb: null,
    },
  },

  honoraires: {
    titre: {
      fr: 'Honoraires d’avocat à Luxembourg — ce que cela coûte',
      de: 'Anwaltshonorare in Luxemburg — was ein Mandat kostet',
      en: 'Lawyer’s fees in Luxembourg — what a matter will cost',
      lb: null,
    },
    description: {
      fr: 'Premier entretien, taux horaire, forfaits et rythme de facturation. Une convention d’honoraires écrite avant tout mandat, sans surprise sur la facture.',
      de: 'Erstgespräch, Stundensatz, Pauschalen und Abrechnungsrhythmus. Vor jedem Mandat eine schriftliche Honorarvereinbarung, keine Überraschung auf der Rechnung.',
      en: 'First consultation, hourly rate, fixed fees and billing cycle. A written fee agreement before any engagement, and no surprises at all on the final invoice.',
      lb: null,
    },
  },

  contact: {
    titre: {
      fr: 'Contact — avocat à Luxembourg-Belair, X Septembre 41',
      de: 'Kontakt — Anwalt in Luxemburg-Belair, X Septembre 41',
      en: 'Contact — lawyer in Luxembourg-Belair, X Septembre',
      lb: null,
    },
    description: {
      fr: 'Étude LW LEGIS, 41 avenue du X Septembre à Luxembourg-Belair. Téléphone, courriel et formulaire. Décrivez votre situation, un avocat vous répondra lui-même.',
      de: 'Kanzlei LW LEGIS, 41 avenue du X Septembre in Luxemburg-Belair. Telefon, E-Mail und Formular. Schildern Sie Ihre Lage, ein Anwalt antwortet persönlich.',
      en: 'LW LEGIS, 41 avenue du X Septembre in Luxembourg-Belair. Telephone, email and a contact form. Describe your situation and a lawyer will reply himself.',
      lb: null,
    },
  },

  mentions: {
    titre: {
      fr: 'Mentions légales — Étude d’Avocats LW LEGIS, Luxembourg',
      de: 'Impressum — Étude d’Avocats LW LEGIS, Luxemburg-Belair',
      en: 'Legal notice — Étude d’Avocats LW LEGIS, Luxembourg',
      lb: null,
    },
    description: {
      fr: 'Éditeur, profession réglementée, assurance et autorité de tutelle de l’Étude d’Avocats LW LEGIS, 41 avenue du X Septembre, L-2551 Luxembourg, à Belair.',
      de: 'Anbieterangaben, reglementierter Beruf, Versicherung und Aufsichtsbehörde der Étude d’Avocats LW LEGIS, 41 avenue du X Septembre, L-2551 Luxemburg-Belair.',
      en: 'Site owner, regulated profession, insurance and supervisory authority of the Étude d’Avocats LW LEGIS, 41 avenue du X Septembre, L-2551 Luxembourg-Belair.',
      lb: null,
    },
  },

  donnees: {
    titre: {
      fr: 'Protection des données — ce site ne pose pas de cookie',
      de: 'Datenschutz — diese Seite setzt kein einziges Cookie',
      en: 'Privacy policy — this site does not set any cookie',
      lb: null,
    },
    description: {
      fr: 'Aucun cookie, aucune mesure d’audience, polices hébergées en propre. Ce que devient une demande envoyée par le formulaire, et combien de temps elle est gardée.',
      de: 'Kein Cookie, keine Reichweitenmessung, selbst gehostete Schriften. Was mit einer über das Formular gesendeten Anfrage geschieht und wie lange sie bleibt.',
      en: 'No cookie, no audience measurement and self-hosted typefaces. What becomes of an enquiry sent through the form, and exactly how long it is kept afterwards.',
      lb: null,
    },
  },

  conditions: {
    titre: {
      fr: 'Conditions générales — Étude d’Avocats LW LEGIS, Luxembourg',
      de: 'Geschäftsbedingungen — Étude d’Avocats LW LEGIS, Luxemburg',
      en: 'Terms and conditions — Étude d’Avocats LW LEGIS, Luxembourg',
      lb: null,
    },
    description: {
      fr: 'Les conditions générales applicables aux mandats confiés à l’Étude d’Avocats LW LEGIS, inscrite au barreau de Luxembourg depuis 1982, à Luxembourg-Belair.',
      de: 'Die allgemeinen Geschäftsbedingungen für Mandate der Étude d’Avocats LW LEGIS, seit 1982 am Barreau de Luxembourg zugelassen, mit Sitz in Luxemburg-Belair.',
      en: 'The general terms applying to engagements given to the Étude d’Avocats LW LEGIS, admitted to the Luxembourg bar since 1982, with its office in Luxembourg.',
      lb: null,
    },
  },

  recu: {
    titre: {
      fr: 'Votre demande est arrivée — LW LEGIS',
      de: 'Ihre Anfrage ist angekommen — LW LEGIS',
      en: 'Your enquiry has arrived — LW LEGIS',
      lb: null,
    },
    description: {
      fr: 'Confirmation de réception de votre demande adressée à l’Étude d’Avocats LW LEGIS à Luxembourg.',
      de: 'Bestätigung des Eingangs Ihrer Anfrage an die Étude d’Avocats LW LEGIS in Luxemburg.',
      en: 'Confirmation that your enquiry to Étude d’Avocats LW LEGIS in Luxembourg has been received.',
      lb: null,
    },
    noindex: true,
  },

  erreur404: {
    titre: {
      fr: 'Page introuvable — LW LEGIS',
      de: 'Seite nicht gefunden — LW LEGIS',
      en: 'Page not found — LW LEGIS',
      lb: null,
    },
    description: {
      fr: 'Cette adresse n’existe pas sur le site de l’Étude d’Avocats LW LEGIS.',
      de: 'Diese Adresse gibt es auf der Seite der Étude d’Avocats LW LEGIS nicht.',
      en: 'This address does not exist on the Étude d’Avocats LW LEGIS site.',
      lb: null,
    },
    noindex: true,
  },
};

/** Muster fuer die erzeugten Seiten. `%s` wird ersetzt. */
export const MODELES = {
  situation: {
    titre: {
      fr: '%projet% au Luxembourg — depuis %pays% | LW LEGIS',
      de: '%projet% in Luxemburg — aus %pays% | LW LEGIS',
      en: '%projet% in Luxembourg — from %pays% | LW LEGIS',
      lb: null,
    },
  },
  publication: {
    titre: {
      fr: '%titre% | Fonds documentaire LW LEGIS',
      de: '%titre% | Dokumente LW LEGIS',
      en: '%titre% | LW LEGIS library',
      lb: null,
    },
  },
  famille: {
    titre: {
      fr: '%famille% — avocat à Luxembourg | LW LEGIS',
      de: '%famille% — Anwalt in Luxemburg | LW LEGIS',
      en: '%famille% — lawyer in Luxembourg | LW LEGIS',
      lb: null,
    },
  },
  theme: {
    titre: {
      fr: '%theme% — documents | LW LEGIS',
      de: '%theme% — Dokumente | LW LEGIS',
      en: '%theme% — documents | LW LEGIS',
      lb: null,
    },
  },
};

/** Grenzen fuer die Laengenpruefung. */
export const LIMITES = {
  titre: { min: 50, max: 60, dur_max: 65 },
  description: { min: 150, max: 160, dur_max: 170 },
};
