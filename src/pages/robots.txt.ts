/**
 * src/pages/robots.txt.ts
 *
 * Der Adminbereich ist ausgeschlossen. Er traegt zusaetzlich noindex und
 * steht nicht in der Sitemap — robots.txt allein reicht dafuer nicht, weil
 * eine ausgeschlossene Adresse trotzdem im Index landen kann, wenn jemand
 * sie verlinkt.
 *
 * PUBLIC_NOINDEX=1 schaltet auf eine Vorschau um: dann ist alles gesperrt.
 * Eine unfertige Fassung darf nicht neben der echten Seite im Index
 * stehen — sie wuerde mit ihr um dieselben Suchbegriffe konkurrieren.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../lib/seo';
import { BASE } from '../lib/base';

const VORSCHAU = import.meta.env.PUBLIC_NOINDEX === '1';

export const GET: APIRoute = () => {
  const corps = VORSCHAU
    ? `# Étude d'Avocats LW LEGIS — Vorschau, nicht die veröffentlichte Seite
User-agent: *
Disallow: /
`
    : `# Étude d'Avocats LW LEGIS
User-agent: *
Allow: /

# Redaktionsbereich — nicht indexieren
Disallow: ${BASE}/admin
Disallow: ${BASE}/admin/

# Bestätigungsseiten des Formulars tragen kein eigenes Ergebnis
Disallow: ${BASE}/*/message-recu/
Disallow: ${BASE}/*/nachricht-erhalten/
Disallow: ${BASE}/*/message-received/

Sitemap: ${SITE}${BASE}/sitemap.xml
`;
  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
