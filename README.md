# Harikrishna — Portfolio

A responsive, original portfolio built with HTML, CSS, and JavaScript. No dependencies or build step required.

## Preview

Run `node server.mjs` and open http://127.0.0.1:3000 (`npm run dev` also works if npm is installed). You can also open `index.html` directly. Google Fonts requires an internet connection; system fonts provide a fallback.

## Edit

- `index.html`: biography, project links, social links, and email.
- `styles.css`: layout, colors, and animated orbital artwork.
- `script.js`: mobile navigation, animation controls, and copy-email interaction.
- `favicon.svg`: browser icon.

Email, LinkedIn, and skills were taken from the owner's public portfolio. Project links refer to the owner's real GitHub repositories. Project illustrations are original conceptual artwork, not application screenshots. No fabricated metrics or testimonials are used.

## GitHub Pages

Push these files to the intended repository. In repository Settings → Pages, select Deploy from a branch, choose your branch and `/ (root)`, then save. All asset paths are relative, so repository-based Pages URLs are supported. A `.nojekyll` file is included.

Run `npm run check` for JavaScript syntax checks. The contact link opens the visitor's email application; there is no form backend or analytics.

## Interactive Build Lab

Three original browser prototypes complement the existing GitHub projects:
- Context:// searches curated notes locally and displays source excerpts. It does not call an LLM.
- Endpoint Studio validates JSON request payloads locally, including malformed JSON and field errors. It sends no API requests.
- Pulse Analytics switches illustrative weekly/monthly datasets and calculates totals.

Each card distinguishes implemented browser functionality from proposed backend architecture. Browser checks covered retrieval/no-results states, valid/invalid JSON, schema errors, monthly total (423), and mobile layout with no horizontal overflow.

## Business-focused portfolio

The main site now targets website customers with six fictional business design concepts (restaurant, retail, property, wellness, fitness, and startup), category filters, accessible preview dialogs, services, process, and FAQs. Technical prototypes remain available in an expandable Build Lab.

The enquiry form validates required fields and prepares an editable email draft through a mailto link. It does not store leads or send messages automatically; visitors can copy the enquiry if they do not have a configured email app. Live lead capture requires a separately configured backend or form provider.

Browser verification covered concept filtering, modal previews, selected-service prefilling, email draft generation, and mobile page width. No client commissions, sales results, or testimonials are fabricated.
