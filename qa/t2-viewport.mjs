import { chromium } from 'playwright';

const browser = await chromium.launch();
const pages = ['/', '/kurumsal', '/hizmetler', '/projeler', '/iletisim', '/gizlilik'];
const vps = [
  ['1920x1080', 1920, 1080],
  ['1440x900',  1440, 900],
  ['1280x800',  1280, 800],
  ['1024x768',  1024, 768],
  ['768x1024',   768, 1024],
  ['390x844',    390, 844],
  ['360x740',    360, 740],
];

const results = [];

for (const [label, w, h] of vps) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  for (const p of pages) {
    const route = p === '/' ? '/' : `/#${p}`;
    await page.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    // Gerçek yatay taşma ölçümü: scrollWidth vs clientWidth
    const o = await page.evaluate(() => {
      const d = document.documentElement;
      const overflow = d.scrollWidth - d.clientWidth;
      // hangi öğe taşıyor?
      let culprits = [];
      if (overflow > 1) {
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > d.clientWidth + 1 && r.width > 20) {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' && cs.overflow !== 'hidden') {
              culprits.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]}`);
            }
          }
        });
      }
      return { overflow, bodyW: document.body.scrollWidth, culprits: [...new Set(culprits)].slice(0,3) };
    });

    results.push({ vp: label, page: p, overflow: o.overflow, culprits: o.culprits });
    if (o.overflow > 1) {
      console.log(`✗ ${label.padEnd(11)} ${p.padEnd(12)} taşma: ${o.overflow}px  suçlu: ${o.culprits.join(', ')}`);
    }
  }
  await ctx.close();
}

console.log('\n══════ YATAY TAŞMA MATRİSİ (gerçek render) ══════\n');
const bad = results.filter(r => r.overflow > 1);
console.log(`  Test edilen: ${results.length} kombinasyon (${vps.length} viewport × ${pages.length} sayfa)`);
console.log(`  Taşma olan  : ${bad.length}`);
if (bad.length === 0) console.log('  ✓ HİÇBİR viewport × sayfa kombinasyonunda yatay taşma YOK');
bad.forEach(r => console.log(`  ✗ ${r.vp} ${r.page}: ${r.overflow}px — ${r.culprits.join(', ')}`));

await browser.close();
