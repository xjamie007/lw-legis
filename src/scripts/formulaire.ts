/**
 * src/scripts/formulaire.ts — Pruefung und Versand des Anfrageformulars.
 *
 * Ohne diese Datei funktioniert das Formular: es wird gewoehnlich an die
 * Edge Function geschickt, die serverseitig prueft und mit 303 auf die
 * Bestaetigungsseite weiterleitet.
 *
 * Mit ihr wird am Feld geprueft, die Fehler stehen direkt daneben, und
 * der Versand laeuft ohne Seitenwechsel. Die Fehlermeldungen kommen aus
 * den Uebersetzungsdateien und sind deshalb in jeder Sprache vorhanden —
 * auch Formularfehler werden uebersetzt, nicht nur Fliesstexte.
 */

/**
 * Die Meldungen kommen als Datenattribut aus dem Astro-Bauteil — nur die
 * der aktuellen Sprache. Wuerden hier die vier Uebersetzungsdateien
 * importiert, laegen alle vier im Bundle jedes Besuchers: rund 27 kB fuer
 * acht Saetze, von denen er sieben nie sieht.
 */

const form = document.querySelector<HTMLFormElement>('[data-formulaire]');

if (form) {
  const messages: Record<string, string> = JSON.parse(form.dataset.messages || '{}');
  // Die Adresse der Bestaetigungsseite kommt aus dem Bauteil, samt
  // Sprache. Sie ist dort schon richtig gebaut.
  const urlRecu = form.dataset.recu || '/';
  const t = (cle: string) => messages[cle] ?? cle;

  const resume = document.querySelector<HTMLElement>('[data-resume]');
  const resumeListe = document.querySelector<HTMLUListElement>('[data-resume-liste]');
  const bouton = form.querySelector<HTMLButtonElement>('[data-envoi]');
  const sansEcheance = form.querySelector<HTMLInputElement>('[data-sans-echeance]');
  const echeance = form.querySelector<HTMLInputElement>('[data-echeance]');

  // --- „keine Frist“ und Datumsfeld schliessen einander aus ---------------
  function accorderEcheance() {
    if (!sansEcheance || !echeance) return;
    echeance.disabled = sansEcheance.checked;
    if (sansEcheance.checked) echeance.value = '';
  }
  sansEcheance?.addEventListener('change', () => {
    accorderEcheance();
    effacer('echeance');
  });
  accorderEcheance();

  // --- Einzelpruefungen ----------------------------------------------------
  type Regle = { nom: string; valide: () => boolean; message: string };

  const champ = <T extends HTMLElement>(nom: string) =>
    form.querySelector<T>(`[name="${nom}"]`);

  const valeur = (nom: string) =>
    (champ<HTMLInputElement>(nom)?.value ?? '').trim();

  const regles: Regle[] = [
    { nom: 'nom', valide: () => valeur('nom').length >= 2, message: t('formulaire.erreur_nom') },
    {
      nom: 'courriel',
      // Bewusst nachsichtig: die harte Pruefung macht der Server. Eine zu
      // strenge Regel im Browser weist echte Adressen ab.
      valide: () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur('courriel')),
      message: t('formulaire.erreur_courriel'),
    },
    { nom: 'pays', valide: () => valeur('pays') !== '', message: t('formulaire.erreur_pays') },
    {
      nom: 'projet',
      valide: () => valeur('projet') !== '',
      message: t('formulaire.erreur_projet'),
    },
    {
      nom: 'echeance',
      valide: () => Boolean(sansEcheance?.checked) || valeur('echeance') !== '',
      message: t('formulaire.erreur_echeance'),
    },
    {
      nom: 'message',
      valide: () => valeur('message').length >= 10,
      message: t('formulaire.erreur_message'),
    },
    {
      nom: 'consentement',
      valide: () => Boolean(champ<HTMLInputElement>('consentement')?.checked),
      message: t('formulaire.erreur_consentement'),
    },
  ];

  function zoneErreur(nom: string): HTMLElement | null {
    const c = champ<HTMLElement>(nom);
    const conteneur = c?.closest('.champ');
    return conteneur?.querySelector<HTMLElement>('[data-erreur]') ?? null;
  }

  function marquer(nom: string, message: string) {
    const c = champ<HTMLElement>(nom);
    const zone = zoneErreur(nom);
    if (zone) zone.textContent = message;
    c?.setAttribute('aria-invalid', 'true');
  }

  function effacer(nom: string) {
    const c = champ<HTMLElement>(nom);
    const zone = zoneErreur(nom);
    if (zone) zone.textContent = '';
    c?.removeAttribute('aria-invalid');
  }

  /** Erst pruefen, wenn das Feld einmal verlassen wurde — nicht beim Tippen. */
  for (const r of regles) {
    const c = champ<HTMLElement>(r.nom);
    c?.addEventListener('blur', () => {
      if (r.valide()) effacer(r.nom);
      else if (c.getAttribute('data-touche') === '1') marquer(r.nom, r.message);
      c.setAttribute('data-touche', '1');
    });
    c?.addEventListener('input', () => {
      if (r.valide()) effacer(r.nom);
    });
    c?.addEventListener('change', () => {
      if (r.valide()) effacer(r.nom);
    });
  }

  function verifierTout(): Regle[] {
    const fautes: Regle[] = [];
    for (const r of regles) {
      if (r.valide()) {
        effacer(r.nom);
      } else {
        marquer(r.nom, r.message);
        fautes.push(r);
      }
    }
    return fautes;
  }

  function montrerResume(fautes: { nom: string; message: string }[]) {
    if (!resume || !resumeListe) return;
    resumeListe.replaceChildren();
    for (const f of fautes) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const c = champ<HTMLElement>(f.nom);
      a.href = `#${c?.id ?? ''}`;
      a.textContent = f.message;
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        c?.focus();
      });
      li.append(a);
      resumeListe.append(li);
    }
    resume.hidden = false;
    resume.focus();
  }

  function cacherResume() {
    if (resume) resume.hidden = true;
  }

  // --- Versand -------------------------------------------------------------
  form.addEventListener('submit', async (ev) => {
    const fautes = verifierTout();
    if (fautes.length > 0) {
      ev.preventDefault();
      montrerResume(fautes);
      return;
    }
    cacherResume();

    // Ab hier uebernimmt JavaScript. Schlaegt der Versand fehl, faellt es
    // nicht auf einen gewoehnlichen Seitenwechsel zurueck, sondern zeigt
    // eine Meldung samt Telefonnummer — die steht ohnehin auf jeder Seite.
    ev.preventDefault();

    if (bouton) {
      bouton.setAttribute('aria-disabled', 'true');
      bouton.textContent = t('formulaire.envoi_en_cours');
    }

    try {
      const reponse = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!reponse.ok) throw new Error(String(reponse.status));
      window.location.assign(urlRecu);
    } catch {
      montrerResume([{ nom: 'nom', message: t('formulaire.erreur_generale') }]);
      if (bouton) {
        bouton.removeAttribute('aria-disabled');
        bouton.textContent = t('formulaire.envoyer');
      }
    }
  });
}
