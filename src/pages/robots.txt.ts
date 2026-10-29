/**
 * src/pages/robots.txt.ts
 *
 * Der Adminbereich ist ausgeschlossen. Er traegt zusaetzlich noindex und
 * steht nicht in der Sitemap — robots.txt allein reicht dafuer nicht, weil
 * eine ausgeschlossene Adresse trotzdem im Index landen kann, wenn jemand
 * sie verlinkt.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../lib/seo';

export const GET: APIRoute = () => {
  const corps = `# Étude d'Avocats LW LEGIS
User-agent: *
Allow: /

# Redaktionsbereich — nicht indexieren
Disallow: /admin
Disallow: /admin/

# Bestätigungsseiten des Formulars tragen kein eigenes Ergebnis
Disallow: /*/message-recu/
Disallow: /*/nachricht-erhalten/
Disallow: /*/message-received/

Sitemap: ${SITE}/sitemap.xml
`;
  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
