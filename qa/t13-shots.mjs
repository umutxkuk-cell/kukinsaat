import { chromium } from 'playwright';
const browser = await chromium.launch();

const shots = [
  ['desktop-home',     'http://localhost:4173/',            1440, 900,  false],
  ['desktop-kurumsal', 'http://localhost:4173/#/kurumsal',  1440, 900,  false],
  ['desktop-hizmet',   'http://localhost:4173/#/hizmetler', 1440, 900,  false],
  ['tablet-home',      'http://localhost:4173/',             768, 1024, false],
  ['mobile-home',      'http://localhost:4173/',             390, 844,  true],
  ['mobile-hizmet',    'http://localhost:4173/#/hizmetler',  390, 844,  true],
  ['mobile-iletisim',  'http://localhost:4173/#/iletisim',   390, 844,  true],
  ['mobile-gizlilik',  'http://localhost:4173/#/gizlilik',   390, 844,  true],
];

for (const [name, url, w, h, mob] of shots) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2800); // tüm animasyonlar biter, gerçek son hâl
  await page.screenshot({ path: `qa/shots/${name}.png`, fullPage: false });
  // tam sayfa da al (uzun içerik)
  await page.screenshot({ path: `qa/shots/${name}-full.png`, fullPage: true });
  await ctx.close();
  console.log(`  ✓ ${name}.png (viewport) + ${name}-full.png (tam sayfa)`);
}
await browser.close();
