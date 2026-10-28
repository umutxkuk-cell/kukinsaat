import { chromium } from 'playwright';
const browser = await chromium.launch();

// düzeltme sonrası ekran görüntüleri
for (const [name, url, w, h, mob] of [
  ['after-mobile-home',    'http://localhost:4173/',             390, 844, true],
  ['after-mobile-iletisim','http://localhost:4173/#/iletisim',   390, 844, true],
  ['after-desktop-home',   'http://localhost:4173/',            1440, 900, false],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2800);
  await page.screenshot({ path: `qa/shots/${name}.png` });
  await ctx.close();
}

// ölçüm: bildirim ne kadar yer kaplıyor, altındaki içerik görünür mü
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);

const m = await page.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  const r = dlg ? dlg.getBoundingClientRect() : null;
  const btns = [...document.querySelectorAll('a')].filter(a => /Keşfedin|Ulaşın/i.test(a.textContent));
  const hr = document.querySelector('a[href^="tel:"]');
  return {
    dlgH: r ? Math.round(r.height) : 0,
    screenH: window.innerHeight,
    pct: r ? Math.round((r.height / window.innerHeight) * 100) : 0,
    cta: btns.map(b => {
      const br = b.getBoundingClientRect();
      const covered = r && br.top < r.top && br.bottom > r.top;
      return { t: b.textContent.trim().slice(0,24), top: Math.round(br.top), covered };
    }),
    tel: hr ? { top: Math.round(hr.getBoundingClientRect().top) } : null,
  };
});
await ctx.close();

console.log('══════ DÜZELTME SONRASI ÖLÇÜM (390px) ══════\n');
console.log(`  Bildirim yüksekliği : ${m.dlgH}px / ${m.screenH}px ekran`);
console.log(`  Ekran kaplama oranı : %${m.pct}  (önce: ~%35)  ${m.pct <= 25 ? '✓' : '⚠'}`);
console.log('\n  CTA butonları:');
m.cta.forEach(c => console.log(`    ${c.covered ? '✗ KAPALI' : '✓ GÖRÜNÜR'}  top=${c.top}px  "${c.t}"`));
const allVisible = m.cta.length > 0 && m.cta.every(c => !c.covered);
console.log(`\n  ${allVisible ? '✓ TÜM CTA butonları görünür — sorun çözüldü' : '✗ Hâlâ kapanan içerik var'}`);
await browser.close();
