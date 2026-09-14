// codegen:layout-pattern=deals-carousel
// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [
  { name: 'Dacia Bigster', description: 'The largest, most-equipped SUV in the range, now with a tribrid GPL hybrid powertrain, automatic transmission and 4x4.', price: 'from 20.490 EUR', category: 'SUV', body_style: 'SUV', seats: 5, powertrains: ['tribrid 150 4x4', 'hybrid 155', 'mild hybrid-G 140'], transmission: 'automatic', primary_use: 'family travel, long-distance driving, off-road trips', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/bigster-db3l1-ph1/oveview/dacia-bigster-db3l1-ph1-055-mobile.jpg.ximg.xsmall.jpg/4b67d90d3c.jpg' },
  { name: 'Dacia Duster', description: 'A capable compact SUV available with full hybrid, GPL and 4x4 options for city and off-road use.', price: 'from 17.100 EUR', category: 'SUV', body_style: 'SUV', seats: 5, powertrains: ['full hybrid 155', 'mild hybrid-G 140', 'tribrid 150 4x4'], transmission: 'manual, automatic', primary_use: 'family travel, off-road trips, urban commuting', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/duster-p1310/overview/editorial/dacia-duster-p1310-overview-004-1-mobile.jpg.ximg.xsmall.jpg/ba4175c768.jpg' },
  { name: 'Dacia Jogger', description: 'A versatile family vehicle with 5 or 7 seats, a large boot and economical hybrid and GPL engines.', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/rji/jogger-ri1-ph2/herozone-banners/jogger-ri1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/5224fc9270.jpg', price: 'from 16.650 EUR', category: 'Family / MPV', body_style: 'family vehicle', seats: 7, powertrains: ['hybrid 155', 'TCe 110', 'Eco-G 120'], transmission: 'manual, automatic', primary_use: 'family travel, long-distance driving' },
  { name: 'Dacia Spring', description: 'A 100% electric four-seat city car with up to 315 km urban WLTP range and a 10" multimedia screen.', price: 'from 17.121 EUR', category: 'City car / Electric', body_style: 'city car', seats: 4, powertrains: ['electric 100', 'electric 70'], transmission: 'automatic', primary_use: 'urban commuting', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/dacia-bbg/spring-s2e-ph2-my26/overview/editorial/dacia-spring-s2e-ph2-overview-003.jpg.ximg.xsmall.jpg/5e53676620.jpg' },
  { name: 'Dacia Sandero Stepway', description: 'A rugged crossover with raised driving position, modular roof bars and full hybrid or factory GPL power.', price: 'from 13.650 EUR', category: 'Crossover', body_style: 'crossover', seats: 5, powertrains: ['hybrid 155', 'Eco-G (GPL) 120', 'TCe 110'], transmission: 'manual, automatic', primary_use: 'urban commuting, family travel', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-mobile-001.jpg.ximg.small.jpg/635d9dd22b.jpg' },
  { name: 'Dacia Logan', description: 'The most powerful Logan yet: a spacious sedan with a 120 HP factory-GPL engine and dual-clutch automatic.', price: 'from 12.650 EUR', category: 'Sedan', body_style: 'sedan', seats: 5, powertrains: ['Eco-G (GPL) 120', 'TCe 100'], transmission: 'manual, automatic', primary_use: 'business use, long-distance driving, family travel', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/logan/logan-li1-ph2/herozone-banners/dacia-logan-li1-ph2-herozone-001-mobile.jpg.ximg.small.jpg/85abe768b9.jpg' },
  { name: 'Dacia Sandero', description: 'A stylish five-seat city hatchback with a redesigned grille, 10" display and hybrid or GPL engines.', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero/sandero-bi1-ph2/herozone-banners/sandero-bi1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/0e69ac9dc8.jpg', price: 'from 13.541 EUR', category: 'City car / Hatchback', body_style: 'hatchback', seats: 5, powertrains: ['hybrid 155', 'Eco-G (GPL) 120', 'TCe 100'], transmission: 'manual, automatic', primary_use: 'urban commuting' },
  { name: 'Rabla Offer: Duster Expression Hybrid 155', description: 'Duster full hybrid 155 under the Rabla scrappage programme combined with Dacia Credit financing.', price: '19.959 EUR', category: 'SUV', body_style: 'SUV', seats: 5, powertrains: ['full hybrid 155'], transmission: 'automatic', primary_use: 'family travel, off-road trips', is_deal: true, customer_type: 'private individual', image_url: 'https://cdn.group.renault.com/dac/ro/gama-dacia/duster-hybrid-mobile.jpg.ximg.xsmall.jpg/d40e95eb02.jpg' },
  { name: 'Rabla Offer: Logan Essential Eco-G 120', description: 'Logan sedan with factory GPL under the Rabla programme and Dacia Credit, VAT included.', price: '11.990 EUR', original_price: '12.650 EUR', category: 'Sedan', body_style: 'sedan', seats: 5, powertrains: ['Eco-G (GPL) 120'], transmission: 'manual', primary_use: 'business use, family travel', is_deal: true, customer_type: 'private individual', image_url: 'https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.xsmall.jpg/7d9c1a07d2.jpg' },
  { name: 'Rabla Offer: Sandero Stepway Essential Eco-G 120', description: 'Sandero Stepway crossover with factory GPL under the Rabla programme and Dacia Credit.', price: '12.990 EUR', original_price: '13.650 EUR', category: 'Crossover', body_style: 'crossover', seats: 5, powertrains: ['Eco-G (GPL) 120'], transmission: 'manual', primary_use: 'urban commuting, family travel', is_deal: true, customer_type: 'private individual', image_url: 'https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-background-desktop-001.jpg.ximg.large.jpg/48eb89e802.jpg' },
];

const CONCEPT = 'deals-list';

// Brand colors from Dacia design tokens (accent olive-green, secondary blue).
const PALETTE = ['#646b52', '#3860be', '#000000', '#ffffff'];
const CARD_COLORS = ['#646b52', '#3860be', '#0fb5ae', '#e68619', '#d83790', '#2dca72', '#4046ca', '#72b340'];

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
      items = structuredContent?.offers || [];
    }
  } else {
    items = SAMPLE_DATA;
  }

  // AMCP-360 is_deal partition: deals-list shows ONLY deal items.
  items = items.filter((it) => (CONCEPT === 'deals-list' ? it.is_deal === true : it.is_deal !== true));

  block.textContent = '';
  renderOffers(block, items, bridge);

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

function renderOffers(block, items, bridge) {
  const wrapper = document.createElement('div');
  wrapper.className = 'browse-dacia-offers-wrapper';

  const track = document.createElement('div');
  track.className = 'browse-dacia-offers-track';

  items.forEach((item, i) => {
    track.appendChild(buildCard(item, i, bridge));
  });

  wrapper.appendChild(track);

  const fade = document.createElement('div');
  fade.className = 'browse-dacia-offers-fade';
  fade.style.cssText = `position:absolute;top:0;right:0;height:100%;width:60px;background:linear-gradient(to right,transparent,${theme?.bg ?? '#1a1a1a'}cc);pointer-events:none;`;
  wrapper.appendChild(fade);

  const mkArrow = (dir) => {
    const b = document.createElement('button');
    b.className = `browse-dacia-offers-arrow browse-dacia-offers-arrow-${dir}`;
    b.type = 'button';
    b.setAttribute('aria-label', dir === 'left' ? 'Scroll left' : 'Scroll right');
    b.textContent = dir === 'left' ? '◀' : '▶';
    b.addEventListener('click', () => {
      const card = track.querySelector('.browse-dacia-offers-card');
      const step = card ? card.offsetWidth + 16 : 236;
      track.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
    });
    return b;
  };
  const leftArrow = mkArrow('left');
  const rightArrow = mkArrow('right');
  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    leftArrow.style.display = track.scrollLeft <= 0 ? 'none' : 'flex';
    rightArrow.style.display = track.scrollLeft >= maxScroll ? 'none' : 'flex';
  };
  track.addEventListener('scroll', updateArrows);
  requestAnimationFrame(updateArrows);

  block.appendChild(wrapper);
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const t = Date.parse(dateStr);
  if (isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86400000);
}

function buildCard(item, i, bridge) {
  const card = document.createElement('div');
  card.className = 'browse-dacia-offers-card';

  const imageBox = document.createElement('div');
  imageBox.className = 'browse-dacia-offers-image';

  const fallbackColor = CARD_COLORS[i % CARD_COLORS.length];
  const colorDiv = () => {
    const d = document.createElement('div');
    d.style.cssText = `width:100%;height:100%;background-color:${fallbackColor};`;
    return d;
  };
  if (item.image_url) {
    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = item.offer_name || item.name || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    img.onerror = () => img.parentNode && img.parentNode.replaceChild(colorDiv(), img);
    imageBox.appendChild(img);
  } else {
    imageBox.appendChild(colorDiv());
  }

  // Customer-segment chip (private vs business)
  const seg = item.customer_type;
  if (seg) {
    const segChip = document.createElement('span');
    segChip.className = 'browse-dacia-offers-seg';
    segChip.textContent = /business/i.test(seg) ? 'Business' : 'Private';
    imageBox.appendChild(segChip);
  }

  // Expiry flag
  const validUntil = item.valid_until;
  const dleft = daysUntil(validUntil);
  if (dleft !== null && dleft >= 0 && dleft <= 14) {
    const exp = document.createElement('span');
    exp.className = 'browse-dacia-offers-expiry';
    exp.textContent = dleft === 0 ? 'Ends today' : `${dleft}d left`;
    imageBox.appendChild(exp);
  }

  card.appendChild(imageBox);

  const info = document.createElement('div');
  info.className = 'browse-dacia-offers-info';
  info.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'}`;

  const title = document.createElement('h3');
  title.className = 'browse-dacia-offers-title';
  title.textContent = item.offer_name || item.name || '';
  info.appendChild(title);

  const model = item.model_name;
  if (model) {
    const m = document.createElement('div');
    m.className = 'browse-dacia-offers-model';
    m.textContent = model;
    info.appendChild(m);
  }

  const priceRow = document.createElement('div');
  priceRow.className = 'browse-dacia-offers-prices';
  const std = item.standard_price ?? item.original_price;
  if (std) {
    const old = document.createElement('span');
    old.className = 'browse-dacia-offers-old';
    old.textContent = typeof std === 'number' ? `${std.toLocaleString('de-DE')} EUR` : std;
    priceRow.appendChild(old);
  }
  const head = item.headline_price ?? item.price;
  if (head) {
    const now = document.createElement('span');
    now.className = 'browse-dacia-offers-now';
    now.textContent = typeof head === 'number' ? `${head.toLocaleString('de-DE')} EUR` : head;
    priceRow.appendChild(now);
  }
  info.appendChild(priceRow);

  const fin = item.financing_summary;
  if (fin) {
    const f = document.createElement('div');
    f.className = 'browse-dacia-offers-line';
    f.textContent = fin;
    info.appendChild(f);
  }

  const inc = item.incentive_summary;
  if (inc) {
    const c = document.createElement('div');
    c.className = 'browse-dacia-offers-line';
    c.textContent = inc;
    info.appendChild(c);
  }

  const elig = item.eligibility;
  if (elig) {
    const e = document.createElement('div');
    e.className = 'browse-dacia-offers-elig';
    e.textContent = elig;
    info.appendChild(e);
  }

  if (validUntil) {
    const v = document.createElement('div');
    v.className = 'browse-dacia-offers-valid';
    v.textContent = `Valid until ${validUntil}`;
    info.appendChild(v);
  }

  const cta = document.createElement('button');
  cta.className = 'browse-dacia-offers-cta';
  cta.type = 'button';
  cta.textContent = 'View Offer';
  if (bridge) {
    cta.addEventListener('click', () => {
      const url = item.offer_url || item.url;
      if (url) bridge.openLink(url);
      else bridge.sendMessage(`Tell me more about ${item.offer_name || item.name}`);
    });
  }
  info.appendChild(cta);

  card.appendChild(info);
  return card;
}
