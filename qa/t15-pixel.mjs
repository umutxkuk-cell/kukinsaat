import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);

const m = await page.evaluate(() => {
  const dlg = document.querySelector('[role="dialog"]');
  const dr = dlg.getBoundingClientRect();
  const btn = [...document.querySelectorAll('a')].find(a => /Ulaşın/i.test(a.textContent));
  const br = btn.getBoundingClientRect();
  return {
    dlg: { top: Math.round(dr.top), bottom: Math.round(dr.bottom), h: Math.round(dr.height) },
    btn: { top: Math.round(br.top), bottom: Math.round(br.bottom), h: Math.round(br.height) },
    overlapPx: Math.max(0, Math.min(dr.bottom, br.bottom) - Math.max(dr.top, br.top)),
    btnVisiblePart: Math.round(Math.min(br.bottom, dr.top) - br.top),
  };
});
await ctx.close(); await browser.close();

console.log('  Bildirim : top=%d bottom=%d (h=%d)', m.dlg.top, m.dlg.bottom, m.dlg.h);
console.log('  Buton    : top=%d bottom=%d (h=%d)', m.btn.top, m.btn.bottom, m.btn.h);
console.log('  Çakışma  : %dpx', m.overlapPx);
console.log('  Butonun görünür kısmı: %dpx / %dpx', m.btnVisiblePart, m.btn.h);
console.log('  SONUÇ:', m.overlapPx > 0 ? `✗ ${m.overlapPx}px çakışma — gerçek sorun` : '✓ çakışma yok');
