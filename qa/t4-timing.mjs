import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

console.log('══════ TAŞMA ZAMANA BAĞLI MI? (390px, /kurumsal) ══════\n');
await page.goto('http://localhost:4173/#/kurumsal', { waitUntil: 'commit' });

// yükleme anından itibaren ölç
for (const t of [50, 150, 300, 500, 800, 1200, 2000, 3000]) {
  await page.waitForTimeout(t === 50 ? 50 : t - [50,150,300,500,800,1200,2000,3000][[50,150,300,500,800,1200,2000,3000].indexOf(t)-1]);
  const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`  ${String(t).padStart(4)} ms → taşma ${o}px ${o>1?'✗':'✓'}`);
}

console.log('\n── body/html overflow-x ayarı ──');
console.log(await page.evaluate(() => {
  const b = getComputedStyle(document.body);
  const h = getComputedStyle(document.documentElement);
  return `body: overflow-x=${b.overflowX} | html: overflow-x=${h.overflowX}`;
}));

await browser.close();
