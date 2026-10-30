/**
 * content/source/team.mjs — Teammitglieder.
 *
 * Wortgetreu von der alten Seite uebernommen (cabinet-avocats-lorang-luxembourg.php
 * und law-firm-lorang-luxembourg.php). Nur eindeutige Tippfehler sind
 * korrigiert.
 *
 * Stephane Pelzer steht auf der alten Seite in einem HTML-Kommentar, ist dort
 * also nicht sichtbar. Deshalb `statut: 'entwurf'`, bis die Kanzlei bestaetigt.
 * Sein Zulassungsjahr nennt die alte Seite nicht.
 *
 * Felder eines Mitglieds:
 *   id, nom, titre_civil, fonction {fr,en}, barreau_depuis, photo,
 *   bio {fr,en} (HTML), ordre, statut ('entwurf' | 'publie')
 */
export const TEAM = [
  {
    id: 'alain-lorang',
    nom: 'Alain Lorang',
    titre_civil: 'Me',
    fonction: { fr: 'Avocat à la Cour', en: 'Lawyer' },
    barreau_depuis: 1982,
    photo: 'portrait',
    bio: {
      fr: `<p>Diplômé de la faculté de Droit et des Sciences Economiques de Paris II (ASSAS), Maître Lorang obtient une maîtrise en droit des Affaires (Promotion 1980) et intègre ensuite l'Institut d'Etudes Politiques de Paris (Section Economique et Financière) où il sort diplômé en 1981.</p>
<p>Il obtient le certificat du Ministère de l'Education Nationale Luxembourgeoise en Fiscalité en 1985 et le certificat du Centre de Formation Professionnelle des Avocats d'Alsace le 13 Novembre 1990.</p>
<p>Maître Lorang est avocat au Barreau de Luxembourg depuis 1982. Il est également expert-judiciaire auprès de la Cour d'Appel de Luxembourg, ancien secrétaire du Conseil de l'Ordre du Barreau de Luxembourg et enfin membre du Conseil d'Administration et Trésorier de l'Observatoire Luxembourgeois de Droit Européen.</p>`,
      en: `<p>A graduate of the Faculty of Law and Economics at the University of Paris II (Sorbonne-Assas), Alain Lorang obtained a master's degree in Business Law (Class of 1980). He then studied at the Institut d'Etudes Politiques de Paris (Economic and Financial Department) and graduated in 1981.</p>
<p>He obtained the certificate from the Luxembourg Ministry of National Education in Taxation Law in 1985 and the certificate from the French Center for Professional Training of Lawyers in Strasbourg on November 13, 1990.</p>
<p>Alain Lorang has been a lawyer at the Luxembourg Bar since 1982. He is also a sworn legal expert at the Luxembourg Court of Appeal. He is a former secretary of the Council of the Luxembourg Bar Association and finally a member of the Board of Directors and Treasurer of the Luxembourg Observatory of European Law. (OLDE)</p>`,
    },
    ordre: 1,
    statut: 'publie',
  },
  {
    id: 'stephane-pelzer',
    nom: 'Stéphane Pelzer',
    titre_civil: 'Me',
    fonction: { fr: 'Avocat à la Cour', en: 'Lawyer' },
    barreau_depuis: null,
    photo: null,
    bio: {
      fr: `<p>Me Stéphane Pelzer, avocat à la cour, spécialisé en droit des étrangers, droit international, droit de l'environnement, droit public. Son expertise couvre un large éventail de problématiques juridiques, allant de l'accompagnement des particuliers dans des démarches administratives complexes à la représentation devant les juridictions nationales et internationales.</p>
<p>Titulaire d'un Doctorat en droit public-droit de l'environnement de l'Université de Lorraine, Me Pelzer s'est consacré à l'étude approfondie des relations entre le droit et les grands enjeux sociétaux, notamment en matière de responsabilité environnementale et de régulation juridique. Sa formation universitaire, couplée à une solide expérience professionnelle, lui permet d'adopter une approche analytique et stratégique dans la défense des intérêts de ses clients.</p>
<p>Tout au long de son parcours, il a acquis une expérience précieuse dans l'interprétation et l'application des normes juridiques, notamment dans des dossiers impliquant des questions de droit des étrangers, de contentieux administratifs et de réglementation européenne. Son engagement académique en tant qu'enseignant en droit public lui a également permis de développer une approche pédagogique du droit, garantissant à ses clients une compréhension claire et précise des enjeux liés à leurs affaires.</p>
<p>Me Pelzer se distingue par son sens du détail, sa rigueur juridique et son engagement profond dans la défense des droits et libertés. Sa capacité d'analyse et son expertise en droit public font de lui un interlocuteur privilégié pour toute question juridique nécessitant une approche stratégique et personnalisée.</p>`,
      en: `<p>Stéphane Pelzer is a lawyer specialising in immigration law, international law, environmental law and public law. His expertise covers a wide range of legal issues, from assisting individuals with complex administrative procedures to representing them before national and international courts.</p>
<p>With a doctorate in public law and environmental law from the University of Lorraine, Mr Pelzer has devoted himself to an in-depth study of the relationship between the law and major societal issues, particularly in the areas of environmental liability and legal regulation. His university training, coupled with solid professional experience, enables him to adopt an analytical and strategic approach to defending his clients' interests.</p>
<p>Throughout his career, he has gained valuable experience in the interpretation and application of legal standards, particularly in cases involving issues of immigration law, administrative litigation and European regulations. His academic commitment as a lecturer in public law has also enabled him to develop a pedagogical approach to the law, ensuring that his clients have a clear and precise understanding of the issues involved in their cases.</p>
<p>Mr Pelzer stands out for his attention to detail, his legal rigour and his deep commitment to defending rights and freedoms. His ability to analyse and his expertise in public law make him the ideal partner for any legal issue requiring a strategic and personalised approach.</p>`,
    },
    ordre: 2,
    statut: 'entwurf',
  },
];
