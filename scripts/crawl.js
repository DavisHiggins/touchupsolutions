/* Full-catalog crawler for touchupsolutions.com (SuiteCommerce store).
   Walks every subcategory, recurses into child categories, follows
   ?page=N pagination, and extracts exact { sku, name, price } from the
   raw product markup. Writes products.js (real prices, all of them).

   Run: node scripts/crawl.js
*/
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const BASE = 'https://www.touchupsolutions.com';

/* division root -> site page key used by data-shop */
const DIVISIONS = {
  '/shop/wood-repair': 'wood-repair',
  '/shop/leather-repair': 'leather-repair',
  '/shop/metal-repair': 'metal-repair',
  '/shop/accessories': 'accessories',
  '/home-user-shop/furniture-fill-sticks': 'home-fill-sticks',
  '/home-user-shop/furniture-markers': 'home-markers'
};

/* seed subcategory paths */
const SEEDS = [
  '/shop/wood-repair/adhesives', '/shop/wood-repair/aerosols', '/shop/wood-repair/burn-in-sticks',
  '/shop/wood-repair/edging-sticks', '/shop/wood-repair/epoxy-sticks', '/shop/wood-repair/fill-sticks',
  '/shop/wood-repair/markers', '/shop/wood-repair/pencils', '/shop/wood-repair/powders',
  '/shop/wood-repair/powder-sticks', '/shop/wood-repair/putty',
  '/shop/leather-repair/leathervinyl-markers', '/shop/leather-repair/leather-vinyl-fill-sticks',
  '/shop/leather-repair/leather-vinyl-pigmented-repair', '/shop/leather-repair/leather-vinyl-pigmented-glaze',
  '/shop/leather-repair/leather-vinyl-aniline-repair', '/shop/leather-repair/leather-vinyl-background-repair',
  '/shop/leather-repair/leather-vinyl-topcoat', '/shop/leather-repair/leather-vinyl-cleaners-and-solvents',
  '/shop/leather-repair/accesories',
  '/shop/metal-repair/epoxy-sticks', '/shop/metal-repair/metal-enamel', '/shop/metal-repair/metal-topcoat',
  '/shop/accessories/abrasives', '/shop/accessories/adhesive-accessories', '/shop/accessories/aerosol-accessories',
  '/shop/accessories/brushes', '/shop/accessories/burn-in-accessories', '/shop/accessories/containers',
  '/shop/accessories/fill-stick-accessories', '/shop/accessories/leather-accessories',
  '/shop/accessories/lubes-cleaners-polishes', '/shop/accessories/marker-accessories',
  '/shop/accessories/powder-accessories', '/shop/accessories/spray-systems',
  '/home-user-shop/furniture-fill-sticks', '/home-user-shop/furniture-markers'
];

/* ---- color resolver (swatch = the product's color) ---- */
const COLOR_RULES = [
  ['extra dark walnut','#3a281a'],['dark red mahogany','#5a2418'],['cordovan mahogany','#46201a'],
  ['dark brown','#43301f'],['dark walnut','#43301f'],['black satin','#15120f'],['black','#1a1714'],['ebony','#1a140f'],
  ['medium brown walnut','#6e4a2c'],['maison brown','#5a3c24'],['perfect brown','#6a4628'],
  ['fiesta brown','#7a4a2a'],['light brown','#8a5e38'],['light walnut','#9a6a3c'],['medium walnut','#7c5230'],
  ['walnut','#6a4628'],['mahogany','#5a2618'],['cherry','#7a3322'],['mocha','#5a4030'],['espresso','#2c1c12'],
  ['chocolate','#3a2516'],['java','#2a1c12'],['truffle','#4e3a2c'],['sable','#4a382a'],['sepia','#5a4636'],
  ['gunmetal','#54585c'],['graphite','#4e5052'],['charcoal','#3c3e40'],['battleship','#74787a'],['storm','#6a6e72'],
  ['slate','#5a6064'],['iron','#6e7172'],['pewter','#8e9094'],['london fog','#9a9c9a'],['gravel','#8a8a86'],
  ['smoke','#9aa0a0'],['granite','#8e9090'],['fossil','#c2bcae'],['dovetail','#9c9a92'],['pebble','#b6b2a8'],
  ['prairie mist','#c4c2b6'],['cobblestone','#b8b8b2'],['alloy','#a8aaa8'],['nickel','#a2a4a3'],
  ['overcast','#b0b4b4'],['moonstone','#c2c6c6'],['iceberg','#d2d6d6'],['pearl','#dcdcd9'],['gray','#9a9c9a'],['grey','#9a9c9a'],
  ['steel','#9a9ea2'],['aluminum','#bcc0c4'],['brass','#b08a3e'],['bronze','#8a6a3a'],['plastic','#cfcabf'],
  ['oriental ash','#c9bda0'],['clearly maple','#dcc08a'],['maple clear','#dcc08a'],['maple interior','#d2ab72'],
  ['honey maple','#d3a652'],['maple','#d6b27a'],['oak light','#c89a5e'],['oak','#c89a5e'],['fontana','#c4a06a'],
  ['provincial white','#cdb796'],['provincial','#9c6a3c'],['driftwood','#b3a591'],['beige pickle','#cfc3a0'],
  ['beige tone','#d2bb95'],['beige','#d2bb95'],['pickle frost','#cfc7a8'],['champagne frost','#e0d2ad'],
  ['champagne','#e3cfa6'],['frost pickle','#cfc7a8'],['frost','#d6d8d6'],['seafoam','#cfd2c4'],['creme','#e9e0c9'],
  ['blonde','#d8b98a'],['almond','#dcc6a0'],['antique white','#e6dcc4'],['eggshell','#ece4d2'],['off white','#ece6d8'],
  ['natural','#cdb189'],['tan','#b9895a'],['white','#f2efe8'],['clear','#e7e0d0'],['red','#7a2420'],['blue','#3a4a6a'],
  ['green','#3a5a34'],['cream','#e9e0c9'],['sand','#cbb288'],['toast','#a9743c']
];
function colorFor(name) {
  const n = name.toLowerCase();
  for (const [k, v] of COLOR_RULES) if (n.indexOf(k) !== -1) return v;
  return '#9a6a3a';
}

function fetchHtml(url) {
  try {
    return execFileSync('curl', ['-s', '-m', '40', '-A', 'Mozilla/5.0 (catalog-import)', url], {
      maxBuffer: 1024 * 1024 * 16, encoding: 'utf8'
    });
  } catch (e) { return ''; }
}

function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

/* top-level subcategory label, derived from the URL (clean filter groups) */
const GROUP_OVERRIDE = {
  'markers': 'Touch Up Markers',
  'leathervinyl-markers': 'Leather / Vinyl Markers',
  'leather-vinyl-fill-sticks': 'Leather / Vinyl Fill Sticks',
  'leather-vinyl-pigmented-repair': 'Leather / Vinyl Pigmented Repair',
  'leather-vinyl-pigmented-glaze': 'Leather / Vinyl Pigmented Glaze',
  'leather-vinyl-aniline-repair': 'Leather / Vinyl Aniline Repair',
  'leather-vinyl-background-repair': 'Leather / Vinyl Background Repair',
  'leather-vinyl-topcoat': 'Leather / Vinyl Topcoats',
  'leather-vinyl-cleaners-and-solvents': 'Cleaners & Solvents',
  'accesories': 'Leather / Vinyl Accessories',
  'lubes-cleaners-polishes': 'Lubes / Cleaners / Polishes',
  'furniture-fill-sticks': 'Furniture Fill Sticks',
  'furniture-markers': 'Furniture Markers'
};
function groupFor(p, pageKey) {
  // strip the matched division root, take the first remaining path segment
  let root = '';
  for (const r in DIVISIONS) if (p.indexOf(r) === 0 && r.length > root.length) root = r;
  let rest = p.slice(root.length).split('/').filter(Boolean);
  let slug = rest[0] || root.split('/').filter(Boolean).pop();
  if (pageKey === 'metal-repair' && slug === 'epoxy-sticks') return 'Metal Epoxy Sticks';
  if (GROUP_OVERRIDE[slug]) return GROUP_OVERRIDE[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function parseProducts(html) {
  const parts = html.split(/itemtype="https?:\/\/schema\.org\/Product"/).slice(1);
  return parts.map(b => {
    const sku = (b.match(/data-sku="([^"]+)"/) || [])[1] || '';
    let name = (b.match(/itemprop="name"[^>]*>([^<]+)</) || [])[1];
    if (!name) name = (b.match(/itemprop="name"\s+content="([^"]+)"/) || [])[1];
    const price = (b.match(/itemprop="price"\s+data-rate="([0-9.]+)"/) || [])[1] || '';
    return { sku: (sku || '').trim(), name: decode(name || ''), price: price ? parseFloat(price) : null };
  }).filter(r => r.sku && r.name);
}

function maxPage(html) {
  let mx = 1;
  const re = /[?&]page=(\d+)/g; let m;
  while ((m = re.exec(html))) mx = Math.max(mx, parseInt(m[1], 10));
  return Math.min(mx, 40);
}

function childCats(html, basePath) {
  const set = new Set();
  const re = new RegExp('href="(' + basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/[^"?#]+)"', 'g');
  let m; while ((m = re.exec(html))) set.add(m[1]);
  return [...set];
}

function pageKeyFor(p) {
  for (const root in DIVISIONS) if (p.indexOf(root) === 0) return DIVISIONS[root];
  return 'wood-repair';
}

const all = {};       // sku -> product
const visited = new Set();
let reqs = 0;

function crawl(p, depth) {
  if (visited.has(p) || depth > 3) return;
  visited.add(p);
  const url = BASE + p;
  const html = fetchHtml(url);
  reqs++;
  if (!html) { console.log('  [skip] no html', p); return; }
  const pk = pageKeyFor(p);
  const sub = groupFor(p, pk);
  let rows = parseProducts(html);

  if (rows.length) {
    const pages = maxPage(html);
    for (let pg = 2; pg <= pages; pg++) {
      const ph = fetchHtml(url + (url.indexOf('?') >= 0 ? '&' : '?') + 'page=' + pg);
      reqs++;
      rows = rows.concat(parseProducts(ph));
    }
    let added = 0;
    rows.forEach(r => {
      if (!all[r.sku]) {
        all[r.sku] = {
          sku: r.sku, name: r.name, price: r.price,
          page: pk, sub: sub, color: colorFor(r.name),
          kit: /assortment|\bset\b|\bkit\b/i.test(r.name)
        };
        added++;
      }
    });
    console.log('  [ok] ' + p + '  (' + sub + ')  pages:' + pages + '  +' + added + ' products');
  } else {
    const kids = childCats(html, p);
    if (kids.length) {
      console.log('  [cat] ' + p + '  -> ' + kids.length + ' child categories');
      kids.forEach(k => crawl(k, depth + 1));
    } else {
      console.log('  [empty] ' + p);
    }
  }
}

console.log('Crawling touchupsolutions.com catalog...\n');
SEEDS.forEach(s => crawl(s, 0));

const list = Object.values(all);
const priced = list.filter(p => p.price != null).length;
console.log('\nRequests:', reqs, '| Total SKUs:', list.length, '| With price:', priced, '| Quote-only:', list.length - priced);

/* write products.js */
const out =
`/* ============================================================
   TOUCH UP SOLUTIONS — FULL PRODUCT CATALOG
   ${list.length} products imported from the live touchupsolutions.com
   store (SuiteCommerce). Exact names, SKUs, and prices. Products
   without a store price are price:null and render "Request a Quote".
   Generated by scripts/crawl.js — re-run to refresh.
   ============================================================ */
(function () {
  'use strict';
  var P = ${JSON.stringify(list, null, 0)};
  window.TUS_CATALOG = P;
  window.TUS_BY_SKU = P.reduce(function (m, p) { m[p.sku] = p; return m; }, {});
})();
`;
fs.writeFileSync(path.join(__dirname, '..', 'products.js'), out);
fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'catalog.json'), JSON.stringify(list, null, 2));
console.log('Wrote products.js (' + list.length + ' products)');

/* quick breakdown by page + sub */
const byPage = {};
list.forEach(p => { byPage[p.page] = byPage[p.page] || {}; byPage[p.page][p.sub] = (byPage[p.page][p.sub] || 0) + 1; });
console.log('\nBreakdown:');
Object.keys(byPage).forEach(pg => {
  const subs = byPage[pg];
  const tot = Object.values(subs).reduce((a, b) => a + b, 0);
  console.log('  ' + pg + ': ' + tot);
  Object.keys(subs).forEach(s => console.log('      - ' + s + ': ' + subs[s]));
});
