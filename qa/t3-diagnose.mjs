import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

for (const p of ['/kurumsal', '/hizmetler', '/iletisim']) {
  await page.goto('http://localhost:4173/#' + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const detail = await page.evaluate(() => {
    const d = document.documentElement;
    const out = { overflow: d.scrollWidth - d.clientWidth, items: [] };
    // en sağda kalan, taşıma katkıda bulunan TÜM öğeleri sırala
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > d.clientWidth + 1) {
        const cs = getComputedStyle(el);
        out.items.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 58),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          pos: cs.position,
          text: (el.textContent || '').trim().slice(0, 34),
        });
      }
    });
    // en sağda olanı öne al
    out.items.sort((a, b) => b.right - a.right);
    out.items = out.items.slice(0, 5);
    return out;
  });

  console.log('\n══ ' + p + ' — taşma ' + detail.overflow + 'px ══');
  detail.items.forEach(i => {
    console.log(`  right=${String(i.right).padStart(4)} left=${String(i.left).padStart(4)} w=${String(i.width).padStart(4)} ${i.pos.padEnd(9)} <${i.tag}> ${i.cls}`);
    if (i.text) console.log(`      "${i.text}"`);
  });
}
await browser.close();
