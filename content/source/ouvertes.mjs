/**
 * content/source/ouvertes.mjs — Register der offenen Punkte.
 *
 * Alles, was die Kanzlei noch liefern oder bestaetigen muss, steht hier —
 * und NUR hier. Daraus entstehen drei Dinge:
 *
 *   1. die sichtbare Markierung an der betroffenen Stelle der Website
 *   2. die Datei OFFENE-PUNKTE.md fuer die Uebergabe
 *   3. die Build-Pruefung, die zaehlt, wie viel noch aussteht
 *
 * Es wird nichts erfunden: kein Registereintrag, keine Adresse, keine
 * Oeffnungszeit, kein Rechtsinhalt, keine luxemburgische Uebersetzung.
 *
 * `statut`:
 *   'fehlt'        — die Angabe liegt gar nicht vor
 *   'unbestaetigt' — es gibt eine Angabe, sie ist aber ungeprueft
 *
 * `bloquant: true` heisst: damit darf die Seite nicht online gehen.
 */

export const STATUT = {
  FEHLT: 'fehlt',
  UNBESTAETIGT: 'unbestaetigt',
};

export const OUVERTES = {
  // --- Impressum und Registerdaten -----------------------------------------
  rechtsform: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Impressum',
    titre: 'Rechtsform der Kanzlei',
    question:
      'In welcher Rechtsform wird die Étude geführt (Einzelanwalt, société civile, S.à r.l. …)? Der vollständige, genaue Firmenname gehört ins Impressum.',
    etiquette: { fr: 'forme juridique', de: 'Rechtsform', en: 'legal form', lb: null },
  },
  rcs: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Impressum',
    titre: 'RCS-Nummer',
    question:
      'Wie lautet die Nummer im Registre de Commerce et des Sociétés? Bei einem Einzelanwalt existiert unter Umständen keine — dann bitte ausdrücklich bestätigen, dass keine vorhanden ist.',
    etiquette: { fr: 'numéro RCS', de: 'RCS-Nummer', en: 'RCS number', lb: null },
  },
  tva: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Impressum',
    titre: 'Mehrwertsteuernummer',
    question: 'Wie lautet die luxemburgische MwSt-Nummer (LU…)?',
    etiquette: { fr: 'numéro de TVA', de: 'MwSt-Nummer', en: 'VAT number', lb: null },
  },
  assurance: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Impressum',
    titre: 'Berufshaftpflichtversicherung',
    question:
      'Welcher Versicherer, welche Policennummer, welcher räumliche Geltungsbereich? Diese Angabe gehört nach der Dienstleistungsrichtlinie ins Impressum.',
    etiquette: {
      fr: 'assurance responsabilité civile professionnelle',
      de: 'Berufshaftpflichtversicherung',
      en: 'professional indemnity insurance',
      lb: null,
    },
  },
  autorisation: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Impressum',
    titre: 'Gewerbegenehmigung',
    question:
      'Besteht eine autorisation d’établissement, und falls ja, mit welcher Nummer? Falls für die Anwaltstätigkeit nicht einschlägig, bitte kurz bestätigen.',
    etiquette: {
      fr: 'autorisation d’établissement',
      de: 'Gewerbegenehmigung',
      en: 'business licence',
      lb: null,
    },
  },
  ordre_formulierung: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: true,
    domaine: 'Impressum',
    titre: 'Bezeichnung der Aufsichtsbehörde',
    question:
      'Ist „Ordre des Avocats du Barreau de Luxembourg“ die Formulierung, die das Standesrecht verlangt? Bitte die exakte Bezeichnung und die anwendbaren Berufsregeln samt Fundstelle bestätigen.',
    etiquette: { fr: 'autorité de tutelle', de: 'Aufsichtsbehörde', en: 'regulator', lb: null },
  },
  bp_code_postal: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Kontaktdaten',
    titre: 'Postleitzahl des Postfachs',
    question:
      'Zu welcher Postleitzahl gehört die B.P. 1734? Die alte Seite nennt einmal „L-1734“, das ist offenkundig die Postfachnummer, nicht die Postleitzahl.',
    etiquette: { fr: 'code postal de la B.P.', de: 'Postleitzahl des Postfachs', en: 'PO box postcode', lb: null },
  },

  // --- Erreichbarkeit ------------------------------------------------------
  horaires: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: true,
    domaine: 'Kontaktdaten',
    titre: 'Öffnungszeiten',
    question:
      'Stimmen Montag bis Freitag 08:00–18:00, Samstag und Sonntag geschlossen? Die Angabe stammt aus dem Google-Profil, nicht von der Kanzlei. Sie steht auf der Kontaktseite und zusätzlich in den strukturierten Daten und muss deshalb stimmen.',
    etiquette: { fr: 'heures d’ouverture', de: 'Öffnungszeiten', en: 'opening hours', lb: null },
  },
  acces: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Kontaktdaten',
    titre: 'Anfahrt und Parken',
    question:
      'Wie kommt man am besten zur Kanzlei — Bus, Bahn, Auto? Wo kann man parken, und kostet das etwas? Für Mandanten aus Frankreich, Belgien und Deutschland, die mit dem Auto kommen, ist das eine der praktisch wichtigsten Angaben der ganzen Seite.',
    etiquette: { fr: 'accès et stationnement', de: 'Anfahrt und Parken', en: 'getting here and parking', lb: null },
  },
  delai_reponse: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Formular',
    titre: 'Antwortfrist auf Anfragen',
    question:
      'Innerhalb welcher Frist antwortet die Kanzlei auf eine Anfrage über das Formular? Diese Zusage erscheint in den häufigen Fragen UND in der Bestätigung nach dem Absenden. Sie muss eingehalten werden — lieber großzügig ansetzen.',
    etiquette: { fr: 'délai de réponse', de: 'Antwortfrist', en: 'response time', lb: null },
  },
  langues_parlees: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: true,
    domaine: 'Kanzlei',
    titre: 'Gesprochene Sprachen',
    question:
      'Belegt sind Französisch und Englisch. Werden Mandate auch auf Deutsch und auf Luxemburgisch geführt? Davon hängt ab, ob die deutsche und die luxemburgische Sprachfassung überhaupt sinnvoll sind.',
    etiquette: { fr: 'langues de travail', de: 'Arbeitssprachen', en: 'working languages', lb: null },
  },
  destinataire_formulaire: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Formular',
    titre: 'Empfängeradresse des Formulars',
    question:
      'An welches Postfach sollen Anfragen gehen? Voreingestellt ist contact@cabinet-avocats-lorang.com. Sinnvoll wäre eine eigene Adresse, damit Anfragen nicht in der allgemeinen Post untergehen.',
    etiquette: { fr: 'destinataire', de: 'Empfänger', en: 'recipient', lb: null },
  },

  // --- Honorare ------------------------------------------------------------
  honoraire_entretien: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Honorare',
    titre: 'Preis des Erstgesprächs',
    question:
      'Was kostet ein Erstgespräch, und wie lange dauert es? Falls es kostenlos ist, bitte auch das ausdrücklich sagen — das ist ein starkes Argument.',
    etiquette: { fr: 'premier entretien', de: 'Erstgespräch', en: 'first consultation', lb: null },
  },
  honoraire_horaire: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Honorare',
    titre: 'Stundensatz',
    question:
      'Wie hoch ist der Stundensatz, netto und brutto? Gibt es unterschiedliche Sätze nach Bearbeiter oder nach Sachgebiet?',
    etiquette: { fr: 'taux horaire', de: 'Stundensatz', en: 'hourly rate', lb: null },
  },
  honoraire_forfaits: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Honorare',
    titre: 'Pauschalen',
    question:
      'Für welche Leistungen gibt es Pauschalen, und wie hoch sind sie? Genannt waren Gesellschaftsgründung und Markenanmeldung.',
    etiquette: { fr: 'forfaits', de: 'Pauschalen', en: 'fixed fees', lb: null },
  },
  honoraire_rythme: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Honorare',
    titre: 'Abrechnungsrhythmus',
    question:
      'Wann wird abgerechnet — monatlich, quartalsweise, bei Abschluss? Wird ein Vorschuss verlangt, und in welcher Höhe?',
    etiquette: { fr: 'rythme de facturation', de: 'Abrechnungsrhythmus', en: 'billing cycle', lb: null },
  },

  // --- Team ----------------------------------------------------------------
  equipe: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: false,
    domaine: 'Kanzlei',
    titre: 'Das Team',
    question:
      'Die englische Fassung der alten Seite nennt zehn Mitarbeiter. Stimmt das noch? Für jede Person werden gebraucht: Name, Funktion, Jahr der Zulassung, Arbeitssprachen und ein Foto. Bis dahin bleibt die Team-Sektion leer — sie ist technisch fertig.',
    etiquette: { fr: 'équipe', de: 'Team', en: 'team', lb: null },
  },

  // --- Dokumente -----------------------------------------------------------
  documents_texte: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Dokumente',
    titre: 'Volltexte der 29 Dokumente',
    question:
      'Von den zehn Fachdossiers und neunzehn Konferenzunterlagen liegen die Titel vor, nicht aber die Texte und die PDF-Dateien. Beides wird für die lesbare HTML-Fassung gebraucht, die den eigentlichen Wert der Bibliothek ausmacht.',
    etiquette: { fr: 'texte du document', de: 'Volltext', en: 'full text', lb: null },
  },
  documents_rechtsstand: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Dokumente',
    titre: 'Rechtsstand je Dokument',
    question:
      'Zu welchem Datum gibt jedes Dokument den Rechtsstand wieder? Datiert ist bisher nur conference-07-2025.pdf. Ohne diese Angabe wird ein Dokument nicht veröffentlicht — ein Steuerpapier von 2009 ohne Datum schadet mehr, als es nützt.',
    etiquette: { fr: 'état du droit', de: 'Rechtsstand', en: 'law as at', lb: null },
  },

  // --- Situationsmatrix ----------------------------------------------------
  situations_contenu: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Situationsmatrix',
    titre: 'Rechtsinhalte der Konstellationen',
    question:
      'Jede der 42 Konstellationen braucht drei Abschnitte vom Anwalt: was in Luxemburg gilt, was die Kanzlei übernimmt, welche Unterlagen gebraucht werden. Das ist Rechtsinhalt und wird nicht erfunden. Die Seiten sind angelegt und im Adminbereich ausfüllbar; veröffentlicht wird eine Konstellation erst, wenn die drei Abschnitte stehen.',
    etiquette: { fr: 'contenu juridique', de: 'Rechtsinhalt', en: 'legal content', lb: null },
  },

  // --- Luxemburgisch -------------------------------------------------------
  luxembourgeois: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Sprachen',
    titre: 'Luxemburgische Sprachfassung',
    question:
      'Die luxemburgische Fassung wird von einem Muttersprachler gebraucht: Oberflächentexte, Seiteninhalte, URL-Segmente und Suchbegriffe. Maschinell erzeugt wird sie nicht. Solange sie fehlt, wird /lb/ nicht gebaut und taucht weder in der Sitemap noch in den hreflang-Angaben auf.',
    etiquette: { fr: 'version luxembourgeoise', de: 'luxemburgische Fassung', en: 'Luxembourgish version', lb: null },
  },

  // --- Standesrecht --------------------------------------------------------
  temoignages: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: false,
    domaine: 'Standesrecht',
    titre: 'Zulässigkeit von Mandantenstimmen',
    question:
      'Lässt das Standesrecht des Barreau de Luxembourg Mandantenstimmen und Sternebewertungen auf der Website zu? Bis das geklärt ist, enthält die Seite keine Testimonials, keine Bewertungen und keine AggregateRating-Auszeichnung.',
    etiquette: { fr: 'témoignages', de: 'Mandantenstimmen', en: 'testimonials', lb: null },
  },
  conditions_generales: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Rechtstexte',
    titre: 'Allgemeine Geschäftsbedingungen',
    question:
      'Die alte Seite hatte „Conditions générales“. Der geltende Text wird gebraucht — am besten anwaltlich durchgesehen, weil er auch die Mandatsannahme und die Haftung regelt.',
    etiquette: { fr: 'conditions générales', de: 'Geschäftsbedingungen', en: 'terms', lb: null },
  },
  mediation: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Rechtstexte',
    titre: 'Schlichtungsstelle für Honorarstreitigkeiten',
    question:
      'Welche Stelle ist bei Streit über Honorare zuständig, und wie wird sie angerufen? Die Verbraucherschlichtungsrichtlinie verlangt diesen Hinweis auf der Website.',
    etiquette: { fr: 'médiation', de: 'Schlichtung', en: 'dispute resolution', lb: null },
  },

  // --- Bilder --------------------------------------------------------------
  bild_rechte: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: true,
    domaine: 'Bilder',
    titre: 'Nutzungsrechte an den Fotografien',
    question:
      'Porträt, Wartebereich und Treppenhaus sind von der bisherigen Website übernommen worden — es sind die Bestände der Kanzlei. Die Aufnahmen stammen aber erkennbar von einem Fotografen, und dass sie auf der alten Seite standen, heißt nicht zwangsläufig, dass sie auch auf einer neuen verwendet werden dürfen: Fotografenverträge sind manchmal auf ein Projekt beschränkt. Bitte den Vertrag oder die Rechnung des Fotografen ansehen, bevor die Seite online geht.',
    etiquette: { fr: 'droits sur les photographies', de: 'Bildrechte', en: 'image rights', lb: null },
  },
  portrait_aufloesung: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Bilder',
    titre: 'Porträt in besserer Auflösung',
    question:
      'Das übernommene Porträt hat 579 × 626 Pixel. Auf der Seite wird daraus höchstens eine 500 Pixel breite Fassung — auf einem heutigen Telefon oder Notebook ist das sichtbar weich. Die Originaldatei des Fotografen oder eine Neuaufnahme würde den größten Einzelunterschied machen, weil dieses Bild an der prominentesten Stelle der Startseite steht.',
    etiquette: { fr: 'portrait en haute définition', de: 'Porträt in hoher Auflösung', en: 'high-resolution portrait', lb: null },
  },
  wappen_vektor: {
    statut: STATUT.FEHLT,
    bloquant: false,
    domaine: 'Bilder',
    titre: 'Wappen als Vektordatei',
    question:
      'Das Wappen auf der Seite ist aus einem Foto freigestellt (694 Pixel breit) und dort, wo es steht, scharf genug. Eine Vektordatei — beim Gestalter des Logos oder beim Schildhersteller — wäre in jeder Größe sauber und ließe sich auch für Briefbogen und Stempel verwenden. Kein Hindernis für den Livegang, aber der saubere Zustand.',
    etiquette: { fr: 'armoiries vectorielles', de: 'Wappen als Vektor', en: 'vector crest', lb: null },
  },
  weitere_fotos: {
    statut: STATUT.UNBESTAETIGT,
    bloquant: false,
    domaine: 'Bilder',
    titre: 'Weitere Aufnahmen',
    question:
      'Zurzeit zeigt die Seite zwei Innenaufnahmen: den Wartebereich und das Treppenhaus. Eine Aufnahme des Besprechungsraums in Farbe wäre gut — die vorhandene ist schwarzweiß und trägt das Wappen eingebrannt, sie passt nicht zu den beiden anderen. Ebenso eine Aufnahme des Eingangs an der avenue du X Septembre: Für Mandanten, die zum ersten Mal kommen, ist das die praktisch nützlichste Aufnahme überhaupt.',
    etiquette: { fr: 'photographies supplémentaires', de: 'weitere Aufnahmen', en: 'further photographs', lb: null },
  },

  domaine_internet: {
    statut: STATUT.FEHLT,
    bloquant: true,
    domaine: 'Betrieb',
    titre: 'Domain der neuen Seite',
    question:
      'Unter welcher Adresse geht die neue Seite online? Bleibt cabinet-avocats-lorang.com, oder kommt eine Adresse mit LW LEGIS? Davon hängen die kanonischen URLs, die strukturierten Daten und die Weiterleitungen von der alten Seite ab.',
    etiquette: { fr: 'nom de domaine', de: 'Domain', en: 'domain', lb: null },
  },
};

/** Verweis auf einen offenen Punkt, wie er in Inhaltsfeldern steht. */
export function ouvert(id) {
  if (!OUVERTES[id]) {
    throw new Error(`Unbekannter offener Punkt: ${id}`);
  }
  return { __ouvert: id };
}

export function estOuvert(valeur) {
  return Boolean(valeur && typeof valeur === 'object' && '__ouvert' in valeur);
}
