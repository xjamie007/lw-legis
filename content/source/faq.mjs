/**
 * content/source/faq.mjs — Haeufige Fragen.
 *
 * Acht Fragen. Beantwortet sind hier nur die, deren Antwort belegt ist.
 * Wo die Antwort Rechtsinhalt waere oder eine Zahl braucht, die die
 * Kanzlei nennen muss, bleibt sie offen und verweist auf den
 * entsprechenden Punkt im Register.
 */
import { ouvert } from './ouvertes.mjs';

export const FAQ = [
  {
    id: 'premier-entretien-prix',
    ordre: 1,
    statut: 'entwurf',
    question: {
      fr: 'Combien coûte un premier entretien ?',
      de: 'Was kostet ein Erstgespräch?',
      en: 'What does a first consultation cost?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'honoraire_entretien',
  },
  {
    id: 'facturation',
    ordre: 2,
    statut: 'entwurf',
    question: {
      fr: 'Comment facturez-vous ?',
      de: 'Wie rechnen Sie ab?',
      en: 'How do you charge?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'honoraire_horaire',
  },
  {
    id: 'langues',
    ordre: 3,
    statut: 'entwurf',
    question: {
      fr: 'Dans quelles langues puis-je vous parler ?',
      de: 'In welchen Sprachen kann ich mit Ihnen sprechen?',
      en: 'What languages can I speak to you in?',
      lb: null,
    },
    /**
     * Teilantwort: Franzoesisch und Englisch sind belegt. Ob Mandate auch
     * auf Deutsch und Luxemburgisch gefuehrt werden, muss die Kanzlei
     * bestaetigen — davon haengt ab, ob die deutsche und die luxemburgische
     * Fassung dieser Seite ueberhaupt Sinn ergeben.
     */
    reponse: {
      fr: 'Les dossiers sont traités en français et en anglais.',
      de: 'Mandate werden auf Französisch und auf Englisch geführt.',
      en: 'Matters are handled in French and in English.',
      lb: null,
    },
    complement_ouvert: 'langues_parlees',
    ouvert: null,
  },
  {
    id: 'achat-non-resident',
    ordre: 4,
    statut: 'entwurf',
    question: {
      fr: 'Puis-je acheter un bien immobilier au Luxembourg si je n’y réside pas ?',
      de: 'Kann ich als Nichtansässiger in Luxemburg eine Immobilie kaufen?',
      en: 'Can I buy property in Luxembourg if I do not live there?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'situations_contenu',
  },
  {
    id: 'duree-constitution-societe',
    ordre: 5,
    statut: 'entwurf',
    question: {
      fr: 'Combien de temps faut-il pour constituer une société au Luxembourg ?',
      de: 'Wie lange dauert eine Gesellschaftsgründung in Luxemburg?',
      en: 'How long does it take to set up a company in Luxembourg?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'situations_contenu',
  },
  {
    id: 'mandats-etranger',
    ordre: 6,
    statut: 'publie',
    question: {
      fr: 'Acceptez-vous des dossiers venus de l’étranger ?',
      de: 'Übernehmen Sie Mandate aus dem Ausland?',
      en: 'Do you take on matters from abroad?',
      lb: null,
    },
    reponse: {
      fr: 'Oui. C’est l’ordinaire de l’Étude, pas l’exception. Nous travaillons régulièrement avec des avocats et des notaires d’autres pays, par le réseau ADVOUNION et avec le cabinet partenaire VIAJURIS, présent à Saint-Étienne, Lyon, Le Puy-en-Velay et Paris. Pour le recouvrement, l’Étude représente au Luxembourg le groupe Intrum Justitia ainsi que la League International for Creditors. Si votre conseil habituel reste en première ligne, nous n’intervenons que sur la partie luxembourgeoise et lui rendons le dossier.',
      de: 'Ja. Das ist der Normalfall der Kanzlei, nicht die Ausnahme. Wir arbeiten regelmäßig mit Anwälten und Notaren anderer Länder zusammen, über das Netzwerk ADVOUNION und mit der Partnerkanzlei VIAJURIS in Saint-Étienne, Lyon, Le Puy-en-Velay und Paris. Beim Forderungseinzug vertritt die Kanzlei in Luxemburg die Gruppe Intrum Justitia sowie die League International for Creditors. Bleibt Ihr gewohnter Berater federführend, übernehmen wir nur den luxemburgischen Teil und geben die Sache an ihn zurück.',
      en: 'Yes. That is the firm’s ordinary business, not the exception. We work regularly with lawyers and notaries in other countries, through the ADVOUNION network and with the partner firm VIAJURIS in Saint-Étienne, Lyon, Le Puy-en-Velay and Paris. In debt recovery the firm represents the Intrum Justitia group and the League International for Creditors in Luxembourg. If your usual adviser stays in the lead, we take on the Luxembourg part only and hand the matter back.',
      lb: null,
    },
    ouvert: null,
  },
  {
    id: 'delai-reponse',
    ordre: 7,
    statut: 'entwurf',
    question: {
      fr: 'En combien de temps répondez-vous à une demande ?',
      de: 'Wie schnell antworten Sie auf eine Anfrage?',
      en: 'How quickly do you answer an enquiry?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'delai_reponse',
  },
  {
    id: 'premier-rendez-vous-pieces',
    ordre: 8,
    statut: 'entwurf',
    question: {
      fr: 'Que dois-je apporter au premier rendez-vous ?',
      de: 'Was soll ich zum ersten Gespräch mitbringen?',
      en: 'What should I bring to the first meeting?',
      lb: null,
    },
    reponse: { fr: null, de: null, en: null, lb: null },
    ouvert: 'situations_contenu',
  },
];

export { ouvert };
