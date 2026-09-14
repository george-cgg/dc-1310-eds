// codegen:layout-pattern=booking-form
// Booking-form widget for Dacia appointments. Renders a compact single-column form
// (adapting fields to appointment_type) in preview/standalone mode; when the MCP tool
// returns a confirmation, it renders a confirmation card instead.
// In production, data comes dynamically from bridge.toolResult.

// Dacia model catalog for the model_name select (standalone/preview mode).
const SAMPLE_MODELS = [
  'Dacia Bigster',
  'Dacia Duster',
  'Dacia Jogger',
  'Dacia Spring',
  'Dacia Sandero Stepway',
  'Dacia Logan',
  'Dacia Sandero',
];

// A sample confirmation used only to preview the confirmation card if desired.
const SAMPLE_CONFIRMATION = null;

// Brand palette read from DESIGN_TOKENS' color tier. getThemedCardBg darkens PALETTE[0]
// to luminance <= 0.12 so white header text keeps WCAG AA contrast.
const PALETTE = ['#646b52', '#3860be', '#000000'];
const ACCENT = '#646b52';

function getThemedCardBg(palette) {
  if (!palette || !palette[0]) return null;
  let hex = palette[0].replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return null;
  const [r, g, b] = [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  const lum = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
  const relLum = (rr, gg, bb) => 0.2126 * lum(rr) + 0.7152 * lum(gg) + 0.0722 * lum(bb);
  if (relLum(r, g, b) <= 0.12) return { bg: `#${hex}`, fg: '#ffffff' };
  let lo = 0; let hi = 1;
  for (let i = 0; i < 20; i += 1) {
    const m = (lo + hi) / 2;
    if (relLum(Math.round(r * m), Math.round(g * m), Math.round(b * m)) > 0.12) hi = m; else lo = m;
  }
  const dr = Math.round(r * lo); const dg = Math.round(g * lo); const db = Math.round(b * lo);
  return { bg: `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`, fg: '#ffffff' };
}
const theme = getThemedCardBg(PALETTE);

const APPOINTMENT_TYPES = ['Test drive', 'Sales consultation', 'Service visit'];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function field(labelText, inputEl) {
  const wrap = el('div', 'bda-field');
  const label = el('label', 'bda-label', labelText);
  if (inputEl.id) label.htmlFor = inputEl.id;
  wrap.appendChild(label);
  wrap.appendChild(inputEl);
  return wrap;
}

function makeSelect(id, options, placeholder) {
  const sel = el('select', 'bda-input');
  sel.id = id;
  if (placeholder) {
    const opt = el('option', null, placeholder);
    opt.value = '';
    opt.disabled = true;
    opt.selected = true;
    sel.appendChild(opt);
  }
  options.forEach((o) => {
    const opt = el('option', null, o);
    opt.value = o;
    sel.appendChild(opt);
  });
  return sel;
}

function makeInput(id, type, placeholder) {
  const inp = el('input', 'bda-input');
  inp.id = id;
  inp.type = type || 'text';
  if (placeholder) inp.placeholder = placeholder;
  return inp;
}

function renderForm(block, models, bridge) {
  block.textContent = '';
  const card = el('div', 'bda-card');

  const header = el('div', 'bda-header');
  header.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'}`;
  header.appendChild(el('h3', 'bda-title', 'Book a Dacia Appointment'));
  header.appendChild(el('p', 'bda-subtitle', 'Choose an appointment type and we will arrange the details with your selected Dacia agent.'));
  card.appendChild(header);

  const form = el('form', 'bda-form');

  // Type selector always shown.
  const typeSel = makeSelect('bda-type', APPOINTMENT_TYPES);
  const modelSel = makeSelect('bda-model', models, 'Select a model');
  const vinInput = makeInput('bda-vin', 'text', 'Registration or VIN');
  const serviceSel = makeSelect('bda-service', ['Periodic maintenance', 'ITP preparation', 'Body repair', 'Windshield repair', 'Tires', 'Diagnosis']);
  const mileageInput = makeInput('bda-mileage', 'number', 'Current mileage (km)');
  const dateInput = makeInput('bda-date', 'date');
  const timeInput = makeInput('bda-time', 'time');

  const typeField = field('Appointment type', typeSel);
  const modelField = field('Model', modelSel);
  const vinField = field('Registration / VIN', vinInput);
  const serviceField = field('Service need', serviceSel);
  const mileageField = field('Mileage (km)', mileageInput);
  const dateField = field('Preferred date', dateInput);
  const timeField = field('Preferred time', timeInput);

  form.appendChild(typeField);

  // Dynamic middle section adapts to appointment_type.
  const dynamic = el('div', 'bda-dynamic');
  form.appendChild(dynamic);

  form.appendChild(dateField);
  form.appendChild(timeField);

  function syncFields() {
    dynamic.textContent = '';
    if (typeSel.value === 'Service visit') {
      dynamic.appendChild(modelField);
      dynamic.appendChild(vinField);
      dynamic.appendChild(serviceField);
      dynamic.appendChild(mileageField);
    } else {
      dynamic.appendChild(modelField);
    }
  }
  typeSel.addEventListener('change', syncFields);
  syncFields();

  const cta = el('button', 'bda-cta bda-cta-primary', 'Confirm Booking');
  cta.type = 'submit';
  form.appendChild(cta);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!bridge) return;
    const parts = [`I'd like to book a ${typeSel.value.toLowerCase()}`];
    if (modelSel.value) parts.push(`for a ${modelSel.value}`);
    if (typeSel.value === 'Service visit') {
      if (serviceSel.value) parts.push(`(${serviceSel.value})`);
      if (vinInput.value) parts.push(`vehicle ${vinInput.value}`);
      if (mileageInput.value) parts.push(`at ${mileageInput.value} km`);
    }
    if (dateInput.value) parts.push(`on ${dateInput.value}`);
    if (timeInput.value) parts.push(`around ${timeInput.value}`);
    bridge.sendMessage(`${parts.join(' ')}.`);
  });

  card.appendChild(form);
  block.appendChild(card);
}

function renderConfirmation(block, c, bridge) {
  block.textContent = '';
  const card = el('div', 'bda-card');

  const header = el('div', 'bda-header');
  header.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'}`;

  const status = (c.status || '').toLowerCase();
  const confirmed = status.includes('confirm') && !status.includes('pending') && !status.includes('unable');
  const chip = el('span', `bda-chip ${confirmed ? 'bda-chip-ok' : 'bda-chip-pending'}`);
  chip.textContent = confirmed ? '✓ Confirmed' : (status.includes('unable') ? '✕ Unable to book' : '◷ Awaiting confirmation');
  header.appendChild(chip);

  header.appendChild(el('h3', 'bda-title', c.appointment_type ? `${c.appointment_type}` : 'Appointment request'));
  if (c.confirmation_id) header.appendChild(el('p', 'bda-subtitle', `Reference: ${c.confirmation_id}`));
  card.appendChild(header);

  const body = el('div', 'bda-conf-body');

  const rows = [
    ['Model', c.model_name],
    ['Location', c.location_name],
    ['Address', c.location_address],
    ['Date', c.appointment_date],
    ['Time', c.appointment_time],
  ];
  rows.forEach(([k, v]) => {
    if (!v) return;
    const row = el('div', 'bda-row');
    row.appendChild(el('span', 'bda-row-k', k));
    row.appendChild(el('span', 'bda-row-v', v));
    body.appendChild(row);
  });

  if (Array.isArray(c.next_steps) && c.next_steps.length) {
    const stepsWrap = el('div', 'bda-steps');
    stepsWrap.appendChild(el('div', 'bda-steps-title', 'Next steps'));
    const ul = el('ul', 'bda-steps-list');
    c.next_steps.forEach((s) => ul.appendChild(el('li', null, s)));
    stepsWrap.appendChild(ul);
    body.appendChild(stepsWrap);
  }

  const actions = el('div', 'bda-actions');
  const loc = el('button', 'bda-cta bda-cta-ghost', 'Choose Another Location');
  const time = el('button', 'bda-cta bda-cta-ghost', 'Change Time');
  if (bridge) {
    loc.addEventListener('click', () => bridge.sendMessage('I want to choose a different Dacia location for this appointment.'));
    time.addEventListener('click', () => bridge.sendMessage('I want to change the time for this appointment.'));
  }
  actions.appendChild(loc);
  actions.appendChild(time);
  body.appendChild(actions);

  card.appendChild(body);
  block.appendChild(card);
}

function render(block, confirmation, models, bridge) {
  if (confirmation && (confirmation.status || confirmation.confirmation_id)) {
    renderConfirmation(block, confirmation, bridge);
  } else {
    renderForm(block, models, bridge);
  }
}

export default async function decorate(block, bridge) {
  let confirmation = SAMPLE_CONFIRMATION;
  const models = SAMPLE_MODELS;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      confirmation = SAMPLE_CONFIRMATION;
    } else {
      // Confirmation concept — structuredContent IS the flat confirmation object.
      const _result = await bridge.toolResult;
      confirmation = _result?.structuredContent || {};
    }
    render(block, confirmation, models, bridge);
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bridge.reportSize(block.offsetWidth, block.offsetHeight), 150);
    });
    ro.observe(block);
  } else {
    render(block, confirmation, models, bridge);
  }
}
