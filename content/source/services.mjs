/**
 * content/source/services.mjs — Taetigkeitsgebiete.
 *
 * Gesetzt wird das als Definitionsliste (<dl>), nicht als Kartenraster:
 * kein Rahmen, kein Radius, kein Schatten, keine gleich grossen Kacheln.
 *
 * Zu den Marginalien: dort stehen ausschliesslich Angaben, die belegt sind —
 * Jahreszahlen, Netzwerknamen, Zustaendigkeitsgebiete. Es steht dort KEINE
 * Gesetzesfundstelle, weil keine verlaesslich vorliegt. Eine erfundene
 * Fundstelle im Randtext einer Anwaltsseite waere der schlimmste denkbare
 * Fehler dieses Projekts.
 *
 * Die Texte beschreiben, was die Kanzlei tut — nicht, was luxemburgisches
 * Recht vorschreibt. Rechtsinhalte stehen ausschliesslich in den
 * Konstellationen der Situationsmatrix und in den Dokumenten, und beide
 * werden vom Anwalt selbst geschrieben.
 */

export const FAMILLES = [
  // =========================================================================
  {
    id: 'immobilier-patrimoine',
    /** Zwei, drei Wörter für die Schnellleiste unter dem Hero.
     *  Sie müssen im Vorbeigehen lesbar sein — kein Satz, keine
     *  Fachsprache, nur die Tätigkeiten. */
    kurz: { fr: 'Acheter, détenir, louer', de: 'Kaufen, halten, vermieten', en: 'Buying, holding, letting', lb: null },
    ordre: 1,
    slug: {
      fr: 'immobilier-et-patrimoine',
      de: 'immobilien-und-vermoegen',
      en: 'property-and-assets',
      lb: null,
    },
    terme: {
      fr: 'Immobilier et patrimoine',
      de: 'Immobilien und Vermögen',
      en: 'Property and assets',
      lb: null,
    },
    definition: {
      fr: 'Acheter, détenir, louer et transmettre un bien au Luxembourg quand on habite ailleurs.',
      de: 'Eine Immobilie in Luxemburg kaufen, halten, vermieten und weitergeben, wenn man anderswo wohnt.',
      en: 'Buying, holding, letting and passing on property in Luxembourg while living elsewhere.',
      lb: null,
    },
    texte: {
      fr: 'Nous accompagnons l’achat depuis le compromis jusqu’à l’acte notarié, et nous vérifions avant la signature ce que la structure de détention coûtera plus tard en impôts. Pour les bailleurs, nous rédigeons les baux, encadrons les révisions de loyer et menons les procédures devant le juge de paix.',
      de: 'Wir begleiten den Kauf vom Vorvertrag bis zur notariellen Urkunde und prüfen vor der Unterschrift, was die gewählte Haltestruktur später an Steuern kostet. Für Vermieter setzen wir die Mietverträge auf, begleiten Mietanpassungen und führen die Verfahren vor dem Friedensgericht.',
      en: 'We accompany a purchase from the preliminary contract to the notarial deed, and we check before signature what the chosen ownership structure will cost in tax later on. For landlords we draft the leases, handle rent reviews and conduct proceedings before the magistrate’s court.',
      lb: null,
    },
    marge: {
      terme: { fr: 'Non-résidents', de: 'Nichtansässige', en: 'Non-residents', lb: null },
      texte: {
        fr: 'La question la plus fréquente de l’Étude.',
        de: 'Die häufigste Frage der Kanzlei.',
        en: 'The firm’s most frequent question.',
        lb: null,
      },
    },
    matieres: [
      { fr: 'Droit immobilier et patrimonial', de: 'Immobilien- und Vermögensrecht', en: 'Property and asset law', lb: null },
      { fr: 'Investissement immobilier et fiscalité immobilière', de: 'Immobilieninvestition und Immobilienbesteuerung', en: 'Property investment and property taxation', lb: null },
      { fr: 'Baux à loyer et baux à ferme', de: 'Miet- und Pachtrecht', en: 'Residential and agricultural leases', lb: null },
      { fr: 'Accompagnement de family office', de: 'Family-Office-Betreuung', en: 'Family office support', lb: null },
    ],
  },

  // =========================================================================
  {
    id: 'societes-fiscalite',
    /** Zwei, drei Wörter für die Schnellleiste unter dem Hero.
     *  Sie müssen im Vorbeigehen lesbar sein — kein Satz, keine
     *  Fachsprache, nur die Tätigkeiten. */
    kurz: { fr: 'Créer, domicilier, imposer', de: 'Gründen, domizilieren, versteuern', en: 'Forming, domiciling, taxing', lb: null },
    ordre: 2,
    slug: {
      fr: 'societes-et-fiscalite',
      de: 'gesellschaften-und-steuern',
      en: 'companies-and-tax',
      lb: null,
    },
    terme: {
      fr: 'Sociétés et fiscalité',
      de: 'Gesellschaften und Steuern',
      en: 'Companies and tax',
      lb: null,
    },
    definition: {
      fr: 'Constituer, domicilier et faire vivre une société luxembourgeoise, et savoir ce qu’elle déclenche dans votre pays.',
      de: 'Eine luxemburgische Gesellschaft gründen, domizilieren und führen — und wissen, was sie in Ihrem Land auslöst.',
      en: 'Setting up, domiciling and running a Luxembourg company, and knowing what it triggers in your own country.',
      lb: null,
    },
    texte: {
      fr: 'Nous constituons des sociétés luxembourgeoises, notamment des SOPARFI et des sociétés de gestion de patrimoine familial, assurons la domiciliation et tenons les obligations courantes : assemblées, comptes, registre des bénéficiaires effectifs. En amont, nous examinons la convention fiscale applicable entre le Luxembourg et votre pays de résidence, parce que c’est elle, et non le choix de la forme sociale, qui décide du résultat.',
      de: 'Wir gründen luxemburgische Gesellschaften, darunter SOPARFI und Gesellschaften zur Verwaltung von Familienvermögen, übernehmen die Domizilierung und halten die laufenden Pflichten ein: Versammlungen, Abschlüsse, Register der wirtschaftlich Berechtigten. Vorher sehen wir uns das Doppelbesteuerungsabkommen zwischen Luxemburg und Ihrem Wohnsitzstaat an, denn darüber entscheidet sich das Ergebnis — nicht über die Wahl der Rechtsform.',
      en: 'We incorporate Luxembourg companies, including SOPARFIs and family wealth management companies, handle domiciliation and keep up the running obligations: meetings, accounts, register of beneficial owners. Beforehand we look at the double tax treaty between Luxembourg and your country of residence, because that is what decides the outcome — not the choice of corporate form.',
      lb: null,
    },
    marge: {
      terme: { fr: 'SOPARFI · SPF', de: 'SOPARFI · SPF', en: 'SOPARFI · SPF', lb: null },
      texte: {
        fr: 'Deux dossiers du fonds documentaire portent sur ces formes.',
        de: 'Zwei Fachdossiers der Bibliothek behandeln diese Formen.',
        en: 'Two briefings in the library deal with these forms.',
        lb: null,
      },
    },
    matieres: [
      { fr: 'Droit des sociétés luxembourgeois', de: 'Luxemburgisches Gesellschaftsrecht', en: 'Luxembourg company law', lb: null },
      { fr: 'Constitution de sociétés', de: 'Gesellschaftsgründung', en: 'Company formation', lb: null },
      { fr: 'Domiciliation de sociétés', de: 'Domizilierung von Gesellschaften', en: 'Company domiciliation', lb: null },
      { fr: 'Fiscalité internationale', de: 'Internationales Steuerrecht', en: 'International taxation', lb: null },
      { fr: 'Fusions et acquisitions', de: 'Fusionen und Übernahmen', en: 'Mergers and acquisitions', lb: null },
      { fr: 'Droit bancaire et financier', de: 'Bank- und Finanzrecht', en: 'Banking and finance law', lb: null },
    ],
  },

  // =========================================================================
  {
    id: 'successions',
    /** Zwei, drei Wörter für die Schnellleiste unter dem Hero.
     *  Sie müssen im Vorbeigehen lesbar sein — kein Satz, keine
     *  Fachsprache, nur die Tätigkeiten. */
    kurz: { fr: 'Successions transfrontalières', de: 'Nachlass über Grenzen', en: 'Cross-border estates', lb: null },
    ordre: 3,
    slug: { fr: 'successions', de: 'erbfolge', en: 'inheritance', lb: null },
    terme: { fr: 'Successions', de: 'Erbfolge', en: 'Inheritance', lb: null },
    definition: {
      fr: 'Régler une succession qui touche le Luxembourg et au moins un autre pays.',
      de: 'Einen Erbfall regeln, der Luxemburg und mindestens ein weiteres Land berührt.',
      en: 'Settling an estate that touches Luxembourg and at least one other country.',
      lb: null,
    },
    texte: {
      fr: 'Nous déterminons quelle loi s’applique à la succession, réunissons les pièces d’état civil de plusieurs pays et conduisons le partage, y compris lorsque les héritiers ne s’entendent pas. Quand un bien immobilier luxembourgeois entre dans une succession ouverte à l’étranger, nous faisons le lien avec le notaire et l’avocat de l’autre pays.',
      de: 'Wir klären, welches Recht auf den Erbfall anwendbar ist, tragen die Personenstandsurkunden aus mehreren Ländern zusammen und führen die Auseinandersetzung — auch dann, wenn die Erben sich nicht einig sind. Gehört eine luxemburgische Immobilie zu einem im Ausland eröffneten Nachlass, halten wir die Verbindung zum dortigen Notar und Anwalt.',
      en: 'We establish which law applies to the estate, gather civil status records from several countries and carry the division through, including where the heirs disagree. Where Luxembourg property forms part of an estate opened abroad, we keep the link to the notary and lawyer in the other country.',
      lb: null,
    },
    marge: {
      terme: { fr: 'Deux pays au moins', de: 'Mindestens zwei Länder', en: 'At least two countries', lb: null },
      texte: {
        fr: 'Presque chaque dossier de l’Étude.',
        de: 'Fast jedes Mandat der Kanzlei.',
        en: 'Almost every matter the firm handles.',
        lb: null,
      },
    },
    matieres: [
      { fr: 'Successions internationales', de: 'Internationales Erbrecht', en: 'International succession', lb: null },
      { fr: 'Successions luxembourgeoises', de: 'Luxemburgisches Erbrecht', en: 'Luxembourg succession law', lb: null },
    ],
  },

  // =========================================================================
  {
    id: 'creances-droits',
    /** Zwei, drei Wörter für die Schnellleiste unter dem Hero.
     *  Sie müssen im Vorbeigehen lesbar sein — kein Satz, keine
     *  Fachsprache, nur die Tätigkeiten. */
    kurz: { fr: 'Recouvrer, protéger', de: 'Eintreiben, schützen', en: 'Recovering, protecting', lb: null },
    ordre: 4,
    slug: {
      fr: 'creances-et-droits',
      de: 'forderungen-und-rechte',
      en: 'claims-and-rights',
      lb: null,
    },
    terme: {
      fr: 'Créances et droits',
      de: 'Forderungen und Rechte',
      en: 'Claims and rights',
      lb: null,
    },
    definition: {
      fr: 'Faire rentrer ce qui vous est dû, et protéger ce qui vous appartient.',
      de: 'Hereinholen, was Ihnen zusteht, und schützen, was Ihnen gehört.',
      en: 'Recovering what you are owed, and protecting what is yours.',
      lb: null,
    },
    texte: {
      fr: 'Nous recouvrons les créances de créanciers luxembourgeois auprès de débiteurs établis à l’étranger — à l’amiable, et devant les tribunaux lorsqu’il le faut. L’Étude représente au Luxembourg le groupe Intrum Justitia et la League International for Creditors, et dépose marques et brevets pour le Benelux et pour l’Europe.',
      de: 'Wir treiben Forderungen luxemburgischer Gläubiger gegen Schuldner im Ausland ein — außergerichtlich, und wenn nötig vor Gericht. Die Kanzlei vertritt Intrum Justitia und die League International for Creditors in Luxemburg und meldet Marken und Patente für Benelux und Europa an.',
      en: 'We recover the claims of Luxembourg creditors against debtors established abroad — out of court, and before the courts where necessary. The firm represents Intrum Justitia and the League International for Creditors in Luxembourg, and files trademarks and patents for Benelux and for Europe.',
      lb: null,
    },
    marge: {
      terme: {
        fr: 'Intrum Justitia · LIC',
        de: 'Intrum Justitia · LIC',
        en: 'Intrum Justitia · LIC',
        lb: null,
      },
      texte: {
        fr: 'Mandats de représentation au Luxembourg.',
        de: 'Vertretungsmandate in Luxemburg.',
        en: 'Representation mandates in Luxembourg.',
        lb: null,
      },
    },
    matieres: [
      { fr: 'Recouvrement de créances, amiable et judiciaire', de: 'Forderungseinzug, außergerichtlich und gerichtlich', en: 'Debt recovery, out of court and judicial', lb: null },
      { fr: 'Dépôt de marques et de brevets, Benelux et Europe', de: 'Marken- und Patentanmeldung, Benelux und Europa', en: 'Trademark and patent filing, Benelux and Europe', lb: null },
      { fr: 'Propriété intellectuelle et industrielle', de: 'Geistiges und gewerbliches Eigentum', en: 'Intellectual and industrial property', lb: null },
      { fr: 'Droit des assurances et de l’indemnisation', de: 'Versicherungs- und Entschädigungsrecht', en: 'Insurance and compensation law', lb: null },
      { fr: 'Droit civil et commercial', de: 'Zivil- und Handelsrecht', en: 'Civil and commercial law', lb: null },
      { fr: 'Droit de la responsabilité', de: 'Haftungsrecht', en: 'Liability law', lb: null },
    ],
  },
];

/** Zuordnung: welches Vorhaben der Matrix gehoert zu welchem Gebiet. */
export const PROJET_VERS_FAMILLE = {
  immobilier: 'immobilier-patrimoine',
  societe: 'societes-fiscalite',
  succession: 'successions',
  creance: 'creances-droits',
  marque: 'creances-droits',
  fiscalite: 'societes-fiscalite',
  litige: 'creances-droits',
};
