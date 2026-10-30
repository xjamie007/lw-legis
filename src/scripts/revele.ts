/**
 * src/scripts/revele.ts — Einblenden beim Scrollen.
 *
 * Elemente mit `data-revele` gleiten beim Hineinscrollen sanft herein;
 * Kinder mit `data-revele-i` (0, 1, 2 …) leicht versetzt nacheinander.
 *
 * Ohne dieses Skript ist alles sichtbar: Versteckt wird erst, wenn das
 * Skript laeuft — und nur, was noch unter dem Bildschirmrand liegt. Bei
 * reduzierter Bewegung und beim Drucken passiert nichts.
 */
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduit && 'IntersectionObserver' in window) {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-revele]')];
  const hauteur = window.innerHeight;

  const montrer = (el: HTMLElement) => el.classList.add('revele--vu');

  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue;
        montrer(e.target as HTMLElement);
        observateur.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  for (const el of elements) {
    // Was schon zu sehen ist, bleibt einfach stehen.
    if (el.getBoundingClientRect().top < hauteur) continue;
    el.classList.add('revele--pret');
    observateur.observe(el);
  }

  // Vor dem Drucken alles zeigen.
  window.addEventListener('beforeprint', () => elements.forEach(montrer));
}
