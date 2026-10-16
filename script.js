const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
const art = document.querySelector('.art');
const toggle = document.querySelector('#art-toggle');
toggle.addEventListener('click', () => { const paused = art.classList.toggle('paused'); toggle.setAttribute('aria-pressed', String(paused)); toggle.setAttribute('aria-label', paused ? 'Play artwork animation' : 'Pause artwork animation'); toggle.textContent = paused ? '▷' : 'Ⅱ'; });
if (matchMedia('(prefers-reduced-motion: reduce)').matches) toggle.hidden = true;
document.querySelector('#copy-email').addEventListener('click', async () => { const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('bobbykrishna035@gmail.com'); status.textContent = 'Email copied. Let’s make something great.'; } catch { status.textContent = 'Copy this address: bobbykrishna035@gmail.com'; } });
document.querySelector('#year').textContent = new Date().getFullYear();

// Local, deterministic prototypes: no external API calls or fabricated AI output.
const sampleDocuments = [
  { title: 'API design notes', terms: 'api security authentication validation request json endpoint', excerpt: 'Validate request bodies against a schema. Authenticate callers, authorize each resource, and return consistent errors without exposing secrets.' },
  { title: 'Retrieval system notes', terms: 'ai retrieval rag llm embeddings documents citations search', excerpt: 'Split documents into meaningful chunks, retrieve relevant passages, and attach source citations. If retrieval finds no useful evidence, say so instead of inventing an answer.' },
  { title: 'Accessible interface checklist', terms: 'accessibility accessible keyboard focus interface web design', excerpt: 'Use semantic HTML, visible keyboard focus, descriptive labels, and sufficient contrast. Respect reduced motion and announce dynamic results through a live region.' }
];
const searchInput = document.querySelector('#knowledge-query');
function searchKnowledge() {
  const tokens = searchInput.value.toLowerCase().match(/[a-z0-9]+/g) || [];
  const matches = sampleDocuments.map(doc => ({ ...doc, score: tokens.filter(token => doc.terms.split(' ').includes(token)).length })).filter(doc => doc.score > 0).sort((a, b) => b.score - a.score);
  const results = document.querySelector('#knowledge-results');
  results.replaceChildren();
  if (!matches.length) { const hint = document.createElement('p'); hint.className = 'demo-hint'; hint.textContent = 'No matching source found. Try API security, AI retrieval, or accessibility.'; results.append(hint); return; }
  for (const match of matches) { const article = document.createElement('article'); article.className = 'search-result'; const title = document.createElement('strong'); title.textContent = match.title; const excerpt = document.createElement('p'); excerpt.textContent = match.excerpt; article.append(title, excerpt); results.append(article); }
}
 document.querySelector('#knowledge-form').addEventListener('submit', event => { event.preventDefault(); searchKnowledge(); });
 document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => { searchInput.value = button.dataset.query; searchKnowledge(); }));
 document.querySelector('#validate-request').addEventListener('click', () => {
  const output = document.querySelector('#api-result');
  try {
    const payload = JSON.parse(document.querySelector('#api-input').value);
    const errors = [];
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) errors.push('Body must be a JSON object.');
    else {
      if (typeof payload.name !== 'string' || !payload.name.trim()) errors.push('name: provide a non-empty string.');
      if (!Array.isArray(payload.stack) || !payload.stack.length || payload.stack.some(item => typeof item !== 'string' || !item.trim())) errors.push('stack: provide a non-empty array of technology names.');
      if (!['prototype', 'in-progress', 'complete'].includes(payload.status)) errors.push('status: use prototype, in-progress, or complete.');
    }
    output.dataset.valid = String(!errors.length);
    output.textContent = errors.length ? 'Validation failed\n' + errors.join('\n') : '✓ Valid payload · 3 schema checks passed. No request sent.';
  } catch { output.dataset.valid = 'false'; output.textContent = 'Invalid JSON. Use double quotes and check commas and brackets.'; }
 });
const activityData = { week: { values: [12,19,15,27,23,14,18], labels: ['M','T','W','T','F','S','S'], description: 'completed tasks · sample week' }, month: { values: [86,112,97,128], labels: ['W1','W2','W3','W4'], description: 'completed tasks · sample month' } };
document.querySelectorAll('[data-range]').forEach(button => button.addEventListener('click', () => {
  const data = activityData[button.dataset.range];
  document.querySelectorAll('[data-range]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#activity-total').textContent = data.values.reduce((sum, value) => sum + value, 0);
  document.querySelector('#activity-description').textContent = data.description;
  const chart = document.querySelector('#activity-chart'); chart.replaceChildren();
  chart.setAttribute('aria-label', 'Illustrative ' + button.dataset.range + ' task counts: ' + data.values.join(', '));
  const max = Math.max(...data.values) / .9;
  data.values.forEach((value, index) => { const column = document.createElement('div'); column.style.setProperty('--bar', (value / max * 100) + '%'); const bar = document.createElement('i'); const label = document.createElement('span'); label.textContent = data.labels[index]; column.title = data.labels[index] + ': ' + value + ' tasks'; column.append(bar, label); chart.append(column); });
}));

// Business showcase and enquiry flow.
const conceptDetails = {
 saffron: {name:'Saffron & Sage', type:'Restaurant & café', goal:'Give visitors a feel for the atmosphere, help them explore the menu, and make the next visit easy to plan.', features:['Seasonal menu and signature dishes','Location, opening hours, and directions','A reservation journey connected to your chosen booking service'], service:'Business website'},
 form: {name:'Form / Object', type:'Lifestyle storefront', goal:'Let your products take the lead with a considered visual identity and clear paths from discovery to purchase.', features:['Product categories and collection storytelling','Product details, variants, and photography','Cart and checkout integration scoped to the chosen commerce platform'], service:'Store or custom website'},
 haven: {name:'Haven Estates', type:'Property website', goal:'Give each property room to shine while helping visitors find the details they need before making an enquiry.', features:['Property cards and rich listing pages','Location, price, and property-type filters','Viewing requests and enquiry capture'], service:'Business website'},
 aura: {name:'Aura Studio', type:'Salon & wellness website', goal:'Create a calm first impression and make treatments, pricing, and booking options easy to understand.', features:['Treatment and service menus','A space for your team and studio photography','Appointment booking through an agreed provider'], service:'Business website'},
 stride: {name:'Stride / Fitness', type:'Fitness & coaching website', goal:'Show visitors what you offer, who your programs are for, and how to take the first step.', features:['Program and membership comparisons','Coach profiles and training approach','Trial-session or consultation enquiries'], service:'Business website'},
 orbit: {name:'Orbit', type:'Startup landing page', goal:'Turn a complex product into a simple story: what it does, why it matters, and what visitors should do next.', features:['Product features and workflow storytelling','Transparent plan comparison','Demo-request or early-access enquiry flow'], service:'Landing page'}
};
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
 let count = 0;
 document.querySelectorAll('.business-project').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
 document.querySelector('#filter-status').textContent = count + ' website concepts shown.';
}));
const conceptDialog = document.querySelector('#concept-dialog');
let currentConcept;
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
 currentConcept = conceptDetails[button.dataset.preview];
 const content = document.querySelector('#concept-content'); content.replaceChildren();
 const preview = document.querySelector('.site-preview[data-preview="' + button.dataset.preview + '"]');
 const scene = document.createElement('div'); scene.className = 'dialog-scene ' + [...preview.classList].filter(name => name.endsWith('-art')).join(' ');
 for (const child of preview.children) scene.append(child.cloneNode(true));
 const details = document.createElement('div'); details.className = 'concept-details';
 const title = document.createElement('h2'); title.id = 'concept-title'; title.textContent = currentConcept.name + ' / ' + currentConcept.type;
 const goal = document.createElement('p'); goal.textContent = currentConcept.goal;
 const list = document.createElement('ul'); currentConcept.features.forEach(feature => { const li = document.createElement('li'); li.textContent = feature; list.append(li); });
 const note = document.createElement('p'); note.textContent = 'Visual concept only. The features above describe a possible client build; booking, checkout, and enquiry integrations are not live in this preview.';
 details.append(title, goal, list, note); content.append(scene, details); conceptDialog.showModal(); document.body.classList.add('dialog-open');
}));
conceptDialog.querySelector('.dialog-close').addEventListener('click', () => conceptDialog.close());
conceptDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
document.querySelector('#concept-enquiry').addEventListener('click', () => {
 document.querySelector('#website-type').value = currentConcept.service;
 const brief = document.querySelector('#project-brief');
 if (!brief.value.trim()) brief.value = 'I’m interested in a website inspired by the ' + currentConcept.name + ' concept. My business is ';
 conceptDialog.close();
});
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#website-type').value = link.dataset.service; }));
let preparedBrief = '';
document.querySelector('#brief-form').addEventListener('submit', event => {
 event.preventDefault();
 const name = document.querySelector('#client-name').value.trim();
 const email = document.querySelector('#client-email').value.trim();
 const business = document.querySelector('#client-business').value.trim();
 const type = document.querySelector('#website-type').value;
 const message = document.querySelector('#project-brief').value.trim();
 if (!name || message.length < 10) { document.querySelector('#project-brief').setCustomValidity('Please include at least 10 characters describing your project.'); document.querySelector('#project-brief').reportValidity(); return; }
 preparedBrief = `Hi Harikrishna,\n\nI’d like to discuss a website project.\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || 'Not specified'}\nWebsite type: ${type}\n\nProject details:\n${message}\n\nThanks,\n${name}`;
 document.querySelector('#brief-preview').textContent = preparedBrief;
 document.querySelector('#send-enquiry').href = 'mailto:bobbykrishna035@gmail.com?subject=' + encodeURIComponent('Website enquiry — ' + type) + '&body=' + encodeURIComponent(preparedBrief);
 document.querySelector('#brief-result').hidden = false;
 document.querySelector('#brief-status').textContent = 'Draft prepared. You choose when to send it.';
 document.querySelector('#brief-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
});
document.querySelector('#project-brief').addEventListener('input', event => event.target.setCustomValidity(''));
document.querySelector('#copy-brief').addEventListener('click', async () => { try { await navigator.clipboard.writeText(preparedBrief); document.querySelector('#brief-status').textContent = 'Enquiry copied. Paste it into an email to bobbykrishna035@gmail.com.'; } catch { document.querySelector('#brief-status').textContent = 'Select and copy the draft above, then email bobbykrishna035@gmail.com.'; } });
