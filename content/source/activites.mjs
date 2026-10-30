/**
 * content/source/activites.mjs — Taetigkeiten der Kanzlei.
 *
 * Wortgetreu von der alten Website (cabinet-avocats-lorang.com) uebernommen:
 * Reihenfolge, Titel (`terme`) und Kurztext (`definition`) von der
 * Uebersichtsseite activites-avocat-luxembourg.php bzw.
 * activities-lawyer-luxembourg.php, der Fliesstext (`texte`) von der
 * jeweiligen Detailseite. Nichts umformuliert, nichts uebersetzt; nur
 * eindeutige Tippfehler korrigiert. Fehlt eine englische Fassung, steht null.
 *
 * Achtung: Die „Découvrir“-Knoepfe der alten Uebersicht zeigen teils auf
 * falsche Seiten. Massgeblich war jeweils der Link auf dem Titel.
 */

export const ACTIVITES = [
  {
    id: 'fusions-acquisitions',
    ordre: 1,
    slug: { fr: 'fusions-et-acquisitions', en: 'mergers-and-acquisitions' },
    terme: { fr: 'Fusions & Acquisitions', en: 'Mergers & Acquisitions' },
    definition: {
      fr: 'Le rôle de l\'avocat dans les fusions et acquisitions (F&A) est crucial et multifacette. Voici les principales fonctions qu\'un avocat peut remplir dans ce contexte.',
      en: 'The role of a lawyer in mergers and acquisitions (M&A) is crucial and multifaceted. Here are the main functions that a lawyer can perform in this context',
    },
    texte: {
      fr: `
<p>Le rôle de <strong>l'avocat dans les fusions et acquisitions (F&amp;A)</strong> est crucial et multifacette. Voici les principales fonctions qu'un avocat peut remplir dans ce contexte</p>
<ol><li><strong>Le conseil stratégique et juridique</strong> : L'avocat peut conseiller les entreprises sur la structure de l'opération, en tenant compte des aspects juridiques, fiscaux et réglementaires. L'avocat fournit des conseils juridiques à l'entreprise sur les implications juridiques et réglementaires de la transaction proposée, y compris les questions de droit des sociétés, de droit fiscal, de droit du travail et de droit de la concurrence.</li><li><strong>Due diligence</strong> : L'avocat réalise ou coordonne des audits juridiques approfondis (due diligence) pour identifier les risques potentiels liés à l'opération. Cela inclut l'examen des contrats, des litiges en cours, des questions de propriété intellectuelle, des conformités réglementaires. L'avocat dirige et coordonne le processus de due diligence, qui consiste à examiner les contrats, les registres, les actifs et les passifs de l'entreprise cible pour identifier les risques et les problèmes potentiels.</li><li><strong>La négociation et la rédaction des contrats</strong> : L'avocat négocie et rédige les contrats et les accords juridiques nécessaires à la transaction, y compris les lettres d'intention, les accords de confidentialité, les contrats d'achat et de vente, et les accords de garantie.</li><li><strong>Garantir la conformité réglementaire</strong> : L'avocat s'assure que la fusion ou l'acquisition respecte toutes les lois et réglementations en vigueur, y compris les règles antitrust et celles des marchés financiers.</li><li><strong>La structuration de la transaction</strong> : L'avocat travaille avec l'entreprise et les autres conseillers pour structurer la transaction de manière optimale sur le plan fiscal, juridique et opérationnel.</li><li><strong>La gestion des risques</strong> : L'avocat évalue et conseille sur la gestion des risques associés à la transaction, y compris les garanties et les indemnités.</li><li><strong>La communication</strong> : L'avocat peut aider à préparer les communications aux actionnaires, aux employés et aux régulateurs, et s'assurer que toutes les divulgations requises sont faites.</li><li><strong>La fermeture de la transaction</strong> : L'avocat coordonne les étapes finales de la transaction, y compris la finalisation des documents de clôture et la coordination des transferts de fonds. L'avocat travaille avec l'entreprise pour s'assurer que la transaction est exécutée conformément aux termes des contrats et des accords, y compris la coordination des transferts d'actifs, le paiement des prix d'achat et la satisfaction des conditions de clôture.</li><li><strong>L’intégration post-transaction</strong> : Après la clôture, l'avocat peut aider à l'intégration des entreprises, en s'assurant que les contrats sont respectés et que les nouvelles structures juridiques et opérationnelles sont mises en place.</li></ol>
<p>Les avocats jouent donc un rôle essentiel en veillant à ce que les transactions de fusions et acquisitions se déroulent de manière fluide, conforme et avec une protection optimale des intérêts de leurs clients.</p>
`,
      en: `
<p>The role of a <strong>lawyer in mergers and acquisitions (M&amp;A)</strong> is crucial and multifaceted. Here are the main functions that a lawyer can perform in this context :</p>
<ol><li><strong>Strategic and legal advice</strong> : The lawyer can advise companies on the structure of the operation, taking into account legal, tax, and regulatory aspects. The lawyer provides legal advice to the company on the legal and regulatory implications of the proposed transaction, including corporate law, tax law, labor law, and competition law issues.</li><li><strong>Due diligence</strong> : The lawyer conducts or coordinates in-depth legal due diligence to identify potential risks related to the operation. This includes reviewing contracts, ongoing disputes, intellectual property issues, and regulatory compliance. The lawyer leads and coordinates the due diligence process, which involves examining the contracts, records, assets, and liabilities of the targeted company to identify risks and potential issues.</li><li><strong>Negotiation and contract writing</strong> : The lawyer negotiates and writes the contracts and legal agreements necessary for the transaction, including letters of intent, confidentiality agreements, purchase and sale agreements, and warranty agreements.</li><li><strong>Ensuring regulatory compliance</strong> : The lawyer ensures that the merger or acquisition complies with all applicable laws and regulations, including antitrust rules and financial market regulations.</li><li><strong>Transaction structuring</strong> : The lawyer works with the company and other advisors to structure the transaction optimally from a tax, legal, and operational perspective.</li><li><strong>Risk management</strong> : The lawyer assesses and advises on risk management associated with the transaction, including warranties and indemnities.</li><li><strong>Communication</strong> : The lawyer may assist in preparing communications to shareholders, employees, and regulators, ensuring that all required disclosures are made.</li><li><strong>Transaction closure</strong> : The lawyer coordinates the final stages of the transaction, including finalizing closing documents and coordinating fund transfers. The lawyer works with the company to ensure that the transaction is executed in accordance with the terms of the contracts and agreements, including coordinating asset transfers, payment of purchase prices, and satisfaction of closing conditions.</li><li><strong>Post-transaction integration</strong> : After closing, the lawyer can assist in the integration of businesses, ensuring that contracts are honored, and new legal and operational structures are put in place.</li></ol>
<p>In summary, lawyers plays an essential role in ensuring that mergers and acquisitions transactions proceed smoothly, in compliance, and with optimal protection of their clients' interests</p>
`,
    },
    ancienne_url: { fr: 'avocat-luxembourg-fusions-et-acquisitions.php', en: 'lawyer-luxembourg-mergers-and-acquisitions.php' },
  },
  {
    id: 'family-office',
    ordre: 2,
    slug: { fr: 'family-office', en: 'family-office' },
    terme: { fr: 'Activités Family Office', en: 'Activités Family Office' },
    definition: {
      fr: 'Le rôle d\'un avocat dans le cadre d\'une activité de family office est essentiel et multifacette. Le family office est une structure qui gère le patrimoine',
      en: 'The role of a lawyer within the scope of a family office activity is essential and multifaceted. The family office is a structure that manages',
    },
    texte: {
      fr: `
<p>Le rôle d'un avocat dans le cadre d'une <strong>activité de family office</strong> est essentiel et multifacette. Le family office est une structure qui gère le patrimoine d'une ou plusieurs familles fortunées, et l'avocat y joue un rôle de conseiller juridique et de protecteur des intérêts de la famille. Voici quelques fonctions clés d'un <strong>avocat au sein d'un family office</strong>.</p>
<ol><li><strong>Le conseil juridique</strong> : L'avocat offre des conseils sur des questions juridiques variées, telles que les structures de propriété, les transferts de patrimoine, la planification successorale, et la conformité avec les lois et réglementations locales et internationales.</li><li><strong>La planification fiscale et successorale</strong> : Il aide à élaborer des stratégies pour minimiser l'impact fiscal sur le patrimoine de la famille, en tenant compte des lois fiscales en constante évolution. Il travaille également sur la planification successorale pour assurer une transition en douceur des actifs aux générations futures.</li><li><strong>La protection des actifs</strong> : L'avocat peut structurer des instruments juridiques comme des trusts ou des fondations pour protéger les actifs de la famille contre les litiges, les créanciers et d'autres risques.</li><li><strong>La gouvernance familiale</strong> : Il peut aider à établir des politiques et des structures pour la gouvernance de la famille et du family office, y compris la rédaction de chartes familiales et la mise en place de conseils familiaux.</li><li><strong>Les transactions commerciales</strong> : Pour les familles impliquées dans des activités commerciales, l'avocat peut gérer les aspects juridiques des transactions commerciales, des investissements et des désinvestissements.</li><li><strong>La résolution de conflits</strong> : En cas de désaccords ou de litiges au sein de la famille ou avec des tiers, l'avocat peut agir comme médiateur ou représenter la famille devant les tribunaux.</li><li><strong>La confidentialité et la discrétion</strong> : L'avocat aide à maintenir la confidentialité des affaires de la famille, ce qui est souvent une préoccupation majeure pour les clients de family offices.</li><li><strong>L’éducation juridique</strong> : Il peut également éduquer les membres de la famille sur les implications juridiques de leurs actions et sur les meilleures pratiques à adopter pour la gestion de leur patrimoine.</li></ol>
<p>En résumé, l'avocat est un conseiller de confiance qui s’assure que les affaires juridiques du family office soient gérées avec compétence et diligence, tout en protégeant les intérêts et l'intégrité de la famille.</p>
<h2>Maximilian HEIMANN - Responsable du Family Office</h2>
<p>Maximilian Heimann dirige le Family Office de notre cabinet d'avocats, apportant une expertise exceptionnelle en matière de gestion de patrimoine et de finance pour aider les clients privés nationaux et internationaux à structurer et à gérer leurs actifs.</p>
<p>Au cours d'une carrière remarquable au sein d'institutions financières et gouvernementales de renom, notamment J.P. Morgan Payments, Daimler Financial Services et le Parlement européen à Bruxelles, Maximilian a acquis une compréhension approfondie et complète du paysage financier et réglementaire.</p>
<p>Entrepreneur dans l'âme, Maximilian a fondé LUXPAY à un jeune âge, une start-up pionnière spécialisée dans les solutions de paiement électronique et les portefeuilles électroniques, démontrant ainsi son approche visionnaire et sa capacité à anticiper les tendances du marché financier.</p>
<p>La vaste expérience de Maximilian, combinée à ses connaissances approfondies de la réglementation et de la finance, permet à notre Family Office de fournir des solutions stratégiques sur mesure aux familles, garantissant une approche rigoureuse et durable de la préservation du patrimoine à travers les générations.</p>
`,
      en: `
<p>The role of a lawyer within the scope of a <strong>family office activity</strong> is essential and multifaceted. The family office is a structure that manages the wealth of one or more affluent families, and the lawyer plays a role as a legal advisor and protector of the family's interests. Here are some key functions of a <strong>lawyer within a family office.</strong></p>
<ol><li><strong>Legal advice</strong> : The lawyer provides advice on various legal issues, such as ownership structures, wealth transfers, inheritance planning, and compliance with local and international laws and regulations</li><li><strong>Tax and estate planning</strong> : He helps develop strategies to minimise the tax impact on the family's wealth, taking into account constantly changing tax laws. He also works on estate planning to ensure a smooth transition of assets to future generations.</li><li><strong>Asset protection</strong> : The lawyer can structure legal instruments such as trusts or foundations to protect the family's assets against litigation, creditors and other risks.</li><li><strong>Family governance</strong> : He can help establish policies and structures for family and family office governance, including the drafting of family charters and the setting up of family councils.</li><li><strong>Commercial transactions</strong> : For families involved in commercial activities, the lawyer can manage the legal aspects of commercial transactions, investments and disinvestments.</li><li><strong>Conflict resolution</strong> : In the event of disagreements or disputes within the family or with third parties, the lawyer can act as a mediator or represent the family in court.</li><li><strong>Confidentiality and discretion</strong> : The lawyer helps to maintain the confidentiality of family affairs, which is often a major concern for clients of family offices.</li><li><strong>Legal education</strong> : He can also educate family members about the legal implications of their actions and best practices for managing their wealth.</li></ol>
<p>In summary, the lawyer is a trusted advisor who ensures that the legal affairs of the family office are managed with competence and diligence while protecting the interests and integrity of the family.</p>
<h2>Maximilian HEIMANN - Head of Family Office</h2>
<p>Maximilian Heimann leads the Family Office at our law firm, bringing exceptional expertise in wealth management and finance to support private national and international clients in structuring and managing their assets.</p>
<p>With a distinguished career spanning renowned financial and governmental institutions, including J.P. Morgan Payments, Daimler Financial Services, and the European Parliament in Brussels, Maximilian has developed a deep and comprehensive understanding of the financial and regulatory landscape.</p>
<p>An entrepreneur at heart, Maximilian founded LUXPAY at a young age- a pioneering start-up specializing in electronic payment solutions and e-wallets - demonstrating his visionary approach and ability to anticipate trends in the financial market.</p>
<p>Maximilian's extensive experience, combined with his profound regulatory and financial knowledge, enables our Family Office to deliver strategic, tailor-made solutions to families, ensuring a rigorous and sustainable approach to safeguarding wealth across generations.</p>
`,
    },
    ancienne_url: { fr: 'avocat-luxembourg-activite-family-office.php', en: 'lawyer-luxembourg-activities-family-office.php' },
  },
  {
    id: 'successions-internationales',
    ordre: 3,
    slug: { fr: 'successions-internationales', en: 'international-inheritance-law' },
    terme: { fr: 'Droits des successions internationales', en: 'Luxembourg lawyer - International inheritance law' },
    definition: {
      fr: 'Un avocat en droit des successions peut être très utile dans de nombreuses situations.',
      en: 'An inheritance lawyer can be very useful in many situations.',
    },
    texte: {
      fr: `
<p>Un avocat en droit des successions peut être très utile dans de nombreuses situations. Voici quelques exemples :</p>
<p><strong>Le choix de la loi applicable</strong> : en matière de succession internationale, il est parfois possible de choisir la loi applicable à la succession. Ce choix peut être fait par le défunt de son vivant. Il est important de bien réfléchir à ce choix car il peut avoir des conséquences importantes sur la répartition des biens.</p>
<p><strong>Les règles de dévolution</strong> : selon les pays, les règles de dévolution des successions peuvent varier. Certains états appliquent le principe de la réserve héréditaire, qui garantit une part minimale de l'héritage aux descendants du défunt. D'autres pays n'ont pas de règles de ce type et permettent une plus grande liberté dans la répartition des biens.</p>
<p><strong>Les droits de succession</strong> : les droits de succession peuvent également varier selon les législations. Certains pays appliquent des taux très élevés, tandis que d'autres n'ont pas de droits de succession du tout. Il est important de prendre en compte ces différences pour éviter les mauvaises surprises.</p>
<p><strong>Les conflits de lois</strong> : en cas de conflit entre les lois de différents états, il peut être difficile de déterminer quelle loi doit s'appliquer. Dans ce cas, il est souvent nécessaire de faire appel à des spécialistes du droit international pour résoudre le conflit.</p>
<p>En résumé, le <strong>droit des successions internationales</strong> est un domaine complexe qui nécessite une expertise spécifique. Si vous êtes confronté à une situation de ce type, il est recommandé de consulter un <strong>avocat spécialisé dans le droit international des successions</strong> pour vous aider à trouver la meilleure solution.</p>
`,
      en: `
<p>An inheritance lawyer can be very useful in many situations. Here are a few examples:</p>
<p><strong>Choice of applicable law</strong> : in international succession matters, it is sometimes possible to choose the law applicable to the succession. This choice can be made by the deceased during his or her lifetime. It is important to give careful thought to this choice, as it can have major consequences for the distribution of assets.</p>
<p><strong>Devolution rules</strong> : the rules governing the devolution of estates vary from country to country. Some countries apply the principle of “reserved inheritance”, which guarantees a minimum share of the inheritance to the deceased's descendants. Other countries have no such rules, allowing greater freedom in the distribution of assets.</p>
<p><strong>inheritance tax</strong> : can also vary from country to country. Some countries apply very high rates, while others have no inheritance tax at all. It's important to take these differences into account to avoid unpleasant surprises.</p>
<p><strong>Conflicting laws</strong> : when the laws of different states conflict, it can be difficult to determine which law should apply. In such cases, it is often necessary to call in international law specialists to resolve the conflict.</p>
<p>In short, international inheritance law is a complex field that requires specific expertise. If you are faced with a situation of this type, it is advisable to consult a lawyer specializing in international inheritance law to help you find the best solution.</p>
`,
    },
    ancienne_url: { fr: 'avocat-luxembourg-droits-successions-internationales.php', en: 'lawyer-luxembourg-international-inheritance-laws.php' },
  },
  {
    id: 'droit-successoral',
    ordre: 4,
    slug: { fr: 'droit-successoral', en: 'inheritance-law' },
    terme: { fr: 'Droit successoral au Luxembourg', en: 'Inheritance law in Luxembourg' },
    definition: {
      fr: 'Notre cabinet est à votre disposition pour défendre vos intérêts en matière de Droit des successions au Luxembourg',
      en: 'Our firm is at your disposal to defend your interests in matters of inheritance law in Luxembourg',
    },
    texte: {
      fr: `
<p>Notre cabinet est à votre disposition pour défendre vos intérêts<br>en matière de Droit des successions au Luxembourg.</p>
<p>Vous souhaitez préparer votre succession ? Vous désirez protéger les personnes qui vous sont chères ? Vous anticipez des conflits entre vos héritiers ? Votre succession est internationale et vos biens répartis entre plusieurs états ? Vous ne savez comment et sous quelle loi organiser la transmission de vos biens ?</p>
<p>Notre cabinet actif en <strong>droit des successions luxembourgeoises</strong> vous assistera pour anticiper et résoudre ces difficultés successorales.</p>
<p>Vous êtes héritier et votre succession est bloquée ? Le partage successoral se heurte à des difficultés pour mésententes entre héritiers ou du fait d’une situation complexe ?</p>
<p>Vous estimez que des cohéritiers ont été illégalement avantagés et vous ont lésé ? Vous désirez faire valoir vos droits ?</p>
<p>Nous prêtons attention à ces difficultés juridiques spécifiques :</p>
<ul><li>Les droits du conjoint survivant</li><li>Les droits des enfants issus d’un premier lit</li><li>Les droits des héritiers réservataires</li><li>La succession internationale</li></ul>
<p>Nous vous assisterons dans les procédures tant devant notaire que devant les tribunaux pour régler votre dossier dans les meilleurs délais et au mieux de vos intérêts.</p>
<p>L'intervention de notre cabinet d'avocats couvre :</p>
<ul><li>L’aide à la rédaction de testaments ou de donations</li><li>L’assistance au partage des biens devant le notaire</li><li>La planification successorale</li><li>Le partage judiciaire en cas de litige avec les autres héritiers</li></ul>
`,
      en: `
<p>Our firm is at your disposal to defend your interests<br>in matters of inheritance law in Luxembourg.</p>
<p>Do you want to prepare your succession? Want to protect the people you care about? Do you anticipate conflicts between your heirs? Is your succession international and your assets divided between several states? You don't know how and under which law to organize the transfer of your assets?</p>
<p>Our firm active in <strong>Luxembourg inheritance law</strong> will assist you in anticipating and resolving these inheritance difficulties.</p>
<p>Are you an heir and your succession is blocked? The division of the estate is encountering difficulties due to disagreements between heirs or due to a complex situation?</p>
<p>Do you believe that co-heirs have been illegally favored and harmed you? Do you want to assert your rights?</p>
<p>We pay attention to these specific legal difficulties:</p>
<ul><li>The rights of the surviving spouse</li><li>The rights of children from a first birth</li><li>The rights of compulsory heirs</li><li>International succession</li></ul>
<p>We will assist you in the procedures both before a notary and before the courts to settle your case as soon as possible and in your best interests.</p>
<p>The intervention of our law firm covers:</p>
<ul><li>Assistance in drafting wills or donations</li><li>Assistance in the division of property before the notary</li><li>Estate planning</li><li>Judicial sharing in the event of a dispute with the other heirs</li></ul>
`,
    },
    ancienne_url: { fr: 'avocat-droit-successoral-luxembourg.php', en: 'lawyer-inheritance-law-luxembourg.php' },
  },
  {
    id: 'investissements-immobiliers',
    ordre: 5,
    slug: { fr: 'investissements-immobiliers-et-fiscalite', en: 'real-estate-investments-and-tax' },
    terme: { fr: 'Droit immobilier, investissements immobiliers au Luxembourg et fiscalité immobilière', en: 'Real estate investments and real estate tax' },
    definition: {
      fr: 'L\'investissement immobilier au luxembourg exige de nombreuses compétences',
      en: 'Real estate investment in Luxembourg requires many skills.',
    },
    texte: {
      fr: `
<p>L'investissement immobilier au luxembourg exige de nombreuses compétences</p>
<h2>Les compétences pour un investissement immobilier au Luxembourg</h2>
<p>L'<strong>investissement immobilier au Luxembourg</strong> exige des compétences juridiques affirmées au croisement du droit des sociétés, du droit fiscal, du droit administratif et du droit immobilier.</p>
<p>Le cabinet a dans ce domaine une compétence reconnue au Luxembourg et participe régulièrement comme formateur à des séminaires destinés à des professionnels dans ce domaine.</p>
<p>Il apporte les éclairages juridiques nécessaires permettant à des <strong>investisseurs dans l’immobilier luxembourgeois</strong> à définir la stratégie d'acquisition la plus pertinente de manière à obtenir le meilleur retour sur leur investissement.</p>
<h2>La structuration juridique</h2>
<p>Créer ou gérer une <strong>structure juridique immobilière</strong> ne s'improvise pas. Le cabinet oriente ses clients à choisir la forme juridique optimale pour structurer leurs <strong>investissements immobiliers</strong> (personne physique, société civile, société commerciale, fonds spécialisé etc ...)</p>
<h2>Le conseil en fiscalité immobilière Luxembourgeoise</h2>
<p>Le traitement fiscal d'un <strong>investissement</strong> doit soigneusement être analysé en amont. S'agit-il d'un achat en vue d'obtenir un <strong>rendement locatif d'habitation ou commercial</strong>, en vue d'une revente, d’une acquisition à des fins d'habitation ou professionnelle etc ...</p>
<p>Toutes ces options doivent être analysées lors de l'achat pour que l'opération puisse bénéficier de la fiscalité la plus favorable.</p>
<h2>La négociation immobilière au Luxembourg</h2>
<p>L'intervention d'un <strong>avocat conseil en immobilier au Luxembourg</strong> trouve son intérêt dès la rédaction du compromis de vente.</p>
<p>L'avocat vous conseille dans la négociation ou l'audit des différentes <strong>clauses du compromis</strong> (conditions suspensives, résolutoires, indemnitaires, relatives à l'objet etc ...).</p>
<p>Des clauses floues ou mal rédigées peuvent s'avérer une source considérable de contentieux.<br>Se faire assister d'un conseiller juridique avisé lors des <strong>négociations immobilières</strong> permet d'éviter des erreurs aux conséquences lourdes.</p>
`,
      en: `
<p>Real estate investment in Luxembourg requires many skills.</p>
<h2>The skills required for a real estate investment in Luxembourg are legion</h2>
<p><strong>Investment in real estate in Luxembourg</strong> requires legal expertise in the fields of company law, law fiscal, administrative law and real estate law.</p>
<p>The firm has recognised competence in Luxembourg in this area and regularly participates as a trainer in seminars intended for professionals in this field.</p>
<p>It provides the necessary legal insights allowing <strong>investors in Luxembourg</strong> real estate to define the most relevant acquisition strategy in order to obtain the best return on their investment.</p>
<h2>Legal structuring</h2>
<p>Creating or managing a <strong>real estate legal structure</strong> cannot be improvised. The firm guides its clients in choosing the optimal legal form to structure their <strong>real estate investments</strong> (natural person, partnership, commercial company, specialized fund, etc).</p>
<h2>Luxembourg real estate tax advice</h2>
<p>The tax treatment of an <strong>investment</strong> must be carefully analyzed upstream. Is it a purchase to obtain a <strong>rental yield for residential or commercial purposes</strong>, for resale, for acquisition for residential or professional purposes ...</p>
<p>All these options must be analysed during the purchase so that the operation can benefit from the most favourable tax.</p>
<h2>Real estate negotiation in Luxembourg</h2>
<p>The intervention of a <strong>real estate lawyer in Luxembourg</strong> is of interest from the drafting of the sales agreement onwards.</p>
<p>The lawyer advises you in the negotiation or the audit of the various <strong>clauses of the purchase contract</strong> (suspensive conditions, resolutory, indemnities, relating to the object, etc.).</p>
<p>Unclear or poorly drafted clauses can prove to be a considerable source of litigation.<br>Having the assistance of a knowledgeable legal advisor during <strong>real estate negotiations</strong> helps to avoid errors with serious consequences.</p>
`,
    },
    ancienne_url: { fr: 'avocat-investissements-immobilier-luxembourg-fiscalite-immobiliere.php', en: 'real-estate-investment-lawyer-luxembourg-tax-real-estate.php' },
  },
  {
    id: 'marques-droits-auteur',
    ordre: 6,
    slug: { fr: 'marques-et-droits-d-auteur', en: 'trademark-filing' },
    terme: { fr: 'Dépôts de marques, droits d’auteur', en: 'Trademark filing' },
    definition: {
      fr: 'Une organisation de la protection des droits relatifs aux marques commerciales, brevets',
      en: 'The LORANG & WINGERTER firm carries out the following on behalf of its clients in the field of intellectual property.',
    },
    texte: {
      fr: `
<p>Le cabinet LORANG &amp; WINGERTER effectue pour le compte de ses clients dans le domaine de la propriété intellectuelle:</p>
<ul><li>Des avis juridiques et fiscaux</li><li>Organisation de la protection des droits relatifs aux marques commerciales, noms de domaines et droits d’auteur au niveau national et européen.</li></ul>
`,
      en: `
<p>The LORANG &amp; WINGERTER firm carries out the following on behalf of its clients in the field of intellectual property:</p>
<ul><li>Legal opinions,</li><li>Organization of the protection of rights relating to trademarks, domain names and copyrights.</li></ul>
`,
    },
    ancienne_url: { fr: 'avocat-depot-brevet-marque-luxembourg.php', en: 'lawyer-patent-luxembourg-trademark.php' },
  },
  {
    id: 'banque-finance',
    ordre: 7,
    slug: { fr: 'banque-et-finance', en: 'banking-and-finance' },
    terme: { fr: 'Banque et Finance', en: 'Banking and law' },
    definition: {
      fr: 'Le cabinet LORANG & WINGERTER assiste et conseille ses clients, institutionnels ou privés, dans leurs opérations',
      en: 'The LORANG & WINGERTER firm assists and advises its institutional or private clients in their operations.',
    },
    texte: {
      fr: `
<p>Le cabinet LORANG &amp; WINGERTER assiste et conseille ses clients, institutionnels ou privés, dans leurs opérations ayant pour trait:</p>
<ul><li>Les structures d'investissement</li><li>Private equity et capital risque</li><li>Les instruments financiers</li></ul>
<p>De même, tout au long de leur démarches, le cabinet LORANG et WINGERTER assiste ses clients en conformité avec les différentes réglementations sectorielles actuelles.</p>
`,
      en: `
<p>The LORANG &amp; WINGERTER firm assists and advises its institutional or private clients in their operations relating to:</p>
<ul><li>Investment structures and funds,</li><li>Private equity and venture capital,</li><li>Financial instruments.</li></ul>
<p>Likewise, throughout their procedures, the LORANG and WINGERTER firm assist their clients in accordance with the various current financial regulations.</p>
`,
    },
    ancienne_url: { fr: 'avocat-droit-bancaire-financier-luxembourg.php', en: 'lawyer-banking-financial-law-luxembourg.php' },
  },
  {
    id: 'domiciliation-societes',
    ordre: 8,
    slug: { fr: 'domiciliation-de-societes', en: 'domiciliation-of-companies' },
    terme: { fr: 'Domiciliation de sociétés', en: 'The domiciliation of companies' },
    definition: {
      fr: 'La "domiciliation" ou "élection de domicile" est le choix d\'un lieu que fait une personne pour les besoins de l\'exécution d\'un contrat',
      en: 'The law firm LORANG & WINGERTER organizes the activity of incorporation and domiciliation of different types of companies',
    },
    texte: {
      fr: `
<p>Le cabinet LORANG – WINGERTER organise l’activité de constitution et de domiciliation des différents types de sociétés au Luxembourg en sa qualité de domiciliataire agréé.</p>
<h2>Définition et domaine de la domiciliation de sociétés</h2>
<p>La <strong>domiciliation de sociétés</strong> est une activité réglementée par la loi du 31 Mai 1999. On parle de domiciliation de sociétés au <strong>Luxembourg</strong> dans l'hypothèse où la société choisit d'établir son siège dans les locaux d'un tiers, sans qu'il s'agisse d'une location, et que celui-ci preste en sus des services à la société tels que le secrétariat juridique, ainsi que le suivi administratif.</p>
<h2>Base légale de la domiciliation de sociétés</h2>
<p>L’activité de domiciliation de sociétés est réglementée en <strong>droit luxembourgeois</strong> par la Loi du 31 Mai 1999, qui en réserve l'exercice à certaines professions réglementées, dont les avocats.</p>
<p>Les <strong>avocats au Luxembourg</strong> exercent la fonction de domiciliataire sous l'autorisation et le contrôle de l'Ordre des Avocats du Barreau de Luxembourg.</p>
<h2>Modalités pratiques de la domiciliation de sociétés</h2>
<p>Un <strong>contrat</strong> portant sur la domiciliation de sociétés est obligatoirement signé entre l'avocat luxembourgeois domiciliataire et la société domiciliée au Luxembourg. La loi fait obligation au client de fournir au domiciliataire une documentation juridique précise sur l'identité du bénéficiaire effectif de la société.</p>
<p>La <strong>convention de domiciliation</strong> détaille les conditions d'intervention du domiciliataire luxembourgeois, les services et prestations ainsi que leurs coûts.</p>
<p>En pratique, la <strong>durée de la convention de domiciliation</strong> couvre une période annuelle renouvelable par tacite reconduction, en l'absence de dénonciation.</p>
<p>Les <strong>sociétés</strong> sont domiciliées dans des locaux affectés spécialement à cette activité séparés du siège principal du cabinet. Un personnel spécialement dédié s'occupe du suivi administratif ainsi que de la réception et du suivi du courrier. Sur demande les services juridiques annexes tels la tenue des assemblées peuvent également être prestés.</p>
<p>L'établissement et le dépôt des comptes sont fournis aux sociétés domiciliées par l'intermédiaire des partenaires comptables du cabinet.</p>
<h2>La domiciliation des sociétés commerciales au Luxembourg</h2>
<p>La <strong>loi luxembourgeoise</strong> ne permet pas aux sociétés dont l'objet social est commercial et sont soumises à une autorisation d'établissement de conclure un <strong>contrat de domiciliation</strong> avec un professionnel domiciliataire.</p>
<p>Celles-ci ont l'obligation de posséder des infrastructures suffisantes pour exercer leurs <strong>activités commerciales au Luxembourg</strong>.</p>
<p>La domiciliation chez un professionnel même agréé ne permet pas de remplir ce critère.</p>
<p>Le <strong>cabinet d'avocats Lorang</strong> peut selon les places disponibles offrir des bureaux privatifs dans son business center.</p>
<p>A défaut, il assistera ses clients dans leurs recherches de locaux propres à héberger l'activité de leur société.</p>
`,
      en: `
<p>The LORANG &amp; WINGERTER firm organizes the activity of constitution and domiciliation of the various types of companies in Luxembourg in its capacity as an authorized domiciliary agent.</p>
<h2>Definition and scope of the domiciliation of companies</h2>
<p>The <strong>domiciliation of companies</strong> is an activity regulated by the law of May 31, 1999. The domiciliation of companies in <strong>Luxembourg</strong> is relevant if the company chooses to establish its head office in the premises of a third party, without it involving a rental, and the latter also providing services to the company such as the legal secretariat, as well as administrative follow-up.</p>
<h2>Legal basis for the domiciliation of companies in Luxembourg.</h2>
<p>The domiciliation of companies is regulated <strong>under Luxembourg</strong> law by the Law of May 31, 1999, which reserves the exercise of this activity to certain regulated professions, including lawyers.</p>
<p><strong>Lawyers in Luxembourg</strong> exercise the domiciliary function under the authority and supervision of the Bar Association of Luxembourg.</p>
<h2>Legal requirements for the domiciliation of companies</h2>
<p>A <strong>contract</strong> relating to the domiciliation of companies must be signed between the Luxembourg domiciliary lawyer and the company domiciled in Luxembourg. The law requires the client to provide the domiciliary agent with precise legal documentation on the identity of the beneficial owner of the company.</p>
<p>The <strong>domiciliation agreement</strong> details the conditions of the intervention of the Luxembourg domiciliary agent, the services and benefits as well as their costs.</p>
<p>In practice, the <strong>duration of the domiciliation agreement</strong> covers an annual period renewable by tacit agreement, in the absence of termination.</p>
<p>The <strong>companies</strong> are domiciled in premises specially assigned to this activity and separated from the main office of the firm. Specially dedicated staff takes care of the administrative follow-up as well as the reception and the follow-up of mail. Additional legal services such as holding meetings can also be provided, on request.</p>
<p>The preparation and filing of accounts are provided to domiciled companies through the firm's accounting partners.</p>
<h2>THE DOMICILIATION OF COMMERCIAL COMPANIES IN LUXEMBOURG</h2>
<p><strong>Luxembourg law</strong> does not allow companies the corporate purpose of which is commercial and that are subject to a business permit to conclude a <strong>domiciliation contract</strong> with a domiciliary professional.</p>
<p>They are required to have sufficient infrastructure to carry out their <strong>commercial activities in Luxembourg</strong>.</p>
<p>Domiciliation even with an approved professional, does not allow this criterion to be met.</p>
<p>The <strong>Lorang law firm</strong> may, depending on the availability of space, offer private offices in its business center.</p>
<p>Otherwise, it will assist its clients in their search for premises suitable for accommodating the activity of their company.</p>
`,
    },
    ancienne_url: { fr: 'avocat-domiciliation-societes-luxembourg.php', en: 'lawyer-domiciliation-companies-luxembourg.php' },
  },
  {
    id: 'creation-societes',
    ordre: 9,
    slug: { fr: 'creation-d-entreprises', en: 'company-formation' },
    terme: { fr: 'Création d\'entreprises et constitution de sociétés au Luxembourg', en: 'Creation of companies and incorporation of companies' },
    definition: {
      fr: 'Notre cabinet d\'avocats apporte son expertise juridique et fiscale aux entrepreneurs désireux d\'implanter leur société au Luxembourg',
      en: 'Our law firm provides legal and tax expertise to entrepreneurs wishing to set up their company in Luxembourg.',
    },
    texte: {
      fr: `
<p>Notre cabinet d'avocats apporte son expertise juridique et fiscale aux entrepreneurs désireux d'implanter leur société au Luxembourg</p>
<h2>Créer une société au Luxembourg</h2>
<p>Vous désirez <strong>ouvrir une société au Luxembourg</strong>, le cabinet Lorang-Wingerter vous conseillera dans les différentes étapes de sa constitution et sur les différentes formalités bancaires et administratives à respecter et notamment :</p>
<h3>Phase d'étude et de conseil préalable en fiscalité et droit des sociétés</h3>
<p>Nous prodiguons notre <strong>expertise en droit des sociétés et en droit fiscal</strong> pour déterminer la <strong>forme juridique</strong> la plus adaptée à votre projet et à vos contraintes personnelles (SA, SARL, Commandite etc..).</p>
<h3>Élaboration des statuts de la société en cours de constitution</h3>
<p>Les statuts constitutifs des sociétés luxembourgeoises (à l'exception des sociétés civiles) sont établis au Luxembourg sous <strong>forme authentique</strong>. Dans ce cadre, le cabinet apporte son assistance à la rédaction du projet de statuts de la société en collaboration avec <strong>un notaire luxembourgeois.</strong></p>
<p>Ceci implique la détermination de l'objet social de la société, de son capital, de la répartition de celui-ci,<br>de la valeur des parts sociales ou des actions et le cas échéant le démembrement de leur propriété.</p>
<h2>La procédure de compliance et d'anti-blanchiment</h2>
<p>Nous procédons à la constitution d'un dossier de <strong>' due diligence '</strong> pour répondre aux exigences de la législation luxembourgeoise en matière de <strong>blanchiment d'argent</strong> et notamment la documentation légale relative à l'identification du bénéficiaire effectif de la société.</p>
<h2>Phase de l’ouverture du compte bancaire de la société</h2>
<p>Nous aidons à l'établissement du dossier <strong>d'introduction bancaire</strong> en vue de l'ouverture du compte de constitution de la société pour le versement du capital social.</p>
<h2>Obtention de l'autorisation d'établissement</h2>
<p>Celle-ci nécessite la constitution du dossier administratif à l'attention du Ministère de l'Economie en vue de l'obtention d'une <strong>autorisation d'établissement</strong> en cas d'objet social commercial.</p>
<h2>Suivi juridique courant</h2>
<p>Nous vous assistons dans le suivi de la vie sociale, le <strong>suivi administratif</strong> (tenue des conseils, des assemblées ordinaires et extraordinaires, etc...), le <strong>suivi juridique et contractuel</strong>.</p>
`,
      en: `
<p>Our law firm provides legal and tax expertise to entrepreneurs wishing to set up their company in Luxembourg</p>
<h2>Create a company in Luxembourg</h2>
<p>If you wish to <strong>open a company in Luxembourg</strong>, the Lorang-Wingerter firm will advise you in the various stages of its constitution and on the various banking and administrative formalities to be complied with and in particular:</p>
<h3>Planning phase and preliminary advice in tax and company law</h3>
<p>We provide our <strong>expertise in corporate law and tax law</strong> to determine the most suitable <strong>legal form</strong> for your projection and your constraints (SA, SARL, Sponsorship, etc.).</p>
<h3>Drafting of the articles of association of the company to be incorporated</h3>
<p>The articles of incorporation of Luxembourg companies (except for partnerships) are prepared in Luxembourg in <strong>notarized form</strong>. As part of this, the firm assists in the drawing up of the draft articles of association of the company in collaboration with <strong>a Luxembourg public notary</strong>.</p>
<p>This implies the determination of the social object of the company, its capital, the distribution of this one,<br>the value of the company shares or the shares and if necessary the dismemberment of their ownership.</p>
<h2>The compliance and anti-money laundering procedure</h2>
<p>We are preparing a <strong>'due diligence' file</strong> to meet the requirements of Luxembourg law on <strong>money</strong> laundering and in particular the legal documentation relating to the identification of the beneficial owner of the company.</p>
<h2>The phase of the opening of the company's bank account</h2>
<p>We help with the establishment of the <strong>banking introduction</strong> file for the opening of the constitution account of the company for the payment of the share capital.</p>
<h2>Obtaining a business permit</h2>
<p>This requires the constitution of the administrative file for the attention of the Ministry of the Economy intending to obtain a business <strong>permit</strong> in the event of a commercial corporate purpose.</p>
<h2>Current legal follow-up</h2>
<p>We assist you in the follow-up of the social life, the <strong>administrative follow-up</strong> (holding of the councils, the ordinary and extraordinary assemblies, etc ...), the <strong>legal and contractual follow-up</strong>.</p>
`,
    },
    ancienne_url: { fr: 'avocat-creation-d-entreprises-constitution-de-societes-au-luxembourg.php', en: 'lawyer-creation-of-companies-constitution-of-companies-in-luxembourg.php' },
  },
  {
    id: 'habitat-bail',
    ordre: 10,
    slug: { fr: 'droit-de-l-habitat-et-bail-a-loyer', en: 'housing-law-and-rental-leases' },
    terme: { fr: 'Conseil en droit de l\'habitat et en bail à loyer', en: 'Advice on housing law and rental leases' },
    definition: {
      fr: 'Le cabinet vous assiste dans les domaines touchant à l’immobilier.\n- Litiges entre bailleurs et locataires',
      en: 'The firm assists you in matters relating to real estate. Disputes between landlords and tenants',
    },
    texte: {
      fr: `
<p>Le cabinet Lorang &amp; Wingerter vous offre son expertise en matière<br>de droit immobilier et de baux tant privés que commerciaux.</p>
<h2>Assistance à la rédaction de baux commerciaux et d'habitation</h2>
<p>Le <strong>contrat de bail</strong> régit toutes les modalités de location et les obligations respectives entre le bailleur et le locataire ainsi que le cas échéant le garant ou la caution.</p>
<p>Sa <strong>rédaction</strong> doit être faite avec grand soin afin d'éviter de faire valoir efficacement ses droits dans d'éventuels litiges.</p>
<p>Notre <strong>cabinet d'avocats</strong> met à disposition son expertise en matière de baux pour vous assister efficacement dans leur négociation et rédaction.</p>
<p>Nous répondons à vos questionnements juridiques en cas de <strong>renouvellement, renégociation ou résiliation des baux</strong> qu'il s'agisse d'habitations, de locaux commerciaux ou de bureaux situés au <strong>Luxembourg</strong>.</p>
<h2>Recouvrement des loyers impayés pour le compte des propriétaires</h2>
<p>Des <strong>loyers impayés</strong> ont de graves conséquences pour les bailleurs pour qui ils représentent souvent des rentrées financières indispensables.</p>
<p>En cas d'impayé locatif, des mesures doivent être prises sans attendre sous peine de voir le préjudice locatif augmenter.</p>
<p>Le cabinet vous assiste dans l'introduction des procédures adaptées devant les <strong>juridictions luxembourgeoises</strong> afin d'obtenir dans les plus brefs délais le <strong>recouvrement des loyers impayés</strong> qu'ils soient d'origine commerciale ou reposant sur des baux d'habitation.</p>
<h2>Litiges entre bailleurs et locataires au Luxembourg</h2>
<p>Le cabinet vous assiste dans votre <strong>gestion locative</strong> et particulièrement dans ses aspects contentieux :</p>
<ul><li>Contestation de charges de copropriété</li><li>Répartition des charges entre bailleurs et locataires</li><li>Mise en œuvre des cautions locatives et des assurances</li><li>Contentieux relatifs aux dégâts subis par l'immeuble loué</li></ul>
`,
      en: `
<p>Lorang &amp; Wingerter offers you its expertise in real estate law and private and commercial leases.</p>
<h2>Assistance in drafting commercial and residential leases</h2>
<p>The <strong>lease contract</strong> governs all rental terms and the respective obligations between the lessor and the lessee as well as, where applicable, the guarantor or surety.</p>
<p>Its <strong>drafting</strong> must be done with great care to avoid effectively asserting its rights in any litigation.</p>
<p>Our <strong>law firm</strong> provides its expertise in leases to effectively assist you in their negotiation and drafting.</p>
<p>We respond to your legal questions in the event of <strong>renewal, renegotiation or termination of leases</strong>, whether for homes, commercial premises or offices located in <strong>Luxembourg</strong>.</p>
<h2>Collection of unpaid rents on behalf of owners</h2>
<p>Of <strong>unpaid rents</strong> have serious consequences for donors for whom they are often indispensable financial returns.</p>
<p>In the event of rental default, measures must be taken without delay, otherwise, the rental damage will increase.</p>
<p>The firm assists you in the introduction of appropriate procedures before the <strong>Luxembourg courts to</strong> obtain the <strong>recovery of unpaid rents</strong> as quickly as possible, whether they are of the commercial origin or based on residential leases.</p>
<h2>Disputes between landlords and tenants in Luxembourg</h2>
<p>The firm assists you in your <strong>rental management</strong> and particularly in its litigation aspects :</p>
<ul><li>Contestation of co-ownership charges</li><li>Distribution of charges between landlords and tenants</li><li>Implementation of rental guarantees and insurance</li><li>Litigation relating to damage to the rented building</li></ul>
`,
    },
    ancienne_url: { fr: 'avocat-droit-immobilier-bail-luxembourg.php', en: 'lawyer-real-estate-lease-luxembourg.php' },
  },
  {
    id: 'assurance-indemnisation',
    ordre: 11,
    slug: { fr: 'assurance-et-indemnisation', en: 'insurance-and-compensation' },
    terme: { fr: 'Droit de l\'assurance et indemnisation', en: 'Insurance and compensation law' },
    definition: {
      fr: 'L\'"indemnité" est une compensation financière destinée à réparer un dommage. "Indemnisation", "dédommagement" et "réparation" sont synonymes.',
      en: 'The firm assists you in your claims. "Traffic accidents and others". "Domestic claims". "Compensation for victims of crime"',
    },
    texte: {
      fr: `
<p>Un avocat en droit des assurances peut être très utile dans de nombreuses situations. Voici quelques exemples :</p>
<p><strong>1. Réclamation à l'assurance</strong> : Si vous avez une réclamation à l'assurance refusée ou sous-évaluée, un avocat en droit des assurances peut vous aider à comprendre vos droits et à négocier avec l'assureur pour obtenir une indemnisation juste.</p>
<p><strong>2. Litige avec un assureur</strong> : Si vous êtes impliqué dans un litige avec un assureur, par exemple si l'assureur refuse de couvrir une réclamation ou si vous êtes en désaccord sur le montant de l'indemnisation, un avocat en droit des assurances peut vous représenter et défendre vos intérêts.</p>
<p><strong>3. Conseil en matière d'assurance</strong> : Un avocat en droit des assurances peut également vous conseiller sur les types d'assurances dont vous avez besoin pour vous protéger, sur les clauses importantes à rechercher dans les polices d'assurance et sur la manière de gérer les réclamations d'assurance.</p>
<p>Un <strong>avocat en droit des assurances</strong> peut vous aider à comprendre vos droits<br>et à obtenir une indemnisation juste en cas de problème avec votre assureur.</p>
<h2>Droit de l'assurance et indemnisation - Avocat au Luxembourg</h2>
<p>Le cabinet vous assiste dans vos demandes d’indemnisations.</p>
<ul><li>Accidents de circulation et autres</li><li>Sinistres domestiques</li><li>Indemnisation des victimes d’infractions</li><li>Indemnisation de préjudice corporel L’assistance se fait soit devant les juridictions civiles, soit devant les juridictions pénales</li><li>Indemnisation dans le cadre de la construction (dommage – ouvrage / décennale / vices de construction)</li></ul>
`,
      en: `
<p>The firm assists you in your claims.</p>
<ul><li>Traffic accidents and others</li><li>Domestic claims</li><li>Compensation for victims of crime</li><li>Compensation for bodily injury. Assistance is provided either before the civil courts or before the criminal courts</li><li>Compensation in the context of construction (damage - work / ten-year / construction defects)</li></ul>
`,
    },
    ancienne_url: { fr: 'avocat-droit-assurance-indemnisation.php', en: 'lawyer-law-insurance-indemnity.php' },
  },
  {
    id: 'recouvrement-creances',
    ordre: 12,
    slug: { fr: 'recouvrement-de-creances', en: 'debt-collection' },
    terme: { fr: 'Recouvrement de créances au Luxembourg', en: 'Debt collection in Luxembourg' },
    definition: {
      fr: 'Les professionnels sont tenus de prendre des mesures proportionnées à leurs risques, à leur nature et à leur taille',
      en: 'Professionals are required to take measures proportionate to their risks, their nature and their size',
    },
    texte: {
      fr: `
<p>L'avocat peut jouer un rôle important dans le recouvrement de créances en représentant le créancier dans le processus de recouvrement. Les tâches de l'avocat dans le recouvrement de créances peuvent inclure :</p>
<p><strong>La situation du débiteur</strong> : analyser la situation financière du débiteur et évaluer les chances de succès du recouvrement.</p>
<p><strong>Procédures pré–contentieuses</strong> : envoyer des lettres de mise en demeure au débiteur pour le sommer de payer la dette.</p>
<p><strong>Négociations</strong> : négocier un accord de paiement avec le débiteur.</p>
<p><strong>Procédures judiciaires</strong> : engager des procédures judiciaires pour récupérer la créance.</p>
<p><strong>Actifs</strong> : rechercher des actifs du débiteur et engager des procédures pour le créancier devant les tribunaux pour les saisir.</p>
<h2>Recouvrement amiable des créances au Luxembourg - Avocat au Luxembourg</h2>
<p>(A) En cas de créance impayée, le créancier peut mandater l'étude Lorang &amp; Wingerter pour effectuer avant toute demande judiciaire, les démarches nécessaires au recouvrement de sa créance.</p>
<p>Le recouvrement de créance au Luxembourg ne peut être effectué que par un professionnel agréé même s’il ne s’agit que d’une démarche amiable.</p>
<p>Cette démarche est essentielle, la majorité des créances sont dans les faits recouvrées à ce stade.</p>
<p>Ce recours présente de nombreux avantages :</p>
<ul><li>Nous pouvons concéder des délais de paiement tout en essayant d’évaluer une solution vivable / adéquate, tant pour le créancier, que le débiteur ;</li><li>Le coût peu onéreux de cette alternative fait l’économie de la procédure judiciaire ;</li></ul>
<p>(B) Sécurité des fonds recouvrés :</p>
<ul><li>Le cabinet est couvert par une assurance professionnelle couvrant sa responsabilité civile en rapport avec son activité.</li><li>Les fonds récupérés sont affectés à un compte bancaire spécialement affecté aux actifs financiers appartenant à des tiers.</li></ul>
<h2>Recouvrement judiciaire - Avocat au Luxembourg</h2>
<p>Pour le recouvrement des créances au Grand-Duché de Luxembourg, l'étude Lorang &amp; Wingerter privilégie toujours si le cas s’avère possible, les procédures dites simplifiées :</p>
<ul><li>Ordonnance de paiement (créance &lt; ou égal à 10.000,00 EUR)</li><li>Juridiction saisie : Justice de Paix (Luxembourg / Esch-sur-Alzette / Diekirch)</li><li>Requête « article 919 » (créance &gt; 10.000,00 EUR)</li><li>Juridiction saisie : Tribunal d’Arrondissement de Luxembourg.</li></ul>
<p>Par le biais de ces deux procédures, le coût se trouve allégé, sans compter que les délais sont très raisonnables et varient entre 3 à 6 mois.</p>
<p>Une fois le titre exécutoire obtenu, dans le cadre de ces deux procédures, il est transmis à l’huissier pour exécution. Il faut retenir :</p>
<ul><li>Que l’huissier prélève directement ses frais sur le débiteur ;</li><li>Les cas exceptionnels où les frais restent à la charge du créancier :<br>faillite, insolvabilité ;</li></ul>
<p>Nous avons à cœur d’éviter des frais inutiles et irrécupérables à nos clients, nous effectuons toujours un certain nombre de vérification, qui nous permettent de garantir à nos clients un maximum de réussite.</p>
<p>La théorie de la facture acceptée est valeur sûre et privilégiée sur le territoire du Grand-Duché de Luxembourg, qui rend le recouvrement de créance commerciale plus facile.</p>
<p>En matière de facture, le défaut de contestation vaut acceptation ! La facture est acceptée, suivant la jurisprudence, si elle n’a pas été contestée à bref délai.</p>
`,
      en: `
<p>(A) In the event of unpaid debt, the creditor may mandate the Lorang &amp; Wingerter firm to carry out, before any legal request, the necessary steps to recover his debt.</p>
<p>Debt collection in Luxembourg can only be carried out by an approved professional even if it is only an amicable process.</p>
<p>This step is essential, the majority of debts are recovered at this stage. This remedy has many advantages:</p>
<ul><li>We can concede payment terms while trying to assess a viable/adequate solution, both for the creditor and the debtor;</li><li>The inexpensive cost of this alternative saves having to go through the legal process.</li></ul>
<p>(B) Security of collected funds:</p>
<ul><li>The firm is covered by professional insurance covering its civil liability in connection with its activity;</li><li>Recovered funds are allocated to a bank account specifically allocated to financial assets belonging to third parties.</li></ul>
<h2>Judicial recovery - Lawyers in Luxembourg</h2>
<p>For the recovery of debts in the Grand Duchy of Luxembourg, the Lorang &amp; Wingerter firm always prefers, if at all possible, the so-called simplified procedures:</p>
<ul><li>Payment order (claim &lt; or equal to 10,000.00 EUR)</li><li>Court seized: Justice of the Peace (Luxembourg / Esch-Sur-Alzette / Diekirch)</li><li>“Article 919” request (claim &gt; 10,000.00 EUR)</li><li>Jurisdiction seized: District Court of Luxembourg.</li></ul>
<p>Employing these two procedures, the cost is reduced, not to mention that the deadlines are very reasonable and vary between 3 to 6 months.</p>
<p>Once the writ of execution has been obtained, within the framework of these two procedures, it is sent to the bailiff for execution. We must remember:</p>
<ul><li>That the bailiff deducts his costs directly from the debtor;</li><li>Exceptional cases where the costs remain the responsibility of the creditor:<br>bankruptcy, insolvency;</li></ul>
<p>We are committed to avoiding unnecessary and irrecoverable costs to our customers, we always carry out a certain number of checks, which allow us to guarantee our customers’ maximum success.</p>
<p>The theory of the accepted invoice is a safe and privileged value in the territory of the Grand Duchy of Luxembourg, which makes the recovery of commercial debt easier.</p>
<p>In terms of the invoice, the lack of dispute constitutes acceptance! The invoice is accepted, according to case law, if it has not been contested at short notice.</p>
`,
    },
    ancienne_url: { fr: 'avocat-recouvrement-amiable-judiciaire-luxembourg.php', en: 'lawyers-debt-collection-luxembourg.php' },
  },
  {
    id: 'gestion-patrimoine',
    ordre: 13,
    slug: { fr: 'gestion-de-patrimoine', en: 'wealth-management' },
    terme: { fr: 'Conseil en gestion de patrimoine et droit patrimonial', en: 'Wealth management advice and property law in Luxembourg' },
    definition: {
      fr: 'Le cabinet Lorang & Wingerter vous assiste dans le conseil juridique, fiscal, successoral et financier de votre patrimoine mobilier et immobilier.',
      en: 'The law firm LW Legis assists you with legal, tax, inheritance and financial advice on your movable and immovable assets.',
    },
    texte: {
      fr: `
<p>Le cabinet Lorang &amp; Wingerter vous assiste dans le conseil juridique, fiscal, successoral et financier de votre patrimoine mobilier et immobilier que ce soit dans un contexte national au Luxembourg ou à l’international.</p>
<p>Le long des différentes étapes d’une vie professionnelle ou personnelle, nous conseillons nos clients pour trouver les solutions adaptées et les outils juridiques à utiliser en fonction de leurs contraintes et choix de vie.</p>
<p>Un <strong>avocat au Luxembourg spécialisé en gestion de patrimoine</strong> aide ses clients à planifier leur succession, à gérer et à protéger leur patrimoine, à structurer leurs investissements et à minimiser les impôts et prélèvements.</p>
<p>Il peut également aider les clients à négocier des contrats, constituer au besoin des structures juridiques patrimoniales, rédiger des testaments, conseiller sur les questions fiscales et représenter les clients dans des litiges liés à la gestion de leur patrimoine.</p>
<p>En général, un avocat spécialisé en gestion de patrimoine travaille en étroite collaboration avec d'autres professionnels, tels que des conseillers financiers, des comptables, banquiers, notaires pour aider les clients à atteindre leurs objectifs financiers à long terme.</p>
<p>Notre expertise s’appuie sur de solides compétences dans les domaines juridiques concernés que cela soit <strong>l’organisation des successions, le droit des sociétés, les problématiques fiscales ou le droit immobilier.</strong></p>
<h2>Family office au Luxembourg</h2>
<p>La législation luxembourgeoise autorise les avocats à agir en tant que <strong>family officer</strong>.</p>
<p>Nous pouvons ainsi créer des équipes dédiées à nos clients composées de professionnels aussi divers que des gérants de fortune, des banquiers, des assureurs, des notaires, agents immobiliers ou des experts comptables afin d’offrir des solutions sur mesure au client.</p>
<p>Nous assumons la <strong>gestion</strong> et la <strong>coordination</strong> de l’ensemble de ces services pour le compte de nos clients.</p>
<h2>Mandat en matière de gestion de fortune</h2>
<p>La loi luxembourgeoise permet aux avocats d’être mandatés en matière de <strong>gestion d’actifs</strong>.</p>
<p>Nous vous assistons dans vos <strong>choix d’investissements</strong> tant mobiliers qu’immobiliers.</p>
<p>Notre indépendance de tout groupe vous garantit une parfaite impartialité dans la sélection de vos investissements.</p>
<h2>Ouverture de compte bancaire</h2>
<p>Nous assistons nos clients dans la sélection d'établissements susceptibles d'ouvrir des comptes personnels ou de sociétés.</p>
<p>Nous prenons en charge la préparation des documents d'<strong>ouverture bancaire</strong> et la documentation de due diligence requise par la <strong>législation sur le blanchiment d'argent</strong>.</p>
<h2>Transmission et gestion d’entreprise</h2>
<p>Que vous soyez dirigeant d’entreprise ou associé de celle-ci nous vous accompagnons dans la <strong>gestion de l’entreprise et la défense de vos intérêts patrimoniaux</strong>.</p>
`,
      en: `
<p>The law firm LW Legis assists you with legal, tax, inheritance and financial advice on your movable and immovable assets, whether in a national context in Luxembourg or internationally.</p>
<p>Throughout the different stages of a professional or personal life, we advise our clients to find the right solutions and legal tools to use according to their constraints and life choices.</p>
<p>A Luxembourg <strong>wealth management lawyer</strong> helps clients plan their succession, manage and protect their assets, structure their investments and minimize taxes and levies.</p>
<p>He or she can also help clients negotiate contracts, set up legal structures for their assets, draw up wills, advise on tax issues and represent clients in wealth management disputes.</p>
<p>In general, a wealth management lawyer works closely with other professionals, such as financial advisors, accountants, bankers and notaries, to help clients achieve their long-term financial goals.</p>
<p>Our expertise is underpinned by solid skills in the relevant legal fields, whether estate planning, corporate law, tax issues or real estate law.</p>
<h2>Family office in Luxembourg</h2>
<p>Luxembourg law allows lawyers to act as <strong>family officers</strong>.</p>
<p>We can therefore create dedicated teams for our clients, made up of professionals as diverse as asset managers, bankers, insurers, notaries, real estate agents and accountants, to offer tailor-made solutions.</p>
<p>We <strong>manage</strong> and <strong>coordinate</strong> all these services on behalf of our customers.</p>
<h2>Asset management mandate</h2>
<p>Luxembourg law allows lawyers to be mandated in <strong>asset management</strong>.</p>
<p>We can assist you in your <strong>choice of investments</strong> in both real estate and securities.</p>
<p>Our independence from any group guarantees you complete impartiality in your investment selection.</p>
<h2>Opening a bank account</h2>
<p>We assist our clients in selecting institutions to open personal or corporate accounts.</p>
<p>We take charge of preparing the <strong>bank opening</strong> documents and the due diligence documentation required by <strong>anti-money laundering legislation</strong>.</p>
<h2>Business transfer and management</h2>
<p>Whether you're a company director or a partner, we can help you <strong>manage your business and protect your financial interests.</strong></p>
`,
    },
    ancienne_url: { fr: 'avocat-conseil-gestion-et-droit-patrimoine-luxembourg.php', en: 'lawyer-advisor-management-and-wealth-law-luxembourg.php' },
  },
];
