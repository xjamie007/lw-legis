/**
 * src/scripts/formulaire.ts — Pruefung und Versand des Kontaktformulars.
 *
 * Ohne diese Datei funktioniert das Formular trotzdem: es geht als
 * gewoehnlicher POST an die Edge Function, die serverseitig prueft und mit
 * 303 auf die Bestaetigungsseite weiterleitet.
 *
 * Mit ihr wird am Feld geprueft, die Fehler stehen direkt daneben, und
 * gesendet wird ohne Seitenwechsel. Die Meldungen kommen als
 * Datenattribut aus dem Bauteil, nur in der Sprache der Seite.
 */
const form = document.querySelector<HTMLFormElement>('[data-formulaire]');

if (form) {
  const messages: Record<string, string> = JSON.parse(form.dataset.messages || '{}');
  const t = (cle: string) => messages[cle] ?? cle;
  const resume = form.querySelector<HTMLElement>('[data-resume]')!;
  const resumeListe = form.querySelector<HTMLUListElement>('[data-resume-liste]')!;
  const bouton = form.querySelector<HTMLButtonElement>('[data-envoi]')!;

  // Von einer Taetigkeitsseite aus: Taetigkeit vorbelegen.
  const domaine = new URLSearchParams(location.search).get('domaine');
  const choix = form.querySelector<HTMLSelectElement>('[data-domaine]');
  if (domaine && choix && [...choix.options].some((o) => o.value === domaine)) choix.value = domaine;

  const valeur = (nom: string) => (form.elements.namedItem(nom) as HTMLInputElement | null)?.value.trim() ?? '';
  const coche = (nom: string) => Boolean((form.elements.namedItem(nom) as HTMLInputElement | null)?.checked);

  const regles: { nom: string; valide: () => boolean; message: string }[] = [
    { nom: 'nom', valide: () => valeur('nom').length >= 2, message: t('formulaire.erreur_nom') },
    { nom: 'telephone', valide: () => valeur('telephone').replace(/\D/g, '').length >= 6, message: t('formulaire.erreur_telephone') },
    {
      nom: 'courriel',
      valide: () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur('courriel')),
      message: t('formulaire.erreur_courriel'),
    },
    { nom: 'message', valide: () => valeur('message').length >= 10, message: t('formulaire.erreur_demande') },
    { nom: 'consentement', valide: () => coche('consentement'), message: t('formulaire.erreur_consentement') },
  ];

  function marquer(nom: string, message: string | null) {
    const champ = form!.elements.namedItem(nom) as HTMLElement | null;
    const erreur = form!.querySelector<HTMLElement>(`[data-erreur="${nom}"]`);
    champ?.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (erreur) {
      erreur.textContent = message ?? '';
      erreur.hidden = !message;
    }
  }

  // Ein Fehler verschwindet, sobald das Feld stimmt — nicht erst beim naechsten Senden.
  form.addEventListener('input', (e) => {
    const nom = (e.target as HTMLInputElement).name;
    const regle = regles.find((r) => r.nom === nom);
    if (regle && (e.target as HTMLElement).getAttribute('aria-invalid') === 'true' && regle.valide()) marquer(nom, null);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fautes = regles.filter((r) => !r.valide());
    for (const r of regles) marquer(r.nom, fautes.includes(r) ? r.message : null);

    if (fautes.length > 0) {
      resumeListe.replaceChildren(
        ...fautes.map((f) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${f.nom}`;
          a.textContent = f.message;
          li.append(a);
          return li;
        }),
      );
      resume.hidden = false;
      resume.focus();
      return;
    }

    resume.hidden = true;
    bouton.disabled = true;
    bouton.textContent = t('formulaire.envoi');
    try {
      const reponse = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!reponse.ok) throw new Error(String(reponse.status));
      location.assign(form.dataset.recu || '/');
    } catch {
      resumeListe.replaceChildren();
      const li = document.createElement('li');
      li.textContent = t('formulaire.erreur_envoi');
      resumeListe.append(li);
      resume.hidden = false;
      resume.focus();
      bouton.disabled = false;
      bouton.textContent = t('formulaire.envoyer');
    }
  });
}
