// codegen:layout-pattern=detail-split

// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [{"name": "Dacia Bigster", "description": "The largest, most-equipped SUV in the range, now with a tribrid GPL hybrid powertrain, automatic transmission and 4x4.", "price": "from 20.490 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["tribrid 150 4x4", "hybrid 155", "mild hybrid-G 140"], "transmission": "automatic", "primary_use": "family travel, long-distance driving, off-road trips", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/bigster-db3l1-ph1/oveview/dacia-bigster-db3l1-ph1-055-mobile.jpg.ximg.xsmall.jpg/4b67d90d3c.jpg"}, {"name": "Dacia Duster", "description": "A capable compact SUV available with full hybrid, GPL and 4x4 options for city and off-road use.", "price": "from 17.100 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155", "mild hybrid-G 140", "tribrid 150 4x4"], "transmission": "manual, automatic", "primary_use": "family travel, off-road trips, urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/duster-p1310/overview/editorial/dacia-duster-p1310-overview-004-1-mobile.jpg.ximg.xsmall.jpg/ba4175c768.jpg"}, {"name": "Dacia Jogger", "description": "A versatile family vehicle with 5 or 7 seats, a large boot and economical hybrid and GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/rji/jogger-ri1-ph2/herozone-banners/jogger-ri1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/5224fc9270.jpg", "price": "from 16.650 EUR", "category": "Family / MPV", "body_style": "family vehicle", "seats": 7, "powertrains": ["hybrid 155", "TCe 110", "Eco-G 120"], "transmission": "manual, automatic", "primary_use": "family travel, long-distance driving"}, {"name": "Dacia Spring", "description": "A 100% electric four-seat city car with up to 315 km urban WLTP range and a 10\" multimedia screen.", "price": "from 17.121 EUR", "category": "City car / Electric", "body_style": "city car", "seats": 4, "powertrains": ["electric 100", "electric 70"], "transmission": "automatic", "primary_use": "urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/dacia-bbg/spring-s2e-ph2-my26/overview/editorial/dacia-spring-s2e-ph2-overview-003.jpg.ximg.xsmall.jpg/5e53676620.jpg"}, {"name": "Dacia Sandero Stepway", "description": "A rugged crossover with raised driving position, modular roof bars and full hybrid or factory GPL power.", "price": "from 13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 110"], "transmission": "manual, automatic", "primary_use": "urban commuting, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-mobile-001.jpg.ximg.small.jpg/635d9dd22b.jpg"}, {"name": "Dacia Logan", "description": "The most powerful Logan yet: a spacious sedan with a 120 HP factory-GPL engine and dual-clutch automatic.", "price": "from 12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "business use, long-distance driving, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/logan/logan-li1-ph2/herozone-banners/dacia-logan-li1-ph2-herozone-001-mobile.jpg.ximg.small.jpg/85abe768b9.jpg"}, {"name": "Dacia Sandero", "description": "A stylish five-seat city hatchback with a redesigned grille, 10\" display and hybrid or GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero/sandero-bi1-ph2/herozone-banners/sandero-bi1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/0e69ac9dc8.jpg", "price": "from 13.541 EUR", "category": "City car / Hatchback", "body_style": "hatchback", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "urban commuting"}, {"name": "Rabla Offer: Duster Expression Hybrid 155", "description": "Duster full hybrid 155 under the Rabla scrappage programme combined with Dacia Credit financing.", "price": "19.959 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155"], "transmission": "automatic", "primary_use": "family travel, off-road trips", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gama-dacia/duster-hybrid-mobile.jpg.ximg.xsmall.jpg/d40e95eb02.jpg"}, {"name": "Rabla Offer: Logan Essential Eco-G 120", "description": "Logan sedan with factory GPL under the Rabla programme and Dacia Credit, VAT included.", "price": "11.990 EUR", "original_price": "12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "business use, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.xsmall.jpg/7d9c1a07d2.jpg"}, {"name": "Rabla Offer: Sandero Stepway Essential Eco-G 120", "description": "Sandero Stepway crossover with factory GPL under the Rabla programme and Dacia Credit.", "price": "12.990 EUR", "original_price": "13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "urban commuting, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-background-desktop-001.jpg.ximg.large.jpg/48eb89e802.jpg"}];

// Preview fixture reshaped to a single configured-vehicle object matching outputSchema.
const SAMPLE_ITEM = {
  model_name: 'Dacia Duster',
  version_name: 'Expression',
  description: 'A capable compact SUV in Expression trim with the full hybrid 155 powertrain, metallic blue finish, roof bars and rear parking sensors — configured within budget.',
  category: 'SUV',
  powertrain: 'full hybrid 155',
  transmission: 'automatic',
  color: 'Iron Blue metallic',
  included_features: ['8" media display with wireless smartphone replication', 'Automatic climate control', 'Rear parking sensors', 'Cruise control with limiter', 'LED headlights'],
  selected_accessories: ['Modular roof bars', 'Rear parking sensor pack'],
  consumption: '4.7 l/100 km (WLTP combined)',
  emissions: '106 g/km CO2 (WLTP)',
  indicative_total_price: 25340,
  price_notes: 'Indicative price; final pricing, incentives and availability confirmed via the Dacia configurator or dealer.',
  image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/duster-p1310/overview/editorial/dacia-duster-p1310-overview-004-1-mobile.jpg.ximg.xsmall.jpg/ba4175c768.jpg',
  configuration_url: '',
};

const CARD_COLORS = ['#378ef0', '#9256d9', '#0fb5ae', '#e68619', '#d83790', '#2dca72', '#4046ca', '#72b340'];

const PALETTE = ['#646b52', '#3860be'];
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
  for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; if (relLum(Math.round(r * m), Math.round(g * m), Math.round(b * m)) > 0.12) hi = m; else lo = m; }
  const dr = Math.round(r * lo); const dg = Math.round(g * lo); const db = Math.round(b * lo);
  return { bg: `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`, fg: '#ffffff' };
}
const theme = getThemedCardBg(PALETTE);

function formatPrice(value) {
  if (value == null || value === '') return '';
  if (typeof value === 'number') {
    return `€${value.toLocaleString('de-DE')}`;
  }
  return String(value);
}

export default async function decorate(block, bridge) {
  let item;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      item = SAMPLE_ITEM;
    } else {
      // Detail concept — structuredContent IS the item (flat). No wrapper key.
      const _result = await bridge.toolResult;
      item = _result?.structuredContent || {};
    }
  } else {
    item = SAMPLE_ITEM;
  }

  block.textContent = '';

  if (!item || !item.model_name) {
    const empty = document.createElement('p');
    empty.className = 'configure-dacia-model-empty';
    empty.textContent = 'No matching configuration was found.';
    block.appendChild(empty);
  } else {
    renderDetail(block, item, bridge);
  }

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

function renderDetail(block, item, bridge) {
  const card = document.createElement('div');
  card.className = 'configure-dacia-model-card';

  // Image panel (LEFT)
  const imgPanel = document.createElement('div');
  imgPanel.className = 'configure-dacia-model-image-panel';
  const colorDiv = () => {
    const d = document.createElement('div');
    d.style.cssText = `width:100%;height:100%;background-color:${CARD_COLORS[0]};`;
    return d;
  };
  if (item.image_url) {
    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = item.model_name || '';
    img.onerror = () => { if (img.parentNode) img.parentNode.replaceChild(colorDiv(), img); };
    imgPanel.appendChild(img);
  } else {
    imgPanel.appendChild(colorDiv());
  }
  card.appendChild(imgPanel);

  // Content panel (RIGHT)
  const content = document.createElement('div');
  content.className = 'configure-dacia-model-content';
  content.style.background = theme ? theme.bg : '#5d644d';
  content.style.color = theme ? theme.fg : '#fff';

  const title = document.createElement('h2');
  title.className = 'configure-dacia-model-title';
  title.textContent = item.model_name;
  content.appendChild(title);

  if (item.version_name) {
    const version = document.createElement('p');
    version.className = 'configure-dacia-model-version';
    version.textContent = item.version_name;
    content.appendChild(version);
  }

  // Spec chips: category, powertrain, transmission, color
  const specVals = [item.category, item.powertrain, item.transmission, item.color].filter(Boolean);
  if (specVals.length) {
    const specs = document.createElement('div');
    specs.className = 'configure-dacia-model-specs';
    specVals.forEach((v) => {
      const chip = document.createElement('span');
      chip.className = 'configure-dacia-model-chip';
      chip.textContent = v;
      specs.appendChild(chip);
    });
    content.appendChild(specs);
  }

  // Expandable sections
  const sections = document.createElement('div');
  sections.className = 'configure-dacia-model-sections';

  const buildSection = (label, list, open) => {
    if (!Array.isArray(list) || !list.length) return;
    const details = document.createElement('details');
    details.className = 'configure-dacia-model-section';
    if (open) details.open = true;
    const summary = document.createElement('summary');
    summary.textContent = `${label} (${list.length})`;
    details.appendChild(summary);
    const ul = document.createElement('ul');
    list.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = entry;
      ul.appendChild(li);
    });
    details.appendChild(ul);
    sections.appendChild(details);
  };

  buildSection('Included features', item.included_features, true);
  buildSection('Selected accessories', item.selected_accessories, false);

  if (sections.childElementCount) content.appendChild(sections);

  // Consumption / emissions
  const eco = [];
  if (item.consumption) eco.push(item.consumption);
  if (item.emissions) eco.push(item.emissions);
  if (eco.length) {
    const ecoRow = document.createElement('div');
    ecoRow.className = 'configure-dacia-model-eco';
    eco.forEach((e) => {
      const span = document.createElement('span');
      span.textContent = e;
      ecoRow.appendChild(span);
    });
    content.appendChild(ecoRow);
  }

  // Price row
  const priceRow = document.createElement('div');
  priceRow.className = 'configure-dacia-model-price-row';
  const price = document.createElement('p');
  price.className = 'configure-dacia-model-price';
  price.textContent = formatPrice(item.indicative_total_price);
  priceRow.appendChild(price);
  if (item.price_notes) {
    const note = document.createElement('span');
    note.className = 'configure-dacia-model-price-note';
    note.textContent = item.price_notes;
    priceRow.appendChild(note);
  }
  content.appendChild(priceRow);

  // Actions — max 2 CTAs (detail-split budget)
  const actionsRow = document.createElement('div');
  actionsRow.className = 'configure-dacia-model-actions';

  const configLabel = `Continue configuring the ${item.model_name}${item.version_name ? ` ${item.version_name}` : ''}`;
  const ACTIONS = [
    { label: 'Continue Configuration', variant: 'primary', href: item.configuration_url || '', message: configLabel },
    { label: 'Book Test Drive', variant: 'secondary', message: `Book a test drive for the ${item.model_name}` },
  ];

  ACTIONS.forEach((action) => {
    const btn = document.createElement('button');
    btn.className = `configure-dacia-model-cta ${action.variant}`;
    btn.textContent = action.label;
    if (bridge) {
      btn.addEventListener('click', () => {
        if (action.href) bridge.openLink(action.href);
        else bridge.sendMessage(action.message);
      });
    }
    actionsRow.appendChild(btn);
  });

  content.appendChild(actionsRow);
  card.appendChild(content);
  block.appendChild(card);
}
