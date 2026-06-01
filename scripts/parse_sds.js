/* Parse the saved resources page (_res.html) into SDS groups:
   { category: [ {label, url}, ... ] }  -> writes scripts/sds.json */
const fs = require('fs');
const path = require('path');
const h = fs.readFileSync(path.join(__dirname, '..', '_res.html'), 'utf8');

function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

const CATS = ['Adhesives','Aerosols','Burn-In Sticks','Edging Sticks','Epoxy Sticks','Fill Sticks',
  'Lube / Cleaners / Polishes','Markers','Pencils','Powders','Powder Sticks','Putty','Leather / Vinyl','Metal'];

// locate each category heading position in the document
const marks = [];
CATS.forEach(c => {
  const re = new RegExp('>\\s*' + c.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&') + '\\s*<', 'g');
  let m, last = -1;
  while ((m = re.exec(h))) last = m.index;       // take the LAST occurrence (skip nav/menu dup)
  if (last >= 0) marks.push({ cat: c, idx: last });
});
marks.sort((a, b) => a.idx - b.idx);

// for each category segment, pull pdf anchors + text
const out = {};
marks.forEach((mk, i) => {
  const end = i + 1 < marks.length ? marks[i + 1].idx : h.length;
  const seg = h.slice(mk.idx, end);
  // each SDS entry is a <li> whose text is the product name, with an <a>SDS</a> link inside
  const lis = [...seg.matchAll(/<li>([\s\S]*?<a\b[^>]*href="([^"]*media\.nl[^"]*_xt=\.pdf[^"]*)"[^>]*>[\s\S]*?<\/a>[\s\S]*?)<\/li>/g)];
  const items = lis.map(li => {
    let label = decode(li[1].replace(/<[^>]+>/g, ' '));
    label = label.replace(/\s*\[?\s*SDS\s*\]?\s*$/i, '').replace(/[\s·\-–]+$/,'').trim() || 'Safety Data Sheet';
    return { label: label, url: decode(li[2]) };
  });
  if (items.length) out[mk.cat] = items;
});

fs.writeFileSync(path.join(__dirname, 'sds.json'), JSON.stringify(out, null, 2));
let total = 0;
Object.keys(out).forEach(c => { total += out[c].length; console.log(c + ': ' + out[c].length); });
console.log('TOTAL SDS:', total);
console.log('\nsample:', JSON.stringify(out[Object.keys(out)[0]][0]));
