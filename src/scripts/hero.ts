/**
 * src/scripts/hero.ts — Verbesserung des Hero-Satzes.
 *
 * Ohne diese Datei funktioniert der Hero vollstaendig: die beiden
 * Einsetzstellen sind Popover-Menues mit echten Links auf echte Seiten.
 * Mit ihr entfaellt der Seitenwechsel — die Antwort erscheint unter dem
 * Satz, und die Adresse wird per history.pushState mitgefuehrt, damit
 * jeder Zustand teilbar und mit dem Zurueck-Knopf erreichbar bleibt.
 *
 * Bewusst ohne Framework. React kostet hier rund 45 kB komprimiert fuer
 * etwas, das mit ein paar Dutzend Zeilen DOM-Code besser geht — und die
 * oeffentliche Seite kommt so ganz ohne Framework aus.
 */

interface Entree {
  publie: boolean;
  url: string | null;
  repli: string | null;
  repliNom: string | null;
  phrase: string;
}

interface Textes {
  paysDefaut: string;
  projetDefaut: string;
  repondre: string;
  nonPubliee: string;
  versDomaine: string;
  worum: string;
  cadre: string;
  notreRole: string;
  vosPieces: string;
}

interface Donnees {
  titre: string;
  worum: string;
  cadre: string;
  notre_role: string;
  vos_pieces: string;
}

const zone = document.getElementById('hero-reponse');
if (zone) {
  const table: Record<string, Entree> = JSON.parse(zone.dataset.table || '{}');
  const textes: Textes = JSON.parse(zone.dataset.textes || '{}');

  const boutons = {
    pays: document.querySelector<HTMLButtonElement>('[data-fente="pays"]'),
    projet: document.querySelector<HTMLButtonElement>('[data-fente="projet"]'),
  };
  const sorties = {
    pays: document.querySelector<HTMLElement>('[data-valeur="pays"]'),
    projet: document.querySelector<HTMLElement>('[data-valeur="projet"]'),
  };

  const choix: { pays: string | null; projet: string | null } = { pays: null, projet: null };
  const cache = new Map<string, Donnees | null>();
  let jeton = 0;

  const doux = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * aria-expanded ausdruecklich fuehren.
   *
   * Nach der Spezifikation bekommt ein Popover-Ausloeser diesen Zustand
   * vom Browser. In der Praxis taucht er nicht in jedem Baum auf — und
   * die Vorgabe verlangt ihn ausdruecklich. Gesetzt wird er deshalb erst
   * hier, nicht im HTML: ohne JavaScript bliebe ein starres
   * aria-expanded="false" stehen, waehrend die Liste offen ist, und das
   * waere schlechter als gar keine Angabe.
   */
  for (const axe of ['pays', 'projet'] as const) {
    const bouton = boutons[axe];
    const panneau = document.getElementById(`fente-${axe}`);
    if (!bouton || !panneau) continue;
    bouton.setAttribute('aria-expanded', 'false');
    bouton.setAttribute('aria-controls', panneau.id);
    panneau.addEventListener('toggle', (ev) => {
      const ouvert = (ev as ToggleEvent).newState === 'open';
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
  }

  /** Setzt ein Wort in den Satz ein. */
  function poser(axe: 'pays' | 'projet', id: string, mot: string) {
    choix[axe] = id;
    const sortie = sorties[axe];
    const bouton = boutons[axe];
    if (sortie) sortie.textContent = mot;
    if (bouton) bouton.classList.add('est-choisie');
  }

  function echapper(s: string): string {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /** Baut die Antwortsektion, wenn beides gewaehlt ist. */
  async function repondre() {
    if (!choix.pays || !choix.projet || !zone) return;
    const cle = `${choix.pays}--${choix.projet}`;
    const entree = table[cle];
    if (!entree) return;

    const monJeton = ++jeton;

    if (!entree.publie || !entree.url) {
      // Die Konstellation ist noch nicht ausgearbeitet. Es wird nie auf
      // eine leere Seite oder auf 404 verwiesen, sondern auf das
      // zugehoerige Taetigkeitsgebiet.
      zone.innerHTML = entree.repli
        ? `<p class="corps">${echapper(textes.nonPubliee)}</p>
           <p class="hero__action"><a class="bouton bouton--contour" href="${entree.repli}">${echapper(
             `${textes.versDomaine}: ${entree.repliNom ?? ''}`.trim(),
           )}</a></p>`
        : `<p class="corps">${echapper(textes.nonPubliee)}</p>`;
      return;
    }

    // Veroeffentlichte Konstellation: Inhalt nachladen statt Seitenwechsel.
    let donnees = cache.get(cle);
    if (donnees === undefined) {
      try {
        const r = await fetch(`${entree.url}donnees.json`, { headers: { Accept: 'application/json' } });
        donnees = r.ok ? ((await r.json()) as Donnees) : null;
      } catch {
        donnees = null;
      }
      cache.set(cle, donnees);
    }
    if (monJeton !== jeton) return; // eine neuere Auswahl ist unterwegs

    if (!donnees) {
      // Netz weg oder Datei fehlt: normal zur Seite gehen.
      window.location.href = entree.url;
      return;
    }

    zone.innerHTML = `
      <div class="corps corps--flux">
        <h2 class="titre-3">${echapper(textes.worum)}</h2>
        ${donnees.worum}
        <h2 class="titre-3">${echapper(textes.cadre)}</h2>
        ${donnees.cadre}
        <h2 class="titre-3">${echapper(textes.notreRole)}</h2>
        ${donnees.notre_role}
        <h2 class="titre-3">${echapper(textes.vosPieces)}</h2>
        ${donnees.vos_pieces}
      </div>
      <p class="hero__action"><a class="bouton" href="${entree.url}">${echapper(textes.repondre)}</a></p>`;

    // Die Adresse mitfuehren, damit der Zustand teilbar und der
    // Zurueck-Knopf brauchbar bleibt.
    if (window.location.pathname !== entree.url) {
      history.pushState({ cle }, '', entree.url);
    }

    if (doux) zone.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- Klicks in den beiden Listen abfangen -------------------------------
  for (const lien of document.querySelectorAll<HTMLAnchorElement>('.choix__liste a[data-axe]')) {
    lien.addEventListener('click', (ev) => {
      // Mittelklick, Cmd/Strg-Klick und Rechtsklick nicht anfassen:
      // wer in einem neuen Tab oeffnen will, soll das koennen.
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      const axe = lien.dataset.axe as 'pays' | 'projet' | undefined;
      const id = lien.dataset.id;
      const mot = lien.dataset.mot;
      if (!axe || !id || !mot) return;
      ev.preventDefault();
      poser(axe, id, mot);
      // Das Popover schliessen — der Browser kennt hidePopover().
      const panneau = lien.closest<HTMLElement>('[popover]');
      panneau?.hidePopover?.();
      void repondre();
    });
  }

  // --- Zurueck-Knopf -------------------------------------------------------
  window.addEventListener('popstate', () => {
    // Der einfachste korrekte Weg: die Seite laden, die die Adresse nennt.
    window.location.reload();
  });
}
