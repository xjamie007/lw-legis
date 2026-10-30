/**
 * src/scripts/filtres.ts — Themenfilter der Dossiers und Konferenzen.
 *
 * Ohne Skript ist die volle Liste sichtbar und die Knoepfe bleiben
 * verborgen: Filter, die nicht filtern, sind schlimmer als keine.
 */
for (const groupe of document.querySelectorAll<HTMLElement>('[data-filtres]')) {
  const liste = groupe.parentElement?.querySelector<HTMLElement>('[data-liste]');
  if (!liste) continue;
  const vide = groupe.parentElement?.querySelector<HTMLElement>('[data-vide]');
  groupe.hidden = false;

  groupe.addEventListener('click', (e) => {
    const bouton = (e.target as Element).closest<HTMLButtonElement>('button[data-theme]');
    if (!bouton) return;
    const theme = bouton.dataset.theme ?? '';
    for (const b of groupe.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b === bouton));
    let visibles = 0;
    for (const ligne of liste.querySelectorAll<HTMLElement>('[data-themes]')) {
      const montre = !theme || ligne.dataset.themes!.split(' ').includes(theme);
      ligne.hidden = !montre;
      if (montre) visibles++;
    }
    if (vide) vide.hidden = visibles > 0;
  });
}
