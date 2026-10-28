import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

console.log('══════ CANLI SİTE (kukinsaat.com) 390px ══════\n');
for (const p of ['/', '/kurumsal', '/hizmetler', '/projeler', '/iletisim', '/gizlilik']) {
  await page.goto('https://kukinsaat.com' + p, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  const r = await page.evaluate(() => {
    const d = document.documentElement;
    return {
      diff: d.scrollWidth - d.clientWidth,
      body: getComputedStyle(document.body).overflowX,
      html: getComputedStyle(document.documentElement).overflowX,
    };
  });
  console.log(`  ${p.padEnd(30)} taşma: ${String(r.diff).padStart(3)}px  body:${r.body.padEnd(8)} html:${r.html}`);
}
await browser.close();
