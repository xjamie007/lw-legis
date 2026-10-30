/**
 * src/admin/composants/Feuille.tsx — Ein Fenster, das von unten hereinkommt.
 *
 * Wie in den Demos fuer Krombach und DRP: auf dem Handy ein Blatt am
 * unteren Rand, ab 700 px Breite ein Fenster in der Mitte. Ein Klick
 * daneben oder Escape schliesst es.
 */
import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  titre: string;
  /** Breit fuer Listen und Formulare (900 statt 560 px). */
  large?: boolean;
  onFermer: () => void;
  /** Beschriftung des Schliessen-Knopfs, fuer Screenreader. */
  fermer: string;
  children: ReactNode;
}

export default function Feuille({ titre, large, onFermer, fermer, children }: Props) {
  const boite = useRef<HTMLDivElement>(null);
  // Als Ref, damit der Fokus nicht bei jedem Neuzeichnen zurueckspringt.
  const fermerRef = useRef(onFermer);
  fermerRef.current = onFermer;

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => e.key === 'Escape' && fermerRef.current();
    window.addEventListener('keydown', surTouche);
    // Der Fokus kommt ins Fenster, damit Tastatur und Screenreader folgen.
    const champ = boite.current?.querySelector<HTMLElement>(
      'input:not([type=file]), textarea, select, [contenteditable=true]',
    );
    (champ ?? boite.current)?.focus();
    return () => window.removeEventListener('keydown', surTouche);
  }, []);

  return (
    <div
      className="kx-sheet-wrap"
      onMouseDown={(e) => e.target === e.currentTarget && onFermer()}
    >
      <div
        ref={boite}
        className={large ? 'kx-sheet kx-wide' : 'kx-sheet'}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        tabIndex={-1}
      >
        <div className="kx-sheet-head">
          <h2>{titre}</h2>
          <button type="button" className="kx-x" aria-label={fermer} onClick={onFermer}>
            ✕
          </button>
        </div>
        <div className="kx-sheet-body">{children}</div>
      </div>
    </div>
  );
}
