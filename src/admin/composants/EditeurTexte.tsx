/**
 * src/admin/composants/EditeurTexte.tsx — Fliesstexteditor.
 *
 * Bewusst beschraenkt auf: Absatz, Zwischenueberschrift 2 und 3, Liste,
 * fett, kursiv, Link, Zitat, Fussnote. Sonst nichts.
 *
 * Es gibt keine Schriftart-, Groessen- und Farbauswahl. Was hier fehlt,
 * ist kein Versehen: ein Design, das der Redakteur verstellen kann, ist
 * nach drei Monaten tot. Die Gestaltung kommt aus dem Projekt, der Inhalt
 * aus diesem Feld.
 */
import { useCallback, useEffect, useRef } from 'react';
import { traduire, type LangueAdmin } from '../i18n';

interface Props {
  valeur: string;
  onChange: (html: string) => void;
  langue: LangueAdmin;
  id: string;
  ariaDescribedby?: string;
}

/** Nur diese Elemente und Attribute ueberleben das Einfuegen. */
const BALISES_PERMISES = new Set([
  'P', 'H2', 'H3', 'UL', 'OL', 'LI', 'STRONG', 'EM', 'A', 'BLOCKQUOTE', 'BR', 'SUP',
]);

/**
 * Lateinische Wendungen wie „intuitu personae“ stehen in den Seitentexten
 * als <span class="locution"> und werden auf der Website kursiv gesetzt.
 * Ohne diese Ausnahme nahm der Editor die Auszeichnung beim ersten
 * Tastendruck stillschweigend heraus.
 */
const estLocution = (el: Element) =>
  el.tagName === 'SPAN' && el.getAttribute('class') === 'locution';

function nettoyer(racine: HTMLElement) {
  for (const el of Array.from(racine.querySelectorAll('*'))) {
    if (estLocution(el)) continue;
    if (!BALISES_PERMISES.has(el.tagName)) {
      // Das Element faellt weg, sein Text bleibt.
      el.replaceWith(...Array.from(el.childNodes));
      continue;
    }
    for (const attr of Array.from(el.attributes)) {
      const garder =
        (el.tagName === 'A' && (attr.name === 'href' || attr.name === 'rel')) ||
        (el.tagName === 'SUP' && attr.name === 'data-note');
      if (!garder) el.removeAttribute(attr.name);
    }
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') ?? '';
      // Kein javascript: und kein data: — auch nicht aus eingefuegtem Text.
      if (!/^(https?:|mailto:|tel:|\/|#)/i.test(href)) el.removeAttribute('href');
      if (/^https?:/i.test(href)) el.setAttribute('rel', 'noopener');
    }
  }
}

export default function EditeurTexte({ valeur, onChange, langue, id, ariaDescribedby }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const t = (c: Parameters<typeof traduire>[1]) => traduire(langue, c);

  // Den Inhalt nur von aussen setzen, wenn er sich wirklich unterscheidet —
  // sonst springt der Schreibcursor bei jedem Tastendruck an den Anfang.
  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== valeur) el.innerHTML = valeur || '';
  }, [valeur]);

  const emettre = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    nettoyer(el);
    onChange(el.innerHTML);
  }, [onChange]);

  const commande = (nom: string, argument?: string) => {
    ref.current?.focus();
    document.execCommand(nom, false, argument);
    emettre();
  };

  const poserLien = () => {
    const cible = window.prompt(t('texte.link_ziel'));
    if (cible === null) return;
    if (cible.trim() === '') commande('unlink');
    else commande('createLink', cible.trim());
  };

  const poserNote = () => {
    const texte = window.prompt(t('texte.fussnote_text'));
    if (!texte?.trim()) return;
    // Die Fussnote steht als <sup data-note="…">. Die Website setzt daraus
    // die Marginalie in der Randspalte.
    const sup = `<sup data-note="${texte.trim().replace(/"/g, '&quot;')}">*</sup>`;
    commande('insertHTML', sup);
  };

  const outils: { cle: Parameters<typeof traduire>[1]; action: () => void }[] = [
    { cle: 'texte.absatz', action: () => commande('formatBlock', 'p') },
    { cle: 'texte.h2', action: () => commande('formatBlock', 'h2') },
    { cle: 'texte.h3', action: () => commande('formatBlock', 'h3') },
    { cle: 'texte.liste', action: () => commande('insertUnorderedList') },
    { cle: 'texte.fett', action: () => commande('bold') },
    { cle: 'texte.kursiv', action: () => commande('italic') },
    { cle: 'texte.link', action: poserLien },
    { cle: 'texte.zitat', action: () => commande('formatBlock', 'blockquote') },
    { cle: 'texte.fussnote', action: poserNote },
  ];

  return (
    <div className="ed">
      <div className="ed__outils" role="toolbar" aria-label={t('texte.absatz')}>
        {outils.map((o) => (
          <button
            key={o.cle}
            type="button"
            className="ed__outil"
            onClick={o.action}
            // Der Fokus bleibt im Text, damit die Auswahl nicht verlorengeht.
            onMouseDown={(e) => e.preventDefault()}
          >
            {t(o.cle)}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        id={id}
        className="ed__champ"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-describedby={ariaDescribedby}
        onInput={emettre}
        onBlur={emettre}
        onPaste={(e) => {
          // Eingefuegtes kommt als reiner Text herein. Alles, was Word,
          // Outlook oder ein PDF mitschleppt, bleibt draussen.
          e.preventDefault();
          const texte = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, texte);
        }}
      />
    </div>
  );
}
