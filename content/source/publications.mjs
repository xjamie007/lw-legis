/**
 * content/source/publications.mjs — Fachdossiers und Konferenzen.
 *
 * Wortgetreu von der alten Website (cabinet-avocats-lorang.com) uebernommen.
 * DOSSIERS: Reihenfolge, Titel und Kurztext (`resume`) von der Uebersicht
 * cabinet-avocats-dossiers-thematiques-luxembourg.php bzw.
 * law-firm-thematic-files-luxembourg.php, der Fliesstext (`corps`) von der
 * jeweiligen Detailseite. `titre` ist die H1 der Detailseite; nur wo die H1
 * bloss ein SEO-Praefix ("Avocat au Luxembourg - ...") traegt, steht der
 * gleichbedeutende Titel der Uebersicht. Der zwoelfte Eintrag
 * (detention-actifs-immobiliers) steht nicht auf der Uebersicht, sondern wird
 * von der Konferenzseite verlinkt.
 *
 * CONFERENCES: Reihenfolge, Titel und Teaser von
 * conferences-avocat-avocat-lorang-luxembourg.php, danach die Konferenzen, die
 * nur auf der Startseite stehen (davon zwei dort auskommentiert). Eine
 * englische Konferenzseite gibt es nicht. `date` steht nur, wo die alte Seite
 * oder die Titelseite der PDF sie nennt.
 *
 * Nichts umformuliert, nichts uebersetzt; nur eindeutige Tippfehler
 * korrigiert. Fehlt eine englische Fassung, steht null. Die PDFs liegen unter
 * public/conferences/.
 */

export const THEMES = [
  {
    id: "societes",
    slug: {
      fr: "societes",
      en: "companies",
    },
    etiquette: {
      fr: "Sociétés",
      en: "Companies",
    },
  },
  {
    id: "fiscalite",
    slug: {
      fr: "fiscalite",
      en: "tax",
    },
    etiquette: {
      fr: "Fiscalité",
      en: "Tax",
    },
  },
  {
    id: "immobilier",
    slug: {
      fr: "immobilier",
      en: "real-estate",
    },
    etiquette: {
      fr: "Immobilier",
      en: "Real estate",
    },
  },
  {
    id: "patrimoine",
    slug: {
      fr: "patrimoine-et-successions",
      en: "wealth-and-inheritance",
    },
    etiquette: {
      fr: "Patrimoine et successions",
      en: "Wealth and inheritance",
    },
  },
  {
    id: "recouvrement",
    slug: {
      fr: "recouvrement-de-creances",
      en: "debt-collection",
    },
    etiquette: {
      fr: "Recouvrement de créances",
      en: "Debt collection",
    },
  },
  {
    id: "conformite",
    slug: {
      fr: "conformite-et-anti-blanchiment",
      en: "compliance-and-aml",
    },
    etiquette: {
      fr: "Conformité et anti-blanchiment",
      en: "Compliance and anti-money laundering",
    },
  },
  {
    id: "banque",
    slug: {
      fr: "banque-et-finance",
      en: "banking-and-finance",
    },
    etiquette: {
      fr: "Banque et finance",
      en: "Banking and finance",
    },
  },
];

export const DOSSIERS = [
  {
    id: "fiscalite-fonctionnaires-ue",
    ordre: 1,
    slug: {
      fr: "fiscalite-fonctionnaires-ue",
      en: null,
    },
    titre: {
      fr: "Fiscalité patrimoniale et successorale des fonctionnaires de l’Union européenne",
      en: null,
    },
    resume: {
      fr: "La fiscalité du patrimoine des fonctionnaires de l’Union européenne reste essentiellement nationale ...",
      en: null,
    },
    corps: {
      fr: "<p>Cadre européen général — 7 octobre 2026. Les pays concernés n’étant pas précisés, cette note expose les principes communs ; les taux, abattements et modalités déclaratives dépendent des législations nationales et des conventions fiscales applicables.</p><p>La fiscalité du patrimoine des fonctionnaires de l’Union européenne reste essentiellement nationale, avec une règle européenne déterminante de maintien du domicile fiscal. Les rémunérations versées par l’Union sont soumises à l’impôt européen et exonérées d’impôts nationaux. Cette exonération ne s’étend pas, de manière générale, aux revenus financiers, aux revenus locatifs ou aux successions.</p><h2>1. Le domicile fiscal : le rattachement déterminant</h2><h3>Le maintien du domicile fiscal antérieur à l’entrée en fonctions</h3><p>L’article 13 du protocole n° 7 sur les privilèges et immunités de l’Union européenne prévoit le maintien du domicile fiscal antérieur lorsque le fonctionnaire :</p><ol><li>possédait son domicile fiscal dans un État membre au moment de son entrée au service de l’Union ;</li><li>établit sa résidence dans un autre État membre ;</li><li>s’y installe uniquement en raison de ses fonctions européennes.</li></ol><p>Le fonctionnaire peut donc habiter effectivement dans un pays tout en demeurant fiscalement domicilié dans un autre. Ce maintien vaut pour l’imposition des revenus, de la fortune, des successions et pour l’application des conventions fiscales entre États membres.</p><p>Le critère est le domicile fiscal avant l’entrée en fonctions, et non la nationalité. Ainsi, un fonctionnaire fiscalement domicilié en France avant son recrutement, qui s’installe à Bruxelles pour ses fonctions, conserve en principe son domicile fiscal français. Il ne peut pas librement choisir le pays dont la fiscalité lui paraît la plus favorable : la Cour de justice a confirmé ce principe dans l’arrêt Gistö du 28 juillet 2011.</p><h3>La famille et le départ à la retraite</h3><p>Le mécanisme s’étend au conjoint sans activité professionnelle propre, ainsi qu’aux enfants à charge et sous la garde du fonctionnaire. La situation d’un conjoint qui a une activité professionnelle doit être examinée séparément.</p><p>À la retraite, le maintien fictif du domicile fiscal cesse. Le domicile doit alors être déterminé selon les règles ordinaires nationales et conventionnelles, en fonction de la situation réelle du pensionné. L’exonération nationale de la pension européenne subsiste, mais elle ne maintient pas à elle seule l’ancien domicile fiscal. Ce changement peut modifier sensiblement la fiscalité du patrimoine et de sa transmission.</p><h2>2. L’imposition des revenus financiers et locatifs</h2><h3>Le principe : une imposition nationale des revenus privés</h3><p>L’État du domicile fiscal conservé reste, en principe, compétent pour imposer les revenus autres que les rémunérations versées par l’Union, y compris les revenus étrangers, sous réserve des conventions fiscales. Le fonctionnaire relève donc du régime national applicable à ses placements et à ses biens immobiliers.</p><p>Les conventions fiscales organisent habituellement la répartition suivante :</p><ul><li><p><strong>Intérêts et dividendes</strong> : Imposition dans l’État du domicile fiscal ; une retenue à la source peut également exister dans l’État d’origine du revenu.</p></li><li><p><strong>Plus-values sur titres</strong> : Imposition généralement attribuée à l’État du domicile fiscal.</p></li><li><p><strong>Revenus locatifs</strong> : L’État où se situe l’immeuble dispose généralement du droit d’imposer les loyers.</p></li></ul><p>Ces orientations correspondent aux mécanismes usuels des conventions, notamment ceux du modèle OCDE. La convention effectivement applicable doit toujours être vérifiée : elle peut prévoir une exonération, un crédit d’impôt ou des dispositions particulières.</p><p>Pour un fonctionnaire conservant son domicile fiscal en France, par exemple, les revenus étrangers doivent être examinés au regard de la convention conclue entre la France et le pays d’origine du revenu. Un revenu exonéré d’impôt en France peut néanmoins devoir y être déclaré.</p><h3>Les prélèvements sociaux : une question distincte</h3><p>L’affiliation au régime social de l’Union peut faire obstacle à certains prélèvements nationaux sur les revenus du patrimoine. Dans l’arrêt de Lobkowicz, du 10 mai 2017, la Cour de justice a jugé incompatible avec le droit de l’Union l’assujettissement des revenus fonciers d’un fonctionnaire européen à des contributions affectées au financement de la sécurité sociale nationale.</p><p>Le traitement de ces prélèvements doit donc être vérifié selon le pays, l’année et leur affectation. Cette protection sociale spécifique n’emporte pas exonération générale de l’impôt sur les revenus patrimoniaux.</p><h2>3. L’imposition des successions</h2><h3>Le décès du fonctionnaire : une exonération limitée aux biens meubles dans l’État de séjour</h3><p>Lorsque le fonctionnaire bénéficie encore du maintien de domicile prévu par le protocole, ce domicile demeure pertinent pour les droits de succession. Il faut toutefois distinguer les catégories de biens :</p><ul><li><p><strong>Biens meubles situés dans l’État de séjour</strong> : Ils sont exonérés des droits de succession dans cet État et réputés situés dans l’État du domicile fiscal conservé.</p></li><li><p><strong>Biens immobiliers</strong> : Ils ne bénéficient pas de cette exonération spéciale. Leur imposition dépend des droits nationaux et de la convention successorale applicable.</p></li></ul><p>La règle concernant les biens meubles s’applique sous réserve des droits des États tiers et des conventions internationales. Elle impose donc de vérifier la qualification et la localisation fiscales des actifs, particulièrement pour les comptes, titres et participations.</p><p>L’exonération dans l’État de séjour laisse subsister les droits éventuellement dus dans l’État du domicile fiscal. Plus généralement, l’origine européenne des rémunérations ne crée pas une exonération successorale générale du patrimoine constitué : la Cour distingue l’impôt sur les rémunérations de celui qui frappe la transmission d’un actif au décès.</p><p>Pour les immeubles, plusieurs États peuvent intervenir. À titre d’illustration, la convention successorale franco-belge permet l’imposition dans l’État de situation de l’immeuble et prévoit, lorsque l’État du domicile impose également le bien, un mécanisme d’imputation de l’impôt acquitté dans l’autre État. Il faut donc consulter une convention couvrant les successions, et pas seulement celle relative aux revenus.</p><h3>Le fonctionnaire qui reçoit lui-même une succession</h3><p>La qualité de fonctionnaire européen ne dispense pas des droits normalement dus en tant qu’héritier. L’analyse tient notamment compte du domicile du défunt, de la localisation des biens et, dans certains pays, du domicile fiscal de l’héritier.</p><p>Ainsi, en France, l’article 750 ter du Code général des impôts peut soumettre à l’impôt des biens reçus à l’étranger par un héritier domicilié fiscalement en France, lorsqu’il y a été domicilié pendant au moins six des dix années précédant celle de la transmission, sous réserve des conventions applicables.</p><h3>Distinguer la loi civile de la fiscalité successorale</h3><p>Le règlement européen n° 650/2012 sur les successions exclut les matières fiscales. La loi civile qui détermine les héritiers et leurs droits peut donc différer du droit fiscal qui détermine les impôts dus.</p><p>Le choix, dans un testament, de la loi de sa nationalité pour organiser sa succession ne permet pas, à lui seul, de choisir le pays d’imposition.</p><h2>Informations nécessaires pour une analyse concrète</h2><p>Pour déterminer les impôts effectivement dus, les taux et les obligations déclaratives, il faut déterminer :</p><ul><li>Le pays du domicile fiscal au moment de l’entrée au service de l’Union.</li><li>Le pays de résidence actuelle et la situation d’activité ou de retraite.</li><li>La nature et les pays de localisation des placements et des immeubles.</li><li>Pour une succession, le domicile fiscal du défunt et des héritiers, ainsi que leurs liens de parenté.</li></ul><p><a href=\"/conferences/fiscalite-patrimoniale-successorale-luxembourg.pdf\">Télécharger la note technique en PDF</a></p>",
      en: null,
    },
    themes: ["fiscalite", "patrimoine"],
    ancienne_url: {
      fr: "avocat-fiscalite-patrimoniale-successorale-fonctionnaires-union-europeenne.php",
      en: null,
    },
  },
  {
    id: "droit-successions",
    ordre: 2,
    slug: {
      fr: "droit-des-successions",
      en: "inheritance-law",
    },
    titre: {
      fr: "Le droit des successions",
      en: "Inheritance law",
    },
    resume: {
      fr: "Un avocat spécialisé dans le droit des successions joue un rôle important dans la gestion et l’attribution d'un héritage après le décès d'une personne.",
      en: "A lawyer specialized in inheritance law plays a crucial role in the management and the granting of an inheritance after a person's death.",
    },
    corps: {
      fr: "<p>Un avocat spécialisé dans le droit des successions joue un rôle important dans la gestion et l’attribution d'un héritage après le décès d'une personne. Voici quelques-unes des fonctions qu'un avocat peut remplir dans ce domaine :</p><ol><li><p><strong>Le conseil juridique</strong> : L'avocat peut conseiller les héritiers ou les exécuteurs testamentaires sur les aspects légaux de la succession, y compris la compréhension du testament, s'il y en a un, ou des lois sur la succession en l'absence de testament. L’objectif est que les dernières volontés du défunt soient correctement exécutées.</p></li><li><p><strong>Le conseil sur les droits et obligations</strong> : L’avocat peut conseiller les héritiers ou les exécuteurs testamentaires sur leurs droits et obligations. Il peut également les guider dans le processus de distribution des biens et des actifs.</p></li><li><p><strong>La rédaction de documents</strong> : Il peut rédiger les documents nécessaires pour le règlement de la succession, tels que les demandes d'homologation du testament ou les documents nécessaires à la transmission des biens.</p></li><li><p><strong>Le règlement des litiges</strong> : Des conflits peuvent survenir entre les héritiers ou les exécuteurs testamentaires. L’avocat peut les représenter dans le cadre de ces litiges et tenter de parvenir à une résolution amiable ou, si nécessaire, les représenter devant les tribunaux.</p></li><li><p><strong>La gestion des dettes et impôts</strong> : Il aide à régler les dettes du défunt et à s'assurer que toutes les obligations fiscales sont remplies, y compris les déclarations de succession et les paiements d'impôts.</p></li><li><p><strong>Le conseil en planification successorale</strong> : Avant le décès, un avocat peut également aider une personne à planifier sa succession, y compris la rédaction de testaments, la création de fiducies, et autres stratégies pour minimiser la charge fiscale et faciliter la transmission du patrimoine.</p></li><li><p><strong>Le conseil en planification fiscale</strong> : Les successions peuvent être assujetties à des impôts importants. Un avocat peut vous conseiller sur la planification fiscale successorale, y compris sur la façon d'utiliser les exemptions et les crédits d'impôt pour réduire les impôts à payer.</p></li><li><p><strong>La gestion des actifs</strong> : Un avocat peut vous aider à gérer les actifs de la succession, y compris les biens immobiliers, les comptes bancaires et les investissements, jusqu'à ce qu'ils soient distribués aux héritiers.</p></li></ol><p>En résumé, un <strong>avocat spécialisé dans le droit des successions</strong> peut offrir des conseils juridiques et une assistance précieuse dans le cadre d’une succession, ce qui peut contribuer à réduire le stress et les complications liées à un processus souvent lourd et émotionnel.</p><h2>Droit des successions : Les droits du conjoint survivant en matière de successions</h2><p>Pendant longtemps, le conjoint survivant s’est retrouvé être relayé au rang de « parent pauvre » par les auteurs du Code civil. En effet, ces auteurs avaient pour volonté de voir les biens du de cujus rester au sein de sa famille. Il était ainsi impensable de voir ce patrimoine changer de main par la simple présence d’un conjoint survivant. La seule hypothèse où le conjoint survivant pouvait hériter de la succession de son conjoint décédé était en l’absence totale de parents au degré successoral.</p><p>Ainsi, les couples ont commencé à vouloir remédier à cette situation en instaurant des régimes matrimoniaux avant leur mariage qui seraient plus favorable au conjoint survivant en cas de décès de son conjoint. De nombreuses lois ont d’ailleurs été favorables à ces mécanismes. Elles sont le résultat d’une évolution des mœurs sur la question des droits du conjoint survivant en matière successorale.</p><p>Depuis 1979, une réforme est venue changer la donne puisqu’elle modifie la dévolution successorale et place désormais le conjoint survivant en 2ème position dans l’ordre successoral.</p><p>Le conjoint survivant fait face aux problématiques d’ordre successoral suivantes.</p><h2>Les droits du conjoint survivant en l’absence de descendants</h2><p>➝ Lorsque le de cujus ne possède pas d’enfants d’un premier lit ou d’enfants en commun avec le conjoint survivant, le régime est très favorable à ce dernier.<br>L’article 767-2 du Code civil et la loi du 26 avril 1976 posent le principe suivant : Le conjoint survivant hérite de la totalité de la propriété.</p><p>➝ Il est cependant important de souligner que l’application de l’article 767-2 est subordonnée à l’absence d’un régime matrimonial de séparations de corps qui exclut la communauté de vie et empêche le conjoint survivant de pouvoir hériter (Article 767 du Code civil).</p><p>➝ Si le de cujus a préparé sa succession par le biais d’un testament, il peut également faire obstacle à l’héritage du conjoint survivant. Le conjoint survivant n’est pas un héritier réservataire. Si le de cujus l’exclut de sa succession par testament, il ne peut s’y opposer.</p><h2>Les droits du conjoint survivant en présence de descendants communs</h2><p>➝ La présence d’enfants communs entre le conjoint survivant et le de cujus est l’hypothèse la plus fréquente en pratique. En l’absence de régime matrimonial spécifique tel que la communauté universelle, le régime légal offre deux options au conjoint survivant qui viendrait en concours avec les enfants communs. L’article 767-1 du Code civil nous les donne :</p><p><strong>- L’usufruit de l’immeuble habité en commun par les époux et des meubles le garnissant : L’immeuble concerné doit avoir été l’habitation du couple durant la vie du de cujus.</strong> Il est également nécessaire que le prémourant soit le propriétaire de l’immeuble ou qu’il en soit le co-propriétaire avec le conjoint survivant. Cet usufruit est considéré comme un usufruit viager puisqu’il ne durera que jusqu’au décès du conjoint concerné qui pourra en jouir et en récolter les fruits.</p><p>A noter qu’en cas de remariage du veuf ou de la veuve, les enfants peuvent s’opposer à la continuation de l’usufruit. Par une décision unanime, ils peuvent transformer cet usufruit en capital.</p><p><strong>- La part d’enfant légitime le moins prenant</strong> : Cette option est souvent choisie par les époux qui ne possèdent pas de propriété sur un immeuble. Cette part d’enfant légitime le moins prenant correspond à un pourcentage déterminé de la succession en pleine propriété et l’usufruit du surplus.</p><p>Cette part correspondra donc à celle de l’enfant recevant la plus faible part successorale légale. Exemple : En présence de deux enfants, la part réservataire de chacun d’eux est d’1/3.</p><p>Cette part correspond en tous les cas au minimum d’¼ de la succession.</p><p>➝ Il est ainsi d’usage de dire qu’il existe une réserve spéciale entre les époux. De ce fait, la présence du conjoint survivant modifie la part de la réserve héréditaire des enfants. D’ailleurs, la composition de cette réserve spéciale prendra également en compte l’existence de libéralités (donations ou legs) faites par le de cujus, de son vivant, à son époux. Ces libéralités vont nécessairement dépasser le taux légal de la réserve spéciale prévu à l’article 767-1 du Code civil. Il est ainsi possible que le conjoint survivant puisse posséder une part d’usufruit dans la réserve héréditaire des descendants qui seront de simples nus-propriétaires. Cependant, le législateur ne les estime pas comme lésés puisqu’au décès du conjoint survivant, leur réserve héréditaire sera respectée.</p><h2>La problématique du concours entre conjoint survivant<br>et enfants issus d’un premier lit</h2><p>Lorsque le couple s’est marié sous le régime de la communauté universelle et que l’un des conjoints possède des enfants issus d’une première union, la loi accorde une protection à ces enfants pour éviter des donations envers le conjoint qui les priveraient de leurs droits successoraux.</p><p>La communauté universelle permet aux époux de mettre en commun tous leurs biens possédés au jour du mariage et ceux qui adviendront au cours de celui-ci. Ainsi, en cas de décès de l’un des époux et sous couvert d’une clause d’attribution intégrale, l’intégralité de la communauté reviendra au conjoint survivant.</p><p>La succession du de cujus sera bien ouverte mais ne pourra être attribuée en faveur des enfants, faute d’actif resté dans la communauté. Les enfants sont donc lésés. Lorsqu’il y a des enfants issus d’un premier lit, ces derniers sont privés de la succession de leur parent par le jeu de la communauté universelle mais ne pourront pas hériter du conjoint survivant avec qui ils ne présentent aucun lien de filiation.</p><p>L’avantage matrimonial que possède le conjoint survivant soit la différence entre la valeur qu’il a recueilli par le régime matrimonial et ce que le régime légal lui aurait attribué le met en position avantageuse face aux enfants du de cujus.</p><p>Une solution permettant de rétablir l’équilibre</p><p>Il existe une solution est offerte aux enfants du premier lit afin de rétablir l’équilibre. Il s’agit de l’action en retranchement. Cette dernière va permettre aux enfants issus d’un premier lit d’obtenir la réduction de cet avantage matrimonial lorsqu’il dépasse la quotité disponible légale afin de retrouver leurs droits. Ils doivent intenter cette action dans un délai de 30 ans à compter du décès de leur parent remarié.</p>",
      en: "<p>A lawyer specialized in inheritance law plays a crucial role in the management and the granting of an inheritance after a person's death. Here are some of the functions that a lawyer can fulfil in this field :</p><ol><li><p><strong>Legal advice</strong> : The lawyer can advise heirs or executors on the legal aspects of the inheritance, including understanding the will, if there is one, or the laws of inheritance in the absence of a will. The goal is to ensure that the deceased's last wishes are correctly executed.</p></li><li><p><strong>Advice on rights and obligations</strong> : The lawyer can advise heirs or executors on their rights and obligations. He can also guide them through the process of distributing assets and property.</p></li><li><p><strong>Production of legal documents</strong> The lawyer can draft necessary documents for the settlement of the inheritance, such as probate applications or documents required for the transfer of assets.</p></li><li><p><strong>Dispute resolution</strong> : Conflicts may arise among heirs or executors. The lawyer can represent them in these disputes and try to reach an amicable resolution or, if necessary, represent them in court.</p></li><li><p><strong>Debt and tax management</strong> : The lawyer helps settle the deceased's debts and ensures that all tax obligations are fulfilled, including inheritance declarations and tax payments.</p></li><li><p><strong>Inheritance planning advice</strong> : Before death, a lawyer can assist a person in planning their inheritance, including writing wills, creating trusts, and other strategies to minimize taxes and facilitate the transfer of wealth.</p></li><li><p><strong>Tax planning advice</strong> : Inheritances may be subject to significant taxes. A lawyer can advise on inheritance tax planning, including how to use exemptions and tax credits to reduce taxes payable.</p></li><li><p><strong>Asset management</strong> : A lawyer can help manage inheritance assets, including real estate, bank accounts, and investments, until they are distributed to heirs.</p></li></ol><p>In summary, a <strong>lawyer specialized in inheritance law</strong> can provide legal advice and valuable assistance in the context of an inheritance, contributing to reducing the stress and complications often associated with this heavy and emotional process.</p><h2>Inheritance Law : Rights of the Surviving Partner in Inheritance</h2><p>For a long time, the surviving partner has been marginalized as the \"poor relation\" by the authors of the Civil Code. Indeed, these authors aimed to ensure that the deceased's assets remained within their family. Consequently, it was inconceivable for this inheritance to change hands simply due to the presence of a surviving partner. The only scenario in which the surviving partner could inherit from their deceased partner's estate was in the total absence of any relatives in the line of inheritance</p><p>As a result, couples began seeking remedies to this situation by establishing marital regimes before their marriage that would be more favorable to the surviving partner in the event of their partner's death. Many laws have indeed favored these mechanisms, reflecting an evolution in societal norms regarding the rights of the surviving partner in matters of inheritance.</p><p>Since 1979, a reform has changed the landscape by modifying the rules of inheritance, now placing the surviving partner in the second position in the order of inheritance.</p><p>The surviving partner faces the following inheritance-related issues:</p><h2>Rights of the Surviving Partner in the Absence of Descendants</h2><p>When the deceased has no children from a previous marriage or no children in common with the surviving partner, the regime is very favorable to the latter. Article 767-2 of the Civil Code and the Law of April 26, 1976, establish the following principle: The surviving partner inherits the entirety of the estate.</p><p>➝ However, it is important to note that the application of Article 767-2 is subject to the absence of a marital regime of legal separation, which excludes shared life and prevents the surviving partner from inheriting (Article 767 of the Civil Code).</p><p>➝ If the deceased prepared their inheritance through a will, they may also prevent the surviving partner from inheriting. The surviving partner is not a reserved heir. If the deceased excludes them from their inheritance by will, they cannot contest it.</p><h2>Rights of the Surviving Partner in the Presence of Common Descendants</h2><p>➝ The presence of common children between the surviving partner and the deceased is the most common scenario in practice. In the absence of a specific marital regime such as universal community property, the legal regime offers two options to the surviving partner in competition with the common children. Article 767-1 of the Civil Code provides them :</p><p><strong>- The usufruct of the property inhabited jointly by the partners and the movable property within it</strong> : The property concerned must have been the couple's residence during the deceased's lifetime. It is also necessary for the deceased to be the owner of the property or a co-owner with the surviving partner. This usufruct is considered a life usufruct since it lasts only until the death of the relevant partner, who can enjoy it and receive its benefits.</p><p>It is worth noting that in the event of the widower or widow's remarriage, the children can object to the continuation of the usufruct. By unanimous decision, they can convert this usufruct into a lump sum.</p><p><strong>- The share of the legitimate child taking the least</strong> : This option is often chosen by spouses who do not own property. This share of the legitimate child taking the least corresponds to a determined percentage of the estate in full ownership and the usufruct of the surplus.</p><p>This share will therefore correspond to that of the child receiving the smallest legal inheritance share. Example : In the presence of two children, each of their reserved shares is 1/3.</p><p>This share will in any case be at least ¼ of the estate.</p><p>➝ It is therefore customary to say that there is a special reserve between partners. As a result, the presence of the surviving partner modifies the portion of the children's legal reserve. Moreover, the composition of this special reserve will also take into account the existence of liberalities (gifts or bequests) made by the deceased during their lifetime to their partner. These liberalities will necessarily exceed the legal rate of the special reserve provided for in Article 767-1 of the Civil Code. It is thus possible for the surviving partner to have a usufruct share in the children's legal reserve, who will be mere bare owners. However, the legislator does not consider them disadvantaged since upon the surviving partner's death, their legal reserve will be respected.</p><h2>The Issue of Competition between the Surviving Partner and Children from a Previous Marriage</h2><p>When the couple married under the regime of universal community property and one of the partners has children from a previous marriage, the law grants protection to these children to prevent donations to the partner that would deprive them of their inheritance rights.</p><p>Universal community property allows partners to pool all their assets owned on the day of the marriage and those acquired during it. Thus, in the event of the death of one of the partners and under the cover of a full attribution clause, the entire community property will go to the surviving partner.</p><p>The deceased's estate will be open but cannot be awarded to the children due to the lack of assets remaining in the community. The children are therefore disadvantaged. When there are children from a previous marriage, they are deprived of their parent's inheritance through the mechanism of universal community property but cannot inherit from the surviving partner with whom they have no filial relationship.</p><p>The matrimonial advantage possessed by the surviving partner, being the difference between the value they received under the marital regime and what the legal regime would have attributed to them, puts them in an advantageous position against the deceased's children.</p><p>A Solution to Restore Balance</p><p>A solution is available to children from the first marriage to restore balance. This is the action for reduction. This action allows children from a first marriage to obtain a reduction of this matrimonial advantage when it exceeds the legal disposable portion in order to regain their rights. They must bring this action within a period of 30 years from the death of their remarried parent</p>",
    },
    themes: ["patrimoine"],
    ancienne_url: {
      fr: "avocat-luxembourg-le-droit-des-successions.php",
      en: "lawyer-luxembourg-inheritance-law.php",
    },
  },
  {
    id: "recouvrement-international",
    ordre: 3,
    slug: {
      fr: "recouvrement-international",
      en: "international-debt-collection",
    },
    titre: {
      fr: "Le recouvrement international",
      en: "International debt collection",
    },
    resume: {
      fr: "Le recouvrement des créances détenues par des luxembourgeois sur des débiteurs sis à l'étranger à partir du Luxembourg.",
      en: "Collection of debts owed by Luxembourg nationals to foreign debtors from Luxembourg.",
    },
    corps: {
      fr: "<h2>Le recouvrement des créances détenues par des luxembourgeois sur des débiteurs sis à l'étranger à partir du Luxembourg.</h2><p>Cas où le client de la société luxembourgeoise a son siège à l'étranger.<br>Nature de la prestation facturée<br>« Prestation de services, livraison de marchandises ».</p><p>Le Texte applicable pour déterminer la compétence juridictionnelle est le Règlement CE N° 44/2001.</p><h2>Compétence juridictionnelle - Principe général</h2><p>La compétence juridictionnelle est celle de l'État membre où le défendeur personne physique a son domicile. Pour les Sociétés, le domicile équivaut au siège statutaire.</p><p>Dans le cas d'une succursale de société, la compétence juridictionnelle est celle de son lieu d'établissement.</p><p>Compétences spéciales :</p><ul><li><strong>Matière délictuelle</strong> (par exemple un accident). C'est le lieu où s'est produit le fait dommageable.</li><li><strong>Pour les obligations alimentaires</strong>, c'est le lieu où le créancier d’aliments réside.</li><li><strong>En matière d'assurances</strong> (domicile de l’assureur / domicile du preneur-demandeur).</li><li><strong>Pour les immeubles</strong>, c'est également le lieu où le fait dommageable s'est produit.</li></ul><h2>Compétences spéciales du recouvrement</h2><p>Elles permettent de déroger à la compétence<br>de la loi du domicile du défendeur.</p><p><strong>Principe général :</strong></p><p>« Lieu d’exécution de l’obligation sur laquelle se fonde la demande de paiement, spécialement : Vente (lieu où les marchandises ont été livrées).</p><p><strong>Texte applicable</strong></p><ul><li>Règlement UE n1215/2012</li><li>Article 5</li><li>Les personnes domiciliées sur le territoire d'un État membre, ne peuvent être attraites devant les tribunaux d'un autre État membre qu'en vertu des règles énoncées aux sections 2 à 7 du présent chapitre.</li><li>Article 7</li><li>Travaux</li><li>Si les parties, sans considération de leur domicile, sont convenues d'une juridiction ou de juridictions d'un État membre pour connaître des différends nés ou à naître à l'occasion d'un rapport de droit déterminé, ces juridictions sont compétentes, sauf si la validité de la convention attributive de juridiction est entachée de nullité quant au fond selon le droit de cet Etat membre. Cette compétence est exclusive, sauf convention contraire des parties.</li><li>Non application de la section 4 du règlement:</li><li>Contrat non conclu par le client en sa qualité de consommateur</li><li>Article 25</li><li>La clause attributive de juridiction, pour être valable, doit être conclue soit par écrit, ou verbalement avec confirmation écrite, soit sous une forme qui soit conforme aux habitudes que les parties ont établi entre elles, soit dans le commerce international, sous une forme qui soit conforme aux usages dont les parties avaient connaissance ou étaient censées avoir connaissance et qui est largement connue et régulièrement observée dans ce type de commerce par les parties à des contrats du même type dans la branche commerciale considérée.</li></ul><h2>1) Il y a tout d'abord lieu de procéder à la signification du jugement luxembourgeois au débiteur<br>et d'attendre l'écoulement des délais de recours avant de pouvoir passer à l'exécution de la décision.</h2><p>Les mêmes règles que dans les procédures internes sont applicables sauf augmentation des délais en fonction de l'État de résidence du débiteur:</p><p>Dans le cas d'une signification à un débiteur domicilié sur le territoire de l'UE, le délai de recours est allongé de 15 jours.</p><p><strong>Attention</strong> :</p><p>Les délais courent à partir de l'accomplissement des formalités de signification à l'étranger et non à partir de la date de l'envoi recommandé postal au Luxembourg.</p><p>Comment est assurée la reconnaissance du jugement à l'étranger?</p><p><strong>Principe</strong> :</p><p>Les décisions rendues dans un État membre de l'UE sont reconnues dans les autres Etats membres sans qu'il soit nécessaire de recourir à aucune procédure (art.36).</p><p>Donc dispense de la procédure en reconnaissance ou exequatur.</p><p><strong>Attention</strong> :</p><p>Le règlement n'est applicable qu'aux actions judiciaires intentées, aux actes authentiques dressés ou enregistrés formellement et aux transactions judiciaires approuvées ou conclues à compter du 10 janvier 2015 (article 66).</p><p><strong>Formalités pratiques : documents à fournir en vue de la reconnaissance et/ou l'exécution.</strong> :</p><ul><li><strong>Le certificat</strong> délivré par le greffe de la juridiction d'origine (art 53). Ce document atteste que l'acte ou la décision a force exécutoire dans l'Etat d'origine.</li><li>Une <strong>copie authentifiée</strong> de la décision</li><li>A la demande de l'autorité de l'Etat requis une <strong>traduction de la décision</strong>.</li></ul><p>Le débiteur domicilié dans un autre Etat peut demander une traduction dans le but de contester la décision.</p><h2>2) Dans quelle mesure la reconnaissance du jugement luxembourgeois peut-elle être refusée</h2><ul><li><strong>En cas de décision par défaut</strong>, absence de signification en temps utile de manière à ce que le débiteur puisse se défendre. (incompatibilité avec l'obtention du certificat UE).</li><li><strong>Trouble manifeste</strong> à l'ordre public de l'état requis.</li><li><strong>Contrariété de jugement</strong>.</li><li><strong>Méconnaissance des règles de compétence spéciale</strong>. (Sans remise en cause des faits sur lesquels se base la décision quant à la compétence)</li></ul><p>En aucun cas l'affaire n'est rejugée sur le fond. Les cas d'ouverture de non-exécution sont très strictement limités et rarement d'application. Ils correspondent à des dysfonctionnements ou des anomalies.</p><h2>3) Comment exécuter la décision judiciaire?</h2><p><strong>Exemple</strong> : Exécution d’un arrêt de la Cour de Justice<br>de Luxembourg à l’étranger.</p><ul><li>Obtention de l’original de l’arrêt.</li><li>Transmission à l’huissier et signification de l’arrêt à la partie condamnée.</li><li>En cas de langue différente, traduction de la décision.</li><li>La décision est ensuite signifiée selon la procédure interne de l’Etat requis au défendeur.</li><li>Un certificat attestant la remise de l’exploit au demandeur dans l’Etat de résidence est ensuite joint au dossier. Il s’agit de l’attestation d’accomplissement des formalités de signification</li></ul><h2>4) Délais de recours</h2><p>Les délais sont toujours augmentés,<br>comme en matière d’assignation (article 167 du NPC) de:</p><ul><li><strong>15 jours</strong> pour les défendeurs qui demeurent dans un territoire situé en Europe d’un pays membre de l’Union Européenne ou de l’association européenne de libre-échange; Egalement pour Andorre, Gibraltar, Monaco, Saint-Marin, Vatican, Iles anglo-normandes, Féroé.</li><li><strong>25 jours</strong> les autres pays situés en Europe (sauf Turquie et Russie)</li><li><strong>35 jours</strong> pour les autres pays du monde.</li></ul><p>Attention, les délais courent à partir de la date d’accomplissement des formalités de signification par les autorités compétentes du domicile du débiteur et non pas à partir de la date d’envoi postale pour l’huissier.</p><p>Après l’écoulement des délais de recours, il y a lieu de déposer la procédure complète au greffe, qui a rendu la décision ainsi qu'un certificat signé de l’avocat constitué attestant que la décision n’a pas été frappée d’une voie de recours (certificat de non appel ou certificat de non cassation).</p><p>Le greffe de la juridiction qui a rendu la décision délivre le certificat fondé sur l’article 53 du règlement UE n° 1215/2012 permettant de donner à la décision son caractère exécutoire.</p>",
      en: "<h2>Collection of debts owed by Luxembourg nationals to foreign debtors from Luxembourg.</h2><p>Cases where customers of Luxembourg-based companies have their headquarters abroad. Nature of the service invoiced. Provision of services, delivery of goods</p><p>The applicable text for determining jurisdiction is EC Regulation No. 44/2001.</p><h2>Jurisdiction - General principle</h2><p>Jurisdiction lies with the Member State in which the defendant, a natural person, is domiciled. For companies, domicile is equivalent to the registered office.</p><p>In the case of a company branch, jurisdiction is that of its place of establishment.</p><p>Special jurisdiction :</p><ul><li><strong>Tort</strong> (e.g. accident). Jurisdiction lies with the place where the harmful event occurred.</li><li><strong>For maintenance obligations</strong>, it is the place where the maintenance creditor resides.</li><li><strong>In insurance matters</strong> (domicile of the insurer / domicile of the policyholder-claimant).</li><li><strong>For real estate</strong>, it is also the place where the harmful event occurred.</li></ul><h2>Special collection powers</h2><p>These make it possible to derogate from the jurisdiction of the law of the defendant's domicile.</p><p><strong>General principle :</strong></p><p>« Place of performance of the obligation on which the claim for payment is based, especially : Sale (place where the goods were delivered).</p><p><strong>Applicable text</strong></p><ul><li>EU Regulation N1215/2012</li><li>Article 5</li><li>Persons domiciled in a Member State may be sued in the courts of another Member State only in accordance with the rules set out in sections 2 to 7 of this chapter.</li><li>Article 7</li><li>Work</li><li>Where the parties, irrespective of their domicile, have agreed that a court or the courts of a Member State are to have jurisdiction to settle any disputes which have arisen or which may arise in connection with a particular legal relationship, such courts shall have jurisdiction unless the validity of the agreement conferring jurisdiction is null and void according to the law of that Member State. This jurisdiction is exclusive, unless otherwise agreed by the parties.</li><li>Non-application of section 4 of the regulation:</li><li>Contract not concluded by the customer as a consumer</li><li>Article 25</li><li>In order to be valid, a clause conferring jurisdiction must be concluded either in writing, or orally with written confirmation, or in a form which conforms to the habits which the parties have established between themselves, or in international trade, in a form which conforms to the usages of which the parties were aware or ought to have been aware and which is widely known and regularly observed in this type of trade by the parties to contracts of the same type in the branch of trade concerned.</li></ul><h2>1) First of all, it is necessary to serve the Luxembourg judgment on the debtor and wait until the time limit for appeal has elapsed before proceeding with enforcement.</h2><p>The same rules apply as in domestic proceedings, with the exception of longer time limits depending on the debtor's state of residence:</p><p>In the case of service on a debtor domiciled within the EU, the time limit for appeal is extended by 15 days.</p><p><strong>Please note</strong> :</p><p>Time limits run from the date service is effected abroad, not from the date the registered letter is sent by post to Luxembourg.</p><p>How is recognition of the judgment abroad ensured?</p><p><strong>Principle</strong> :</p><p>Judgments given in an EU member state are recognized in other member states without the need for any procedure (art.36).</p><p>Therefore, no recognition or exequatur procedure is required.</p><p><strong>Please note</strong> :</p><p>The regulation applies only to legal proceedings instituted, to authentic instruments formally drawn up or registered and to court settlements approved or concluded on or after January 10, 2015 (article 66).</p><p><strong>Practical formalities: documents to be provided for recognition and/or enforcement.</strong> :</p><ul><li><strong>The certificate</strong> issued by the registry of the court of origin (art 53). This document certifies that the deed or decision is enforceable in the State of origin.</li><li>An <strong>authenticated copy</strong> of the decision</li><li>At the request of the authority of the State addressed, a <strong>translation of the decision</strong>.</li></ul><p>A debtor domiciled in another state may request a translation in order to contest the decision.</p><h2>2) To what extent can recognition of the Luxembourg judgment be refused?</h2><ul><li><strong>In the case of a default judgment</strong>, failure to serve the judgment in sufficient time for the debtor to defend himself (incompatible with obtaining an EU certificate).</li><li><strong>Manifest disturbance</strong> of public order in the requested state.</li><li><strong>Contradiction of judgment</strong>.</li><li><strong>Disregard of special jurisdiction rules</strong>. (Without calling into question the facts on which the decision on jurisdiction is based)</li></ul><p>In no case is the case retried on its merits. Cases of non-execution are very strictly limited and rarely applied. They correspond to malfunctions or anomalies.</p><h2>3) How to enforce a judicial decision?</h2><p><strong>Example</strong> : Enforcing a judgment of the Luxembourg Court of Justice</p><ul><li>Obtain the original judgment.</li><li>Transmit the judgment to the bailiff and serve it on the convicted party.</li><li>In the event of a different language, translation of the decision.</li><li>The decision is then served on the defendant in accordance with the domestic procedure of the requested state.</li><li>A certificate attesting to delivery of the writ to the plaintiff in the State of residence is then attached to the file. This is the certificate of completion of service formalities.</li></ul><h2>4) Appeal deadlines</h2><p>Time limits are always increased,<br>as for writs of summons (article 167 of the NPC) by:</p><ul><li><strong>15 days</strong> for defendants residing in the European territory of a member state of the European Union or the European Free Trade Association; also for Andorra, Gibraltar, Monaco, San Marino, Vatican, Channel Islands, Faroe Islands.</li><li><strong>25 days</strong> other European countries (excluding Turkey and Russia)</li><li><strong>35 days</strong> for other countries.</li></ul><p>Please note that time limits run from the date of service by the competent authorities in the debtor's place of residence, and not from the date of mailing by the bailiff.</p><p>Once the time limits for appeal have elapsed, the complete proceedings must be filed with the court clerk's office that issued the decision, together with a certificate signed by the lawyer appointed to certify that the decision has not been appealed (certificat de non appel ou certificat de non cassation).</p><p>The clerk's office of the court that handed down the decision issues the certificate based on article 53 of EU regulation no. 1215/2012, making the decision enforceable.</p>",
    },
    themes: ["recouvrement"],
    ancienne_url: {
      fr: "avocat-recouvrement-creances-internationales-au-luxembourg.php",
      en: "international-debt-recovery-lawyer-in-luxembourg.php",
    },
  },
  {
    id: "rendement-locatif",
    ordre: 4,
    slug: {
      fr: "calcul-rendement-locatif",
      en: "rental-yield-calculation",
    },
    titre: {
      fr: "Le calcul du rendement locatif en droit luxembourgeois",
      en: "Calculating rental yields under luxembourg law",
    },
    resume: {
      fr: "Le rendement brut correspond au montant total du loyer versé par le locataire au bailleur ...",
      en: "Gross yield is the total amount of rent paid by the tenant to the landlord.",
    },
    corps: {
      fr: "<h2>Définition du rendement locatif</h2><p><strong>Le rendement brut</strong> correspond au montant total du loyer versé par le locataire au bailleur.</p><p><strong>Le rendement net</strong> est défini par le solde obtenu après déduction des différents frais d'obtention : charges, intérêts et amortissements.</p><h2>Le montant maximum légal du rendement brut locatif au Luxembourg</h2><p>Ce plafond concerne les locations à des fins d'habitation. <strong>Les loyers commerciaux sont libres.</strong></p><p>Aux termes de la loi du 21 septembre 2006 article trois :</p><p>La <strong>location d'un logement</strong> à usage d'habitation ne peut rapporter au bailleur un revenu annuel dépassant un taux de 5 % du capital investi dans le logement.</p><p>Ex : pour un logement pour lequel le bailleur a investi 1.000.000 € le loyer annuel ne peut légalement dépasser la somme de 50.000 €.</p><h2>Définition du capital investi</h2><p>En cas d'aliénation à titre onéreux, le <strong>prix d'acquisition</strong> indiqué dans l'acte authentique translatif de propriété, et les <strong>frais de l'acte</strong>, sont présumés correspondre au jour de la signature de l'acte au capital investi, réévalué et décoté.</p><p>Le texte a pour conséquence qu'en cas de <strong>vente de l'immeuble</strong> qu'il occupe le locataire pourra se voir réclamer par le nouveau propriétaire un <strong>loyer réévalué</strong> en fonction du prix figurant dans l'acte d'acquisition.</p><p>S'il n'est pas possible de déterminer le <strong>capital investi</strong> celui-ci peut en cas de désaccord être déterminé par un expert qui procédera à l'évaluation du capital investi.</p><p>En cas de contestation, la <strong>commission des loyers</strong> peut déterminer le capital investi compte-tenu de la valeur du terrain, du volume de l'immeuble loué, de sa surface, de la finition du logement.</p><h2>Calcul du rendement locatif net au Luxembourg</h2><p>Du rendement locatif brut sont déduits les postes suivants :</p><ul><li>Amortissement de l'immeuble (hors valeur terrain)</li><li>Taxe foncière</li><li>Frais d'obtention et charges</li><li>Assurances</li><li>Travaux</li></ul><p>Le solde obtenu constitue le montant<br>du revenu locatif avant soumission à l'impôt.</p><h2>EXEMPLE de CALCUL (RENDEMENT LOCATIF IMMOBILIER)</h2><p>❖ Appartement de + 60 ans :</p><ul><li>Prix d’acquisition : 280 000,00 €</li><li>Financé avec crédit de 80 %</li><li>Frais d’acte :</li></ul><ul><li>Droits d’enregistrement</li><li>Frais de Notaire</li></ul><table><tbody><tr><td>Frais pour convention de crédit avec hypothèque</td><td>21 728,00 €</td></tr><tr><td>TOTAL</td><td>301 728,00 €</td></tr></tbody></table><table><tbody><tr><td>Prix construction (280 000 X 80%)</td><td>224 000,00 €</td></tr><tr><td>Prix terrain</td><td>56 000,00 €</td></tr><tr><td>Amortissement (224 000 + 17 382)</td><td>7 241,00 €</td></tr><tr><td>241 382,00 X 3%</td><td></td></tr><tr><td>Revenu locatif</td><td>15 000,00 €</td></tr><tr><td>Brut (5%)</td><td></td></tr></tbody></table><table><tbody><tr><td>Amortissement</td><td>-7 241,00 €</td></tr><tr><td>Intérêts</td><td>-4 075,94 €</td></tr><tr><td>Taxe foncière</td><td>30,90 €</td></tr><tr><td>Travaux</td><td>- 1 278,00 €</td></tr><tr><td>Assurances</td><td>166,00 €</td></tr><tr><td>Loyer imposable</td><td>2 208,16 €</td></tr></tbody></table>",
      en: "<h2>Definition of rental yield</h2><p><strong>Gross yield</strong> is the total amount of rent paid by the tenant to the landlord.</p><p><strong>The net yield</strong> is defined as the balance obtained after deduction of the various costs of obtaining the property: charges, interest and depreciation.</p><h2>The legal maximum gross rental yield in Luxembourg</h2><p>This ceiling applies to residential rentals. <strong>Commercial rents are unrestricted.</strong></p><p>Under the terms of the law of September 21, 2006, article three:</p><p>The <strong>rental of a dwelling</strong> for residential use may not earn the lessor an annual income exceeding a rate of 5% of the capital invested in the dwelling.</p><p>E.g.: for a property in which the lessor has invested €1,000,000, the annual rent cannot legally exceed €50,000.</p><h2>Definition of capital invested</h2><p>In the event of a sale for valuable consideration, the <strong>purchase price</strong> indicated in the deed of transfer of ownership, and the <strong>costs of the deed</strong>, are presumed to correspond on the day the deed is signed to the capital invested, revalued and discounted.</p><p>As a result, in the event of the sale of the <strong>building the tenant occupies</strong>, the new owner may claim rent revalued in line with the <strong>price stated in the deed of purchase</strong>.</p><p>If it is not possible to determine the <strong>capital invested</strong>, this may, in the event of disagreement, be determined by an expert who will evaluate the capital invested.</p><p>In the event of a dispute, the <strong>rental commission</strong> can determine the capital invested, taking into account the value of the land, the volume of the rented property, its surface area and the finish of the accommodation.</p><h2>Calculating net rental yield in Luxembourg</h2><p>The following items are deducted from the gross rental yield:</p><ul><li>Building depreciation (excluding land value)</li><li>Property tax</li><li>Obtaining fees and charges</li><li>Insurance</li><li>Work</li></ul><p>The resulting balance represents the amount<br>rental income before tax.</p><h2>CALCULATION EXAMPLE (REAL ESTATE RENTAL INCOME)</h2><p>❖ Apartment over 60 years old :</p><ul><li>Purchase price: €280,000.00</li><li>Financed with 80% credit</li><li>Deed costs :</li></ul><ul><li>Registration fees</li><li>Notary fees</li></ul><table><tbody><tr><td>Expenses for credit agreement with mortgage</td><td>21,728.00 €</td></tr><tr><td>TOTAL</td><td>301,728.00€</td></tr></tbody></table><table><tbody><tr><td>Construction price (280,000 X 80%)</td><td>224 000,00 €</td></tr><tr><td>Land price</td><td>56 000,00 €</td></tr><tr><td>Amortization (224,000 + 17,382)</td><td>7 241,00 €</td></tr><tr><td>241 382,00 X 3%</td><td></td></tr><tr><td>Rental income</td><td>15 000,00 €</td></tr><tr><td>Gross (5%)</td><td></td></tr></tbody></table><table><tbody><tr><td>Amortization</td><td>-7 241,00 €</td></tr><tr><td>Interest</td><td>-4 075,94 €</td></tr><tr><td>Property tax</td><td>30,90 €</td></tr><tr><td>Work</td><td>- 1 278,00 €</td></tr><tr><td>Insurance</td><td>166,00 €</td></tr><tr><td>Taxable rent</td><td>2 208,16 €</td></tr></tbody></table>",
    },
    themes: ["immobilier"],
    ancienne_url: {
      fr: "avocat-calcul-rendement-locatif-droit-luxembourg.php",
      en: "lawyer-calculating-rental-yield-law-luxembourg.php",
    },
  },
  {
    id: "soparfi",
    ordre: 5,
    slug: {
      fr: "constitution-soparfi",
      en: "soparfi-incorporation",
    },
    titre: {
      fr: "La Constitution SOPARFI au Luxembourg",
      en: "The SOPARFI constitution in Luxembourg",
    },
    resume: {
      fr: "La société à participations financières ne revêt pas juridiquement une forme particulière sociétaire...",
      en: "The société à participations financières does not legally take any particular corporate form.",
    },
    corps: {
      fr: "<p>La société à participations financières ne revêt pas juridiquement une forme particulière sociétaire.</p><p>Elle est constituée sous forme de SA ou SARL ou sous toute autre forme de société de capitaux.</p><p>L'objet de la société peut être la simple détention de participations dans d'autres sociétés, mais aussi la gestion de licences et de brevets, la gestion d'emprunts obligataires accordés à des sociétés filiales.</p><p>Elle est autorisée à exercer une activité commerciale à la différence de la société HOLDING, (Loi 1929) ou de la société de patrimoine familial (SPF).</p><h2>Traitement fiscal</h2><p>Les dividendes perçus par la SOPARFI et provenant des participations qu'elle détient dans des sociétés de capitaux résidentes ou non résidentes sont exonérés de la retenue à la source sous certaines conditions.</p><p>La SOPARFI détient une participation de 10% au moins dans le capital de la filiale ou d'une valorisation d'un minimum de 1.2 million d'euros.</p><p>La société filiale est une société résidente ou étrangère située dans un Etat de l'Union Européenne.</p><p>La SOPARFI doit détenir sa participation pendant une durée de 12 mois ou s'engager à détenir cette participation pendant la même période.</p><h2>Dividendes payés par la SOPARFI à une société mère</h2><p>Les dividendes versés à une société mère sont exonérés de retenue à la source si la société mère bénéficiaire est une société de capitaux résidente pleinement imposable ou située dans un Etat avec lequel le Grand Duché a conclu une convention tendant à éviter les doubles impositions (voir convention internationale).</p><p>Les plus-values de cession de participations dans les filiales répondant aux conditions ci-dessus sont exonérées si la SOPARFI détient au moins 15% du capital.</p><p>Le boni de liquidation versé aux actionnaires ou associés de la SOPARFI suite à sa dissolution de liquidation est exonéré.</p><p>De même le boni de liquidation payé à la SOPARFI lors de la liquidation d'une filiale n'est pas soumis à imposition.</p><h2>Autres activités</h2><p>En cas d'activités connexes à la détention de participations, notamment commerciales, celles-ci sont imposables pour cette part à l'impôt sur les sociétés et soumises à la TVA.</p>",
      en: "<p>The société à participations financières does not legally take any particular corporate form.</p><p>It is incorporated in the form of an SA or SARL, or in any other form of capital company.</p><p>The purpose of the company may be simply to hold equity interests in other companies, but also to manage licenses and patents, and to manage bond loans granted to subsidiary companies.</p><p>Unlike the HOLDING company (Law 1929) or the Société de Patrimoine Familial (SPF), it is authorized to carry on a commercial activity.</p><h2>Tax treatment</h2><p>Dividends received by the SOPARFI from holdings in resident or non-resident companies are exempt from withholding tax under certain conditions.</p><p>The SOPARFI holds at least 10% of the capital of the subsidiary, or a minimum value of 1.2 million euros.</p><p>The subsidiary is a resident or foreign company located in a European Union country.</p><p>The SOPARFI must hold the shareholding for a period of 12 months, or undertake to hold it for the same period.</p><h2>Dividends paid by the SOPARFI to a parent company</h2><p>Dividends paid to a parent company are exempt from withholding tax if the parent company is a fully taxable resident company or is located in a country with which the Grand Duchy has concluded a double taxation treaty (see international treaty).</p><p>Capital gains on the sale of shareholdings in subsidiaries meeting the above conditions are exempt if the SOPARFI holds at least 15% of the capital.</p><p>The liquidation bonus paid to shareholders or associates of the SOPARFI following its dissolution or liquidation is exempt.</p><p>Similarly, liquidation surpluses paid to the SOPARFI on the liquidation of a subsidiary are not subject to tax.</p><h2>Other activities</h2><p>Any activities related to the holding of equity interests, particularly commercial activities, are subject to corporate income tax and VAT.</p>",
    },
    themes: ["societes", "fiscalite"],
    ancienne_url: {
      fr: "avocat-constitution-societe-participations-financieres-luxembourg.php",
      en: "lawyer-the-soparfi-constitution-in-luxembourg.php",
    },
  },
  {
    id: "spf",
    ordre: 6,
    slug: {
      fr: "societe-patrimoine-familial",
      en: "family-wealth-company",
    },
    titre: {
      fr: "SPF - Société de patrimoine familial - Luxembourg",
      en: "SPF - Société de patrimoine familial - Luxembourg",
    },
    resume: {
      fr: "SPF a pour objet de créer un cadre juridique pour la gestion des patrimoines privés...",
      en: "The purpose of the SPF is to create a legal framework for the management of private assets...",
    },
    corps: {
      fr: "<p>- Forme de la société : SA, SARL, SCA, COOPSA.</p><h2>Activités autorisées</h2><ul><li>la détention, l’acquisition, la gestion et réalisation d’actifs financiers tels que les actions, les obligations, fonds de titrisation, comptes à terme, SICAV…</li><li>de plus la SPF est autorisée à émettre des valeurs mobilières, de s’endetter auprès de ses actionnaires ou des tiers.</li></ul><h2>Activités interdites</h2><ul><li>l'exercice d'une quelconque activité commerciale.</li><li>la détention d'immeubles par la SPF que cela soit directement ou indirectement à travers d'autres sociétés.</li><li>l'octroi de prêts rémunérés à des tiers ou même à des sociétés dans lesquelles la SPF détient des participations.(les prêts à titre accessoire et gratuit sont cependant autorisés dans le dernier cas).</li></ul><h2>Actionnaires de la SPF</h2><ul><li>Peuvent être des personnes physiques, qu’elles soient ou non résidentes.</li><li>Les actionnaires de la SPF peuvent être également des entités dites patrimoniales qu’elles soient ou non résidentes et agissant dans le cadre de la gestion de patrimoine privé.</li></ul><p>- Contrôle de la SPF par l’administration de l’enregistrement et des domaines<br>- Traitement fiscal de la SPF</p><h2>Impositions liées à sa constitution</h2><ul><li>Droit d’apport/ aboli depuis le 1er janvier 2009</li><li>Taxe d’abonnement : la base taxable sera constituée par le capital libéré , les dettes ainsi que la prime d’émission. La taxe est payable par trimestre. Le taux annuel est de 0.25% mais avec un minimum de 100 euros et un maximum de 125 000 euros.</li></ul><p>- Imposition sur les produits et les dividendes , bénéfices ou tous autres produits perçus par la SPF.<br>- Imposition sur la plus value réalisée lors de la cession des actions de la SPF : elle sera fonction du statut de l’actionnaire :</p><ul><li>Si celui-ci est résident luxembourgeois, il sera soumis à une imposition</li><li>Dans le cas contraire, il bénéficiera d’une exonération</li></ul><h2>Traitement fiscal de la SPF</h2><ul><li>Impôt sur la fortune : la SPF n’est pas soumise à l’impôt sur la fortune</li><li>Taxe sur la valeur ajoutée : la SPF n’est pas assujettie à la TVA</li><li>La SPF ne bénéficie pas des traités contre la double imposition ni des directives communautaires (directive 90/435/CEE)</li></ul><h2>Traitement fiscal des revenus reçus de la SPF</h2><ul><li>Impôt sur la fortune : la SPF n’est pas soumise à l’impôt sur la fortune</li></ul><p>- Actionnaires résidents luxembourgeois : pas de retenue à la source mais une imposition à l’impôt local sur le revenu des personnes physiques (charge d’impôt 30.38% à partir de € 15.000)<br>- Actionnaires non résidents luxembourgeois : pas de retenue à la source.</p><p>L’imposition des revenus de la SPF relèvera de l’exclusive compétence de leur état de résidence.</p><ul><li>Sur les intérêts versés sur les avances et dettes de la SPF envers les personnes physiques :</li></ul><p>- Actionnaires sont des résidents luxembourgeois : retenue à la source libératoire de 10%<br>- Actionnaires sont non résidents : retenue à la source de 15%</p>",
      en: "<p>- Company form: SA, SARL, SCA, COOPSA.</p><h2>Authorized activities</h2><ul><li>holding, acquisition, management and realization of financial assets such as shares, bonds, securitization funds, term accounts, SICAV...</li><li>in addition, the SPF is authorized to issue securities and to borrow from its shareholders or third parties.</li></ul><h2>Prohibited activities</h2><ul><li>the exercise of any commercial activity.</li><li>ownership of real estate by the SPF, either directly or indirectly through other companies.</li><li>the granting of interest-bearing loans to third parties or even to companies in which the SPF holds a stake (in the latter case, however, loans on an ancillary basis and free of charge are permitted).</li></ul><h2>SPF shareholders</h2><ul><li>Individuals, whether resident or non-resident.</li><li>SPF shareholders may also be “patrimonial” entities, whether resident or non-resident, acting in the context of private wealth management.</li></ul><p>- Control of the SPF by the Registration and Domains Administration<br>- Tax treatment of SPFs</p><h2>Taxes related to its incorporation</h2><ul><li>Capital duty/ abolished on January 1, 2009</li><li>Subscription tax: the tax base is made up of the paid-up capital, debts and share premium. The tax is payable quarterly. The annual rate is 0.25%, with a minimum of 100 euros and a maximum of 125,000 euros.</li></ul><p>- Tax on income and dividends, profits or any other income received by the SPF.<br>- Taxation on capital gains realized on the sale of SPF shares: this depends on the shareholder's status:</p><ul><li>If the shareholder is a Luxembourg resident, he or she will be subject to tax.</li><li>If they are not, they will be exempt.</li></ul><h2>Tax treatment of the SPF</h2><ul><li>Wealth tax: the SPF is not subject to wealth tax.</li><li>Value-added tax: the SPF is not subject to VAT.</li><li>The SPF does not benefit from double taxation treaties or EU directives (Directive 90/435/EEC).</li></ul><h2>Tax treatment of income received from the SPF</h2><ul><li>Wealth tax: the SPF is not subject to wealth tax.</li></ul><p>- Luxembourg resident shareholders: no withholding tax, but subject to local personal income tax (tax charge 30.38% from € 15,000).<br>- Non-Luxembourg resident shareholders: no withholding tax.</p><p>Taxation of SPF income will be the exclusive responsibility of their state of residence.</p><ul><li>On interest paid on SPF advances and debts to individuals:</li></ul><p>- Shareholders resident in Luxembourg: withholding tax of 10%.<br>- Non-resident shareholders: withholding tax of 15%.</p>",
    },
    themes: ["societes", "patrimoine"],
    ancienne_url: {
      fr: "avocat-societe-patrimoine-familiale-luxembourg.php",
      en: "lawyer-family-wealth-company-luxembourg.php",
    },
  },
  {
    id: "exonerations-propriete-intellectuelle",
    ordre: 7,
    slug: {
      fr: "exonerations-fiscales-propriete-intellectuelle",
      en: "ip-tax-exemptions",
    },
    titre: {
      fr: "Exonérations fiscales en matière de droit de propriété industrielle et intellectuelle au Luxembourg",
      en: "Tax exemptions for industrial and intellectual property rights in Luxembourg",
    },
    resume: {
      fr: "Les sociétés luxembourgeoises sont exonérées à hauteur de 80% d’imposition, des revenus retirés de la concession (licence) ...",
      en: "Tax exemptions for industrial and intellectual property rights in Luxembourg",
    },
    corps: {
      fr: "<h2>Base légale</h2><p>La Possibilité d’une exonération partielle est prévue en vertu de l’article 50 ter de la loi sur l’impôt sur le revenu.</p><h2>Actif éligible</h2><p>L’actif est éligible à une demande d’exonération doit consister en un brevet, certificat complémentaire de protection, modèle d’utilité, médicaments orphelins, droits d’auteur sur un logiciel informatique, certificat d’obtention végétale ou autre type d’actifs constituant une œuvre originale.</p><h2>Activités de recherche</h2><p>Des données concernant les activités de recherche et développement en rapport avec la constitution, le développement ou l’amélioration de l’actif éligible doivent être apportées à l’administration.</p><h2>Exemple</h2><p>Le droit d’auteur sur des logiciels informatiques doit constituer une œuvre originale.<br>L’appréciation de ce caractère passe par l’analyse du code source ( instructions écrites dans un langage de programmation informatique compréhensible).<br>Le droit d’auteur naît du simple fait de la création de l’œuvre ainsi que du logiciel informatique.</p><h2>Indications concernant l’office d’enregistrement</h2><p>Dans le cadre de la demande d’exonération, il y a lieu de fournir des informations concernant la date de dépôt de l’enregistrement, le nom de l’organisme, la date de délivrance et sa durée et les références (numéro) du dépôt.</p><p>Détermination des dépenses de recherche développement en rapport avec la Constitution, le développement ou l’amélioration de l’actif éligible.</p><p>Ces éléments doivent permettre de déterminer par exercice les dépenses éligibles et les coûts d’acquisition.</p><p>Détermination de la fraction du revenu net éligible susceptible de bénéficier de l’exonération partielle.</p><p>Ce calcul se fait en multipliant par 130 % les dépenses éligibles et en divisant le nombre obtenu par le chiffre des dépenses totales.</p><h2>Montant exonéré</h2><p>Une fois le revenu net déterminé, le résultat est exonéré d’impôt à hauteur de 80%.</p>",
      en: "<h2>Legal basis</h2><p>The possibility of a partial exemption is provided for under article 50 ter of the income tax law.</p><h2>Eligible assets</h2><p>Assets eligible for exemption must be patents, supplementary protection certificates, utility models, orphan drugs, copyrights to computer software, plant breeders' rights or other assets constituting an original work.</p><h2>Research activities</h2><p>Data concerning research and development activities relating to the creation, development or improvement of the eligible asset must be provided to the administration.</p><h2>Example</h2><p>Copyright in computer software must constitute an original work.<br>This is assessed by analyzing the source code (instructions written in an understandable computer programming language).<br>Copyright arises from the simple fact of creating the work and the computer software.</p><h2>Information on the registration office</h2><p>When applying for a tax exemption, it is necessary to provide information on the date of filing of the registration, the name of the organization, the date of issue and its duration, and the references (number) of the filing.</p><p>Determination of research and development expenditure relating to the constitution, development or improvement of the eligible asset.</p><p>This information must make it possible to determine eligible expenses and acquisition costs for each financial year.</p><p>Determination of the fraction of net income eligible for partial exemption.</p><p>This is calculated by multiplying eligible expenditure by 130% and dividing the resulting figure by total expenditure.</p><h2>Exempt amount</h2><p>Once the net income has been determined, the result is 80% tax-exempt.</p>",
    },
    themes: ["fiscalite", "societes"],
    ancienne_url: {
      fr: "avocat-exonerations-fiscales-droit-propriete-luxembourg.php",
      en: "lawyer-tax-exemptions-for-industrial-and-intellectual-property-rights-in-luxembourg.php",
    },
  },
  {
    id: "constituer-dossier-recouvrement",
    ordre: 8,
    slug: {
      fr: "constituer-dossier-recouvrement",
      en: "debt-collection-file",
    },
    titre: {
      fr: "Constituer un dossier de recouvrement de créance sur le Luxembourg",
      en: "Setting up a debt collection file in Luxembourg",
    },
    resume: {
      fr: "La principale difficulté est l’obtention d’information sur la situation financière du débiteur s’il s’agit une personne physique...",
      en: "The main difficulty is obtaining information on the financial situation of the debtor if it is a natural person...",
    },
    corps: {
      fr: "<p>La principale difficulté est l’obtention d’information sur la situation financière du débiteur s’il s’agit une personne physique, cela nécessite l’intervention d’un Juge qui autorise les requêtes qui peuvent être envoyées à la sécurité sociale pour obtenir l’identité des employeurs des débiteurs.</p><p>Pour une personne morale, la procédure d’obtention des bilans passe par une demande au registre du commerce et est relativement lente.</p><p>Les adresses de sociétés sont vérifiées auprès du registre de commerce et des sociétés et celles des personnes physiques, auprès des différentes administrations communales.</p><h2>Concernant les recommandations à apporter :</h2><p>Je suggère que pour les créances à l’encontre de <strong>sociétés</strong>, la décision d’engager une procédure, dans l’hypothèse où celle-ci est bien active, doit être prise <strong>rapidement</strong>.</p><p>J’attire votre attention sur le fait qu’il est toujours plus facile de recouvrer une créance sur une société encore en activité que sur une société mise en faillite.</p><p>Les délais de prescription :</p><ul><li>En matière commerciale : 10 ans</li><li>En matière de transport : 1 an</li><li>Marchands à non marchands : 1 an</li></ul><h2>Recommandations pour le traitement des dossiers :</h2><ul><li>Copie des factures</li><li>Copie des bons de commande si possibles</li><li>Copie des rappels avec preuve des recommandés le cas échéant</li><li>Copie des courriers du débiteur notamment si la dette est reconnue ou contestée</li></ul>",
      en: "<p>The main difficulty is obtaining information on the debtor's financial situation. If the debtor is a natural person, this requires the intervention of a judge, who authorises requests that can be sent to the social security authorities to obtain the identity of the debtor's employers.</p><p>For a legal entity, the procedure for obtaining balance sheets involves an application to the commercial register and is relatively slow.</p><p>Company addresses are checked with the Trade and Companies Register and those of individuals with the various local authorities.</p><h2>Regarding recommendations :</h2><p>I suggest that for claims against <strong>companies</strong>, the decision to initiate proceedings, assuming they are indeed active, should be taken <strong>quickly</strong>.</p><p>I would draw your attention to the fact that it is always easier to recover a debt from a company that is still in business than from a company that has gone bankrupt.</p><p>Limitation periods :</p><ul><li>In commercial matters: 10 years</li><li>Transport: 1 year</li><li>Merchant to non-merchant: 1 year</li></ul><h2>Recommendations for processing files :</h2><ul><li>Copies of invoices</li><li>Copies of purchase orders if possible</li><li>Copies of reminders with proof of registered mail if applicable</li><li>Copies of letters from the debtor, particularly if the debt is recognised or disputed</li></ul>",
    },
    themes: ["recouvrement"],
    ancienne_url: {
      fr: "avocat-constituer-recouvrement-creance-luxembourg.php",
      en: "lawyer-establish-debt-recovery-luxembourg.php",
    },
  },
  {
    id: "recouvrement-creances",
    ordre: 9,
    slug: {
      fr: "recouvrement-de-creances",
      en: "debt-collection",
    },
    titre: {
      fr: "Le recouvrement de créances au Grand-Duché de Luxembourg",
      en: "Out-of-court debt collection in the Grand Duchy of Luxembourg",
    },
    resume: {
      fr: "La mise en demeure est l’acte par lequel le créancier manifeste sa volonté en vue d’exiger l’exécution des prestations...",
      en: "The formal notice is the act by which the creditor expresses his will to demand the performance of services...",
    },
    corps: {
      fr: "<h2>1. Le recouvrement extra-judiciaire de créances au Grand-Duché de Luxembourg.</h2><p>La mise en demeure est l’acte par lequel le créancier manifeste sa volonté en vue d’exiger l’exécution des prestations dues et, à défaut, de tirer les conséquences légales de l’inexécution.</p><p><strong>La mise en demeure</strong> doit comporter :</p><ul><li>l’indication de la volonté du créancier d’exiger l’exécution des prestations dues ;</li><li>les conséquences légales qui en résulterait pour le débiteur en cas d’inexécution.</li></ul><p>Si <strong>l’article 1146 du Code civil</strong> luxembourgeois l’exige dans le cas de revendication de dommages et intérêts, il y a lieu de relever que la loi du 18 avril 2004 sur les délais de paiement, qui transposait en droit national la directive 2000/35 CE, a unifié le régime des intérêts de retard.</p><p>Cette loi prévoit que la mise en demeure n’est plus nécessaire pour entraîner la mise en compte d’intérêts de retard, et distingue entre les différents cas de figures suivants :</p><ul><li>les créances résultant de transactions commerciales : les intérêts de retard seront mis en compte à compter de l’expiration d’un délai de trente jours suivant la réception des factures</li><li>les créances résultant de contrats conclus entre un professionnel et un consommateur : les intérêts de retard seront mis en compte à compter de l’expiration d’un délai de trois mois suivant la réception des travaux, la prestation de service ou l’achèvement des travaux</li></ul><h2>2. Le recouvrement judiciaire de créances au Grand-Duché de Luxembourg</h2><p>La phase judiciaire du recouvrement de créance au Grand-Duché de Luxembourg est susceptible d’être introduite suivant différentes procédures qui sont à déterminer suivant les données concrètes du litige.</p><p>Les principaux facteurs à prendre en considération afin de <strong>déterminer la procédure judiciaire</strong> au Luxembourg <strong>la mieux adaptée</strong> au recouvrement de la créance sont :</p><ul><li><strong>La nature du litige</strong> : La complexité de certains litiges, notamment lorsqu’il existe des contestations ou une incertitude quant au montant ou la détermination du débiteur, empêche de recourir à des procédures simplifiées. En outre, certaines matières particulières ne peuvent être introduites devant une juridiction que par la voie d’une requête (bail à loyer, créances résultant d'un contrat de travail…)</li><li><strong>La valeur du litige</strong> : Afin d'évaluer la valeur de la créance, il convient de prendre en considération le montant principal, ainsi que les intérêts de retard échus au jour de l’introduction de l’acte d’instance.</li></ul><h3>2.1. Les créances d’une valeur inférieure à 10.000.- EUR</h3><h3>2.1.1 L’ordonnance conditionnelle de paiement</h3><p>Cette procédure simplifiée est réservée aux créances ayant pour objet une somme d’argent qui ne dépasse pas les 10.000.- EUR. Ces affaires sont de la compétence de la Justice de Paix.</p><p>La demande est formée par une déclaration faite au greffe de la justice de paix qui contient sous peine de nullité :</p><ul><li>les noms, prénoms, profession et domicile des parties demanderesse et défenderesse ;</li><li>les causes et le montant de la créance ;</li><li>la demande en obtention d’une ordonnance conditionnelle de paiement.</li></ul><p>A l’appui de sa demande, il convient de joindre tout document (contrat, factures…) de nature à justifier l’existence, le montant et le bien fondé de la créance.</p><p>Sur base de cette demande, une ordonnance qui contient l’ordre de payer dans les quinze jours de sa notification est rendue par le Président de la Justice de paix.</p><p>A la suite de cette ordonnance, deux cas de figures peuvent survenir :</p><ul><li>Durant ce délai de quinze jours, le débiteur dispose de la possibilité de former contredit contre cette ordonnance afin de justifier des motifs de son refus de s’acquitter de sa dette. Ce contredit, qui peut être formé par simple déclaration écrite ou verbale faite au greffe, doit contenir l’indication sommaire des motifs sur lesquels il est fondé.</li></ul><p>Dans cette hypothèse, chaque partie peut requérir que l’affaire soit portée à une audience lors de laquelle le juge de paix dans un jugement motivé confirmera ou non l’ordonnance conditionnelle de paiement.</p><ul><li>Si aucun contredit n’est formé dans le délai de quinze jours, le créancier pourra solliciter que l’ordonnance conditionnelle soit rendue exécutoire. Cette ordonnance possède les mêmes effets qu’un jugement par défaut. Le titre est valable pendant un délai de six mois, étant entendu que ce délai est interrompu par une procédure d’exécution.</li></ul><p>La partie condamnée est toutefois susceptible d’exercer les voies de recours usuels à l’encontre de cette décision, à savoir l’opposition et/ou l’appel.</p><h3>2.1.2. La citation devant la justice de paix</h3><p>La citation est l’acte introductif d’instance de droit commun pour toutes les créances dont le montant ne dépasse pas les 10.000.- EUR.</p><p>Elle est délivrée par un huissier de justice au débiteur qu’il se trouve sur le territoire national ou à l’étranger.</p><p>La partie citée est assignée à comparaître à une date fixe.</p><p>A la différence de la procédure d’ordonnance de paiement, la procédure par citation implique nécessairement la comparution à une audience pour obtenir un jugement.</p><h3>2.2. les créances d’une valeur supérieure à 10.000.- EUR</h3><h3>2.2.1. Les provisions sur requête</h3><p>Il s’agit de la procédure <strong>la plus simple et la plus efficace</strong> pour recouvrer une créance au Luxembourg. Elle présente l’avantage de dispenser le créancier du recours à un huissier de justice pour introduire son acte introductif d’instance et permet également d’obtenir la prise de position du débiteur avant les plaidoiries.</p><p>Par analogie avec la procédure d’ordonnance de paiement, il faut que le débiteur soit domicilié au Grand-duché de Luxembourg.</p><p>La procédure est introduite par la voie d’une requête déposée au greffe du Tribunal d’arrondissement en vue de se voir accorder une provision pour une créance supérieure à 10.000.- EUR.</p><p>Cette requête doit contenir les informations suivantes :</p><ul><li>les noms, prénoms, profession et domicile des parties demanderesse et défenderesse ;</li><li>les causes et le montant de la créance ;</li><li>la demande en obtention d’une ordonnance conditionnelle de paiement.</li></ul><p>Sur base des informations qui lui sont fournies, le juge rendra une ordonnance contenant l’ordre de payer entre les mains du créancier le montant réclamé, sinon de former de contredit dans le délai de quinze jours.</p><p>A la suite du contredit, les parties peuvent requérir la fixation de l’affaire à une audience afin qu’elles débattent devant le juge du bien fondé de la demande.</p><p>L’ordonnance, assortie de l’exécution provisoire, peut être frappée d’appel et/ou opposition.</p><h3>2.2.2. L’assignation devant le Tribunal d’arrondissement</h3><p>L’assignation est l’acte introductif d’instance de droit commun pour les litiges dépassant le montant de 10.000.- EUR.</p><p>Elle est délivrée par huissier de justice au débiteur qui doit constituer avocat à la cour afin de se faire représenter dans la procédure.</p><p>Cette procédure permet d’obtenir un jugement dans les litiges qui nécessitent un examen au fond et où généralement les débiteurs présentent des moyens de défense et des contestations sur le bien fondé de la créance invoquée.</p><h2>3. Les nouvelles procédures communautaires</h2><p>Les procédures civiles d’exécution, mises à disposition en droit interne, présentent certaines insuffisances lorsqu’il s’agit de poursuivre le recouvrement de créances auprès de débiteurs domiciliés à l’étranger. Partant de ce constat et dans la perspective de l’élaboration d’un véritable « espace judiciaire européen », l’Union européenne a commencé à mettre en place des procédures communautaires tendant à faciliter le recouvrement transfrontalier des créances.</p><ul><li><strong>le règlement (CE) n° 805/2004 du Parlement européen et du Conseil du 21 avril 2004</strong> portant création d'un titre exécutoire européen pour les créances incontestées ;</li></ul><p>Ce règlement communautaire est entré en vigueur depuis le 21 janvier 2005 et vise les situations suivantes :</p><p>Le présent règlement s'applique aux décisions, transactions judiciaires et actes authentiques portant sur des créances incontestées.</p><p><strong>Une créance est réputée incontestée</strong>:</p><ul><li>a) si le débiteur l'a expressément reconnue en l'acceptant ou en recourant à une transaction qui a été approuvée par une juridiction ou conclue devant une juridiction au cours d'une procédure judiciaire;</li><li>b) si le débiteur ne s'y est jamais opposé, conformément aux règles de procédure de l'État membre d'origine, au cours de la procédure judiciaire;</li><li>c) si le débiteur n'a pas comparu ou ne s'est pas fait représenter lors d'une audience relative à cette créance après l'avoir initialement contestée au cours de la procédure judiciaire, pour autant que sa conduite soit assimilable à une reconnaissance tacite de la créance ou des faits invoqués par le créancier en vertu du droit de l'État membre d'origine;</li><li>d) si le débiteur l'a expressément reconnue dans un acte authentique.</li></ul><p>Ce règlement permet de solliciter auprès du greffe de la juridiction d’un Etat membre d’émettre un titre exécutoire européen qui permettra au créancier de se dispenser du recours à la procédure d’exequatur.</p><ul><li><strong>le règlement (CE) n°1896/2006 du Parlement européen et du Conseil du 12 décembre 2006</strong> instituant une procédure européenne d'injonction de payer ;</li></ul><p>Ce règlement communautaire s'applique en matière civile et commerciale dans les litiges transfrontaliers, quelle que soit la nature de la juridiction. Il ne recouvre notamment pas les matières fiscales, douanières ou administratives, ni la responsabilité de l'État pour des actes ou des omissions commis dans l'exercice de la puissance publique (\"acta jure imperii\") et est applicable depuis le 12 décembre 2008.</p><p>Il a créé une véritable procédure européenne d’injonction de payer pour le recouvrement de créances pécuniaires liquides et exigibles qui permet de poursuivre un débiteur domicilié dans un Etat membre et de ne pas recourir à l’exequatur.</p><ul><li><strong>le règlement (CE) N° 861/2007 du Parlement Européen et du Conseil du 11 juillet 2007</strong> instituant une procédure européenne de règlement des petits litiges</li></ul><p>Ce règlement communautaire s’applique en matière civile et commerciale dans les litiges transfrontaliers, quelle que soit la nature de la juridiction, lorsque le montant d’une demande ne dépasse pas 2000 EUR au moment de la réception du formulaire de demande par la juridiction compétente, hors intérêts, frais et débours.</p><p>Il est entré en vigueur le 1er janvier 2009.</p>",
      en: "<h2>1. Out-of-court debt collection in the Grand Duchy of Luxembourg.</h2><p>The formal notice is the act by which the creditor expresses his will to demand performance of the services due and, failing this, to draw the legal consequences of non-performance.</p><p><strong>The formal notice</strong> must include :</p><ul><li>an indication of the creditor's intention to demand performance of the services due ;</li><li>the legal consequences for the debtor in the event of non-performance.</li></ul><p>Although <strong>article 1146 of the Luxembourg Civil Code</strong> requires this in the case of claims for damages, it should be noted that the law of 18 April 2004 on payment periods, which transposed Directive 2000/35 EC into national law, unified the system of late payment interest.</p><p>This law stipulates that formal notice is no longer required in order for late payment interest to be charged, and distinguishes between the following different situations:</p><ul><li>debts arising from commercial transactions: late payment interest will be charged from the expiry of a period of thirty days following receipt of the invoices</li><li>debts arising from contracts concluded between a professional and a consumer: late payment interest will be charged from the expiry of a period of three months following acceptance of the work, provision of the service or completion of the work</li></ul><h2>2. Judicial debt collection in the Grand Duchy of Luxembourg</h2><p>The judicial phase of debt collection in the Grand Duchy of Luxembourg may be initiated using different procedures, depending on the specific circumstances of the dispute.</p><p>The main factors to be taken into consideration in order to <strong>determine the most appropriate legal procedure</strong> in Luxembourg for debt recovery are :</p><ul><li><strong>The nature of the dispute</strong>: The complexity of certain disputes, in particular where there are disputes or uncertainty as to the amount or determination of the debtor, prevents the use of simplified procedures. In addition, certain specific matters can only be brought before a court by way of an application (rental leases, claims arising from an employment contract, etc.).</li><li><strong>The value of the claim</strong>: In order to assess the value of the claim, the principal amount should be taken into account, as well as any default interest that has accrued up to the date on which the proceedings are commenced.</li></ul><h3>2.1. Claims with a value of less than EUR 10,000</h3><h3>2.1.1 Conditional payment order</h3><p>This simplified procedure is reserved for claims involving a sum of money not exceeding EUR 10,000. These cases fall within the jurisdiction of the Justice of the Peace.</p><p>The application is made by a declaration made to the clerk's office of the Justice of the Peace containing, under penalty of nullity :</p><ul><li>the surnames, forenames, profession and domicile of the plaintiff and defendant ;</li><li>the grounds and amount of the claim;</li><li>the request for a conditional payment order.</li></ul><p>Any documents (contracts, invoices, etc.) substantiating the existence, amount and validity of the claim should be attached to the application.</p><p>On the basis of this request, the President of the Justice of the Peace issues an order to pay within fifteen days of notification.</p><p>Following this order, two situations may arise:</p><ul><li>During the two-week period, the debtor may lodge an objection against the order in order to justify his refusal to pay the debt. This objection, which may be made by a simple written or verbal declaration made at the court registry, must contain a summary of the grounds on which it is based.</li></ul><p>In this case, either party may request that the matter be brought to a hearing at which the justice of the peace, in a reasoned judgment, will confirm or reject the conditional payment order.</p><ul><li>If no objection is filed within fifteen days, the creditor may request that the conditional order be made enforceable. This order has the same effect as a default judgment. The order is valid for a period of six months, on the understanding that this period is interrupted by enforcement proceedings.</li></ul><p>The convicted party may, however, exercise the usual remedies against this decision, i.e. opposition and/or appeal.</p><h3>2.1.2. Summons to appear before the justice of the peace</h3><p>The writ of summons is the standard procedure for initiating proceedings in respect of all claims up to EUR 10,000.</p><p>It is issued by a bailiff to the debtor, whether he is in France or abroad.</p><p>The summoned defendant is required to appear on a fixed date.</p><p>Unlike the payment order procedure, the summons procedure necessarily involves appearing at a hearing to obtain a judgment.</p><h3>2.2. claims with a value in excess of EUR 10,000</h3><h3>2.2.1. Provisions on request</h3><p>This is the simplest and most effective procedure for recovering a debt in Luxembourg. It has the advantage of dispensing with the need for the creditor to use a bailiff to initiate proceedings and also enables the debtor to state his position before the pleadings.</p><p>By analogy with the payment order procedure, the debtor must be domiciled in the Grand Duchy of Luxembourg.</p><p>The procedure is initiated by means of an application lodged at the registry of the Tribunal d'Arrondissement with a view to being granted an advance on a claim exceeding EUR 10,000.</p><p>This application must contain the following information :</p><ul><li>the surnames, forenames, profession and domicile of the plaintiff and defendant ;</li><li>the grounds and amount of the claim;</li><li>the request for a conditional payment order.</li></ul><p>On the basis of the information provided, the judge will issue an order to pay the amount claimed into the hands of the creditor, failing which to lodge a counterclaim within a period of fifteen days.</p><p>Following the objection, the parties may request that the case be set down for a hearing so that they can discuss the merits of the claim before the judge.</p><p>The order, which is provisionally enforceable, may be appealed and/or opposed.</p><h3>2.2.2. Summons to appear before the District Court</h3><p>The writ of summons is the standard form of initiating proceedings for claims exceeding EUR 10,000.</p><p>It is delivered by a bailiff to the debtor, who must appoint a lawyer to represent him in the proceedings.</p><p>This procedure makes it possible to obtain a judgment in disputes that require an examination of the merits and where debtors generally present defences and contest the merits of the claim.</p><h2>3. The new Community procedures</h2><p>The civil enforcement procedures available under domestic law have certain shortcomings when it comes to pursuing debt recovery from debtors domiciled abroad. With this in mind, and with a view to creating a genuine ‘European judicial area’, the European Union has begun to introduce Community procedures to facilitate the cross-border recovery of debts.</p><ul><li><strong>Regulation (EC) No 805/2004 of the European Parliament and of the Council of 21 April 2004</strong> creating a European Enforcement Order for uncontested claims;</li></ul><p>This Community regulation came into force on 21 January 2005 and covers the following situations:</p><p>This Regulation applies to judgments, court settlements and authentic instruments relating to uncontested claims.</p><p><strong>A claim is deemed to be uncontested</strong>:</p><ul><li>a) if the debtor has expressly recognised it by accepting it or by resorting to a settlement which has been approved by a court or concluded before a court in the course of legal proceedings;</li><li>b) if the debtor has never objected to it, in accordance with the procedural rules of the Member State of origin, in the course of the court proceedings;</li><li>c) if the debtor has not appeared or been represented at a hearing relating to that claim after having initially contested it in the course of the court proceedings, provided that his conduct amounts to tacit recognition of the claim or of the facts relied on by the creditor under the law of the Member State of origin;</li><li>d) if the debtor has expressly recognised it in an authentic instrument.</li></ul><p>This regulation makes it possible to apply to the court registry of a Member State to issue a European enforcement order, which will enable the creditor to dispense with the exequatur procedure.</p><ul><li><strong>Regulation (EC) No 1896/2006 of the European Parliament and of the Council of 12 December 2006</strong> creating a European order for payment procedure;</li></ul><p>This Community regulation applies to civil and commercial matters in cross-border disputes, whatever the nature of the court. It does not cover tax, customs or administrative matters, nor the liability of the State for acts or omissions in the exercise of State authority (‘acta jure imperii’), and has been applicable since 12 December 2008.</p><p>It has created a genuine European order for payment procedure for the recovery of liquidated and payable pecuniary claims, enabling proceedings to be brought against a debtor domiciled in a Member State without recourse to exequatur.</p><ul><li><strong>Regulation (EC) No 861/2007 of the European Parliament and of the Council of 11 July 2007</strong> establishing a European Small Claims Procedure.</li></ul><p>This Community regulation applies in civil and commercial matters in cross-border disputes, whatever the nature of the court, where the amount of a claim does not exceed EUR 2,000 at the time the claim form is received by the competent court, excluding interest, costs and disbursements.</p><p>It came into force on 1 January 2009.</p>",
    },
    themes: ["recouvrement"],
    ancienne_url: {
      fr: "avocat-recouvrement-creances-luxembourg.php",
      en: "debt-recovery-lawyer-luxembourg.php",
    },
  },
  {
    id: "conformite-fiscale-blanchiment",
    ordre: 10,
    slug: {
      fr: "conformite-fiscale-blanchiment",
      en: "tax-compliance-money-laundering",
    },
    titre: {
      fr: "Conformité fiscale des clients et blanchiment au Luxembourg",
      en: "Client tax compliance and money laundering in Luxembourg",
    },
    resume: {
      fr: "La fraude fiscale simple est punie par une amende administrative pouvant varier de 10% à 50% du montant de l’impôt éludé ...",
      en: "Simple tax fraud is punishable by an administrative fine that can vary from 10% to 50% of the amount of tax evaded...",
    },
    corps: {
      fr: "<p>Pour avoir plus d'informations voir la conférence au Luxembourg du 05.04.2017</p><p>Plan de la conférence :</p><ul><li>Concept général Licéité fiscale / blanchiment</li><li>Fondement juridique de la distinction</li><li>Outils conceptuels / Process d'analyse</li><li>Difficultés du process</li><li>Bilan</li><li>Approche pratique</li><li>Obligations de vigilance telles que définies par la CSSF</li><li>Bilan</li><li>Compétences pénales étrangères</li><li>Les infractions commises sur le territoire national</li><li>Les poursuites fondées sur la législation Belge</li><li>Blanchiment de fraude fiscale</li></ul><p><a href=\"/conferences/conformite-fiscale-clients-blanchiment-luxembourg.pdf\">Téléchargez la conférence</a></p>",
      en: "<p>For more information see the conference in Luxembourg on 05.04.2017</p><p>Conference outline :</p><ul><li>General concept of tax lawfulness / money laundering</li><li>Legal basis for the distinction</li><li>Conceptual tools / Analysis process</li><li>Difficulties of the process</li><li>Assessment</li><li>Practical approach</li><li>Due diligence as defined by the CSSF</li><li>Assessment</li><li>Foreign criminal jurisdiction</li><li>Offences committed on national territory</li><li>Prosecutions under Belgian law</li><li>Tax fraud laundering</li></ul><p><a href=\"/conferences/conformite-fiscale-clients-blanchiment-luxembourg.pdf\">Download the conference</a></p>",
    },
    themes: ["conformite", "fiscalite"],
    ancienne_url: {
      fr: "avocat-conformite-fiscale-des-clients-et-blanchiment-luxembourg.php",
      en: "lawyer-tax-compliance-of-clients-and-money-laundering-luxembourg.php",
    },
  },
  {
    id: "legislation-anti-blanchiment",
    ordre: 11,
    slug: {
      fr: "legislation-anti-blanchiment",
      en: "anti-money-laundering-legislation",
    },
    titre: {
      fr: "Législation et procédures anti-blanchiment au Luxembourg",
      en: "Anti-money laundering legislation and procedures in Luxembourg",
    },
    resume: {
      fr: "Les professionnels sont tenus de prendre des mesures proportionnées à leurs risques, à leur nature et à leur taille...",
      en: "Professionals are required to take measures proportionate to their risks, their nature and their size...",
    },
    corps: {
      fr: "<p>Plan du document :</p><ul><li>Objectifs des lois, directives et circulaires</li><li>Les textes indispensables</li><li>Blanchiment de capitaux: définitions</li><li>Financement du terrorisme: définitions</li><li>Blanchiment de capitaux</li><li>Blanchiment de capitaux: étude de l’infraction</li><li>Fraude fiscale simple / blanchissement</li><li>Fraude fiscale: définitions légales</li><li>Fraude fiscale: sanctions pénales en droit luxembourgeois</li><li>Processus de distinction entre la fraude fiscale simple et la fraude fiscale pénalement sanctionnée</li><li>Obligations de vigilance telles que définies par la CSSF en matière fiscale</li><li>Mesures à mettre en œuvre par le professionnel expert-comptable</li><li>Notion de bénéficiaire effectif pour les sociétés (Art. 1 §7 loi du 12 novembre 2004)</li><li>Notion de bénéficiaire effectif pour les fiducies et trusts (Art. 1 §7 loi 2004)</li><li>L’incidence de la loi pénale étrangère pour le professionnel luxembourgeois</li><li>Compétences pénales territoriales étrangères</li><li>Compétence territoriale</li><li>Blanchiment de Fraude Fiscale</li><li>Montage fiscal</li><li>Les peines</li><li>Moyens de défense préventifs</li></ul><p><a href=\"/conferences/legislation-procedure-anti-blanchiment-luxembourg.pdf\">Téléchargez la conférence</a></p>",
      en: "<p>Outline of the document :</p><ul><li>Objectives of laws, directives and circulars</li><li>Essential texts</li><li>Money laundering: definitions</li><li>Terrorist financing: definitions</li><li>Money laundering</li><li>Money laundering: study of the offence</li><li>Simple tax fraud / money laundering</li><li>Tax fraud: legal definitions</li><li>Tax fraud: criminal penalties under Luxembourg law</li><li>Distinction between simple tax fraud and tax fraud punishable under criminal law</li><li>Due diligence obligations as defined by the CSSF in tax matters</li><li>Measures to be implemented by the professional accountant</li><li>Notion of beneficial owner for companies (Art. 1 §7 law of 12 November 2004)</li><li>Notion of beneficial owner for trusts (Art. 1 §7 law 2004)</li><li>The impact of foreign criminal law for the Luxembourg professional</li><li>Foreign territorial criminal jurisdiction</li><li>Territorial jurisdiction</li><li>Tax fraud laundering</li><li>Tax arrangements</li><li>Penalties</li><li>Preventive defences</li></ul><p><a href=\"/conferences/legislation-procedure-anti-blanchiment-luxembourg.pdf\">Download the conference</a></p>",
    },
    themes: ["conformite"],
    ancienne_url: {
      fr: "avocat-legislation-procedure-anti-blanchiment-luxembourg.php",
      en: "lawyer-legislation-anti-money-laundering-procedure-luxembourg.php",
    },
  },
  {
    id: "detention-actifs-immobiliers",
    ordre: 12,
    slug: {
      fr: "acquisition-immobiliere-non-residents",
      en: null,
    },
    titre: {
      fr: "L'acquisition de biens immobiliers au Luxembourg par des non-résidents",
      en: null,
    },
    resume: {
      fr: "Comment un non-résident détermine-t-il si des revenus fonciers de source luxembourgeoise ...",
      en: null,
    },
    corps: {
      fr: "<p>Plan du document :</p><ul><li>Méthodologie</li><li>Règles générales édictées par les conventions</li><li>Convention France-Luxembourgeoise du 1er avril 1958 modifiée par l'avenant du 24 Novembre 2006 (Imposition sur les revenus fonciers)</li><li>Critères retenus et modalités d'imposition</li><li>Conséquences</li><li>Impôt sur la fortune</li><li>Projet de convention</li><li>Suggestions internationales</li><li>Hypothèses</li><li>Législation</li><li>Quel est l'objet de ce règlement</li><li>Champ d'application</li><li>Reconnaissance et exécution</li><li>Fiscalité</li><li>Droits dus hors du Luxembourg</li></ul><p><a href=\"/conferences/detention-actifs-immobiliers-luxembourg.pdf\">Téléchargez la conférence</a></p>",
      en: null,
    },
    themes: ["immobilier", "fiscalite"],
    ancienne_url: {
      fr: "avocat-detention-actifs-immobiliers-luxembourg.php",
      en: null,
    },
  },
];

export const CONFERENCES = [
  {
    id: "investissement-immobilier",
    ordre: 1,
    titre: {
      fr: "Investissement immobilier au Luxembourg",
      en: null,
    },
    resume: {
      fr: "Investissement immobilier au Luxembourg choix : indivision ou société civile immobilière ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/bases-fiscalite-immobiliere-luxembourg.pdf",
      octets: 7767318,
    },
    dossier: null,
    lien_externe: null,
    date: "2021-11",
    themes: ["immobilier", "fiscalite"],
    ancienne_url: "conferences/bases-fiscalite-immobiliere-luxembourg.pdf",
  },
  {
    id: "acquisition-immobiliere-non-residents",
    ordre: 2,
    titre: {
      fr: "L'acquisition de biens immobiliers au Luxembourg par des non-résidents",
      en: null,
    },
    resume: {
      fr: "Comment un non-résident détermine-t-il si des revenus fonciers de source luxembourgeoise ...",
      en: null,
    },
    pdf: null,
    dossier: "detention-actifs-immobiliers",
    lien_externe: null,
    date: null,
    themes: ["immobilier", "fiscalite"],
    ancienne_url: "avocat-detention-actifs-immobiliers-luxembourg.php",
  },
  {
    id: "traitement-fiscal-sci",
    ordre: 3,
    titre: {
      fr: "Traitement fiscal de la SCI dans le cadre de l’investissement immobilier au Luxembourg",
      en: null,
    },
    resume: {
      fr: "Plusieurs choix : indivision ou société civile immobilière, travaux, rendement locatif immobilier ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/traitement-fiscal-sci-investissement-luxembourg.pdf",
      octets: 228090,
    },
    dossier: null,
    lien_externe: null,
    date: "2021-03",
    themes: ["immobilier", "fiscalite"],
    ancienne_url: "conferences/conference-traitement-fiscal-sci-investissement-luxembourg.pdf",
  },
  {
    id: "investissement-immobilier-sa-sci",
    ordre: 4,
    titre: {
      fr: "Investissement immobilier au Luxembourg : société anonyme ou société civile immobilière",
      en: null,
    },
    resume: {
      fr: "Achat immobilier collectif, exemple de calcul, comparaison ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/investissement-immobilier-sa-sci-luxembourg.pdf",
      octets: 3456952,
    },
    dossier: null,
    lien_externe: null,
    date: "2019-11",
    themes: ["immobilier", "societes"],
    ancienne_url: "conferences/conference-investissement-immobilier-sa-sci-luxembourg-avocat.pdf",
  },
  {
    id: "assurance-vie",
    ordre: 5,
    titre: {
      fr: "Assurance vie au Luxembourg",
      en: null,
    },
    resume: {
      fr: "Mécanisme de transmission patrimonial: Le contrat d’assurance vie ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/assurance-vie-luxembourg.pdf",
      octets: 2043724,
    },
    dossier: null,
    lien_externe: null,
    date: "2008-06",
    themes: ["patrimoine"],
    ancienne_url: "conferences/conference-assurance-vie-luxembourg-avocat.pdf",
  },
  {
    id: "banque-conseil-fiscal",
    ordre: 6,
    titre: {
      fr: "Moyens pour la banque de faire du conseil fiscal pour ses clients sans prendre de risque?",
      en: null,
    },
    resume: {
      fr: "Notion de risque, responsabilité, complicité, territorialité ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/banque-conseil-fiscal-sans-prendre-risque-luxembourg.pdf",
      octets: 83605,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["banque", "fiscalite"],
    ancienne_url: "conferences/conference-banque-conseil-fiscal-sans-prendre-risque-luxembourg-avocat.pdf",
  },
  {
    id: "constitution-personnes-morales",
    ordre: 7,
    titre: {
      fr: "La constitution de personnes morales au Luxembourg",
      en: null,
    },
    resume: {
      fr: "La SOPARFI, objet et utilisation, régime fiscal, application pratique ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/constitution-personnes-morales-luxembourg.pdf",
      octets: 2042017,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["societes"],
    ancienne_url: "conferences/conference-constitution-de-personnes-morales-luxembourg-avocat.pdf",
  },
  {
    id: "convention-franco-luxembourgeoise",
    ordre: 8,
    titre: {
      fr: "Convention Franco-Luxembourgeoise",
      en: null,
    },
    resume: {
      fr: "Imposition sur les revenus fonciers, impôt sur la fortune, impôt foncier ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/convention-franco-luxembourgeoise.pdf",
      octets: 1444606,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["fiscalite", "immobilier"],
    ancienne_url: "conferences/conference-convention-franco-luxembourgesoise-luxembourg-avocat.pdf",
  },
  {
    id: "detentions-immobilieres-non-residents",
    ordre: 9,
    titre: {
      fr: "Détentions immobilières au Luxembourg par des non-résidents",
      en: null,
    },
    resume: {
      fr: "Comment un non-résident détermine-t-il si des revenus fonciers ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/detentions-immobilieres-luxembourg.pdf",
      octets: 2676741,
    },
    dossier: null,
    lien_externe: null,
    date: "2018-10",
    themes: ["immobilier", "fiscalite"],
    ancienne_url: "conferences/conference-detentions-immobilieres-au-luxembourg-avocat.pdf",
  },
  {
    id: "echange-information-fiscale",
    ordre: 10,
    titre: {
      fr: "Droits et devoirs en matière d’échange d’information fiscale",
      en: null,
    },
    resume: {
      fr: "Tiers détenteur d’informations (avocat domiciliataire, notaire) ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/droits-devoirs-echange-information-fiscale-luxembourg.pdf",
      octets: 196111,
    },
    dossier: null,
    lien_externe: null,
    date: "2011-10",
    themes: ["fiscalite", "conformite"],
    ancienne_url: "conferences/conference-droits-devoirs-matiere-echange-information-fiscale-luxembourg-avocat.pdf",
  },
  {
    id: "anti-blanchiment",
    ordre: 11,
    titre: {
      fr: "Législation et procédures anti-blanchiment au Luxembourg",
      en: null,
    },
    resume: {
      fr: "Objectifs des lois, directives et circulaires ..",
      en: null,
    },
    pdf: {
      chemin: "/conferences/legislation-procedures-anti-blanchiment-luxembourg.pdf",
      octets: 4902286,
    },
    dossier: null,
    lien_externe: null,
    date: "2018-11",
    themes: ["conformite"],
    ancienne_url: "conferences/conference-legislation-procedures-anti-blanchiment-luxembourg-avocat.pdf",
  },
  {
    id: "obligation-conseil-professionnel",
    ordre: 12,
    titre: {
      fr: "Obligation de conseil du professionnel",
      en: null,
    },
    resume: {
      fr: "Le conseil est donné à titre principal / accessoire à une autre activité ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/obligation-conseil-professionnel-luxembourg.pdf",
      octets: 246393,
    },
    dossier: null,
    lien_externe: null,
    date: "2015-03",
    themes: ["conformite", "banque"],
    ancienne_url: "conferences/conference-obligation-conseil-professionnel-luxembourg-avocat.pdf",
  },
  {
    id: "punissabilite",
    ordre: 13,
    titre: {
      fr: "La punissabilité au Luxembourg",
      en: null,
    },
    resume: {
      fr: "infractions commises à l’étranger par les professionnels ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/punissabilite-infractions-commises-etranger-professionnels-luxembourg.pdf",
      octets: 292508,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["conformite"],
    ancienne_url: "conferences/conference-punissabilite-infractions-commises-etranger-par-les professionnels-luxembourg-avocat.pdf",
  },
  {
    id: "recouvrement-creances",
    ordre: 14,
    titre: {
      fr: "Recouvrement de créances",
      en: null,
    },
    resume: {
      fr: "Procédure par assignation devant le tribunal d’arrondissement ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/recouvrement-creances-luxembourg.pdf",
      octets: 1548537,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["recouvrement"],
    ancienne_url: "conferences/conference-recouvrement-creances-luxembourg-avocat.pdf",
  },
  {
    id: "intermediaires-financiers-apporteurs-affaires",
    ordre: 15,
    titre: {
      fr: "Relations entre les intermédiaires financiers et les apporteurs d’affaires",
      en: null,
    },
    resume: {
      fr: "Intermédiaire financier, entreprise d’investissement, apporteurs d’affaires",
      en: null,
    },
    pdf: {
      chemin: "/conferences/relations-intermediaires-financiers-apporteurs-affaires-luxembourg.pdf",
      octets: 2456899,
    },
    dossier: null,
    lien_externe: null,
    date: "2018-06",
    themes: ["banque"],
    ancienne_url: "conferences/conference-relations-entre-intermediaires-finaciers-et-apporteurs-affaires-luxembourg-avocat.pdf",
  },
  {
    id: "risques-poursuites-penales",
    ordre: 16,
    titre: {
      fr: "Les risques de poursuites pénales",
      en: null,
    },
    resume: {
      fr: "Risques des conseillers fiscaux basés au Luxembourg par rapport à des poursuites intentées à l’étranger ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/risques-poursuites-penales-conseillers-fiscaux-luxembourg.pdf",
      octets: 6403292,
    },
    dossier: null,
    lien_externe: null,
    date: "2015-12",
    themes: ["conformite", "fiscalite"],
    ancienne_url: "conferences/conference-risques-poursuites-penales-conseillers-fiscaux-luxembourg-avocat.pdf",
  },
  {
    id: "spf",
    ordre: 17,
    titre: {
      fr: "Société de gestion de patrimoine familiale (SPF)",
      en: null,
    },
    resume: {
      fr: "La société de gestion de patrimoine familial au Luxembourg ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/societe-gestion-patrimoine-familial-spf-luxembourg.pdf",
      octets: 7028539,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["societes", "patrimoine"],
    ancienne_url: "conferences/conference-societe-de-gestion-de-patrimoine-spf-luxembourg-avocat.pdf",
  },
  {
    id: "societes-commerciales",
    ordre: 18,
    titre: {
      fr: "Les sociétés commerciales",
      en: null,
    },
    resume: {
      fr: "Les sociétés ayant une activité commerciale ou artisanale sont soumises ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/societes-commerciales-luxembourg.pdf",
      octets: 980366,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["societes"],
    ancienne_url: "conferences/conference-societes-commerciales-luxembourg-avocat.pdf",
  },
  {
    id: "utilisation-personnes-morales",
    ordre: 19,
    titre: {
      fr: "L’utilisation de personnes morales au Luxembourg",
      en: null,
    },
    resume: {
      fr: "Quelles possibilités légales pour les résidents français ...",
      en: null,
    },
    pdf: {
      chemin: "/conferences/utilisation-personnes-morales-luxembourg.pdf",
      octets: 4610204,
    },
    dossier: null,
    lien_externe: null,
    date: null,
    themes: ["societes", "fiscalite"],
    ancienne_url: "conferences/conference-utilisation-personnes-morales-luxembourg-avocat.pdf",
  },
  {
    id: "conference-2025-07",
    ordre: 20,
    titre: {
      fr: "Conférence - Juillet 2025",
      en: null,
    },
    resume: {
      fr: null,
      en: null,
    },
    pdf: {
      chemin: "/conferences/conference-2025-07.pdf",
      octets: 1731221,
    },
    dossier: null,
    lien_externe: null,
    date: "2025-07",
    themes: ["immobilier", "fiscalite"],
    ancienne_url: "IMG/conference-07-2025.pdf",
  },
  {
    id: "domiciliation-atad-3",
    ordre: 21,
    titre: {
      fr: "Domiciliation au Luxembourg : les défis à résoudre avant l’implémentation d’ATAD 3",
      en: null,
    },
    resume: {
      fr: null,
      en: null,
    },
    pdf: {
      chemin: "/conferences/domiciliation-luxembourg.pdf",
      octets: 157510,
    },
    dossier: null,
    lien_externe: null,
    date: "2023-03",
    themes: ["societes", "fiscalite"],
    ancienne_url: "IMG/client/conference-domiciliation-luxembourg.pdf",
  },
  {
    id: "sci-conformite",
    ordre: 22,
    titre: {
      fr: "SCI : COMMENT LES UTILISER EN TOUTE CONFORMITÉ ?!",
      en: null,
    },
    resume: {
      fr: "Nos experts feront le point sur la manière de créer et de gérer ces sociétés ainsi que sur la manière de les utiliser pour vos clients. Votre participation à cette conférence vous permettra de rencontrer notamment des fiduciaires, des conseillers fiscaux et des responsables bancaires ...",
      en: null,
    },
    pdf: null,
    dossier: null,
    lien_externe: "https://www.finixevents.com/events/sci-2021",
    date: null,
    themes: ["immobilier", "societes"],
    ancienne_url: null,
  },
  {
    id: "investissement-immobilier-cles-juridiques",
    ordre: 23,
    titre: {
      fr: "Investissement Immobilier au Luxembourg - Toutes les clés juridiques pour le conduire au mieux !",
      en: null,
    },
    resume: {
      fr: "L’investissement dans l’immobilier demeure l’un des plus fructueux. Le développement du secteur immobilier du Luxembourg est en expansion telle qu’un retour sur investissement devrait être assez rapide pour les investisseurs.",
      en: null,
    },
    pdf: null,
    dossier: null,
    lien_externe: "https://www.ifebenelux.lu/formation/investissement-immobilier-au-luxembourg",
    date: null,
    themes: ["immobilier"],
    ancienne_url: null,
  },
];
