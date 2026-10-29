/**
 * content/source/settings.mjs — Stammdaten der Kanzlei.
 *
 * NAP-KONSISTENZ: Name, Adresse und Telefon stehen hier genau einmal und
 * werden von jeder Seite, von den strukturierten Daten und vom Impressum
 * aus derselben Quelle gelesen. Abweichende Schreibweisen — auch bei
 * Strassenabkuerzungen — kosten lokale Sichtbarkeit.
 *
 * Zwei Fehler der alten Seite sind hier bewusst korrigiert:
 *   1. Die E-Mail lautet contact@cabinet-avocats-lorang.com (ohne „s“ bei
 *      „cabinet“). Die im alten Impressum genannte Adresse
 *      contact@cabinets-avocats-lorang.com existiert nicht.
 *   2. Die Besucheradresse lautet ueberall und ausnahmslos
 *      „41, avenue du X Septembre, L-2551 Luxembourg“. Die Postfach-
 *      anschrift steht nur dort, wo sie wirklich gebraucht wird, und wird
 *      nie mit der Besucheradresse vermischt.
 */
import { ouvert } from './ouvertes.mjs';

export const SETTINGS = {
  // --- Name -----------------------------------------------------------------
  nom: 'Étude d’Avocats LW LEGIS',
  nom_court: 'LW LEGIS',
  /** Der vollstaendige Firmenname mit Rechtsform — fuer das Impressum. */
  raison_sociale: ouvert('rechtsform'),

  // --- Besucheradresse ------------------------------------------------------
  adresse: {
    rue: '41, avenue du X Septembre',
    code_postal: 'L-2551',
    ville: 'Luxembourg',
    quartier: 'Belair',
    pays_code: 'LU',
    pays: { fr: 'Luxembourg', de: 'Luxemburg', en: 'Luxembourg', lb: null },
    /** Eine Zeile, exakt so, wie sie ueberall erscheint. */
    une_ligne: '41, avenue du X Septembre, L-2551 Luxembourg',
    /** Koordinaten fuer die strukturierten Daten. */
    latitude: 49.6103,
    longitude: 6.1147,
  },

  // --- Postanschrift --------------------------------------------------------
  // Nur dort einsetzen, wo wirklich Post hingeschickt wird. Nie mit der
  // Besucheradresse in einem Block mischen.
  postfach: {
    boite: 'B.P. 1734',
    ville: 'Luxembourg',
    code_postal: ouvert('bp_code_postal'),
  },

  // --- Erreichbarkeit -------------------------------------------------------
  telephone: {
    central: '+352 44 71 76-1',
    central_lien: '+3524471761',
    direct: '+352 44 71 76-22',
    direct_lien: '+35244717622',
  },
  courriel: 'contact@cabinet-avocats-lorang.com',
  courriel_formulaire: ouvert('destinataire_formulaire'),

  /**
   * Oeffnungszeiten — UNBESTAETIGT. Die Werte stammen aus dem Google-Profil,
   * nicht von der Kanzlei. Sie erscheinen auf der Kontaktseite und in den
   * strukturierten Daten und werden erst ausgegeben, wenn sie bestaetigt
   * sind; bis dahin steht dort die Markierung.
   */
  horaires: {
    statut: ouvert('horaires'),
    valeurs: [
      { jours: ['Mo', 'Tu', 'We', 'Th', 'Fr'], ouvre: '08:00', ferme: '18:00' },
    ],
    fermes: ['Sa', 'Su'],
  },

  // --- Berufsrecht ----------------------------------------------------------
  barreau: {
    nom: 'Ordre des Avocats du Barreau de Luxembourg',
    formulation: ouvert('ordre_formulierung'),
    titre_professionnel: {
      fr: 'avocat à la cour',
      de: 'avocat à la cour (Rechtsanwalt)',
      en: 'avocat à la cour (attorney-at-law)',
      lb: null,
    },
  },
  rcs: ouvert('rcs'),
  tva: ouvert('tva'),
  assurance: ouvert('assurance'),
  autorisation: ouvert('autorisation'),
  mediation: ouvert('mediation'),

  // --- Sprachen -------------------------------------------------------------
  langues_de_travail: {
    confirmees: ['fr', 'en'],
    statut: ouvert('langues_parlees'),
  },

  // --- Reichweite -----------------------------------------------------------
  // Fuer `areaServed` in den strukturierten Daten.
  territoires: ['LU', 'FR', 'BE', 'DE'],

  // --- Netzwerke ------------------------------------------------------------
  reseaux: [
    {
      id: 'intrum',
      nom: 'Intrum Justitia',
      role: {
        fr: 'Représentant officiel au Luxembourg du groupe Intrum Justitia et de sa filiale IJCOF.',
        de: 'Offizieller Vertreter der Gruppe Intrum Justitia und ihrer Tochter IJCOF in Luxemburg.',
        en: 'Official Luxembourg representative of the Intrum Justitia group and its subsidiary IJCOF.',
        lb: null,
      },
    },
    {
      id: 'advounion',
      nom: 'ADVOUNION',
      role: {
        fr: 'Membre du réseau international d’avocats ADVOUNION.',
        de: 'Mitglied des internationalen Anwaltsnetzwerks ADVOUNION.',
        en: 'Member of the international lawyers’ network ADVOUNION.',
        lb: null,
      },
    },
    {
      id: 'lic',
      nom: 'League International for Creditors (LIC)',
      role: {
        fr: 'Représentant luxembourgeois de la League International for Creditors.',
        de: 'Luxemburgischer Vertreter der League International for Creditors.',
        en: 'Luxembourg representative of the League International for Creditors.',
        lb: null,
      },
    },
    {
      id: 'viajuris',
      nom: 'VIAJURIS',
      role: {
        fr: 'Cabinet partenaire, fondé en 1992, présent à Saint-Étienne, Lyon, Le Puy-en-Velay, Paris et Luxembourg, environ quarante collaborateurs.',
        de: 'Partnerkanzlei, gegründet 1992, mit Standorten in Saint-Étienne, Lyon, Le Puy-en-Velay, Paris und Luxemburg, rund vierzig Mitarbeiter.',
        en: 'Partner firm, founded in 1992, with offices in Saint-Étienne, Lyon, Le Puy-en-Velay, Paris and Luxembourg, around forty staff.',
        lb: null,
      },
    },
  ],

  /**
   * `sameAs` fuer die strukturierten Daten.
   * Erst eintragen, wenn die vier zersplitterten Google-Eintraege
   * zusammengefuehrt sind — siehe README, Abschnitt „Google-Profil“.
   */
  profils: {
    google: null,
    linkedin: null,
  },

  domaine: ouvert('domaine_internet'),
};

/** Die Person. Alle Angaben sind belegt. */
export const AVOCAT = {
  id: 'alain-lorang',
  prenom: 'Alain',
  nom: 'Lorang',
  nom_complet: 'Alain Lorang',
  civilite: 'Me',
  titre: {
    fr: 'avocat à la cour',
    de: 'avocat à la cour',
    en: 'avocat à la cour',
    lb: null,
  },
  barreau_depuis: 1982,
  telephone: '+352 44 71 76-22',
  parcours: [
    {
      annee: '1980',
      texte: {
        fr: 'Maîtrise en droit des affaires, Université Paris II Panthéon-Assas.',
        de: 'Maîtrise en droit des affaires, Université Paris II Panthéon-Assas.',
        en: 'Maîtrise en droit des affaires, Université Paris II Panthéon-Assas.',
        lb: null,
      },
    },
    {
      annee: '1981',
      texte: {
        fr: 'Diplôme de l’Institut d’Études Politiques de Paris, section économique et financière.',
        de: 'Diplom des Institut d’Études Politiques de Paris, Section économique et financière.',
        en: 'Diploma of the Institut d’Études Politiques de Paris, economics and finance section.',
        lb: null,
      },
    },
    {
      annee: '1982',
      texte: {
        fr: 'Inscription au barreau de Luxembourg.',
        de: 'Zulassung am Barreau de Luxembourg.',
        en: 'Admitted to the Luxembourg bar.',
        lb: null,
      },
    },
    {
      annee: '1985',
      texte: {
        fr: 'Certificat en droit fiscal, ministère luxembourgeois de l’Éducation nationale.',
        de: 'Zertifikat Steuerrecht, luxemburgisches Bildungsministerium.',
        en: 'Certificate in tax law, Luxembourg Ministry of Education.',
        lb: null,
      },
    },
    {
      annee: '1990',
      texte: {
        fr: 'Certificat du Centre de Formation Professionnelle des Avocats d’Alsace, 13 novembre 1990.',
        de: 'Zertifikat des Centre de Formation Professionnelle des Avocats d’Alsace, 13. November 1990.',
        en: 'Certificate of the Centre de Formation Professionnelle des Avocats d’Alsace, 13 November 1990.',
        lb: null,
      },
    },
  ],
  fonctions: [
    {
      texte: {
        fr: 'Expert judiciaire assermenté près la Cour d’Appel de Luxembourg.',
        de: 'Vereidigter Gerichtssachverständiger bei der Cour d’Appel de Luxembourg.',
        en: 'Sworn judicial expert at the Luxembourg Court of Appeal.',
        lb: null,
      },
    },
    {
      texte: {
        fr: 'Ancien secrétaire du Conseil de l’Ordre des Avocats.',
        de: 'Ehemaliger Sekretär des Conseil de l’Ordre des Avocats.',
        en: 'Former secretary of the Conseil de l’Ordre des Avocats.',
        lb: null,
      },
    },
    {
      texte: {
        fr: 'Membre du conseil d’administration et trésorier de l’Observatoire du droit européen (ELA Luxembourg asbl).',
        de: 'Vorstandsmitglied und Schatzmeister des Observatoire du droit européen (ELA Luxembourg asbl).',
        en: 'Board member and treasurer of the Observatoire du droit européen (ELA Luxembourg asbl).',
        lb: null,
      },
    },
  ],
};
