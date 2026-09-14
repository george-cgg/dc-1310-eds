// codegen:layout-pattern=comparison
// Sample data for standalone/preview mode (verbatim samplePayload).
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [{"name": "Dacia Bigster", "description": "The largest, most-equipped SUV in the range, now with a tribrid GPL hybrid powertrain, automatic transmission and 4x4.", "price": "from 20.490 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["tribrid 150 4x4", "hybrid 155", "mild hybrid-G 140"], "transmission": "automatic", "primary_use": "family travel, long-distance driving, off-road trips", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/bigster-db3l1-ph1/oveview/dacia-bigster-db3l1-ph1-055-mobile.jpg.ximg.xsmall.jpg/4b67d90d3c.jpg"}, {"name": "Dacia Duster", "description": "A capable compact SUV available with full hybrid, GPL and 4x4 options for city and off-road use.", "price": "from 17.100 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155", "mild hybrid-G 140", "tribrid 150 4x4"], "transmission": "manual, automatic", "primary_use": "family travel, off-road trips, urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/duster-p1310/overview/editorial/dacia-duster-p1310-overview-004-1-mobile.jpg.ximg.xsmall.jpg/ba4175c768.jpg"}, {"name": "Dacia Jogger", "description": "A versatile family vehicle with 5 or 7 seats, a large boot and economical hybrid and GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/rji/jogger-ri1-ph2/herozone-banners/jogger-ri1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/5224fc9270.jpg", "price": "from 16.650 EUR", "category": "Family / MPV", "body_style": "family vehicle", "seats": 7, "powertrains": ["hybrid 155", "TCe 110", "Eco-G 120"], "transmission": "manual, automatic", "primary_use": "family travel, long-distance driving"}, {"name": "Dacia Spring", "description": "A 100% electric four-seat city car with up to 315 km urban WLTP range and a 10\" multimedia screen.", "price": "from 17.121 EUR", "category": "City car / Electric", "body_style": "city car", "seats": 4, "powertrains": ["electric 100", "electric 70"], "transmission": "automatic", "primary_use": "urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/dacia-bbg/spring-s2e-ph2-my26/overview/editorial/dacia-spring-s2e-ph2-overview-003.jpg.ximg.xsmall.jpg/5e53676620.jpg"}, {"name": "Dacia Sandero Stepway", "description": "A rugged crossover with raised driving position, modular roof bars and full hybrid or factory GPL power.", "price": "from 13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 110"], "transmission": "manual, automatic", "primary_use": "urban commuting, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-mobile-001.jpg.ximg.small.jpg/635d9dd22b.jpg"}, {"name": "Dacia Logan", "description": "The most powerful Logan yet: a spacious sedan with a 120 HP factory-GPL engine and dual-clutch automatic.", "price": "from 12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "business use, long-distance driving, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/logan/logan-li1-ph2/herozone-banners/dacia-logan-li1-ph2-herozone-001-mobile.jpg.ximg.small.jpg/85abe768b9.jpg"}, {"name": "Dacia Sandero", "description": "A stylish five-seat city hatchback with a redesigned grille, 10\" display and hybrid or GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero/sandero-bi1-ph2/herozone-banners/sandero-bi1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/0e69ac9dc8.jpg", "price": "from 13.541 EUR", "category": "City car / Hatchback", "body_style": "hatchback", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "urban commuting"}, {"name": "Rabla Offer: Duster Expression Hybrid 155", "description": "Duster full hybrid 155 under the Rabla scrappage programme combined with Dacia Credit financing.", "price": "19.959 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155"], "transmission": "automatic", "primary_use": "family travel, off-road trips", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gama-dacia/duster-hybrid-mobile.jpg.ximg.xsmall.jpg/d40e95eb02.jpg"}, {"name": "Rabla Offer: Logan Essential Eco-G 120", "description": "Logan sedan with factory GPL under the Rabla programme and Dacia Credit, VAT included.", "price": "11.990 EUR", "original_price": "12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "business use, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.xsmall.jpg/7d9c1a07d2.jpg"}, {"name": "Rabla Offer: Sandero Stepway Essential Eco-G 120", "description": "Sandero Stepway crossover with factory GPL under the Rabla programme and Dacia Credit.", "price": "12.990 EUR", "original_price": "13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "urban commuting, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-background-desktop-001.jpg.ximg.large.jpg/48eb89e802.jpg"}];

// Brand palette from DESIGN_TOKENS.color (Dacia: olive accent).
const PALETTE = ['#646b52', '#3860be'];

function getThemedCardBg(palette) {
  if (!palette || !palette[0]) return null;
  let hex = palette[0].replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return null;
  const [r, g, b] = [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  const lum = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
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
const CARD_COLORS = ['#646b52', '#3860be', '#4046ca', '#0fb5ae'];

function fmt(v) {
  if (v === undefined || v === null || v === '') return '—';
  if (Array.isArray(v)) return v.length ? v.join(', ') : '—';
  return String(v);
}

function pick(item, keys) {
  for (let i = 0; i < keys.length; i += 1) {
    const v = item[keys[i]];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
}

export default async function decorate(block, bridge) {
  let items;
  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      items = SAMPLE_DATA;
    } else {
      const _result = await bridge.toolResult;
      const structuredContent = _result?.structuredContent || {};
      // structuredContent.models — bare array outputSchema; key derived from actionName "compare_dacia_models"
      items = structuredContent?.models || (Array.isArray(structuredContent) ? structuredContent : []);
    }
  } else {
    items = SAMPLE_DATA;
  }
  if (!items || !items.length) items = SAMPLE_DATA;

  const itemA = items[0] || {};
  const itemB = items[1] || items[0] || {};

  block.textContent = '';
  render(block, itemA, itemB, bridge);

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

function buildHeaderPanel(item, idx) {
  const panel = document.createElement('div');
  panel.className = 'compare-dacia-models-header-panel';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'compare-dacia-models-header-image';
  const fallbackColor = CARD_COLORS[idx % CARD_COLORS.length];
  const colorDiv = () => {
    const d = document.createElement('div');
    d.className = 'compare-dacia-models-header-image-placeholder';
    d.style.cssText = `width:100%;height:100%;background-color:${fallbackColor};`;
    return d;
  };
  if (item.image_url) {
    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = item.name || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    img.onerror = () => { if (img.parentNode) img.parentNode.replaceChild(colorDiv(), img); };
    imgWrap.appendChild(img);
  } else {
    imgWrap.appendChild(colorDiv());
  }
  panel.appendChild(imgWrap);

  const content = document.createElement('div');
  content.className = 'compare-dacia-models-header-content';
  content.style.background = theme ? theme.bg : '#3a3d30';
  content.style.color = theme ? theme.fg : '#fff';

  const title = document.createElement('h3');
  title.className = 'compare-dacia-models-header-title';
  title.textContent = item.name || '';
  content.appendChild(title);

  const descText = item.description;
  if (descText) {
    const desc = document.createElement('p');
    desc.className = 'compare-dacia-models-header-desc';
    desc.textContent = descText;
    content.appendChild(desc);
  }

  panel.appendChild(content);
  return panel;
}

function buildRowSpacer() {
  const spacer = document.createElement('div');
  spacer.className = 'compare-dacia-models-row-spacer';
  spacer.setAttribute('aria-hidden', 'true');
  return spacer;
}

function render(block, itemA, itemB, bridge) {
  const card = document.createElement('div');
  card.className = 'compare-dacia-models-card';

  const headerRow = document.createElement('div');
  headerRow.className = 'compare-dacia-models-header-row';
  headerRow.appendChild(buildRowSpacer());
  headerRow.appendChild(buildHeaderPanel(itemA, 0));
  headerRow.appendChild(buildHeaderPanel(itemB, 1));
  card.appendChild(headerRow);

  // Attribute rows ordered by the stated priority: interior space + fuel efficiency
  // lead the list, then the remaining comparable specs. Capped at the table budget.
  const ROW_SPECS = [
    { label: 'Price', keys: ['starting_price', 'price'], lead: true },
    { label: 'Seats', keys: ['seats'] },
    { label: 'Cargo', keys: ['cargo_capacity'] },
    { label: 'Consumption', keys: ['consumption'] },
    { label: 'Powertrains', keys: ['powertrains'] },
    { label: 'Transmission', keys: ['transmission_options', 'transmission'] },
    { label: 'Body Style', keys: ['body_style', 'category'] },
    { label: 'Capability', keys: ['capability'] },
    { label: 'Key Features', keys: ['key_features'] },
  ];

  const rows = [];
  ROW_SPECS.forEach((spec) => {
    const a = pick(itemA, spec.keys);
    const b = pick(itemB, spec.keys);
    if (a === undefined && b === undefined) return;
    rows.push({ label: spec.label, a, b, lead: !!spec.lead });
  });

  const table = document.createElement('div');
  table.className = 'compare-dacia-models-table';

  rows.slice(0, 6).forEach((row) => {
    const tr = document.createElement('div');
    tr.className = `compare-dacia-models-table-row${row.lead ? ' compare-dacia-models-table-row-lead' : ''}`;

    const label = document.createElement('div');
    label.className = 'compare-dacia-models-table-label';
    label.textContent = row.label;
    tr.appendChild(label);

    const da = fmt(row.a);
    const db = fmt(row.b);
    const differs = da !== db;
    [da, db].forEach((text) => {
      const val = document.createElement('div');
      val.className = `compare-dacia-models-table-value${differs ? ' compare-dacia-models-table-value-diff' : ''}`;
      val.textContent = text;
      tr.appendChild(val);
    });
    table.appendChild(tr);
  });

  // Per-item CTA row: "Configure This Model" beneath each column.
  const ctaRow = document.createElement('div');
  ctaRow.className = 'compare-dacia-models-table-row compare-dacia-models-cta-row';
  ctaRow.appendChild(buildRowSpacer());
  [itemA, itemB].forEach((item) => {
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'compare-dacia-models-table-cta';
    cta.textContent = 'Configure This Model';
    if (bridge) {
      cta.addEventListener('click', () => {
        const name = item.name || 'this model';
        if (item.detail_url) bridge.openLink(item.detail_url);
        else bridge.sendMessage(`Help me configure the ${name}`);
      });
    }
    ctaRow.appendChild(cta);
  });
  table.appendChild(ctaRow);

  // Shared CTA row: one full-width action spanning the card's content width.
  const sharedRow = document.createElement('div');
  sharedRow.className = 'compare-dacia-models-table-row compare-dacia-models-cta-row compare-dacia-models-shared-cta-row';
  const sharedCta = document.createElement('button');
  sharedCta.type = 'button';
  sharedCta.className = 'compare-dacia-models-table-cta compare-dacia-models-shared-cta';
  sharedCta.textContent = 'Book Test Drive';
  if (bridge) {
    sharedCta.addEventListener('click', () => {
      const a = itemA.name || 'this model';
      const b = itemB.name || 'the other model';
      bridge.sendMessage(`Book a test drive to compare the ${a} and ${b}`);
    });
  }
  sharedRow.appendChild(sharedCta);
  table.appendChild(sharedRow);

  card.appendChild(table);
  block.appendChild(card);
}
