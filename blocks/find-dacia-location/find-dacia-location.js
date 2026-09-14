// codegen:layout-pattern=store-locator

// Sample data for standalone/preview mode.
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [{"name": "AMAT", "location_type": "sales agent", "address": "Bd. Nicolae Balcescu, nr. 204", "city": "Pitesti", "postal_code": "110331", "phone": "0248 223 555", "services": ["vehicle sales", "test drive", "maintenance"], "latitude": 44.87857, "longitude": 24.8407478}, {"name": "Auto Europa", "location_type": "sales agent", "address": "Calea Sagului nr. 142/A", "city": "Timisoara", "postal_code": "300516", "phone": "0356 803 450", "services": ["vehicle sales", "test drive", "maintenance"], "latitude": 45.7135833, "longitude": 21.1924723}, {"name": "Auto Cobalcescu", "location_type": "sales agent", "address": "Str. Splaiul Unirii nr. 309, Sector 3", "city": "Bucuresti", "postal_code": "010193", "phone": "0374 495 486", "services": ["vehicle sales", "test drive", "maintenance"], "latitude": 44.4189593, "longitude": 26.1118229}, {"name": "Dacia Service Cluj", "location_type": "sales agent", "address": "Calea Turzii, nr. 253-255", "city": "Cluj-Napoca", "postal_code": "400495", "phone": "0264 438 443", "services": ["vehicle sales", "test drive", "maintenance"], "latitude": 46.7414643, "longitude": 23.591943}, {"name": "Apan George Cosbuc", "location_type": "sales agent", "address": "Str. George Cosbuc, nr. 148", "city": "Galati", "postal_code": "800385", "phone": "0336 401 127", "services": ["vehicle sales", "test drive", "maintenance"], "latitude": 45.440006, "longitude": 28.036139}, {"name": "Auto Bara & Co", "location_type": "sales agent", "address": "Sos. Borsului, nr. 22", "city": "Oradea", "postal_code": "410605", "phone": "0259 440 000", "services": ["vehicle sales", "test drive", "maintenance"]}];

const ACCENT = '#646b52';
const MAX_STORES = 6;

function getThemedCardBg(p) {
  if (!p || !p[0]) return null;
  let hex = p[0].replace('#','');
  if(hex.length===3)hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  if(hex.length!==6)return null;
  const [r,g,b]=[parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)];
  if(isNaN(r))return null;
  const lum=c=>{const s=c/255;return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4)};
  const rl=(r,g,b)=>0.2126*lum(r)+0.7152*lum(g)+0.0722*lum(b);
  if(rl(r,g,b)<=0.12)return{bg:'#'+hex,fg:'#fff'};
  let lo=0,hi=1;
  for(let i=0;i<20;i++){const m=(lo+hi)/2;rl(Math.round(r*m),Math.round(g*m),Math.round(b*m))>0.12?hi=m:lo=m;}
  const dr=Math.round(r*lo),dg=Math.round(g*lo),db=Math.round(b*lo);
  return{bg:`#${dr.toString(16).padStart(2,'0')}${dg.toString(16).padStart(2,'0')}${db.toString(16).padStart(2,'0')}`,fg:'#fff'};
}

const PALETTE = ['#646b52', '#3860be'];
const theme = getThemedCardBg(PALETTE);

// ── Map engine ──────────────────────────────────────────────────────────────
const MAP_LEAFLET_VERSION = '1.9.4';
const MAP_LEAFLET_CSS = 'https://unpkg.com/leaflet@' + MAP_LEAFLET_VERSION + '/dist/leaflet.css';
const MAP_LEAFLET_JS = 'https://unpkg.com/leaflet@' + MAP_LEAFLET_VERSION + '/dist/leaflet.js';

const MAP_TILE_URL = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const MAP_TILE_ATTRIB = 'Esri, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_TILE_MAX_NATIVE_ZOOM = 16;
const MAP_TILE_MAX_ZOOM = 18;

let __mapLeafletPromise = null;

function loadLeaflet() {
  const cssLink = document.querySelector('link[data-leaflet="' + MAP_LEAFLET_VERSION + '"]');
  if (window.L && cssLink && cssLink.dataset.loaded === '1') {
    return Promise.resolve(window.L);
  }
  if (__mapLeafletPromise) return __mapLeafletPromise;

  const cssReady = new Promise(function (resolve) {
    const existing = document.querySelector('link[data-leaflet="' + MAP_LEAFLET_VERSION + '"]');
    if (existing) {
      if (existing.dataset.loaded === '1') resolve();
      else existing.addEventListener('load', function () { resolve(); }, { once: true });
      setTimeout(resolve, 1500);
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MAP_LEAFLET_CSS;
    link.dataset.leaflet = MAP_LEAFLET_VERSION;
    link.addEventListener('load', function () { link.dataset.loaded = '1'; resolve(); }, { once: true });
    link.addEventListener('error', function () { resolve(); }, { once: true });
    document.head.appendChild(link);
    setTimeout(resolve, 1500);
  });

  const jsReady = new Promise(function (resolve, reject) {
    if (window.L) { resolve(window.L); return; }
    const script = document.createElement('script');
    script.src = MAP_LEAFLET_JS;
    script.async = true;
    script.onload = function () {
      if (window.L) resolve(window.L);
      else reject(new Error('Leaflet loaded but window.L is missing'));
    };
    script.onerror = function () { reject(new Error('Failed to load Leaflet')); };
    document.head.appendChild(script);
  });

  __mapLeafletPromise = Promise.all([jsReady, cssReady]).then(function (r) { return r[0]; });
  return __mapLeafletPromise;
}

function mapCoordsOf(item) {
  if (!item) return null;
  const num = function (v) {
    if (v === null || v === undefined || v === '') return null;
    const n = typeof v === 'number' ? v : parseFloat(String(v));
    return Number.isFinite(n) ? n : null;
  };
  const lat = num(item.latitude !== undefined ? item.latitude : item.lat);
  let lngRaw = item.longitude;
  if (lngRaw === undefined) lngRaw = item.lng;
  if (lngRaw === undefined) lngRaw = item.lon;
  const lng = num(lngRaw);
  if (lat === null || lng === null) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat: lat, lng: lng };
}

function mapPointsFrom(items) {
  const out = [];
  (items || []).forEach(function (item, index) {
    const c = mapCoordsOf(item);
    if (c) out.push({ item: item, index: index, lat: c.lat, lng: c.lng });
  });
  return out;
}

function mapProject(points, box) {
  const b = box || [14, 14, 72, 72];
  const lats = points.map(function (p) { return p.lat; });
  const lngs = points.map(function (p) { return p.lng; });
  const minLat = Math.min.apply(null, lats);
  const maxLat = Math.max.apply(null, lats);
  const minLng = Math.min.apply(null, lngs);
  const maxLng = Math.max.apply(null, lngs);
  const spanLat = maxLat - minLat;
  const spanLng = maxLng - minLng;
  return points.map(function (p) {
    const fx = spanLng > 0 ? (p.lng - minLng) / spanLng : 0.5;
    const fy = spanLat > 0 ? (maxLat - p.lat) / spanLat : 0.5;
    return { x: b[0] + fx * b[2], y: b[1] + fy * b[3] };
  });
}

function mapMakePin(point, ordinal, opts, asButton) {
  const pin = document.createElement(asButton ? 'button' : 'span');
  if (asButton) pin.type = 'button';
  const label = String(point.item[opts.labelField] || point.item.name || '').trim();
  point.label = label;
  if (opts.pinStyle === 'label' && label) {
    pin.className = 'find-dacia-location-map-label';
    pin.textContent = label;
  } else {
    pin.className = 'find-dacia-location-map-pin';
    if (opts.pinColor) pin.style.background = opts.pinColor;
    const num = document.createElement('span');
    num.className = 'find-dacia-location-map-pin-num';
    num.textContent = String(ordinal);
    pin.appendChild(num);
  }
  if (asButton) pin.setAttribute('aria-label', label || ('Location ' + ordinal));
  return pin;
}

function mapDemoteLabelToPin(point, ordinal, opts) {
  const pin = point.pin;
  if (!pin || !pin.classList.contains('find-dacia-location-map-label')) return;
  const name = pin.textContent;
  pin.textContent = '';
  pin.className = 'find-dacia-location-map-pin';
  if (opts.pinColor) pin.style.background = opts.pinColor;
  const num = document.createElement('span');
  num.className = 'find-dacia-location-map-pin-num';
  num.textContent = String(ordinal);
  pin.appendChild(num);
  pin.setAttribute('aria-label', name);
  if (point.marker && point.marker.setZIndexOffset) point.marker.setZIndexOffset(1000);
}

function mapPromoteToLabel(point) {
  const pin = point.pin;
  if (!pin || pin.classList.contains('find-dacia-location-map-label')) return;
  pin.textContent = point.label || '';
  pin.className = 'find-dacia-location-map-label';
  pin.style.background = '';
  pin.removeAttribute('aria-label');
  if (point.marker && point.marker.setZIndexOffset) point.marker.setZIndexOffset(0);
}

function mapDeclutterLabels(points, opts) {
  if (opts.pinStyle !== 'label') return;
  points.forEach(function (p) { if (p.pin) mapPromoteToLabel(p); });

  const PAD = 2;
  const overlaps = function (a, b) {
    return a.left < b.right + PAD && b.left < a.right + PAD
      && a.top < b.bottom + PAD && b.top < a.bottom + PAD;
  };
  const rectOf = function (p) {
    const r = p.pin ? p.pin.getBoundingClientRect() : null;
    return r && r.width && r.height ? r : null;
  };

  for (let pass = 0; pass < points.length + 1; pass += 1) {
    const labelled = points.filter(function (p) {
      return p.pin && p.pin.classList.contains('find-dacia-location-map-label');
    });
    if (labelled.length < 1) return;

    const kept = [];
    let demoted = null;
    for (let i = 0; i < labelled.length; i += 1) {
      const p = labelled[i];
      const r = rectOf(p);
      if (!r) continue;
      const hitsLabel = kept.some(function (k) { return overlaps(r, k); });
      if (hitsLabel) { demoted = p; break; }
      kept.push(r);
    }
    if (!demoted) return;
    mapDemoteLabelToPin(demoted, points.indexOf(demoted) + 1, opts);
  }
}

function mapWhenWidthStable(el) {
  return new Promise(function (resolve) {
    let last = -1;
    let stable = 0;
    const started = Date.now();
    const tick = function () {
      const w = el.offsetWidth;
      if (w > 0 && w === last) stable += 1; else stable = 0;
      last = w;
      if ((w > 0 && stable >= 2) || Date.now() - started > 2000) { resolve(w); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function mapRenderFallback(container, points, onSelect, opts) {
  container.classList.add('is-fallback');
  const grid = document.createElement('div');
  grid.className = 'find-dacia-location-map-grid';
  container.appendChild(grid);

  const projected = mapProject(points, opts.fallbackBox);
  const pins = points.map(function (p, i) {
    const anchor = document.createElement('div');
    anchor.className = 'find-dacia-location-map-anchor';
    anchor.style.left = projected[i].x + '%';
    anchor.style.top = projected[i].y + '%';
    const pin = mapMakePin(p, i + 1, opts, true);
    anchor.appendChild(pin);
    pin.addEventListener('click', function () { onSelect(p.index); });
    container.appendChild(anchor);
    return pin;
  });

  return {
    setActive: function (index) {
      points.forEach(function (p, i) { pins[i].classList.toggle('is-active', p.index === index); });
    },
  };
}

function mapDynamicMaxZoom(bounds) {
  const lats = bounds.map(function (b) { return b[0]; });
  const lngs = bounds.map(function (b) { return b[1]; });
  const span = Math.max(
    Math.max.apply(null, lats) - Math.min.apply(null, lats),
    Math.max.apply(null, lngs) - Math.min.apply(null, lngs)
  );
  if (span > 8) return 6;
  if (span > 2) return 8;
  if (span > 0.3) return 10;
  return 11;
}

function mapRenderLeaflet(L, container, points, onSelect, opts) {
  const map = L.map(container, {
    scrollWheelZoom: false,
    zoomControl: opts.zoomControl !== false,
    attributionControl: true,
  });
  if (map.attributionControl) map.attributionControl.setPrefix('');

  const tiles = L.tileLayer(MAP_TILE_URL, {
    attribution: MAP_TILE_ATTRIB,
    detectRetina: false,
    maxNativeZoom: MAP_TILE_MAX_NATIVE_ZOOM,
    maxZoom: MAP_TILE_MAX_ZOOM,
    keepBuffer: 4,
    updateWhenIdle: false,
    updateWhenZooming: true,
  }).addTo(map);

  const bounds = points.map(function (p) { return [p.lat, p.lng]; });
  if (bounds.length === 1) {
    map.setView(bounds[0], opts.singleZoom || 11);
  } else {
    map.fitBounds(bounds, {
      paddingTopLeft: opts.fitPaddingTopLeft || [30, 30],
      paddingBottomRight: opts.fitPaddingBottomRight || [30, 30],
      maxZoom: opts.maxZoom || mapDynamicMaxZoom(bounds),
    });
  }

  points.forEach(function (p, i) {
    const marker = L.marker([p.lat, p.lng], {
      icon: L.divIcon({ className: 'find-dacia-location-map-marker', html: '', iconSize: null, iconAnchor: [0, 0] }),
      keyboard: true,
      riseOnHover: true,
      title: String(p.item[opts.labelField] || p.item.name || ''),
      alt: String(p.item[opts.labelField] || p.item.name || 'Location'),
    }).addTo(map);

    const pin = mapMakePin(p, i + 1, opts, false);
    p.marker = marker;
    p.pin = pin;

    const attach = function () {
      const host = marker.getElement();
      if (host) host.appendChild(pin);
    };
    marker.on('add', attach);
    attach();

    marker.on('click', function () { onSelect(p.index); });
  });

  mapDeclutterLabels(points, opts);
  map.on('zoomend', function () { mapDeclutterLabels(points, opts); });

  const refresh = function () {
    map.invalidateSize(false);
    tiles.redraw();
    mapDeclutterLabels(points, opts);
  };
  requestAnimationFrame(refresh);
  [80, 200, 400, 800, 1400].forEach(function (ms) { setTimeout(refresh, ms); });

  if (typeof ResizeObserver !== 'undefined') {
    let lastW = container.offsetWidth;
    let lastH = container.offsetHeight;
    const ro = new ResizeObserver(function () {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      refresh();
    });
    ro.observe(container);
  }

  return {
    setActive: function (index, pan) {
      points.forEach(function (p) {
        const on = p.index === index;
        if (p.pin) p.pin.classList.toggle('is-active', on);
        if (p.marker && p.marker.setZIndexOffset) p.marker.setZIndexOffset(on ? 1000 : 0);
        if (on && pan) map.panTo([p.lat, p.lng], { animate: true });
      });
    },
    invalidate: refresh,
  };
}

function mountMap(container, points, onSelect, options) {
  if (!points || !points.length) return Promise.resolve(null);
  const opts = Object.assign({ pinStyle: 'number', labelField: 'name' }, options || {});

  const loading = document.createElement('div');
  loading.className = 'find-dacia-location-map-loading';
  loading.textContent = 'Loading map…';
  container.appendChild(loading);

  return Promise.all([loadLeaflet(), mapWhenWidthStable(container)])
    .then(function (r) {
      loading.remove();
      return mapRenderLeaflet(r[0], container, points, onSelect, opts);
    })
    .catch(function () {
      container.textContent = '';
      container.classList.remove('leaflet-container');
      return mapRenderFallback(container, points, onSelect, opts);
    });
}

// Sales agents get a "Book Test Drive" CTA; repair centers get "Schedule Service".
// Choose off location_type plus the published services so the CTA matches what the
// location can actually do.
function ctaIntentFor(store) {
  const type = String(store.location_type || '').toLowerCase();
  const services = (store.services || []).map(function (s) { return String(s).toLowerCase(); });
  const sells = type.indexOf('sales') !== -1
    || services.some(function (s) { return s.indexOf('sale') !== -1 || s.indexOf('test drive') !== -1; });
  if (sells) return { label: 'Book Test Drive', verb: 'Book a test drive at' };
  return { label: 'Schedule Service', verb: 'Schedule service at' };
}

async function decorate(block, bridge) {
  let allStores = null;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext && bridge.hostContext.preview === true;
    if (isPreview) {
      allStores = SAMPLE_DATA;
    } else {
      try {
        const _result = await bridge.toolResult;
        const sc = _result?.structuredContent || {};
        // structuredContent.locations — derived from action name "find_dacia_location" (bare array outputSchema rule)
        allStores = sc.locations || (Array.isArray(sc) ? sc : null);
      } catch(e) { allStores = null; }
    }
  } else {
    allStores = SAMPLE_DATA;
  }

  function renderNoResults() {
    const empty = document.createElement('div');
    empty.className = 'find-dacia-location-empty';

    const formCard = document.createElement('div');
    formCard.className = 'find-dacia-location-form-card';
    formCard.style.background = theme ? theme.bg : '#5d644d';

    const pin = document.createElement('span');
    pin.className = 'find-dacia-location-pin';
    pin.textContent = '◎';
    pin.style.color = theme ? theme.fg : '#fff';
    formCard.appendChild(pin);

    const heading = document.createElement('h3');
    heading.className = 'find-dacia-location-heading';
    heading.textContent = 'No stores found';
    heading.style.color = theme ? theme.fg : '#fff';
    formCard.appendChild(heading);

    const hint = document.createElement('p');
    hint.className = 'find-dacia-location-hint';
    hint.textContent = 'Try another location.';
    hint.style.color = theme ? theme.fg : '#fff';
    formCard.appendChild(hint);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'find-dacia-location-input';
    input.placeholder = 'Enter ZIP code…';
    input.setAttribute('aria-label', 'ZIP code or city');
    formCard.appendChild(input);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'find-dacia-location-search-btn';
    btn.textContent = 'Find Nearby';
    formCard.appendChild(btn);

    const submit = function() {
      const value = input.value.trim();
      if (!value) { input.focus(); return; }
      if (bridge && bridge.sendMessage) bridge.sendMessage('Find Dacia locations near ' + value);
    };
    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') submit();
    });

    empty.appendChild(formCard);
    block.appendChild(empty);
  }

  function renderResults(stores) {
    if (!stores || !stores.length) { renderNoResults(); return; }
    const shown = stores.slice(0, MAX_STORES);
    const points = mapPointsFrom(shown);

    const layout = document.createElement('div');
    layout.className = 'find-dacia-location-layout';

    const mapEl = document.createElement('div');
    mapEl.className = 'find-dacia-location-map';
    mapEl.setAttribute('role', 'application');
    mapEl.setAttribute('aria-label', 'Map of ' + points.length + ' location' + (points.length === 1 ? '' : 's'));

    const side = document.createElement('div');
    side.className = 'find-dacia-location-side';

    const rowWrap = document.createElement('div');
    rowWrap.className = 'find-dacia-location-row-wrap';

    const row = document.createElement('div');
    row.className = 'find-dacia-location-row';

    const cards = shown.map(function(store, i) {
      const card = document.createElement('div');
      card.className = 'find-dacia-location-store-card';
      card.tabIndex = 0;
      card.style.background = theme ? theme.bg : '#5d644d';
      card.style.color = theme ? theme.fg : '#fff';

      const head = document.createElement('div');
      head.className = 'find-dacia-location-store-head';

      const pinDiv = document.createElement('div');
      pinDiv.className = 'find-dacia-location-store-pin';
      const pinOrdinal = points.findIndex(function(p) { return p.index === i; });
      pinDiv.textContent = pinOrdinal >= 0 ? String(pinOrdinal + 1) : '◎';
      if (pinOrdinal >= 0) pinDiv.style.background = ACCENT;
      head.appendChild(pinDiv);

      if (store.location_type) {
        const type = document.createElement('span');
        type.className = 'find-dacia-location-store-type';
        type.textContent = store.location_type;
        head.appendChild(type);
      }
      card.appendChild(head);

      const name = document.createElement('div');
      name.className = 'find-dacia-location-store-name';
      name.textContent = store.name || '';
      card.appendChild(name);

      if (store.city || store.distance_km !== undefined) {
        const dist = document.createElement('div');
        dist.className = 'find-dacia-location-store-dist';
        const parts = [];
        if (store.city) parts.push(store.city);
        if (store.distance_km !== undefined && store.distance_km !== null) {
          parts.push(Number(store.distance_km).toFixed(1) + ' km away');
        }
        dist.textContent = parts.join(' · ');
        card.appendChild(dist);
      }

      if (store.address) {
        const addr = document.createElement('div');
        addr.className = 'find-dacia-location-store-addr';
        addr.textContent = store.address;
        card.appendChild(addr);
      }

      if (store.phone) {
        const phone = document.createElement('div');
        phone.className = 'find-dacia-location-store-phone';
        phone.textContent = store.phone;
        card.appendChild(phone);
      }

      if (store.opening_hours) {
        const hours = document.createElement('div');
        hours.className = 'find-dacia-location-store-hours';
        hours.textContent = store.opening_hours;
        card.appendChild(hours);
      }

      if (Array.isArray(store.services) && store.services.length) {
        const chips = document.createElement('div');
        chips.className = 'find-dacia-location-store-services';
        store.services.slice(0, 4).forEach(function(s) {
          const chip = document.createElement('span');
          chip.className = 'find-dacia-location-store-chip';
          chip.textContent = s;
          chips.appendChild(chip);
        });
        card.appendChild(chips);
      }

      const ctaRow = document.createElement('div');
      ctaRow.className = 'find-dacia-location-cta-row';

      const intent = ctaIntentFor(store);
      const primary = document.createElement('button');
      primary.type = 'button';
      primary.className = 'find-dacia-location-cta find-dacia-location-cta-primary';
      primary.textContent = intent.label;
      primary.addEventListener('click', function(e) {
        e.stopPropagation();
        if (bridge && bridge.sendMessage) {
          bridge.sendMessage(intent.verb + ' ' + (store.name || 'this Dacia location') + (store.city ? ' in ' + store.city : ''));
        }
      });
      ctaRow.appendChild(primary);

      // Get Directions when a URL is published, else Call Location. Both are
      // useful, but only one secondary CTA fits alongside the primary — prefer
      // directions (openLink) when we have one.
      const secondary = document.createElement('button');
      secondary.type = 'button';
      secondary.className = 'find-dacia-location-cta find-dacia-location-cta-secondary';
      if (store.directions_url) {
        secondary.textContent = 'Get Directions';
        secondary.addEventListener('click', function(e) {
          e.stopPropagation();
          if (bridge && bridge.openLink) bridge.openLink(store.directions_url);
        });
        ctaRow.appendChild(secondary);
      } else if (store.phone) {
        secondary.textContent = 'Call Location';
        secondary.addEventListener('click', function(e) {
          e.stopPropagation();
          if (bridge && bridge.openLink) bridge.openLink('tel:' + String(store.phone).replace(/\s+/g, ''));
        });
        ctaRow.appendChild(secondary);
      }
      card.appendChild(ctaRow);

      card.addEventListener('click', function() { select(i); });
      card.addEventListener('focusin', function() { select(i); });
      row.appendChild(card);
      return card;
    });

    rowWrap.appendChild(row);

    const fade = document.createElement('div');
    fade.className = 'find-dacia-location-fade';
    fade.style.background = 'linear-gradient(to right, transparent, ' + (theme ? theme.bg : '#5d644d') + 'cc)';
    rowWrap.appendChild(fade);
    side.appendChild(rowWrap);

    if (points.length) layout.appendChild(mapEl);
    layout.appendChild(side);
    block.appendChild(layout);

    let mapApi = null;
    let activeIdx = -1;

    function select(index) {
      if (index === activeIdx) return;
      activeIdx = index;
      cards.forEach(function(c, i) { c.classList.toggle('is-selected', i === index); });
      if (mapApi) mapApi.setActive(index, true);
      const card = cards[index];
      if (card) row.scrollLeft = Math.max(0, card.offsetLeft - row.offsetLeft - 4);
    }

    if (points.length) {
      mountMap(mapEl, points, select, {
        pinStyle: 'number',
        pinColor: ACCENT,
        labelField: 'name',
        maxZoom: 13,
        singleZoom: 13,
      }).then(function(api) {
        mapApi = api;
        if (api && activeIdx >= 0) api.setActive(activeIdx, false);
      });
    }

    if (cards.length) select(0);
  }

  renderResults(allStores);

  if (bridge) {
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    let resizeTimer;
    const ro = new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { bridge.reportSize(block.offsetWidth, block.offsetHeight); }, 150);
    });
    ro.observe(block);
  }
}

export default decorate;
