/**
 * content/source/pages.mjs — Seitentexte.
 *
 * Kein Blindtext. Geschrieben aus Sicht des Besuchers, in einfacher
 * Sprache, mit aktiven Verben. Beschrieben wird, was etwas ist und tut,
 * statt es zu verkaufen. Wer gerade ein Haus in Luxemburg kaufen will, ist
 * nervoes und sucht Klarheit, keine Exzellenzbekundung.
 *
 * Franzoesisch ist die Referenzfassung. Luxemburgisch bleibt durchgaengig
 * `null` — es wird nicht erfunden.
 */
import { ouvert } from './ouvertes.mjs';

/** Die Sektionen der Startseite. Reihenfolge und Sichtbarkeit sind im
 *  Adminbereich aenderbar, deshalb stehen `ordre` und `visible` hier. */
export const SECTIONS_ACCUEIL = [
  { id: 'hero', ordre: 1, visible: true, verrouille: true },
  { id: 'services', ordre: 2, visible: true, verrouille: false },
  { id: 'avocat', ordre: 3, visible: true, verrouille: false },
  { id: 'bureau', ordre: 4, visible: true, verrouille: false },
  { id: 'publications', ordre: 5, visible: true, verrouille: false },
  { id: 'honoraires', ordre: 6, visible: true, verrouille: false },
  { id: 'faq', ordre: 7, visible: true, verrouille: false },
  { id: 'contact', ordre: 8, visible: true, verrouille: true },
];

export const PAGES = {
  // =========================================================================
  accueil: {
    id: 'accueil',
    sections: {
      services: {
        titre: { fr: 'Ce que nous faisons', de: 'Was wir tun', en: 'What we do', lb: null },
        chapeau: {
          fr: 'Quatre domaines, où presque chaque question franchit une frontière.',
          de: 'Vier Felder, in denen fast jede Frage über eine Grenze läuft.',
          en: 'Four fields, in which almost every question crosses a border.',
          lb: null,
        },
      },

      avocat: {
        titre: { fr: 'Qui répond', de: 'Wer antwortet', en: 'Who answers', lb: null },
        texte: {
          fr: 'Alain Lorang est inscrit au barreau de Luxembourg depuis 1982. Il est expert judiciaire assermenté près la Cour d’Appel et a été secrétaire du Conseil de l’Ordre des Avocats. L’Étude reste volontairement petite : celui qui appelle parle à l’avocat qui suit le dossier.',
          de: 'Alain Lorang ist seit 1982 am Barreau de Luxembourg zugelassen. Er ist vereidigter Sachverständiger bei der Cour d’Appel und war Sekretär des Conseil de l’Ordre des Avocats. Die Kanzlei bleibt bewusst klein: Wer anruft, spricht mit dem Anwalt, der den Fall führt.',
          en: 'Alain Lorang has been admitted to the Luxembourg bar since 1982. He is a sworn judicial expert at the Court of Appeal and served as secretary of the Conseil de l’Ordre des Avocats. The firm stays deliberately small: whoever calls speaks to the lawyer who runs the case.',
          lb: null,
        },
        marge: {
          terme: { fr: 'Au barreau depuis', de: 'Am Barreau seit', en: 'At the bar since', lb: null },
          texte: { fr: '1982', de: '1982', en: '1982', lb: null },
        },
        lien: {
          fr: 'En savoir plus sur l’Étude',
          de: 'Mehr über die Kanzlei',
          en: 'More about the firm',
          lb: null,
        },
        appel: {
          fr: 'Appelez-le directement',
          de: 'Rufen Sie ihn direkt an',
          en: 'Call him directly',
          lb: null,
        },
      },

      bureau: {
        titre: {
          fr: 'Où nous recevons',
          de: 'Wo wir empfangen',
          en: 'Where we receive you',
          lb: null,
        },
        chapeau: {
          fr: 'Avenue du X Septembre, à Belair. Un étage, des boiseries claires, et une salle où l’on peut étaler des plans sur la table.',
          de: 'Avenue du X Septembre, in Belair. Eine Etage, helles Holz, und ein Raum, in dem man Pläne auf dem Tisch ausbreiten kann.',
          en: 'Avenue du X Septembre, in Belair. One floor, light woodwork, and a room where you can spread plans out on the table.',
          lb: null,
        },
      },

      publications: {
        titre: {
          fr: 'Fonds documentaire',
          de: 'Dokumente',
          en: 'Library',
          lb: null,
        },
        chapeau: {
          fr: 'Vingt-neuf textes : dix dossiers juridiques et dix-neuf supports de conférence, écrits sur deux décennies. Chacun se lit ici, en entier, sans téléchargement.',
          de: 'Neunundzwanzig Texte: zehn Fachdossiers und neunzehn Konferenzunterlagen, über zwei Jahrzehnte geschrieben. Jeder lässt sich hier lesen, vollständig, ohne Download.',
          en: 'Twenty-nine texts: ten legal briefings and nineteen conference papers, written over two decades. Each one can be read here in full, without downloading anything.',
          lb: null,
        },
        lien: {
          fr: 'Ouvrir le fonds documentaire',
          de: 'Zu den Dokumenten',
          en: 'Open the library',
          lb: null,
        },
      },

      honoraires: {
        titre: {
          fr: 'Comment nous facturons',
          de: 'Wie wir abrechnen',
          en: 'How we charge',
          lb: null,
        },
        chapeau: {
          fr: 'Vous savez avant le premier rendez-vous ce que la suite coûte. Rien ne commence sans convention écrite.',
          de: 'Sie wissen vor dem ersten Termin, was das Weitere kostet. Nichts beginnt ohne schriftliche Vereinbarung.',
          en: 'You know before the first appointment what the next steps cost. Nothing begins without a written agreement.',
          lb: null,
        },
        lien: {
          fr: 'Voir les honoraires en détail',
          de: 'Honorare im Einzelnen',
          en: 'See fees in detail',
          lb: null,
        },
      },

      contact: {
        titre: { fr: 'Contact', de: 'Kontakt', en: 'Contact', lb: null },
        chapeau: {
          fr: 'Décrivez votre situation en quelques lignes. Nous répondons nous-mêmes, pas par un standard.',
          de: 'Beschreiben Sie Ihre Lage in ein paar Zeilen. Wir antworten selbst, nicht über eine Zentrale.',
          en: 'Describe your situation in a few lines. We answer ourselves, not through a switchboard.',
          lb: null,
        },
      },
    },
  },

  // =========================================================================
  etude: {
    id: 'etude',
    titre: { fr: 'L’Étude', de: 'Die Kanzlei', en: 'The firm', lb: null },
    chapeau: {
      fr: 'LW LEGIS est l’extrémité luxembourgeoise d’une ligne qui commence ailleurs. Presque chaque dossier arrive d’un autre pays et doit y retourner.',
      de: 'LW LEGIS ist das luxemburgische Ende einer Linie, die woanders anfängt. Fast jedes Mandat kommt aus einem anderen Land und muss dorthin zurück.',
      en: 'LW LEGIS is the Luxembourg end of a line that begins somewhere else. Almost every matter arrives from another country and has to go back there.',
      lb: null,
    },
    intuitu: {
      titre: {
        fr: 'Une structure à taille humaine',
        de: 'Eine Kanzlei in überschaubarer Größe',
        en: 'A firm of manageable size',
        lb: null,
      },
      texte: {
        fr: 'L’Étude n’est pas une law factory et ne veut pas le devenir. La relation avec le client est nouée <span class="locution">intuitu personae</span> — en considération de la personne : le client choisit un avocat, pas une enseigne, et cet avocat reste le sien du premier appel jusqu’à la fin du dossier. Concrètement, cela veut dire que le dossier ne change pas de main entre le rendez-vous et l’audience, et que la personne qui décroche connaît l’affaire.',
        de: 'Die Kanzlei ist keine „law factory“ und will keine werden. Die Beziehung zum Mandanten wird <span class="locution">intuitu personae</span> geschlossen — mit Rücksicht auf die Person: Der Mandant wählt einen Anwalt, kein Firmenschild, und dieser Anwalt bleibt seiner, vom ersten Anruf bis zum Ende der Sache. Praktisch heißt das, dass die Akte zwischen Besprechung und Verhandlung nicht die Hand wechselt und dass derjenige, der abhebt, den Fall kennt.',
        en: 'The firm is not a law factory and does not want to become one. The relationship with the client is formed <span class="locution">intuitu personae</span> — with regard to the person: the client chooses a lawyer, not a brand, and that lawyer stays theirs from the first call to the end of the matter. In practice this means the file does not change hands between the meeting and the hearing, and that whoever picks up the telephone knows the case.',
        lb: null,
      },
      marge: {
        terme: { fr: 'intuitu personae', de: 'intuitu personae', en: 'intuitu personae', lb: null },
        texte: {
          fr: 'Latin : en considération de la personne.',
          de: 'Lateinisch: mit Rücksicht auf die Person.',
          en: 'Latin: in consideration of the person.',
          lb: null,
        },
      },
    },
    reseaux: {
      titre: { fr: 'Réseaux', de: 'Netzwerke', en: 'Networks', lb: null },
      chapeau: {
        fr: 'Le secret professionnel interdit de nommer des clients. Ce qui peut être montré, ce sont les mandats de représentation et les réseaux — une reconnaissance par des tiers, vérifiable.',
        de: 'Das Berufsgeheimnis verbietet es, Mandanten zu nennen. Zeigen lassen sich die Vertretungsmandate und die Netzwerke — belegte Anerkennung durch Dritte.',
        en: 'Professional secrecy forbids naming clients. What can be shown are the representation mandates and the networks — third-party recognition that can be checked.',
        lb: null,
      },
    },
    equipe: {
      titre: { fr: 'L’équipe', de: 'Das Team', en: 'The team', lb: null },
      texte: { fr: null, de: null, en: null, lb: null },
      ouvert: 'equipe',
    },
  },

  // =========================================================================
  honoraires: {
    id: 'honoraires',
    titre: { fr: 'Honoraires', de: 'Honorare', en: 'Fees', lb: null },
    chapeau: {
      fr: 'Ce qu’un dossier coûte se discute avant qu’il commence, pas à la fin. Voici les chiffres et le déroulement.',
      de: 'Was eine Sache kostet, wird besprochen, bevor sie beginnt, nicht am Ende. Hier stehen die Zahlen und der Ablauf.',
      en: 'What a matter costs is discussed before it starts, not at the end. Here are the figures and the sequence.',
      lb: null,
    },
    postes: [
      { id: 'premier_entretien', ouvert: 'honoraire_entretien' },
      { id: 'taux_horaire', ouvert: 'honoraire_horaire' },
      { id: 'forfaits', ouvert: 'honoraire_forfaits' },
      { id: 'rythme', ouvert: 'honoraire_rythme' },
    ],
    /** Die einzige Nummerierung der Seite — hier ist es wirklich eine Reihenfolge. */
    deroulement: {
      titre: {
        fr: 'Le déroulement d’une demande',
        de: 'Der Ablauf einer Anfrage',
        en: 'How an enquiry proceeds',
        lb: null,
      },
      etapes: [
        {
          fr: 'Vous décrivez votre situation, par le formulaire ou par téléphone. C’est gratuit et cela n’engage à rien.',
          de: 'Sie schildern Ihre Lage, über das Formular oder am Telefon. Das ist kostenlos und verpflichtet zu nichts.',
          en: 'You describe your situation, by the form or by telephone. This is free and commits you to nothing.',
          lb: null,
        },
        {
          fr: 'Nous vérifions qu’aucun conflit d’intérêts ne s’oppose au dossier et si nous sommes les bons pour le traiter. Si nous ne le sommes pas, nous le disons.',
          de: 'Wir prüfen, ob ein Interessenkonflikt entgegensteht und ob wir die Richtigen für die Sache sind. Sind wir es nicht, sagen wir das.',
          en: 'We check that no conflict of interest stands in the way and whether we are the right people for the matter. If we are not, we say so.',
          lb: null,
        },
        {
          fr: 'Vous recevez une convention d’honoraires écrite : ce qui est fait, à quel prix, et ce qui n’est pas compris.',
          de: 'Sie erhalten eine schriftliche Honorarvereinbarung: was getan wird, zu welchem Preis, und was nicht enthalten ist.',
          en: 'You receive a written fee agreement: what will be done, at what price, and what is not included.',
          lb: null,
        },
        {
          fr: 'Le mandat ne commence qu’avec votre signature. Avant elle, rien n’est facturé.',
          de: 'Das Mandat beginnt erst mit Ihrer Unterschrift. Davor wird nichts berechnet.',
          en: 'The engagement begins only with your signature. Before that, nothing is billed.',
          lb: null,
        },
      ],
    },
    note_transparence: {
      fr: 'Si une estimation doit être revue en cours de dossier, vous en êtes informé avant que le travail correspondant soit engagé — pas sur la facture.',
      de: 'Muss eine Schätzung im Lauf der Sache nach oben korrigiert werden, erfahren Sie das, bevor die entsprechende Arbeit beginnt — nicht erst auf der Rechnung.',
      en: 'If an estimate has to be revised during a matter, you hear about it before the work in question begins — not on the invoice.',
      lb: null,
    },
  },

  // =========================================================================
  contact: {
    id: 'contact',
    titre: { fr: 'Contact', de: 'Kontakt', en: 'Contact', lb: null },
    chapeau: {
      fr: 'L’Étude se trouve à Belair, à Luxembourg-Ville, avenue du X Septembre.',
      de: 'Die Kanzlei liegt in Belair, in Luxemburg-Stadt, an der avenue du X Septembre.',
      en: 'The firm is in Belair, in Luxembourg City, on the avenue du X Septembre.',
      lb: null,
    },
    acces: {
      fr: null,
      de: null,
      en: null,
      lb: null,
    },
    stationnement: { fr: null, de: null, en: null, lb: null },
    /** Anfahrt und Parken kennt nur die Kanzlei genau. */
    ouvert_acces: 'horaires',
  },

  // =========================================================================
  situations: {
    id: 'situations',
    titre: { fr: 'Votre situation', de: 'Ihre Situation', en: 'Your situation', lb: null },
    chapeau: {
      fr: 'Ce qui décide d’un dossier luxembourgeois, ce n’est pas seulement ce que vous voulez faire, mais aussi d’où vous venez : la convention fiscale applicable, le droit successoral compétent et les formalités changent avec le pays de résidence. Choisissez les deux et lisez la réponse à cette combinaison précise.',
      de: 'Über eine luxemburgische Sache entscheidet nicht nur, was Sie vorhaben, sondern auch, woher Sie kommen: Das anwendbare Doppelbesteuerungsabkommen, das zuständige Erbrecht und die Formalitäten ändern sich mit dem Wohnsitzland. Wählen Sie beides und lesen Sie die Antwort auf genau diese Kombination.',
      en: 'What decides a Luxembourg matter is not only what you want to do, but also where you come from: the applicable tax treaty, the competent succession law and the formalities all change with the country of residence. Choose both and read the answer to that precise combination.',
      lb: null,
    },
    note_etat: {
      fr: 'Les combinaisons sont rédigées une par une par l’avocat. Celles qui ne le sont pas encore renvoient au domaine d’activité correspondant, qui répond déjà à l’essentiel.',
      de: 'Die Konstellationen werden vom Anwalt einzeln ausgearbeitet. Was noch nicht ausgearbeitet ist, führt auf das zugehörige Tätigkeitsgebiet, das das Wesentliche bereits beantwortet.',
      en: 'The combinations are written up one by one by the lawyer. Those not yet written point to the corresponding practice area, which already answers the essentials.',
      lb: null,
    },
  },

  // =========================================================================
  services: {
    id: 'services',
    titre: {
      fr: 'Domaines d’activité',
      de: 'Tätigkeitsgebiete',
      en: 'Practice areas',
      lb: null,
    },
    chapeau: {
      fr: 'Quatre domaines, où presque chaque question franchit une frontière.',
      de: 'Vier Felder, in denen fast jede Frage über eine Grenze läuft.',
      en: 'Four fields, in which almost every question crosses a border.',
      lb: null,
    },
  },

  // =========================================================================
  publications: {
    id: 'publications',
    titre: { fr: 'Fonds documentaire', de: 'Dokumente', en: 'Library', lb: null },
    chapeau: {
      fr: 'Dix dossiers juridiques et dix-neuf supports de conférence, tenus par Me Alain Lorang sur deux décennies. Chaque texte se lit ici en entier ; le PDF est disponible à côté quand il existe.',
      de: 'Zehn Fachdossiers und neunzehn Konferenzunterlagen, von Me Alain Lorang über zwei Jahrzehnte gehalten. Jeder Text lässt sich hier vollständig lesen; das PDF steht daneben, wo es vorliegt.',
      en: 'Ten legal briefings and nineteen conference papers, given by Me Alain Lorang over two decades. Every text can be read here in full; the PDF sits alongside it where one exists.',
      lb: null,
    },
  },

  // =========================================================================
  recu: {
    id: 'recu',
    titre: {
      fr: 'Votre demande est arrivée',
      de: 'Ihre Anfrage ist angekommen',
      en: 'Your enquiry has arrived',
      lb: null,
    },
    texte: {
      fr: 'Votre message a été transmis directement à l’Étude, à Luxembourg-Belair. Il est lu par un avocat, non par un secrétariat automatique.',
      de: 'Ihre Nachricht ist unmittelbar bei der Kanzlei in Luxemburg-Belair eingegangen. Sie wird von einem Anwalt gelesen, nicht von einem automatischen Sekretariat.',
      en: 'Your message has gone straight to the firm in Luxembourg-Belair. It is read by a lawyer, not by an automated office.',
      lb: null,
    },
    delai: ouvert('delai_reponse'),
    ensuite: {
      fr: 'Si votre affaire est urgente, téléphonez plutôt que d’attendre : le numéro figure en haut de chaque page.',
      de: 'Ist Ihre Sache eilig, rufen Sie lieber an, statt zu warten: Die Nummer steht oben auf jeder Seite.',
      en: 'If your matter is urgent, telephone rather than wait: the number is at the top of every page.',
      lb: null,
    },
  },
};
