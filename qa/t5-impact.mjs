import { chromium } from 'playwright';
const browser = await chromium.launch();

for (const vp of [{width:390,height:844},{width:360,height:740}]) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/#/hizmetler', { waitUntil: 'commit' });
  await page.waitForTimeout(300); // animasyon henüz bitmedi

  const impact = await page.evaluate(() => {
    const d = document.documentElement;
    return {
      scrollWidth: d.scrollWidth,
      clientWidth: d.clientWidth,
      diff: d.scrollWidth - d.clientWidth,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
      htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
    };
  });

  // GERÇEK kaydırma denemesi: kullanıcı yatay kaydırabilir mi?
  await page.evaluate(() => window.scrollTo(60, 0));
  await page.waitForTimeout(200);
  const scrolledX = await page.evaluate(() => window.scrollX);

  console.log(`\n══ ${vp.width}x${vp.height} — GERÇEK KULLANICI ETKİSİ ══`);
  console.log(`  scrollWidth ${impact.scrollWidth} vs clientWidth ${impact.clientWidth} → fark ${impact.diff}px`);
  console.log(`  body overflow-x : ${impact.bodyOverflowX}`);
  console.log(`  html overflow-x : ${impact.htmlOverflowX}`);
  console.log(`  yatay kaydırma denemesi (scrollTo 60) → scrollX = ${scrolledX} ${scrolledX>0?'✗ KULLANICI KAYDIRABİLİYOR':'✓ kaydırılamıyor'}`);

  // Dokunmatik kaydırma simülasyonu
  await page.evaluate(() => window.scrollTo(0,0));
  await page.mouse.move(300, 500);
  await page.mouse.down();
  await page.mouse.move(80, 500, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const afterSwipe = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
  console.log(`  sağa-sola kaydırma jesti sonrası → scrollX=${afterSwipe.x} ${afterSwipe.x>0?'✗ YATAY KAYMA':'✓ sabit'}`);

  await ctx.close();
}
await browser.close();
