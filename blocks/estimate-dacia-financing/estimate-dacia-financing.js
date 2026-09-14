// codegen:layout-pattern=generic-list
// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = {
  vehicle_price: 26000,
  currency: 'EUR',
  options: [
    {
      financing_type: 'Dacia Credit',
      down_payment: 6000,
      financed_amount: 20000,
      term_months: 48,
      estimated_monthly_payment: 449,
      included_services: [],
      assumptions: 'Indicative APR 7.9%, standard published Dacia Credit conditions for private customers.',
    },
    {
      financing_type: 'Dacia Credit + Services',
      down_payment: 6000,
      financed_amount: 20000,
      term_months: 48,
      estimated_monthly_payment: 489,
      included_services: ['maintenance', 'assistance', 'warranty extension'],
      assumptions: 'Indicative APR 7.9% plus bundled service package spread across the term.',
    },
    {
      financing_type: 'Mobilize Financial Leasing',
      down_payment: 6000,
      financed_amount: 20000,
      term_months: 48,
      estimated_monthly_payment: 419,
      included_services: [],
      assumptions: 'Financial leasing with an estimated buy-out value at term end; indicative lessor conditions.',
    },
  ],
  disclaimer: 'Estimates for exploration only, not an approval or contractual offer.',
  quote_url: '',
};

// Brand palette from DESIGN_TOKENS (Boxwood Utility): olive accent, secondary blue, black, white.
const PALETTE = ['#646b52', '#3860be', '#000000', '#ffffff'];

function fmtMoney(value, currency) {
  if (value == null || Number.isNaN(Number(value))) return '';
  const cur = currency || 'EUR';
  try {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency', currency: cur, maximumFractionDigits: 0,
    }).format(Number(value));
  } catch (e) {
    return `${Number(value).toLocaleString()} ${cur}`;
  }
}

export default async function decorate(block, bridge) {
  let data;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      data = SAMPLE_DATA;
    } else {
      const _result = await bridge.toolResult;
      const structuredContent = _result?.structuredContent || {};
      data = structuredContent;
    }
  } else {
    data = SAMPLE_DATA;
  }

  block.textContent = '';
  renderPanel(block, data || {}, bridge);

  if (bridge) {
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bridge.reportSize(block.offsetWidth, block.offsetHeight), 150);
    });
    ro.observe(block);
  }
}

function renderPanel(block, data, bridge) {
  const currency = data.currency || 'EUR';
  const options = Array.isArray(data.options) ? data.options : [];
  const quoteUrl = data.quote_url || (data.options && data.options.quote_url) || '';

  const panel = document.createElement('div');
  panel.className = 'estimate-dacia-financing-panel';

  if (data.vehicle_price != null) {
    const head = document.createElement('div');
    head.className = 'edf-head';
    const label = document.createElement('span');
    label.className = 'edf-head-label';
    label.textContent = 'Vehicle price';
    const val = document.createElement('span');
    val.className = 'edf-head-price';
    val.textContent = fmtMoney(data.vehicle_price, currency);
    head.appendChild(label);
    head.appendChild(val);
    panel.appendChild(head);
  }

  // Determine lowest monthly estimate (first index among those with a numeric value).
  let lowestIdx = -1;
  let lowestVal = Infinity;
  options.forEach((o, i) => {
    const m = Number(o.estimated_monthly_payment);
    if (!Number.isNaN(m) && m > 0 && m < lowestVal) { lowestVal = m; lowestIdx = i; }
  });

  const row = document.createElement('div');
  row.className = 'edf-row';

  options.forEach((opt, i) => {
    row.appendChild(buildCard(opt, i === lowestIdx, currency));
  });

  const rowWrap = document.createElement('div');
  rowWrap.className = 'edf-row-wrap';
  rowWrap.appendChild(row);
  if (options.length > 3) {
    const fade = document.createElement('div');
    fade.className = 'edf-fade';
    rowWrap.appendChild(fade);
  }
  panel.appendChild(rowWrap);

  // CTAs
  const ctas = document.createElement('div');
  ctas.className = 'edf-ctas';

  const adjust = document.createElement('button');
  adjust.className = 'edf-cta edf-cta-ghost';
  adjust.type = 'button';
  adjust.textContent = 'Adjust Inputs';
  if (bridge) {
    adjust.addEventListener('click', () => bridge.sendMessage('Adjust my Dacia financing inputs'));
  }

  const quote = document.createElement('button');
  quote.className = 'edf-cta edf-cta-primary';
  quote.type = 'button';
  quote.textContent = 'Request Personalized Quote';
  if (bridge) {
    quote.addEventListener('click', () => {
      if (quoteUrl) bridge.openLink(quoteUrl);
      else bridge.sendMessage('Request a personalized Dacia financing quote');
    });
  }

  const dealer = document.createElement('button');
  dealer.className = 'edf-cta edf-cta-ghost';
  dealer.type = 'button';
  dealer.textContent = 'Find a Dealer';
  if (bridge) {
    dealer.addEventListener('click', () => {
      if (quoteUrl) bridge.openLink(quoteUrl);
      else bridge.sendMessage('Find a Dacia dealer near me');
    });
  }

  ctas.appendChild(adjust);
  ctas.appendChild(quote);
  ctas.appendChild(dealer);
  panel.appendChild(ctas);

  block.appendChild(panel);
}

function buildCard(opt, isLowest, currency) {
  const card = document.createElement('div');
  card.className = 'edf-card';

  const top = document.createElement('div');
  top.className = 'edf-card-top';

  const title = document.createElement('div');
  title.className = 'edf-card-title';
  title.textContent = opt.financing_type || 'Financing';
  top.appendChild(title);

  if (isLowest) {
    const chip = document.createElement('span');
    chip.className = 'edf-lowest';
    chip.textContent = 'Lowest estimate';
    top.appendChild(chip);
  }
  card.appendChild(top);

  const monthly = document.createElement('div');
  monthly.className = 'edf-monthly';
  const mVal = opt.estimated_monthly_payment;
  if (mVal != null && !Number.isNaN(Number(mVal))) {
    monthly.textContent = `${fmtMoney(mVal, currency)} / mo`;
  } else {
    monthly.textContent = 'Payment on request';
    monthly.classList.add('edf-monthly-na');
  }
  card.appendChild(monthly);

  // Stacked bar: deposit vs financed.
  const dep = Number(opt.down_payment) || 0;
  const fin = Number(opt.financed_amount) || 0;
  const total = dep + fin;
  if (total > 0) {
    const bar = document.createElement('div');
    bar.className = 'edf-bar';
    const depSeg = document.createElement('div');
    depSeg.className = 'edf-bar-dep';
    depSeg.style.width = `${Math.round((dep / total) * 100)}%`;
    const finSeg = document.createElement('div');
    finSeg.className = 'edf-bar-fin';
    finSeg.style.width = `${Math.round((fin / total) * 100)}%`;
    bar.appendChild(depSeg);
    bar.appendChild(finSeg);
    card.appendChild(bar);

    const legend = document.createElement('div');
    legend.className = 'edf-legend';
    const depL = document.createElement('span');
    depL.className = 'edf-legend-dep';
    depL.textContent = `Deposit ${fmtMoney(dep, currency)}`;
    const finL = document.createElement('span');
    finL.className = 'edf-legend-fin';
    finL.textContent = `Financed ${fmtMoney(fin, currency)}`;
    legend.appendChild(depL);
    legend.appendChild(finL);
    card.appendChild(legend);
  }

  if (opt.term_months != null) {
    const term = document.createElement('div');
    term.className = 'edf-term';
    term.textContent = `${opt.term_months} months`;
    card.appendChild(term);
  }

  const services = Array.isArray(opt.included_services) ? opt.included_services : [];
  if (services.length) {
    const chips = document.createElement('div');
    chips.className = 'edf-chips';
    services.forEach((s) => {
      const c = document.createElement('span');
      c.className = 'edf-chip';
      c.textContent = s;
      chips.appendChild(c);
    });
    card.appendChild(chips);
  }

  if (opt.assumptions) {
    const note = document.createElement('div');
    note.className = 'edf-note';
    note.textContent = opt.assumptions;
    card.appendChild(note);
  }

  return card;
}
