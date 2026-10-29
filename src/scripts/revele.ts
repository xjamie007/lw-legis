/**
 * src/scripts/revele.ts — Einblenden beim Scrollen.
 *
 * WICHTIGSTE REGEL: Was schon im Bild steht, wird NIE versteckt.
 *
 * Der erste Entwurf hat pauschal alles mit `data-revele` unsichtbar
 * gemacht und darauf gebaut, dass der Observer es gleich wieder zeigt.
 * Beim Rendern der gebauten Seite mit WebKit kam dabei eine leere Seite
 * heraus: Der Beobachter war noch nicht durch, das Bild schon aufgenommen.
 * Auf einem langsamen Telefon, bei einem Skriptfehler oder bei einem
 * Crawler, der nicht wartet, passiert genau dasselbe.
 *
 * Deshalb jetzt umgekehrt: Das Skript sieht zuerst nach, was ÜBERHAUPT
 * unterhalb der Falz liegt, und versteckt nur das. Alles Sichtbare bleibt
 * unangetastet. Zusätzlich gibt es eine Reißleine — nach drei Sekunden
 * wird alles gezeigt, egal was der Beobachter meldet.
 *
 * Kein Scroll-Listener: ein IntersectionObserver feuert einmal je Element
 * und hört danach auf zuzuhören.
 */

const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!ruhig && 'IntersectionObserver' in window) {
  const cibles = Array.from(document.querySelectorAll<HTMLElement>('[data-revele]'));

  /** Alles zeigen — Reißleine und Endzustand. */
  const toutMontrer = () => {
    for (const c of cibles) {
      c.classList.remove('est-cache');
      c.classList.add('est-visible');
    }
  };

  const demarrer = () => {
    const hauteur = window.innerHeight;

    // Nur verstecken, was noch nicht zu sehen ist.
    const aObserver = cibles.filter((c) => {
      const r = c.getBoundingClientRect();
      const sousLaLigne = r.top > hauteur * 0.92;
      if (sousLaLigne) c.classList.add('est-cache');
      return sousLaLigne;
    });

    if (aObserver.length === 0) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('est-visible');
          // Einmal gezeigt, nie wieder beobachtet. Etwas, das beim
          // Zurückscrollen erneut einblendet, ist eine Spielerei und
          // macht das Lesen mühsam.
          observateur.unobserve(e.target);
        }
      },
      {
        // Der Auslöser liegt vor der Falz: Bis der Absatz gelesen wird,
        // steht er längst. Bewegung darf das Lesen nicht verzögern.
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01,
      },
    );

    for (const c of aObserver) observateur.observe(c);

    // Reißleine. Sollte der Beobachter aus irgendeinem Grund nicht
    // feuern, steht nach zwölf Sekunden trotzdem die ganze Seite da.
    //
    // Warum nicht früher: Wer liest und scrollt, ist längst unterwegs,
    // bevor das greift — die Bewegung bleibt also sichtbar. Wer die Seite
    // offen liegen lässt und erst später scrollt, sieht sie nicht mehr.
    // Das ist der Preis dafür, dass kein Absatz dauerhaft verborgen
    // bleiben kann, und er ist es wert.
    window.setTimeout(() => {
      observateur.disconnect();
      toutMontrer();
    }, 12000);
  };

  // Erst messen, wenn der Satzspiegel steht — sonst sind die
  // Positionen von vor dem Laden der Schriften.
  if (document.readyState === 'complete') {
    requestAnimationFrame(demarrer);
  } else {
    window.addEventListener('load', () => requestAnimationFrame(demarrer), { once: true });
  }
}
