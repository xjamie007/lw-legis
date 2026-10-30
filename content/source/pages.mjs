/**
 * content/source/pages.mjs — Seitentexte.
 *
 * Wortgetreu von der alten Seite (cabinet-avocats-lorang.com) uebernommen,
 * Franzoesisch und Englisch. Nichts umgeschrieben, gekuerzt oder uebersetzt;
 * nur eindeutige Tippfehler sind korrigiert. `en: null` heisst: die alte
 * Seite hat dafuer keine englische Fassung.
 *
 * Weggelassen sind Platzhalter der alten Seite (Lorem ipsum, Zeitleiste,
 * Kennzahlen, Muster-Testimonials, Kreditrechner) sowie Navigation,
 * Buttons und Footer-Credits.
 */
export const PAGES = {
  // =========================================================================
  accueil: {
    titre: { fr: "Cabinet d'avocats au Luxembourg", en: 'Law firm in Luxembourg' },
    intro: {
      fr: "L'étude d’Avocats LW LEGIS est spécialisée en droit des sociétés au Luxembourg et en fiscalité internationale, elle conseille ses clients dans les domaines de la constitution et de la gestion de structures sociétaires adaptées à leurs besoins au Grand-Duché du Luxembourg.",
      en: 'The Law Firm LW LEGIS specialises in Real Estate and Patrimonial law, Luxembourg Company Law and International Taxation. We advise our entrepreneur clients in the areas of constitution, management and domiciliation of corporate structures adapted to their needs in the Grand Duchy of Luxembourg.',
    },
    cabinet_titre: {
      fr: "L'étude d’Avocats LW LEGIS, cabinet d’avocats luxembourgeois",
      en: 'The Law Firm LW LEGIS',
    },
    cabinet_texte: {
      fr: `<p>Le cabinet d’avocats luxembourgeois LW LEGIS a été créé par et autour de Maître Alain LORANG, Avocat inscrit au barreau de Luxembourg depuis 1982.</p>
<p>Titulaire d’une spécialisation en droit des affaires de l’Université de Paris II Panthéon-Assas et diplômé de Sciences Po Paris (ECO-FIN), il anime une équipe de collaborateurs eux-mêmes spécialisés qui assurent un traitement professionnel aux dossiers confiés.</p>
<p>Me. Alain Lorang est également expert judiciaire assermenté auprès de la Cour d’Appel de Luxembourg.</p>
<p>L'étude LW LEGIS est spécialisée en droit immobilier et patrimonial, en droit des sociétés luxembourgeois et en fiscalité internationale.</p>
<p>Elle conseille ses clients entrepreneurs dans les domaines de la constitution, la gestion et la domiciliation de structures sociétaires adaptées à leurs besoins au Grand-Duché du Luxembourg.</p>
<p>Le cabinet ne se veut pas une « usine de droit » mais une structure à taille humaine mettant délibérément l’accent sur la relation intuitae personae avec le client.</p>`,
      en: `<p>The Law Firm LW LEGIS in Luxembourg was created by Alain LORANG, a lawyer registered at the Luxembourg bar since 1982.</p>
<p>He is a graduate of the University of Paris II Panthéon Assas with a specialization in business law and a graduate of Sciences Po Paris (ECO-FIN), he leads a team of colleagues who are themselves specialized and ensure the professional handling of entrusted cases.</p>
<p>Alain Lorang is also a sworn legal expert at the Luxembourg Court of Appeal.</p>
<p>The Law Firm LW LEGIS specializes in Real Estate and Property Law, Luxembourg Company Law and International Taxation.</p>
<p>It advises its entrepreneur clients in the areas of the constitution, management and domiciliation of corporate structures tailored to their needs in the Grand Duchy of Luxembourg.</p>
<p>The firm does not see itself as a "legal machine" but a human-sized structure that intentionally places an emphasis on the "Intuitae Personae" relationship with the client.</p>`,
    },
    atouts_titre: {
      fr: "Les atouts de l’étude LW LEGIS, cabinet d'avocats au Luxembourg",
      en: 'ADVANTAGES of the Law Firm LW LEGIS, a law firm in Luxembourg',
    },
    atouts: [
      { titre: { fr: 'Réactivité', en: 'Responsiveness' } },
      { titre: { fr: 'Compétence technique ancienne et éprouvée', en: 'Long-standing and proven technical competence' } },
      { titre: { fr: 'Activité de family office', en: 'Family firm business' } },
      { titre: { fr: 'Réseau international', en: 'International network' } },
    ],
    pourquoi_titre: {
      fr: 'Pourquoi avoir recours à un avocat au Luxembourg ?',
      en: 'Why do I need a lawyer in Luxembourg ?',
    },
    pourquoi_texte: {
      fr: `<p>Un <strong>avocat</strong> est un professionnel du droit qui peut vous aider à comprendre vos droits et obligations juridiques.</p>
<p>Les avocats peuvent vous aider à rédiger des contrats, à négocier des accords, à représenter vos intérêts devant les tribunaux, à obtenir des indemnités en cas de préjudice, à résoudre des conflits et à obtenir des conseils juridiques en général.</p>
<p>Les avocats peuvent également vous aider à naviguer dans le système juridique et à comprendre les procédures judiciaires. Si vous avez des questions juridiques ou si vous avez besoin d'aide pour résoudre un problème juridique, il est recommandé de consulter un avocat qualifié pour obtenir des <strong>conseils juridiques</strong>.</p>
<p>Dans un <strong>procès</strong>, un avocat représente les intérêts de son client devant un tribunal. L'avocat peut aider son client à préparer sa défense.</p>
<p>Il va ainsi recueillir des preuves, à négocier des accords de règlement, à interroger des témoins et à plaider sa cause devant les juridictions. L'avocat peut également aider son client à comprendre les <strong>procédures judiciaires</strong>, à répondre aux arguments de l'adversaire et à faire valoir <strong>ses droits devant le tribunal</strong>.</p>
<p>En outre, un avocat peut aider son client à <strong>évaluer les risques et les avantages d'un procès</strong>, à comprendre les conséquences possibles d'une décision judiciaire défavorable et à décider s'il est dans l'intérêt de son client de poursuivre ou de régler l'affaire à l'amiable.</p>
<p>Dans l'ensemble, un avocat est un allié précieux pour toute personne impliquée dans un procès, car il peut offrir une <strong>expertise juridique</strong> et une représentation compétente pour aider son client à obtenir le meilleur résultat possible.</p>`,
      en: `<p>A <strong>lawyer</strong> is an expert in legal matters who helps you understand your legal rights and obligations</p>
<p>A lawyer helps you with drawing up contracts, negotiating agreements, representing your interests in court, obtaining compensation for damages, resolving disputes and obtaining general legal advice.</p>
<p>Lawyers also help with navigating through the legal system and understanding court procedures. If you have legal questions or need help solving any legal issues, it is advisable to consult a qualified lawyer for such.</p>
<p>In a <strong>lawsuit</strong>, a lawyer represents his/her client's interests in court. The lawyer helps clients prepare their defense.</p>
<p>He will gather evidence, negotiate settlement agreements, interview witnesses and plead his case before the court. Lawyers may also help their clients understand court procedures, respond to their adversaries' arguments and assert their rights in court.</p>
<p>In addition, a lawyer helps clients with assessing a lawsuit’s risks and benefits, understanding the possible consequences of an unfavorable court decision, and deciding whether it is in the client's best interest to proceed or settle the case out of court.</p>
<p>All in all, a lawyer is a valuable ally for anyone involved in a legal procedure, whether it’s a lawsuit, as they offer legal expertise to help clients achieve the best possible outcome.</p>`,
    },
    specialiste_titre: {
      fr: "Cabinet d'avocats au Luxembourg, spécialiste du droit luxembourgeois et international",
      en: 'Luxembourg law firm, specializing in local and international law',
    },
    specialiste_texte: {
      fr: `<p>Le cabinet d’avocats LW LEGIS est autorisé à procéder à la domiciliation de sociétés au Luxembourg dans l’hypothèse où celles-ci ne disposent pas de locaux propres.</p>
<p>Le cabinet LW LEGIS est actif dans de nombreuses matières contentieuses du droit luxembourgeois, notamment le droit civil, le droit commercial, le droit de la responsabilité et des assurances, ainsi que dans le recouvrement de créances sur des débiteurs, personnes physiques ou morales ayant leur siège au Luxembourg ou à l’étranger.</p>
<p>Le cabinet L&amp;W a aussi la capacité d’accompagner ses clients dans leurs besoins en matière de propriété intellectuelle et industrielle.</p>
<p>Dans cette optique, nous conseillons nos clients et effectuons pour leur compte des dépôts de marques au niveau du Benelux et au niveau Européen.</p>
<p>Ouvert à une clientèle internationale, le cabinet L&amp;W est le représentant officiel au Luxembourg du groupe Intrum Justitia ainsi que de la filiale spécialisée au service des entreprises IJCOF spécialiste européen du contentieux commercial en matière de recouvrement de créances.</p>
<p>Le cabinet est affilié au réseau international d’avocats ADVOUNION ainsi que représentant pour le Luxembourg de la LIC (League International for Creditors).</p>`,
      en: `<p>LW LEGIS is authorized to domicile companies in Luxembourg if they do not have their own on-sites.</p>
<p>LW LEGIS is active in a wide range of local law, including civil law, commercial law, liability and insurance law, as well as debt collection from debtors, whether individuals or companies based in Luxembourg or abroad.</p>
<p>At LW Legis, we assist our clients with their intellectual and industrial property.</p>
<p>We advise our clients in registering trademarks within the Benelux countries and throughout Europe.</p>
<p>Open to an international clientele, the law firm LW Legis is the official representative in Luxembourg of the Intrum Justitia group, as well as of its subsidiary IJCOF, a European specialist in commercial litigation and debt collection.</p>
<p>The firm is a member of the ADVOUNION international network of lawyers, and the Luxembourg representative of LIC (League International for Creditors).</p>`,
    },
    conferences_texte: {
      fr: "Le cabinet LW LEGIS propose de manière récurrente tout au long de l'année des conférences sur des thèmes divers. La présentation est assurée par Maître Alain LORANG.",
      en: 'The Law Firm LW LEGIS regularly offers conferences on various topics throughout the year. They are presented by Alain LORANG.',
    },
    pied_texte: {
      fr: 'Nos avocats sont aguerris dans de multiples activités du dépôts de brevets et marques au monde de la finance, le droit immobilier, le recouvrement sous toutes ses formes, assurance, indemnisation, domiciliation ...',
      en: 'Our lawyers are experienced in multiple activities from the filing of Patents and Trademarks to the World of Finance, Real Estate Law, Recovery in all its forms, Insurance, Compensation, Domiciliation ...',
    },
  },

  // =========================================================================
  avocats: {
    titre: { fr: "Les avocats de l'étude LW LEGIS", en: 'The lawyers from the law Firm LW LEGIS' },
    intro: {
      fr: `<p>Le cabinet est composé d’avocats expérimentés sous la responsabilité de <strong>Maître Alain LORANG</strong>.</p>
<p>Flexibilité, compétences transversales, conseils experts, connaissance parfaite du Luxembourg, de ses spécificités et de ses atouts, un suivi efficace de chaque dossier.</p>
<p>Notre expérience dans le droit luxembourgeois, l'expérience et les compétences de notre cabinet nous permettent d'intervenir dans de nombreux domaines pour défendre vos droits, avec les critères d'exigences les plus élevés, une passion de conseiller au quotidien, des services conformes aux standards les plus exigeants.</p>`,
      en: `<p>The firm is composed of experienced lawyers in the persons of the founding partner <strong>Alain LORANG</strong>.</p>
<p>Flexibility, transversal skills, expert advice, perfect knowledge of Luxembourg, its specificities and its assets, effective follow-up of each case.</p>
<p>Our experience in Luxembourg law and the experience and skills of our firm allow us to intervene in many areas to defend your rights, with the highest standards, a passion for day-to-day advisory work and services meeting the most demanding standards.</p>`,
    },
    accroche: {
      fr: "Le cabinet d’avocats LW LEGIS, c'est avant tout une qualité de travail reconnue",
      en: 'The lawyers from the law Firm LW LEGIS are above all recognized for the quality of their work.',
    },
  },

  // =========================================================================
  activites: {
    titre: { fr: "Nos activités en tant qu'avocats au Luxembourg", en: 'Our activities as lawyers in Luxembourg' },
    intro: {
      fr: "Le cabinet dispose d'une large palette de compétences en droit luxembourgeois, français et européen dans la gestion des dépôts, brevets, marques, le domaine bancaire, le monde de la finance, la domiciliation des entreprises, le droit à l'assurance et à l'indemnisation, le recouvrement de créances ...",
      en: 'The firm has a wide range of expertise in Luxembourg, French and European law in the Management of Filings, Patents, Trademarks, the Banking Sector, the World of Finance, the Domiciliation of Companies, the right to Insurance and Compensation, Debt Recovery ...',
    },
  },

  // =========================================================================
  dossiers: {
    titre: { fr: "Les dossiers thématiques de l'étude d’avocats LW LEGIS", en: 'Thematic files from the Law Firm LW LEGIS' },
    intro: {
      fr: "Immobilier, économie, fiscalité, finance, recouvrement, créance, conformité avec la loi, procédure anti-blanchiment ... un cabinet d'expertise en droit luxembourgeois.",
      en: 'Real estate, economy, taxation, finance, recovery, debt, compliance with the law, anti-money laundering procedure... an expertise firm in Luxembourg law.',
    },
  },

  // =========================================================================
  // Die Konferenzseite hat keinen Einleitungstext und keine englische
  // Fassung; die Einleitung ist der Konferenz-Satz der Startseite.
  conferences: {
    titre: { fr: "Les conférences de l'avocat Lorang au Luxembourg", en: null },
    intro: {
      fr: "Le cabinet LW LEGIS propose de manière récurrente tout au long de l'année des conférences sur des thèmes divers. La présentation est assurée par Maître Alain LORANG.",
      en: 'The Law Firm LW LEGIS regularly offers conferences on various topics throughout the year. They are presented by Alain LORANG.',
    },
  },

  // =========================================================================
  partenaires: {
    titre: { fr: "Les partenaires de notre cabinet d'avocats au Luxembourg", en: 'Partners of our law firm in Luxembourg' },
    intro: {
      fr: "L/W a noué des relations de travail avec d'autres cabinets afin de procurer un meilleur service à sa clientèle.",
      en: 'LW Legis has established working relationships with other law firms to provide better service to our clients.',
    },
    partenaires: [
      {
        id: 'viajuris',
        nom: { fr: "Cabinet d'avocats VIAJURIS", en: 'VIAJURIS law firm' },
        lieux: {
          fr: 'Saint-Etienne, Lyon, Le Puy-en-Velay, Paris et Luxembourg',
          en: 'Saint-Etienne, Lyon, Le Puy-en-Velay, Paris and Luxembourg',
        },
        texte: {
          fr: `<p>« Créé en 1992, le <strong>cabinet d'avocats VIAJURIS</strong> est aujourd’hui solidement implanté en région Rhône-Alpes Auvergne mais aussi à Paris. Avec une quarantaine de personnes organisées par pôles de compétences, notre cabinet couvre les besoins essentiels du chef d’entreprise, qu’il s’agisse de droit des sociétés, droit fiscal, droit social, droit des contrats et des nouvelles technologies ou contentieux des affaires.</p>
<p>Intervenant en synergie, nos équipes ont pour ambition d’élaborer des solutions concrètes, pragmatiques et innovantes, créatrices de valeur chez nos clients.</p>
<p>Ces derniers, entrepreneurs, dirigeants et investisseurs, majoritairement implantés dans la région Rhône-Alpes Auvergne s’étendent aussi dans d’autres régions françaises et à l’étranger. Ils sont présents dans de nombreux secteurs d'activité : services, industriel et commercial, distribution, digital, immobilier…</p>
<p>Dans tous les cas, nos clients attendent que nous soyons impliqués à leurs côtés dans les étapes stratégiques de leur développement comme dans leurs difficultés.</p>
<p>C’est notre vocation, c’est notre engagement ».</p>`,
          en: `<p>« Founded in 1992, <strong>the VIAJURIS law firm</strong> is now firmly established in the Rhône-Alpes Auvergne region, as well as in Paris. With a staff of around forty, organized by area of expertise, our firm covers the essential needs of the entrepreneur, whether in corporate law, tax law, employment law, contract law, new technologies or business litigation.</p>
<p>Working in synergy, our teams aim to develop practical, pragmatic and innovative solutions, that create value for our customers.</p>
<p>Our customers, entrepreneurs, managers and investors, are mainly based in the Rhône-Alpes Auvergne region, but also extend to other parts of France and abroad. They are active in a wide range of sectors: services, industrial and commercial, distribution, digital, real estate...</p>
<p>In all cases, our customers expect us to be involved alongside them in the strategic stages of their development, as well as in their difficulties.</p>
<p>This is our vocation and our commitment ».</p>`,
        },
        site: null,
      },
    ],
  },

  // =========================================================================
  contact: {
    titre: { fr: "Pour contacter l'étude d’avocats LW LEGIS", en: 'To contact the Law Firm LW LEGIS' },
    consentement: {
      fr: "En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de devis / d'informations et de la relation commerciale qui peut en découler *",
      en: 'By submitting this form, I accept that the information entered will be used as part of the request for quote / information and the commercial relationship that may result from it *',
    },
    note_droits: {
      fr: "* Pour connaître et exercer vos droits, notamment de retrait de votre consentement à l'utilisation des données collectées par ce formulaire, veuillez consulter notre politique de confidentialité",
      en: '* To know and exercise your rights, in particular to withdraw your consent to the use of the data collected by this form, please consult our confidentiality policy',
    },
  },
};
