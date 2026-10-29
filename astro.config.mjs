// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * LW LEGIS — Astro-Konfiguration
 *
 * Die öffentliche Seite wird vollständig statisch erzeugt (output: 'static').
 * Es gibt zur Laufzeit keine Datenbankabfrage: `scripts/fetch-content.mjs`
 * holt die Inhalte vor dem Build aus Supabase und schreibt sie nach
 * `content/snapshot.json`; Astro liest ausschliesslich diesen Schnappschuss.
 *
 * Sprach-Routing ist bewusst NICHT ueber `i18n` von Astro geloest, sondern
 * ueber explizite `[lang]`-Routen: die Pfadsegmente unterscheiden sich je
 * Sprache (/fr/votre-situation/ vs. /de/ihre-situation/), was Astros
 * Praefix-Routing nicht abbilden kann.
 */
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.lw-legis.lu',
  // Unterpfad der Auslieferung. Auf der eigenen Domain liegt die Seite in
  // der Wurzel; GitHub Pages liefert ein Projekt-Repository unter
  // /<name>/ aus. Bei '/' ist `src/lib/base.ts` wirkungslos und der Build
  // ist Zeichen fuer Zeichen derselbe wie ohne diese Zeile.
  base: process.env.PUBLIC_BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
    // Genau eine React-Kopie im Baum. Ohne das laedt der
    // Entwicklungsserver den Redaktionsbereich gegen eine zweite Kopie und
    // bricht mit "_jsxDEV is not a function" ab. Im Produktionsbuild trat
    // das nie auf — deshalb steht der Grund hier und nicht im Gedaechtnis.
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
  devToolbar: { enabled: false },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
