import { chromium } from 'playwright';

const base = 'https://kukinsaat.com';
const paths = [
  '/', '/kurumsal', '/hizmetler',
  '/hizmetler/insaat-ve-yapi-uygulamalari',
  '/hizmetler/muhendislik-hizmetleri',
  '/hizmetler/proje-gelistirme-ve-teknik-koordinasyon',
  '/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi',
  '/hizmetler/teknik-danismanlik',
  '/projeler', '/iletisim', '/gizlilik',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push(e.message));

console.log('══════ CANLI NEXT.JS SAYFA ENVANTERİ (Chromium) ══════\n');
const seenCanonical = new Map();
const results = [];
for (const path of paths) {
  const res = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(180);
  const x = await page.evaluate(() => {
    const txt = e => e?.textContent?.replace(/\s+/g,' ').trim() || '';
    return {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      robots: document.querySelector('meta[name="robots"]')?.content || 'index (default)',
      h1: [...document.querySelectorAll('h1')].map(txt),
      h2: [...document.querySelectorAll('h2')].map(txt).slice(0,4),
      imgs: [...document.images].map(i => ({src:i.currentSrc||i.src,alt:i.alt,loaded:i.complete&&i.naturalWidth>0})),
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)['@type']}catch{return 'INVALID'}}),
      links: [...document.querySelectorAll('a[href]')].map(a=>a.href).filter(h=>h.startsWith(location.origin)),
      bodyText: txt(document.body).slice(0,500),
      headings: [...document.querySelectorAll('h1,h2,h3')].length,
      formCount: document.forms.length,
      visibleText: txt(document.body).length,
    };
  });
  results.push({path,status:res?.status(),...x});
  if(x.canonical) seenCanonical.set(x.canonical,(seenCanonical.get(x.canonical)||0)+1);
  console.log(`${String(res?.status()).padEnd(4)} ${path.padEnd(58)} H1:${x.h1.length} desc:${x.desc.length} imgs:${x.imgs.length} JSON-LD:${x.jsonld.join(',')||'-'}`);
  console.log(`     title: ${x.title}`);
  console.log(`     canonical: ${x.canonical} | robots: ${x.robots}`);
  if (x.h1.length) console.log(`     H1: ${x.h1.join(' / ').slice(0,105)}`);
}
console.log('\n══ Canonical çakışmaları (aynı URL birden fazla sayfada) ══');
for(const [c,n] of seenCanonical) if(n>1) console.log(`  ✗ ${n} sayfa → ${c}`);
console.log('  browser page errors:', errs.length ? errs.join(' | ') : '0');

// Projeler page exact empty-state vs message
const project = results.find(x=>x.path==='/projeler');
console.log('\n══ Projeler sayfası doğrulaması ══');
console.log('  h1:', project?.h1);
console.log('  body excerpt:', project?.bodyText);
console.log('  h2:', project?.h2);

// About counter zero check at end of animation
await page.goto(base+'/kurumsal',{waitUntil:'networkidle'});
await page.waitForTimeout(2500);
console.log('\n══ Kurumsal sayaç son görünür metni ══');
console.log('  counters:', await page.locator('.count-up, [data-counter]').allTextContents().catch(()=>[]));
console.log('  zero texts:', await page.locator('body').innerText().then(t=>t.match(/\b0\b/g)||[]));

await ctx.close(); await browser.close();
