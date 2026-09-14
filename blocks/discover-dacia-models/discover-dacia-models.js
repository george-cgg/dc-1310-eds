// codegen:layout-pattern=carousel
// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [{"name": "Dacia Bigster", "description": "The largest, most-equipped SUV in the range, now with a tribrid GPL hybrid powertrain, automatic transmission and 4x4.", "price": "from 20.490 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["tribrid 150 4x4", "hybrid 155", "mild hybrid-G 140"], "transmission": "automatic", "primary_use": "family travel, long-distance driving, off-road trips", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/bigster-db3l1-ph1/oveview/dacia-bigster-db3l1-ph1-055-mobile.jpg.ximg.xsmall.jpg/4b67d90d3c.jpg"}, {"name": "Dacia Duster", "description": "A capable compact SUV available with full hybrid, GPL and 4x4 options for city and off-road use.", "price": "from 17.100 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155", "mild hybrid-G 140", "tribrid 150 4x4"], "transmission": "manual, automatic", "primary_use": "family travel, off-road trips, urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/duster-p1310/overview/editorial/dacia-duster-p1310-overview-004-1-mobile.jpg.ximg.xsmall.jpg/ba4175c768.jpg"}, {"name": "Dacia Jogger", "description": "A versatile family vehicle with 5 or 7 seats, a large boot and economical hybrid and GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/rji/jogger-ri1-ph2/herozone-banners/jogger-ri1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/5224fc9270.jpg", "price": "from 16.650 EUR", "category": "Family / MPV", "body_style": "family vehicle", "seats": 7, "powertrains": ["hybrid 155", "TCe 110", "Eco-G 120"], "transmission": "manual, automatic", "primary_use": "family travel, long-distance driving"}, {"name": "Dacia Spring", "description": "A 100% electric four-seat city car with up to 315 km urban WLTP range and a 10\" multimedia screen.", "price": "from 17.121 EUR", "category": "City car / Electric", "body_style": "city car", "seats": 4, "powertrains": ["electric 100", "electric 70"], "transmission": "automatic", "primary_use": "urban commuting", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/dacia-bbg/spring-s2e-ph2-my26/overview/editorial/dacia-spring-s2e-ph2-overview-003.jpg.ximg.xsmall.jpg/5e53676620.jpg"}, {"name": "Dacia Sandero Stepway", "description": "A rugged crossover with raised driving position, modular roof bars and full hybrid or factory GPL power.", "price": "from 13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 110"], "transmission": "manual, automatic", "primary_use": "urban commuting, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-mobile-001.jpg.ximg.small.jpg/635d9dd22b.jpg"}, {"name": "Dacia Logan", "description": "The most powerful Logan yet: a spacious sedan with a 120 HP factory-GPL engine and dual-clutch automatic.", "price": "from 12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "business use, long-distance driving, family travel", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/logan/logan-li1-ph2/herozone-banners/dacia-logan-li1-ph2-herozone-001-mobile.jpg.ximg.small.jpg/85abe768b9.jpg"}, {"name": "Dacia Sandero", "description": "A stylish five-seat city hatchback with a redesigned grille, 10\" display and hybrid or GPL engines.", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero/sandero-bi1-ph2/herozone-banners/sandero-bi1-ph2-herozone-background-001-desktop.jpg.ximg.large.jpg/0e69ac9dc8.jpg", "price": "from 13.541 EUR", "category": "City car / Hatchback", "body_style": "hatchback", "seats": 5, "powertrains": ["hybrid 155", "Eco-G (GPL) 120", "TCe 100"], "transmission": "manual, automatic", "primary_use": "urban commuting"}, {"name": "Rabla Offer: Duster Expression Hybrid 155", "description": "Duster full hybrid 155 under the Rabla scrappage programme combined with Dacia Credit financing.", "price": "19.959 EUR", "category": "SUV", "body_style": "SUV", "seats": 5, "powertrains": ["full hybrid 155"], "transmission": "automatic", "primary_use": "family travel, off-road trips", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gama-dacia/duster-hybrid-mobile.jpg.ximg.xsmall.jpg/d40e95eb02.jpg"}, {"name": "Rabla Offer: Logan Essential Eco-G 120", "description": "Logan sedan with factory GPL under the Rabla programme and Dacia Credit, VAT included.", "price": "11.990 EUR", "original_price": "12.650 EUR", "category": "Sedan", "body_style": "sedan", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "business use, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/ro/gpl/Logan%20GPL.jpg.ximg.xsmall.jpg/7d9c1a07d2.jpg"}, {"name": "Rabla Offer: Sandero Stepway Essential Eco-G 120", "description": "Sandero Stepway crossover with factory GPL under the Rabla programme and Dacia Credit.", "price": "12.990 EUR", "original_price": "13.650 EUR", "category": "Crossover", "body_style": "crossover", "seats": 5, "powertrains": ["Eco-G (GPL) 120"], "transmission": "manual", "primary_use": "urban commuting, family travel", "is_deal": true, "customer_type": "private individual", "image_url": "https://cdn.group.renault.com/dac/master/dacia-vn/vehicules/sandero-stepway/sandero-stepway-bi1-ph2/herozone-banners/sandero-stepway-bi1-ph2-herozone-background-desktop-001.jpg.ximg.large.jpg/48eb89e802.jpg"}];

// Brand colors from DESIGN_TOKENS' color tier. getThemedCardBg() darkens PALETTE[0].
const PALETTE = ['#646b52', '#3860be'];

function getThemedCardBg(palette) {
  if (!palette || !palette[0]) return null;
  let hex = palette[0].replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  if (hex.length !== 6) return null;
  const [r, g, b] = [parseInt(hex.slice(0,2),16), parseInt(hex.slice(2,4),16), parseInt(hex.slice(4,6),16)];
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  const lum = (c) => { const s=c/255; return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4); };
  const relLum = (r,g,b) => 0.2126*lum(r)+0.7152*lum(g)+0.0722*lum(b);
  if (relLum(r,g,b) <= 0.12) return { bg: `#${hex}`, fg: '#ffffff' };
  let lo=0, hi=1;
  for (let i=0; i<20; i++) { const m=(lo+hi)/2; if (relLum(Math.round(r*m),Math.round(g*m),Math.round(b*m)) > 0.12) hi=m; else lo=m; }
  const dr=Math.round(r*lo), dg=Math.round(g*lo), db=Math.round(b*lo);
  return { bg:`#${dr.toString(16).padStart(2,'0')}${dg.toString(16).padStart(2,'0')}${db.toString(16).padStart(2,'0')}`, fg:'#ffffff' };
}
const theme = getThemedCardBg(PALETTE);

const CARD_COLORS = ['#646b52', '#3860be', '#4a5240', '#2f4a7a', '#5d5030', '#38503a'];

function derivePowertrainBadges(powertrains) {
  const joined = (Array.isArray(powertrains) ? powertrains.join(' ') : String(powertrains || '')).toLowerCase();
  const badges = [];
  if (/\belectric\b/.test(joined)) badges.push('Electric');
  if (/hybrid|tribrid/.test(joined)) badges.push('Hybrid');
  if (/gpl|eco-g/.test(joined)) badges.push('GPL');
  if (/4x4/.test(joined)) badges.push('4x4');
  return badges;
}

function renderCard(item, i, bridge) {
  const card = document.createElement('div');
  card.className = 'discover-dacia-models-card';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'discover-dacia-models-img';
  const fallbackColor = CARD_COLORS[i % CARD_COLORS.length];
  const colorDiv = () => {
    const d = document.createElement('div');
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
  card.appendChild(imgWrap);

  const info = document.createElement('div');
  info.className = 'discover-dacia-models-info';
  info.style.cssText = `background:${theme?.bg ?? '#1a1a1a'};color:${theme?.fg ?? '#fff'};`;

  const name = document.createElement('div');
  name.className = 'discover-dacia-models-name';
  name.textContent = item.name || '';
  info.appendChild(name);

  let fitText = item.fit_summary || item.description;
  if (fitText) {
    if (fitText.length > 95) fitText = fitText.slice(0, 92).trimEnd() + '…';
    const desc = document.createElement('p');
    desc.className = 'discover-dacia-models-desc';
    desc.textContent = fitText;
    info.appendChild(desc);
  }

  const badges = derivePowertrainBadges(item.powertrains);
  const bodyStyle = item.body_style || item.category;
  if (badges.length || bodyStyle) {
    const badgeRow = document.createElement('div');
    badgeRow.className = 'discover-dacia-models-badges';
    if (bodyStyle) {
      const b = document.createElement('span');
      b.className = 'discover-dacia-models-badge discover-dacia-models-body-badge';
      b.textContent = bodyStyle;
      badgeRow.appendChild(b);
    }
    badges.forEach((label) => {
      const b = document.createElement('span');
      b.className = 'discover-dacia-models-badge';
      b.textContent = label;
      badgeRow.appendChild(b);
    });
    info.appendChild(badgeRow);
  }

  const priceVal = item.starting_price || item.price;
  const metaRow = document.createElement('div');
  metaRow.className = 'discover-dacia-models-meta-row';
  const price = document.createElement('span');
  price.className = 'discover-dacia-models-price';
  price.textContent = priceVal != null && priceVal !== ''
    ? (typeof priceVal === 'number' ? `from ${priceVal.toLocaleString('ro-RO')} EUR` : priceVal)
    : '';
  metaRow.appendChild(price);
  if (item.seats != null) {
    const seats = document.createElement('span');
    seats.className = 'discover-dacia-models-seats';
    seats.textContent = `${item.seats} seats`;
    metaRow.appendChild(seats);
  }
  info.appendChild(metaRow);

  const ctaRow = document.createElement('div');
  ctaRow.className = 'discover-dacia-models-cta-row';

  const viewBtn = document.createElement('button');
  viewBtn.className = 'discover-dacia-models-cta discover-dacia-models-cta-primary';
  viewBtn.textContent = 'View Model';
  if (bridge) {
    viewBtn.addEventListener('click', () => {
      if (item.detail_url) bridge.openLink(item.detail_url);
      else bridge.sendMessage(`Tell me more about the ${item.name}`);
    });
  }
  ctaRow.appendChild(viewBtn);

  const configBtn = document.createElement('button');
  configBtn.className = 'discover-dacia-models-cta discover-dacia-models-cta-secondary';
  configBtn.textContent = 'Configure';
  if (bridge) {
    configBtn.addEventListener('click', () => {
      if (item.configuration_url) bridge.openLink(item.configuration_url);
      else if (item.detail_url) bridge.openLink(item.detail_url);
      else bridge.sendMessage(`Help me configure the ${item.name}`);
    });
  }
  ctaRow.appendChild(configBtn);

  info.appendChild(ctaRow);
  card.appendChild(info);
  return card;
}

function renderItems(block, items, bridge) {
  block.textContent = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'discover-dacia-models-wrapper';

  const btnLeft = document.createElement('button');
  btnLeft.className = 'discover-dacia-models-arrow discover-dacia-models-arrow-left';
  btnLeft.setAttribute('aria-label', 'Scroll left');
  btnLeft.textContent = '◄';

  const trackWrap = document.createElement('div');
  trackWrap.className = 'discover-dacia-models-track-wrap';

  const track = document.createElement('div');
  track.className = 'discover-dacia-models-track';

  const btnRight = document.createElement('button');
  btnRight.className = 'discover-dacia-models-arrow discover-dacia-models-arrow-right';
  btnRight.setAttribute('aria-label', 'Scroll right');
  btnRight.textContent = '►';

  const fade = document.createElement('div');
  fade.className = 'discover-dacia-models-fade';
  fade.style.background = `linear-gradient(to right, transparent, ${theme?.bg ?? '#1a1a1a'}cc)`;

  items.forEach((item, i) => track.appendChild(renderCard(item, i, bridge)));

  trackWrap.appendChild(track);
  trackWrap.appendChild(fade);
  wrapper.appendChild(btnLeft);
  wrapper.appendChild(trackWrap);
  wrapper.appendChild(btnRight);
  block.appendChild(wrapper);

  const cardWidth = 224 + 16;
  const scrollLeft = () => track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  const scrollRight = () => track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  btnLeft.addEventListener('click', scrollLeft);
  btnRight.addEventListener('click', scrollRight);
  const keyScroll = (fn) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } };
  btnLeft.addEventListener('keydown', keyScroll(scrollLeft));
  btnRight.addEventListener('keydown', keyScroll(scrollRight));
  const updateArrows = () => {
    btnLeft.style.display = track.scrollLeft <= 0 ? 'none' : 'flex';
    btnRight.style.display = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4 ? 'none' : 'flex';
  };
  track.addEventListener('scroll', updateArrows);
  updateArrows();
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
      // structuredContent.models — derived from action name "discover_dacia_models" (bare array outputSchema rule)
      items = structuredContent?.models || [];
    }
    // AMCP-360 is_deal partition (keyed on concept, not widget_builder_prompt):
    // product-list excludes deal items; a deals-list widget would keep only them.
    items = items.filter((it) => it.is_deal !== true);
    if (!items.length) items = SAMPLE_DATA.filter((it) => it.is_deal !== true);
    renderItems(block, items, bridge);
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => bridge.reportSize(block.offsetWidth, block.offsetHeight), 150);
    });
    ro.observe(block);
  } else {
    items = SAMPLE_DATA.filter((it) => it.is_deal !== true);
    renderItems(block, items, bridge);
  }
}
