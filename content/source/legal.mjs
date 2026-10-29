/**
 * content/source/legal.mjs — Impressum, Datenschutz, Geschaeftsbedingungen.
 *
 * Das Impressum enthaelt bewusst Luecken, wo Registerdaten fehlen. Eine
 * erfundene RCS- oder MwSt-Nummer im Impressum einer Anwaltskanzlei ist
 * kein Schoenheitsfehler, sondern eine falsche oeffentliche Angabe.
 *
 * Die Datenschutzerklaerung ist dagegen vollstaendig ausgeschrieben: was
 * diese Website mit Daten tut, ist keine Auskunft des Kunden, sondern eine
 * Eigenschaft der Technik, die hier gebaut wird. Sie beschreibt exakt den
 * ausgelieferten Stand — statische Seiten ohne Cookies, Formular ueber eine
 * Edge Function, Speicherung in der EU, selbst gehostete Schriften, keine
 * Einbindung Dritter.
 */
import { ouvert } from './ouvertes.mjs';

export const MENTIONS = {
  id: 'mentions',
  titre: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice', lb: null },
  blocs: [
    {
      id: 'editeur',
      titre: {
        fr: 'Éditeur du site',
        de: 'Anbieter',
        en: 'Site owner',
        lb: null,
      },
      /** Wird im Template aus SETTINGS zusammengesetzt, damit NAP nicht doppelt steht. */
      source: 'settings',
      champs: [
        'nom',
        'raison_sociale',
        'adresse',
        'telephone',
        'courriel',
        'rcs',
        'tva',
      ],
    },
    {
      id: 'profession',
      titre: {
        fr: 'Profession réglementée',
        de: 'Reglementierter Beruf',
        en: 'Regulated profession',
        lb: null,
      },
      texte: {
        fr: 'Me Alain Lorang exerce la profession d’avocat à la cour, titre délivré au Grand-Duché de Luxembourg. Il est inscrit au barreau de Luxembourg depuis 1982.',
        de: 'Me Alain Lorang übt den Beruf des avocat à la cour aus, ein im Großherzogtum Luxemburg verliehener Titel. Er ist seit 1982 am Barreau de Luxembourg zugelassen.',
        en: 'Me Alain Lorang practises as an avocat à la cour, a title conferred in the Grand Duchy of Luxembourg. He has been admitted to the Luxembourg bar since 1982.',
        lb: null,
      },
      ouvert: 'ordre_formulierung',
    },
    {
      id: 'assurance',
      titre: {
        fr: 'Assurance responsabilité civile professionnelle',
        de: 'Berufshaftpflichtversicherung',
        en: 'Professional indemnity insurance',
        lb: null,
      },
      ouvert: 'assurance',
    },
    {
      id: 'autorisation',
      titre: {
        fr: 'Autorisation d’établissement',
        de: 'Gewerbegenehmigung',
        en: 'Business licence',
        lb: null,
      },
      ouvert: 'autorisation',
    },
    {
      id: 'mediation',
      titre: {
        fr: 'Règlement des litiges relatifs aux honoraires',
        de: 'Beilegung von Streitigkeiten über Honorare',
        en: 'Resolution of fee disputes',
        lb: null,
      },
      ouvert: 'mediation',
    },
    {
      id: 'realisation',
      titre: {
        fr: 'Conception et réalisation',
        de: 'Konzeption und Umsetzung',
        en: 'Design and build',
        lb: null,
      },
      texte: {
        fr: 'Site conçu et réalisé par NAVE, Luxembourg. Hébergement dans l’Union européenne. Polices de caractères Literata et Atkinson Hyperlegible Next, sous licence SIL Open Font License 1.1, hébergées sur le serveur du site.',
        de: 'Website konzipiert und umgesetzt von NAVE, Luxemburg. Hosting in der Europäischen Union. Schriften Literata und Atkinson Hyperlegible Next unter der SIL Open Font License 1.1, auf dem Server dieser Seite gehostet.',
        en: 'Site designed and built by NAVE, Luxembourg. Hosted in the European Union. Typefaces Literata and Atkinson Hyperlegible Next, under the SIL Open Font License 1.1, served from this site’s own server.',
        lb: null,
      },
    },
  ],
};

export const DONNEES = {
  id: 'donnees',
  titre: {
    fr: 'Protection des données',
    de: 'Datenschutzerklärung',
    en: 'Privacy policy',
    lb: null,
  },
  chapeau: {
    fr: 'Cette page décrit exactement ce que ce site fait de vos données. Elle est courte parce que le site en collecte très peu.',
    de: 'Diese Seite beschreibt genau, was diese Website mit Ihren Daten tut. Sie ist kurz, weil die Website sehr wenige erhebt.',
    en: 'This page describes exactly what this site does with your data. It is short because the site collects very little.',
    lb: null,
  },
  blocs: [
    {
      id: 'responsable',
      titre: {
        fr: 'Responsable du traitement',
        de: 'Verantwortlicher',
        en: 'Data controller',
        lb: null,
      },
      source: 'settings',
      champs: ['nom', 'adresse', 'telephone', 'courriel'],
      texte: {
        fr: 'Pour toute question relative à vos données, écrivez à l’adresse ci-dessus ou téléphonez à l’Étude.',
        de: 'Für Fragen zu Ihren Daten schreiben Sie an die vorstehende Adresse oder rufen Sie die Kanzlei an.',
        en: 'For any question about your data, write to the address above or telephone the firm.',
        lb: null,
      },
    },
    {
      id: 'navigation',
      titre: {
        fr: 'Ce qui se passe quand vous lisez ce site',
        de: 'Was geschieht, wenn Sie diese Seite lesen',
        en: 'What happens when you read this site',
        lb: null,
      },
      texte: {
        fr: '<p>Rien n’est déposé sur votre appareil. Le site public ne place aucun cookie, ni technique ni publicitaire, et n’utilise ni mesure d’audience, ni outil d’analyse, ni bouton de réseau social.</p><p>Les pages sont des fichiers statiques : aucune base de données n’est interrogée pendant votre visite. Les polices de caractères sont servies depuis le serveur de ce site et non par un service tiers — votre adresse IP n’est donc transmise à personne d’autre que l’hébergeur.</p><p>L’hébergeur enregistre, comme tout serveur web, les requêtes qui lui parviennent : adresse IP, date, page demandée, type de navigateur. Ces journaux servent à faire fonctionner le service et à en assurer la sécurité, sur la base de l’intérêt légitime (article 6, paragraphe 1, point f du RGPD), et ne sont pas utilisés pour vous identifier.</p><p>C’est pour cette raison qu’il n’y a pas de bandeau de cookies sur ce site : il n’y a rien à accepter ou à refuser.</p>',
        de: '<p>Auf Ihrem Gerät wird nichts abgelegt. Die öffentliche Seite setzt kein Cookie, weder ein technisches noch ein werbliches, und verwendet keine Reichweitenmessung, kein Analysewerkzeug und keine Schaltfläche eines sozialen Netzwerks.</p><p>Die Seiten sind statische Dateien: Während Ihres Besuchs wird keine Datenbank abgefragt. Die Schriften werden vom Server dieser Seite ausgeliefert und nicht von einem Dienst Dritter — Ihre IP-Adresse wird also an niemanden außer den Hoster übertragen.</p><p>Der Hoster protokolliert, wie jeder Webserver, die eingehenden Anfragen: IP-Adresse, Zeitpunkt, angeforderte Seite, Browsertyp. Diese Protokolle dienen dem Betrieb und der Sicherheit des Dienstes auf Grundlage des berechtigten Interesses (Artikel 6 Absatz 1 Buchstabe f DSGVO) und werden nicht dazu verwendet, Sie zu identifizieren.</p><p>Deshalb gibt es auf dieser Seite kein Cookie-Banner: Es gibt nichts anzunehmen oder abzulehnen.</p>',
        en: '<p>Nothing is stored on your device. The public site sets no cookie, neither technical nor advertising, and uses no audience measurement, no analytics tool and no social network button.</p><p>The pages are static files: no database is queried during your visit. The typefaces are served from this site’s own server and not by a third-party service — your IP address is therefore passed to no one but the host.</p><p>The host records, as any web server does, the requests reaching it: IP address, time, page requested, browser type. These logs serve to operate and secure the service, on the basis of legitimate interest (Article 6(1)(f) GDPR), and are not used to identify you.</p><p>That is why there is no cookie banner on this site: there is nothing to accept or refuse.</p>',
        lb: null,
      },
    },
    {
      id: 'formulaire',
      titre: {
        fr: 'Ce que vous nous envoyez par le formulaire',
        de: 'Was Sie uns über das Formular senden',
        en: 'What you send us through the form',
        lb: null,
      },
      texte: {
        fr: '<p><strong>Quelles données :</strong> votre nom, votre adresse courriel, éventuellement votre numéro de téléphone, le pays où vous résidez, l’objet de votre demande, l’échéance que vous indiquez et le texte de votre message.</p><p><strong>Pourquoi :</strong> pour répondre à votre demande et, le cas échéant, préparer un mandat. Base juridique : les mesures précontractuelles prises à votre demande (article 6, paragraphe 1, point b du RGPD) et votre consentement pour le traitement du message lui-même (article 6, paragraphe 1, point a).</p><p><strong>Où :</strong> le message est envoyé à l’Étude par courriel et enregistré dans une base de données hébergée dans l’Union européenne, en Allemagne. Cet enregistrement existe pour qu’aucune demande ne se perde si un courriel devait être filtré comme indésirable.</p><p><strong>Combien de temps :</strong> les demandes qui ne débouchent pas sur un mandat sont effacées au plus tard douze mois après le dernier échange. Si un mandat est confié, le dossier suit les règles de conservation applicables à la profession d’avocat.</p><p><strong>Le formulaire n’accepte pas de fichiers.</strong> Les pièces de votre dossier vous sont demandées après le premier contact, par un canal sécurisé.</p>',
        de: '<p><strong>Welche Daten:</strong> Ihr Name, Ihre E-Mail-Adresse, gegebenenfalls Ihre Telefonnummer, Ihr Wohnsitzland, der Gegenstand Ihrer Anfrage, die von Ihnen genannte Frist und der Text Ihrer Nachricht.</p><p><strong>Wozu:</strong> um Ihre Anfrage zu beantworten und gegebenenfalls ein Mandat vorzubereiten. Rechtsgrundlage sind die auf Ihre Anfrage hin getroffenen vorvertraglichen Maßnahmen (Artikel 6 Absatz 1 Buchstabe b DSGVO) und Ihre Einwilligung für die Verarbeitung der Nachricht selbst (Artikel 6 Absatz 1 Buchstabe a).</p><p><strong>Wo:</strong> Die Nachricht wird der Kanzlei per E-Mail zugestellt und in einer Datenbank gespeichert, die in der Europäischen Union, in Deutschland, betrieben wird. Diese Speicherung besteht, damit keine Anfrage verloren geht, falls eine E-Mail als unerwünscht aussortiert wird.</p><p><strong>Wie lange:</strong> Anfragen, aus denen kein Mandat entsteht, werden spätestens zwölf Monate nach dem letzten Austausch gelöscht. Wird ein Mandat erteilt, gelten für die Akte die berufsrechtlichen Aufbewahrungsregeln.</p><p><strong>Das Formular nimmt keine Dateien entgegen.</strong> Unterlagen zu Ihrer Sache fordern wir nach dem ersten Kontakt über einen gesicherten Weg an.</p>',
        en: '<p><strong>What data:</strong> your name, your email address, optionally your telephone number, the country where you live, the subject of your enquiry, the deadline you state and the text of your message.</p><p><strong>Why:</strong> to answer your enquiry and, where appropriate, to prepare an engagement. Legal basis: pre-contractual steps taken at your request (Article 6(1)(b) GDPR) and your consent for the processing of the message itself (Article 6(1)(a)).</p><p><strong>Where:</strong> the message is sent to the firm by email and recorded in a database hosted in the European Union, in Germany. That record exists so that no enquiry is lost if an email should be filtered as spam.</p><p><strong>How long:</strong> enquiries that do not lead to an engagement are deleted at the latest twelve months after the last exchange. Where an engagement is given, the file follows the retention rules applicable to the legal profession.</p><p><strong>The form does not accept files.</strong> We ask for the documents in your matter after first contact, through a secure channel.</p>',
        lb: null,
      },
    },
    {
      id: 'sous-traitants',
      titre: {
        fr: 'Qui d’autre voit ces données',
        de: 'Wer diese Daten sonst noch sieht',
        en: 'Who else sees this data',
        lb: null,
      },
      texte: {
        fr: '<p>Deux prestataires techniques interviennent, tous deux liés par un contrat de sous-traitance au sens de l’article 28 du RGPD :</p><ul><li>l’hébergeur du site, qui sert les pages et enregistre les journaux de serveur ;</li><li>le prestataire de base de données et d’envoi de courriel, dont les serveurs se trouvent dans l’Union européenne.</li></ul><p>Aucune donnée n’est transmise en dehors de l’Union européenne. Aucune donnée n’est vendue, louée ou utilisée à des fins publicitaires.</p>',
        de: '<p>Zwei technische Dienstleister sind beteiligt, beide durch einen Auftragsverarbeitungsvertrag nach Artikel 28 DSGVO gebunden:</p><ul><li>der Hoster der Website, der die Seiten ausliefert und die Serverprotokolle führt;</li><li>der Dienstleister für Datenbank und E-Mail-Versand, dessen Server in der Europäischen Union stehen.</li></ul><p>Es werden keine Daten außerhalb der Europäischen Union übermittelt. Es werden keine Daten verkauft, vermietet oder für Werbung verwendet.</p>',
        en: '<p>Two technical providers are involved, both bound by a processing agreement under Article 28 GDPR:</p><ul><li>the site’s host, which serves the pages and keeps the server logs;</li><li>the database and email provider, whose servers are located in the European Union.</li></ul><p>No data is transferred outside the European Union. No data is sold, rented or used for advertising.</p>',
        lb: null,
      },
    },
    {
      id: 'droits',
      titre: { fr: 'Vos droits', de: 'Ihre Rechte', en: 'Your rights', lb: null },
      texte: {
        fr: '<p>Vous pouvez à tout moment demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, ainsi que leur portabilité. Vous pouvez vous opposer à un traitement fondé sur l’intérêt légitime et retirer à tout moment un consentement donné ; le retrait ne remet pas en cause ce qui a été fait avant.</p><p>Une demande se fait par courriel ou par courrier à l’adresse indiquée plus haut. Elle est traitée dans un délai d’un mois.</p><p>Si vous estimez que vos données sont mal traitées, vous pouvez saisir l’autorité de contrôle luxembourgeoise : Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux.</p>',
        de: '<p>Sie können jederzeit Auskunft über Ihre Daten, deren Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit verlangen. Sie können einer auf berechtigtes Interesse gestützten Verarbeitung widersprechen und eine erteilte Einwilligung jederzeit widerrufen; der Widerruf berührt nicht, was vorher geschehen ist.</p><p>Ein Antrag erfolgt per E-Mail oder per Post an die oben genannte Adresse. Er wird innerhalb eines Monats bearbeitet.</p><p>Wenn Sie der Ansicht sind, dass Ihre Daten unrichtig verarbeitet werden, können Sie sich an die luxemburgische Aufsichtsbehörde wenden: Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux.</p>',
        en: '<p>You may at any time ask for access to your data, its correction, its erasure, restriction of its processing and its portability. You may object to processing based on legitimate interest and withdraw a consent at any time; withdrawal does not affect what was done before.</p><p>A request is made by email or by post to the address given above. It is dealt with within one month.</p><p>If you consider that your data is being handled improperly, you may contact the Luxembourg supervisory authority: Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux.</p>',
        lb: null,
      },
    },
    {
      id: 'admin',
      titre: {
        fr: 'L’espace de rédaction',
        de: 'Der Redaktionsbereich',
        en: 'The editing area',
        lb: null,
      },
      texte: {
        fr: '<p>Le site dispose d’un espace de rédaction protégé, réservé à l’Étude, accessible sous <code>/admin</code>. C’est le seul endroit du site qui conserve une session — un jeton d’authentification strictement nécessaire, stocké localement dans le navigateur de la personne connectée, et jamais posé sur les pages publiques. Cet espace n’est pas indexé et n’est pas accessible sans compte.</p>',
        de: '<p>Die Website hat einen geschützten Redaktionsbereich, der der Kanzlei vorbehalten ist und unter <code>/admin</code> erreichbar ist. Das ist die einzige Stelle der Website, die eine Sitzung speichert — ein zwingend erforderliches Anmeldemerkmal, lokal im Browser der angemeldeten Person abgelegt und niemals auf den öffentlichen Seiten gesetzt. Dieser Bereich wird nicht indexiert und ist ohne Konto nicht zugänglich.</p>',
        en: '<p>The site has a protected editing area, reserved for the firm, reachable at <code>/admin</code>. It is the only part of the site that keeps a session — a strictly necessary authentication token, stored locally in the browser of the person signed in, and never set on the public pages. That area is not indexed and cannot be reached without an account.</p>',
        lb: null,
      },
    },
  ],
};

export const CONDITIONS = {
  id: 'conditions',
  titre: {
    fr: 'Conditions générales',
    de: 'Allgemeine Geschäftsbedingungen',
    en: 'Terms and conditions',
    lb: null,
  },
  chapeau: { fr: null, de: null, en: null, lb: null },
  corps: { fr: null, de: null, en: null, lb: null },
  ouvert: 'conditions_generales',
};

export { ouvert };
