import { chromium } from 'playwright';
const browser = await chromium.launch();
const pages = ['/', '/kurumsal', '/hizmetler', '/projeler', '/iletisim', '/gizlilik'];
const vps = [1920, 1440, 1280, 1024, 768, 390, 360];

let total = 0, bad = 0;
const before = { '390': 6, '360': 6 }; // önceki ölçüm

for (const w of vps) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 } });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto('http://localhost:4173' + (p === '/' ? '/' : '/#' + p), { waitUntil: 'commit' });
    await page.waitForTimeout(120); // animasyon ortasında ölç (en kötü durum)
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    total++;
    if (o > 1) { bad++; console.log(`  ✗ ${w}px ${p}: ${o}px`); }
  }
  await ctx.close();
}
console.log('\n══════ DÜZELTME SONRASI: TAŞMA MATRİSİ ══════\n');
console.log(`  ${total} kombinasyon ölçüldü (animasyon bitmeden, en kötü anda)`);
console.log(`  Taşma: ${bad}`);
console.log(bad === 0 ? '  ✓ TÜM viewport × sayfa kombinasyonunda taşma YOK' : `  ✗ ${bad} taşma kaldı`);
console.log(`  Önceki ölçümde 390/360px'te 6 taşma vardı`);
await browser.close();
