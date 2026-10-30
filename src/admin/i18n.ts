/**
 * src/admin/i18n.ts — Oberflaeche des Redaktionsbereichs.
 *
 * Deutsch und Franzoesisch. Der Adminbereich muss in der Sprache seines
 * Nutzers stehen, nicht in der des Entwicklers. Welche Sprache gilt,
 * steht im Profil des Kontos und ist dort umschaltbar.
 */
export type LangueAdmin = 'de' | 'fr';

const DE = {
  'app.titre': 'Redaktion LW LEGIS',
  'app.abmelden': 'Abmelden',
  'app.sprache': 'Sprache der Oberfläche',
  'app.laden': 'Wird geladen …',
  'app.fehler': 'Es ist ein Fehler aufgetreten',
  'app.nicht_eingerichtet':
    'Die Verbindung zur Datenbank ist nicht eingerichtet. In der Datei .env fehlen PUBLIC_SUPABASE_URL oder PUBLIC_SUPABASE_ANON_KEY.',

  'anmeldung.titre': 'Anmeldung',
  'anmeldung.email': 'E-Mail-Adresse',
  'anmeldung.benutzer': 'Benutzername',
  'anmeldung.passwort': 'Passwort',
  'anmeldung.senden': 'Anmelden',
  'anmeldung.laeuft': 'Wird angemeldet …',
  'anmeldung.fehlgeschlagen': 'E-Mail-Adresse oder Passwort stimmen nicht.',
  'anmeldung.kein_profil':
    'Zu diesem Konto gibt es kein Redaktionsprofil. Wenden Sie sich an Me Lorang.',
  'anmeldung.mfa_titel': 'Zweiter Faktor',
  'anmeldung.mfa_hilfe':
    'Geben Sie den sechsstelligen Code aus Ihrer Authenticator-App ein.',
  'anmeldung.mfa_code': 'Sechsstelliger Code',
  'anmeldung.mfa_pruefen': 'Code prüfen',
  'anmeldung.mfa_falsch': 'Dieser Code stimmt nicht. Versuchen Sie es mit dem nächsten.',
  'anmeldung.mfa_einrichten_titel': 'Zweiten Faktor einrichten',
  'anmeldung.mfa_einrichten_hilfe':
    'Der zweite Faktor ist Pflicht. Scannen Sie den Code mit einer Authenticator-App und geben Sie dann den angezeigten sechsstelligen Code ein.',
  'anmeldung.mfa_geheimnis': 'Falls Sie nicht scannen können, tragen Sie diesen Schlüssel ein:',
  'anmeldung.mfa_bestaetigen': 'Einrichtung abschließen',

  'nav.inhalte': 'Inhalte',
  'nav.seiten': 'Seiten',
  'nav.sektionen': 'Aufbau der Startseite',
  'nav.services': 'Tätigkeitsgebiete',
  'nav.situations': 'Situationsmatrix',
  'nav.publications': 'Dokumente',
  'nav.team': 'Team',
  'nav.faq': 'Häufige Fragen',
  'nav.medias': 'Bilder',
  'nav.seo': 'Angaben für Google',
  'nav.legal': 'Rechtstexte',
  'nav.settings': 'Einstellungen',
  'nav.inquiries': 'Anfragen',
  'nav.comptes': 'Konten',

  'liste.neu': 'Neu anlegen',
  'liste.leer': 'Hier ist noch nichts angelegt.',
  'liste.suchen': 'Suchen',
  'liste.entwurf': 'Entwurf',
  'liste.veroeffentlicht': 'Veröffentlicht',
  'liste.geaendert': 'Geändert',
  'liste.offen_in': 'Fehlt in',

  'editeur.speichern': 'Speichern',
  'editeur.gespeichert': 'Gespeichert',
  'editeur.speichert': 'Wird gespeichert …',
  'editeur.ungesichert': 'Nicht gespeicherte Änderungen',
  'editeur.zurueck': 'Zurück zur Liste',
  'editeur.status': 'Status',
  'editeur.loeschen': 'Löschen',
  'editeur.loeschen_sicher': 'Diesen Eintrag wirklich löschen? Das lässt sich nicht rückgängig machen.',
  'editeur.fassungen': 'Frühere Fassungen',
  'editeur.veroeffentlichen_sperre':
    'Dieser Eintrag kann noch nicht veröffentlicht werden:',

  'champ.referenz': 'Französisch (Referenz)',
  'champ.bearbeitet': 'Ihre Fassung',
  'champ.fehlt': 'fehlt noch',
  'champ.offen_zaehler': '{n} offene Stellen',
  'champ.alles_da': 'vollständig',
  'champ.uebernehmen': 'Referenz übernehmen',

  'texte.absatz': 'Absatz',
  'texte.h2': 'Zwischenüberschrift',
  'texte.h3': 'Unterüberschrift',
  'texte.liste': 'Liste',
  'texte.fett': 'Fett',
  'texte.kursiv': 'Kursiv',
  'texte.link': 'Link',
  'texte.link_ziel': 'Wohin soll der Link führen?',
  'texte.zitat': 'Zitat',
  'texte.fussnote': 'Fußnote',
  'texte.fussnote_text': 'Text der Fußnote',

  'seo.titel_zaehler': '{n} von 50–60 Zeichen',
  'seo.beschreibung_zaehler': '{n} von 150–160 Zeichen',
  'seo.zu_kurz': 'zu kurz',
  'seo.zu_lang': 'zu lang',
  'seo.gut': 'gut',

  'publier.knopf': 'Veröffentlichen',
  'publier.laeuft': 'Wird veröffentlicht, seit {s} Sekunden',
  'publier.fertig': 'Veröffentlicht um {zeit}',
  'publier.fehlgeschlagen': 'Das Veröffentlichen ist fehlgeschlagen',
  'publier.hinweis':
    'Veröffentlichen baut die Website neu. Das dauert ein bis zwei Minuten. Bis dahin bleibt die alte Fassung online.',

  'medias.hochladen': 'Bild hochladen',
  'medias.ziehen': 'Bild hierher ziehen oder auswählen',
  'medias.alt': 'Bildbeschreibung',
  'medias.alt_hilfe':
    'Beschreiben Sie, was auf dem Bild zu sehen ist. Blinde Besucher hören diesen Text. In beiden Sprachen nötig, sonst lässt sich das Bild nicht veröffentlichen.',
  'medias.ausschnitt': 'Bildausschnitt',
  'medias.ausschnitt_hilfe': 'Klicken Sie auf die Stelle, die immer sichtbar bleiben soll.',
  'medias.masse': 'Maße',
  'medias.verarbeitet': 'AVIF und WebP erzeugt',

  'revisions.titel': 'Frühere Fassungen',
  'revisions.wiederherstellen': 'Diese Fassung wiederherstellen',
  'revisions.sicher': 'Diese Fassung wiederherstellen? Der jetzige Stand wird vorher gesichert.',
  'revisions.leer': 'Es gibt noch keine früheren Fassungen.',
  'revisions.von': 'von',

  'inquiries.titel': 'Anfragen',
  'inquiries.unbearbeitet': 'Unerledigt',
  'inquiries.erledigt': 'Als erledigt markieren',
  'inquiries.wieder_offen': 'Wieder als offen markieren',
  'inquiries.loeschen_am': 'Wird gelöscht am',
  'inquiries.leer': 'Es liegen keine Anfragen vor.',

  'situations.unvollstaendig':
    'Diese Konstellation wird noch nicht gebaut. Es fehlen:',
  'situations.woerter': '{n} von 400 Wörtern',
  'situations.wird_gebaut': 'Wird gebaut in:',

  'publications.rechtsstand': 'Rechtsstand',
  'publications.rechtsstand_hilfe':
    'Zu welchem Datum gibt dieser Text das Recht wieder? Ohne diese Angabe wird das Dokument nicht veröffentlicht.',
  'publications.pdf': 'PDF-Datei',
  'publications.pdf_hochladen': 'PDF hochladen',
  'nav.nachrichten': 'Nachrichten',
  'nav.mehr': 'Weitere Inhalte',
  'nav.neu': '{n} neue Nachrichten',

  'mehr.intro':
    'Hier finden Sie alles, was sich in der Vorschau nicht anklicken lässt — zum Beispiel, ob ein Eintrag veröffentlicht ist, die Angaben für Google oder die Reihenfolge der Startseite. Texte auf der Website klicken Sie am besten direkt auf der Seite an.',
  'mehr.sections': 'Welche Abschnitte die Startseite zeigt und in welcher Reihenfolge.',
  'mehr.services': 'Die Rechtsgebiete der Kanzlei: Bezeichnung, Adresse, Kurzform und einzelne Gebiete.',
  'mehr.situations': 'Die Konstellationen „Land und Vorhaben“ mit allen Abschnitten.',
  'mehr.publications': 'Fachdossiers und Konferenzunterlagen, mit Rechtsstand und PDF.',
  'mehr.faq': 'Häufige Fragen mit Antworten — auch die noch nicht veröffentlichten.',
  'mehr.team': 'Mitarbeiterinnen und Mitarbeiter der Kanzlei.',
  'mehr.seo_meta': 'Wie die Seiten bei Google erscheinen: Titel und Beschreibung.',
  'mehr.legal_pages': 'Impressum, Datenschutz und Geschäftsbedingungen. Nur für den Inhaber.',

  'atelier.vorschau': 'Website',
  'atelier.sprache_website': 'Sprache der Website',
  'atelier.angemeldet': 'Angemeldet – klicken Sie auf einen Text, um ihn zu ändern.',
  'atelier.rueckgaengig_ok': 'Letzte Änderung rückgängig gemacht',
  'atelier.gespeichert_ok':
    'Gespeichert ✓ – noch nicht online. Gelb = gespeichert, aber noch nicht veröffentlicht. Unten auf „Veröffentlichen“.',
  'atelier.abmelden_ungespeichert': 'Es gibt ungespeicherte Änderungen. Ohne Speichern abmelden?',
  'atelier.text_aendern': 'Text ändern',
  'atelier.uebernehmen': 'Übernehmen',
  'atelier.ihre_aenderungen': 'Ihre Änderungen',
  'atelier.keine_aenderungen': 'Seit dem letzten Veröffentlichen wurde nichts geändert.',
  'atelier.noch_nicht_online': 'Noch nicht online: {n}. Besucher sehen noch den alten Stand.',
  'atelier.fehlt_noch':
    'Diesen Text gibt es in dieser Sprache noch nicht. Schreiben Sie ihn einfach hier hinein.',
  'atelier.speichern_fehler': 'Das hat nicht geklappt:',
  'atelier.abbrechen': 'Abbrechen',
  'atelier.schliessen': 'Schließen',
  'atelier.referenz_zeigen': 'Französische Fassung zum Vergleich zeigen',
  'atelier.extern_blockiert':
    'Links zu anderen Websites, E-Mail und Telefon öffnen sich beim Bearbeiten nicht.',
  'atelier.formular_blockiert':
    'Beim Bearbeiten wird das Formular nicht abgeschickt. Es ist nur zum Ansehen da.',
  'atelier.keine_berechtigung': 'Sie haben keine Berechtigung, diesen Text zu ändern.',
  'atelier.nur_inhaber': 'Diesen Text darf nur der Inhaber (Me Lorang) ändern.',
  'atelier.zurueckgenommen': '✓ Zurückgenommen. Dort steht wieder der veröffentlichte Text.',
  'atelier.neu_angelegt': 'Neu angelegt',
  'atelier.vorher': 'Vorher',
  'atelier.jetzt': 'Jetzt',
  'atelier.leer': '(leer)',
  'atelier.ansehen': 'Ansehen',
  'atelier.zuruecknehmen': 'Zurücknehmen',
  'atelier.zuruecknehmen_sicher':
    'Diese Änderung zurücknehmen? Dann steht dort wieder der veröffentlichte Text.',

  'leiste.speichern': 'Speichern',
  'leiste.gespeichert': 'Gespeichert',
  'leiste.speichert': 'Speichert …',
  'leiste.rueckgaengig': 'Rückgängig',
  'leiste.seiten': 'Seiten',
  'leiste.veroeffentlichen': 'Veröffentlichen',
  'leiste.mehr': 'Mehr',

  'seiten.titel': 'Seite öffnen',

  'google.titel': 'Google – diese Seite ({l})',
  'google.hinweis':
    'Gilt für diese Seite in der gerade gewählten Sprache. Für eine andere Sprache unter „Seiten“ die Sprache wechseln.',
  'google.titel_feld': 'Titel bei Google',
  'google.beschreibung_feld': 'Beschreibung bei Google',
  'google.automatisch':
    'Titel und Beschreibung dieser Seite entstehen automatisch aus ihrem Inhalt. Eigene Angaben gibt es für die Startseite und die Hauptseiten aus „Seiten“.',
  'google.uebernommen': 'Angaben für Google übernommen – bitte Speichern nicht vergessen',

  'mehr.angemeldet_als': 'Angemeldet als {nom}',
  'mehr.anleitung': 'Kurzanleitung',
  'mehr.neu_laden': 'Seite neu laden',

  'hilfe.1_titel': 'Text ändern:',
  'hilfe.1': 'Text anklicken und lostippen. Gilt für die Sprache, die Sie gerade sehen.',
  'hilfe.2_titel': 'Längere Texte',
  'hilfe.2': '(mit Absätzen, Listen oder Fußnoten): anklicken – es öffnet sich ein Fenster mit dem Texteditor.',
  'hilfe.3_titel': 'Fertig?',
  'hilfe.3': 'Auf „Speichern“ tippen. Vertippt? „Rückgängig“.',
  'hilfe.4_titel': 'Veröffentlichen:',
  'hilfe.4':
    'Erst dann sehen Besucher Ihre Änderungen. Gelb hinterlegt ist, was gespeichert, aber noch nicht online ist.',
  'hilfe.5_titel': 'Andere Seite oder Sprache:',
  'hilfe.5': '„Seiten“.',
  'hilfe.6_titel': 'Google:',
  'hilfe.6': 'Titel und Beschreibung dieser Seite.',
  'hilfe.7_titel': 'Bilder, Nachrichten, neue Einträge, Entwurf oder veröffentlicht:',
  'hilfe.7': '„Mehr“.',

  'publier.knopf_n': 'Jetzt veröffentlichen ({n})',
  'publier.erst_speichern': 'Es gibt noch ungespeicherte Änderungen. Bitte zuerst „Speichern“.',
  'publier.sicher':
    'Jetzt veröffentlichen? Danach sehen alle Besucher Ihre Änderungen ({n}). Das dauert ein bis zwei Minuten.',
  'publier.lokal':
    'Dies ist die Testumgebung auf diesem Rechner. Veröffentlicht wird nur auf der echten Website — Ihre Änderungen sehen Sie hier trotzdem in der Vorschau.',
  'publier.demo':
    'Dies ist die Vorführfassung. Ihre Änderungen bleiben in diesem Browser gespeichert und gehen nicht online. Mit der echten Datenbank veröffentlicht dieser Knopf die Website.',
  'mehr.demo_zuruecksetzen': 'Demo auf den Anfang zurücksetzen',
  'mehr.demo_sicher': 'Alle Änderungen in dieser Demo verwerfen?',
} as const;

const FR: Record<keyof typeof DE, string> = {
  'app.titre': 'Rédaction LW LEGIS',
  'app.abmelden': 'Se déconnecter',
  'app.sprache': 'Langue de l’interface',
  'app.laden': 'Chargement …',
  'app.fehler': 'Une erreur est survenue',
  'app.nicht_eingerichtet':
    'La connexion à la base de données n’est pas configurée. PUBLIC_SUPABASE_URL ou PUBLIC_SUPABASE_ANON_KEY manque dans le fichier .env.',

  'anmeldung.titre': 'Connexion',
  'anmeldung.email': 'Adresse courriel',
  'anmeldung.benutzer': 'Nom d’utilisateur',
  'anmeldung.passwort': 'Mot de passe',
  'anmeldung.senden': 'Se connecter',
  'anmeldung.laeuft': 'Connexion en cours …',
  'anmeldung.fehlgeschlagen': 'L’adresse ou le mot de passe ne correspond pas.',
  'anmeldung.kein_profil':
    'Ce compte n’a pas de profil de rédaction. Adressez-vous à Me Lorang.',
  'anmeldung.mfa_titel': 'Deuxième facteur',
  'anmeldung.mfa_hilfe': 'Saisissez le code à six chiffres de votre application d’authentification.',
  'anmeldung.mfa_code': 'Code à six chiffres',
  'anmeldung.mfa_pruefen': 'Vérifier le code',
  'anmeldung.mfa_falsch': 'Ce code ne correspond pas. Essayez avec le suivant.',
  'anmeldung.mfa_einrichten_titel': 'Configurer le deuxième facteur',
  'anmeldung.mfa_einrichten_hilfe':
    'Le deuxième facteur est obligatoire. Scannez le code avec une application d’authentification, puis saisissez le code à six chiffres affiché.',
  'anmeldung.mfa_geheimnis': 'Si vous ne pouvez pas scanner, saisissez cette clé :',
  'anmeldung.mfa_bestaetigen': 'Terminer la configuration',

  'nav.inhalte': 'Contenus',
  'nav.seiten': 'Pages',
  'nav.sektionen': 'Structure de l’accueil',
  'nav.services': 'Domaines d’activité',
  'nav.situations': 'Matrice des situations',
  'nav.publications': 'Documents',
  'nav.team': 'Équipe',
  'nav.faq': 'Questions fréquentes',
  'nav.medias': 'Images',
  'nav.seo': 'Données pour Google',
  'nav.legal': 'Textes légaux',
  'nav.settings': 'Paramètres',
  'nav.inquiries': 'Demandes',
  'nav.comptes': 'Comptes',

  'liste.neu': 'Créer',
  'liste.leer': 'Rien n’est encore créé ici.',
  'liste.suchen': 'Rechercher',
  'liste.entwurf': 'Brouillon',
  'liste.veroeffentlicht': 'Publié',
  'liste.geaendert': 'Modifié',
  'liste.offen_in': 'Manque en',

  'editeur.speichern': 'Enregistrer',
  'editeur.gespeichert': 'Enregistré',
  'editeur.speichert': 'Enregistrement …',
  'editeur.ungesichert': 'Modifications non enregistrées',
  'editeur.zurueck': 'Retour à la liste',
  'editeur.status': 'Statut',
  'editeur.loeschen': 'Supprimer',
  'editeur.loeschen_sicher': 'Supprimer vraiment cette entrée ? C’est irréversible.',
  'editeur.fassungen': 'Versions antérieures',
  'editeur.veroeffentlichen_sperre': 'Cette entrée ne peut pas encore être publiée :',

  'champ.referenz': 'Français (référence)',
  'champ.bearbeitet': 'Votre version',
  'champ.fehlt': 'manque encore',
  'champ.offen_zaehler': '{n} endroits à compléter',
  'champ.alles_da': 'complet',
  'champ.uebernehmen': 'Reprendre la référence',

  'texte.absatz': 'Paragraphe',
  'texte.h2': 'Intertitre',
  'texte.h3': 'Sous-titre',
  'texte.liste': 'Liste',
  'texte.fett': 'Gras',
  'texte.kursiv': 'Italique',
  'texte.link': 'Lien',
  'texte.link_ziel': 'Vers où doit mener le lien ?',
  'texte.zitat': 'Citation',
  'texte.fussnote': 'Note',
  'texte.fussnote_text': 'Texte de la note',

  'seo.titel_zaehler': '{n} sur 50–60 caractères',
  'seo.beschreibung_zaehler': '{n} sur 150–160 caractères',
  'seo.zu_kurz': 'trop court',
  'seo.zu_lang': 'trop long',
  'seo.gut': 'bon',

  'publier.knopf': 'Publier',
  'publier.laeuft': 'Publication en cours, depuis {s} secondes',
  'publier.fertig': 'Publié à {zeit}',
  'publier.fehlgeschlagen': 'La publication a échoué',
  'publier.hinweis':
    'Publier reconstruit le site. Cela prend une à deux minutes. Jusque-là, l’ancienne version reste en ligne.',

  'medias.hochladen': 'Téléverser une image',
  'medias.ziehen': 'Glissez une image ici ou choisissez-en une',
  'medias.alt': 'Description de l’image',
  'medias.alt_hilfe':
    'Décrivez ce que montre l’image. Les visiteurs aveugles entendent ce texte. Nécessaire dans les deux langues, sinon l’image ne peut pas être publiée.',
  'medias.ausschnitt': 'Cadrage',
  'medias.ausschnitt_hilfe': 'Cliquez sur l’endroit qui doit rester visible.',
  'medias.masse': 'Dimensions',
  'medias.verarbeitet': 'AVIF et WebP créés',

  'revisions.titel': 'Versions antérieures',
  'revisions.wiederherstellen': 'Restaurer cette version',
  'revisions.sicher': 'Restaurer cette version ? L’état actuel est sauvegardé avant.',
  'revisions.leer': 'Il n’y a pas encore de version antérieure.',
  'revisions.von': 'par',

  'inquiries.titel': 'Demandes',
  'inquiries.unbearbeitet': 'Non traitée',
  'inquiries.erledigt': 'Marquer comme traitée',
  'inquiries.wieder_offen': 'Marquer comme non traitée',
  'inquiries.loeschen_am': 'Sera supprimée le',
  'inquiries.leer': 'Aucune demande.',

  'situations.unvollstaendig': 'Cette combinaison n’est pas encore construite. Il manque :',
  'situations.woerter': '{n} sur 400 mots',
  'situations.wird_gebaut': 'Construite en :',

  'publications.rechtsstand': 'État du droit',
  'publications.rechtsstand_hilfe':
    'À quelle date ce texte reflète-t-il le droit ? Sans cette donnée, le document n’est pas publié.',
  'publications.pdf': 'Fichier PDF',
  'publications.pdf_hochladen': 'Téléverser un PDF',
  'nav.nachrichten': 'Messages',
  'nav.mehr': 'Autres contenus',
  'nav.neu': '{n} nouveaux messages',

  'mehr.intro':
    'Vous trouvez ici tout ce qui ne se clique pas dans l’aperçu — par exemple si une entrée est publiée, les données pour Google ou l’ordre de la page d’accueil. Pour les textes du site, cliquez-les de préférence directement sur la page.',
  'mehr.sections': 'Quelles sections la page d’accueil montre, et dans quel ordre.',
  'mehr.services': 'Les domaines de l’Étude : intitulé, adresse, forme courte et matières.',
  'mehr.situations': 'Les combinaisons « pays et projet » avec toutes leurs sections.',
  'mehr.publications': 'Dossiers juridiques et supports de conférence, avec état du droit et PDF.',
  'mehr.faq': 'Questions fréquentes avec réponses — y compris celles non encore publiées.',
  'mehr.team': 'Les collaboratrices et collaborateurs de l’Étude.',
  'mehr.seo_meta': 'Comment les pages apparaissent sur Google : titre et description.',
  'mehr.legal_pages': 'Mentions légales, protection des données et conditions générales. Réservé au titulaire.',

  'atelier.vorschau': 'Site',
  'atelier.sprache_website': 'Langue du site',
  'atelier.angemeldet': 'Connecté – cliquez sur un texte pour le modifier.',
  'atelier.rueckgaengig_ok': 'Dernière modification annulée',
  'atelier.gespeichert_ok':
    'Enregistré ✓ – pas encore en ligne. En jaune = enregistré, mais pas encore publié. En bas : « Publier ».',
  'atelier.abmelden_ungespeichert':
    'Certaines modifications ne sont pas enregistrées. Se déconnecter sans enregistrer ?',
  'atelier.text_aendern': 'Modifier le texte',
  'atelier.uebernehmen': 'Appliquer',
  'atelier.ihre_aenderungen': 'Vos modifications',
  'atelier.keine_aenderungen': 'Rien n’a été modifié depuis la dernière publication.',
  'atelier.noch_nicht_online': 'Pas encore en ligne : {n}. Les visiteurs voient encore l’ancienne version.',
  'atelier.fehlt_noch':
    'Ce texte n’existe pas encore dans cette langue. Écrivez-le simplement ici.',
  'atelier.speichern_fehler': 'Cela n’a pas fonctionné :',
  'atelier.abbrechen': 'Annuler',
  'atelier.schliessen': 'Fermer',
  'atelier.referenz_zeigen': 'Afficher la version française pour comparer',
  'atelier.extern_blockiert':
    'Les liens vers d’autres sites, le courriel et le téléphone ne s’ouvrent pas pendant la modification.',
  'atelier.formular_blockiert':
    'Pendant la modification, le formulaire n’est pas envoyé. Il sert seulement à voir la page.',
  'atelier.keine_berechtigung': 'Vous n’avez pas le droit de modifier ce texte.',
  'atelier.nur_inhaber': 'Seul le titulaire (Me Lorang) peut modifier ce texte.',
  'atelier.zurueckgenommen': '✓ Annulé. Le texte publié est de nouveau en place.',
  'atelier.neu_angelegt': 'Nouvelle entrée',
  'atelier.vorher': 'Avant',
  'atelier.jetzt': 'Maintenant',
  'atelier.leer': '(vide)',
  'atelier.ansehen': 'Voir',
  'atelier.zuruecknehmen': 'Annuler cette modification',
  'atelier.zuruecknehmen_sicher':
    'Annuler cette modification ? Le texte publié sera remis en place.',

  'leiste.speichern': 'Enregistrer',
  'leiste.gespeichert': 'Enregistré',
  'leiste.speichert': 'Enregistrement …',
  'leiste.rueckgaengig': 'Annuler',
  'leiste.seiten': 'Pages',
  'leiste.veroeffentlichen': 'Publier',
  'leiste.mehr': 'Plus',

  'seiten.titel': 'Ouvrir une page',

  'google.titel': 'Google – cette page ({l})',
  'google.hinweis':
    'Vaut pour cette page dans la langue affichée. Pour une autre langue, changez de langue sous « Pages ».',
  'google.titel_feld': 'Titre sur Google',
  'google.beschreibung_feld': 'Description sur Google',
  'google.automatisch':
    'Le titre et la description de cette page sont générés à partir de son contenu. Des données propres existent pour l’accueil et les pages principales de « Pages ».',
  'google.uebernommen': 'Données pour Google appliquées – n’oubliez pas d’enregistrer',

  'mehr.angemeldet_als': 'Connecté en tant que {nom}',
  'mehr.anleitung': 'Mode d’emploi',
  'mehr.neu_laden': 'Recharger la page',

  'hilfe.1_titel': 'Modifier un texte :',
  'hilfe.1': 'cliquez sur le texte et tapez. Vaut pour la langue affichée.',
  'hilfe.2_titel': 'Textes longs',
  'hilfe.2': '(avec paragraphes, listes ou notes) : un clic ouvre une fenêtre avec l’éditeur.',
  'hilfe.3_titel': 'Terminé ?',
  'hilfe.3': 'Appuyez sur « Enregistrer ». Une erreur ? « Annuler ».',
  'hilfe.4_titel': 'Publier :',
  'hilfe.4':
    'c’est seulement alors que les visiteurs voient vos modifications. En jaune : enregistré, mais pas encore en ligne.',
  'hilfe.5_titel': 'Autre page ou langue :',
  'hilfe.5': '« Pages ».',
  'hilfe.6_titel': 'Google :',
  'hilfe.6': 'titre et description de cette page.',
  'hilfe.7_titel': 'Images, messages, nouvelles entrées, brouillon ou publié :',
  'hilfe.7': '« Plus ».',

  'publier.knopf_n': 'Publier maintenant ({n})',
  'publier.erst_speichern': 'Certaines modifications ne sont pas encore enregistrées. Appuyez d’abord sur « Enregistrer ».',
  'publier.sicher':
    'Publier maintenant ? Ensuite, tous les visiteurs verront vos modifications ({n}). Cela prend une à deux minutes.',
  'publier.lokal':
    'Ceci est l’environnement de test sur cet ordinateur. La publication n’a lieu que sur le vrai site — vous voyez tout de même vos modifications dans l’aperçu.',
  'publier.demo':
    'Ceci est la version de démonstration. Vos modifications restent enregistrées dans ce navigateur et ne sont pas mises en ligne. Avec la vraie base de données, ce bouton publie le site.',
  'mehr.demo_zuruecksetzen': 'Remettre la démo à zéro',
  'mehr.demo_sicher': 'Abandonner toutes les modifications de cette démo ?',
};

const TABLES = { de: DE, fr: FR } as const;

export type CleAdmin = keyof typeof DE;

export function traduire(langue: LangueAdmin, cle: CleAdmin, vars?: Record<string, string | number>) {
  let s: string = TABLES[langue][cle] ?? DE[cle] ?? cle;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}
