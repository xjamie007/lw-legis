# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Entrepreneurs, investors and private clients, many of them non-residents (France, Belgium, Germany), who need Luxembourg-specific legal help: setting up or domiciling a company (SOPARFI, SPF), holding property in Luxembourg, passing on assets, collecting a debt from a Luxembourg or foreign debtor.
- Creditors and collection groups abroad who need a Luxembourg correspondent for debt recovery.
- Professionals (fiduciaries, tax advisers, bankers) who follow the firm's conferences and read its thematic files.

They arrive with a concrete matter, want to know quickly whether the firm handles it, and then call, write or send the form.

## Product Purpose

Public website of the Étude d'Avocats LW LEGIS, Luxembourg (cabinet-avocats-lorang.com). It presents the firm and its lawyers, its fields of activity, its thematic files and its conference papers, and leads to contact. Success: a visitor with a matter recognises it on the site and gets in touch.

## Positioning

- Founded by and around Me Alain LORANG, avocat au Barreau de Luxembourg since 1982; maîtrise en droit des affaires Paris II (Assas, 1980), Sciences Po Paris (Éco-Fin, 1981); expert judiciaire at the Cour d'Appel de Luxembourg; former secretary of the Conseil de l'Ordre; board member and treasurer of the Observatoire Luxembourgeois de Droit Européen.
- Not a "usine de droit": a human-scale firm built on the intuitu personae relationship with the client.
- Authorised to domicile companies; official Luxembourg representative of Intrum Justitia and IJCOF; affiliated to the ADVOUNION network; Luxembourg representative of the LIC (League International for Creditors); working relationship with the firm VIAJURIS (France).
- Me Lorang gives recurring conferences; the papers are published.

## Operating Context

Astro static site, content from Supabase (snapshot at build), editable by the firm in the in-page editor (footer "Login", same flow as the Krombach and DRP demos). Languages: French (reference) and English, as on the old site. Address: 41, avenue du X Septembre, B.P. 1734, L-2551 Luxembourg. Phone 00352 44 71 76 1. contact@cabinet-avocats-lorang.com.

## Capabilities and Constraints

- Content must match the old site (cabinet-avocats-lorang.com): Accueil, Les avocats, Activités (with their detail pages), Dossiers thématiques, Conférences (PDF papers), Partenaires, Contact, Conditions générales, Mentions légales / confidentialité / cookies.
- Removed on purpose: situation matrix, fees page, FAQ (not on the old site).
- New practical features may be added when they invent no facts.
- No cookies or trackers on the public site; contact form goes through Supabase (`send-inquiry`).
- Luxembourg bar ethics: no invented testimonials, figures, rankings or comparative claims.

## Brand Commitments

- Name: Étude d'Avocats LW LEGIS (also "LW LEGIS", "cabinet Lorang").
- Logo: the coat of arms mark (`public/bilder/wappen.png`, `wappen-hell.png`).
- The visual look of the old site is not a reference. The current repo design (cream, serif, green and brass) is rejected by the client as looking AI-made.
- Standing preference: the category standard for law firms, executed at full craft, alongside Elvinger Hoss Prussen, Arendt & Medernach and Bredin Prat (chosen by the client on 2026-10-29).

## Evidence on Hand

- Old site texts, FR and EN, all pages.
- Photos: office and portrait (`public/bilder/bureau-1`, `bureau-2`, `portrait`), more office photos in `~/Desktop/Engagement/Nave/Etude LW Legis/Fotoen`.
- Conference PDFs on the old site and in `~/Desktop/Engagement/Nave/LW Legis/Conférences`.
- Absent and not to be invented: client testimonials, case counts, staff counts, revenue, firm timeline, office hours, prices. The old site's placeholders ("Lorem ipsum" timeline, sample testimonials, the four figures, the loan widget) are dropped.

## Product Principles

- A visitor with a matter finds it in one look and knows how to reach a lawyer.
- Every statement on the page is one the firm has made itself.
- The firm's own writing (files, conference papers) is the proof of competence.
- Human scale over corporate scale.

## Accessibility & Inclusion

WCAG 2.2 AA, as already required by the project (contrast checks in `scripts/check-contrast.mjs`).
