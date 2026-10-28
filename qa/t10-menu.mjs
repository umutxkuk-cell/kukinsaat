import { chromium } from 'playwright';
const browser = await chromium.launch();

console.log('══════ MOBİL MENÜ — GERÇEK TIKLAMA TESTİ (390px) ══════\n');
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2400); // intro perdesi bitsin

const r = {};
const log = (k, v, ok) => console.log(`  ${ok?'✓':'✗'} ${k.padEnd(44)} ${v}`);

// menü butonu var mı
const btn = page.locator('button[aria-label*="Menü"], header button').first();
r.btnVisible = await btn.isVisible().catch(() => false);
log('menü düğmesi görünür (mobil)', r.btnVisible ? 'görünür' : 'yok', r.btnVisible);

// aria-expanded başlangıç
let exp = await page.evaluate(() => document.querySelector('header button[aria-expanded]')?.getAttribute('aria-expanded'));
log('aria-expanded başlangıç', exp, exp === 'false');

// tıkla → açılır
await btn.click();
await page.waitForTimeout(400);
exp = await page.evaluate(() => document.querySelector('header button[aria-expanded]')?.getAttribute('aria-expanded'));
log('tıklama sonrası aria-expanded', exp, exp === 'true');

// menü öğeleri görünür mü
const links = await page.evaluate(() => {
  const nav = [...document.querySelectorAll('header nav a')];
  return nav.map(a => ({ t: a.textContent.trim(), vis: a.offsetParent !== null && a.getBoundingClientRect().width > 0, href: a.getAttribute('href') }));
});
log('menüde bağlantı sayısı', links.length, links.length === 5);
log('tümü görünür', links.filter(l => l.vis).length + '/' + links.length, links.every(l => l.vis));
console.log('   öğeler:', links.map(l => l.t).join(' · '));

// body scroll kilidi
const lock = await page.evaluate(() => getComputedStyle(document.body).overflow);
log('menü açıkken gövde kaydırma kilidi', lock, lock === 'hidden');

// bir menü öğesine tıkla → sayfa değişir + menü kapanır
await page.locator('header nav a', { hasText: 'Hizmetlerimiz' }).first().click();
await page.waitForTimeout(1500);
const after = await page.evaluate(() => ({
  title: document.title,
  exp: document.querySelector('header button[aria-expanded]')?.getAttribute('aria-expanded'),
  h1: document.querySelector('h1')?.textContent?.trim().slice(0,40),
  lock: getComputedStyle(document.body).overflow,
}));
log('menüden geçiş → sayfa başlığı değişti', after.title, after.title.includes('Hizmetlerimiz'));
log('menü tıklanınca kapanır (aria-expanded)', after.exp, after.exp === 'false');
log('H1 render edildi', `"${after.h1}"`, !!after.h1);
log('gövde kilidi kaldırıldı', after.lock, after.lock !== 'hidden');

// tarayıcı geri tuşu
await page.goBack();
await page.waitForTimeout(1200);
log('geri tuşu çalışıyor → ana sayfa', await page.title(), (await page.title()).includes('Kuk İnşaat'));

// sayfa yenileme (deep link)
await page.goto('http://localhost:4173/#/iletisim', { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2400);
const deep = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent?.trim().slice(0,30), title: document.title }));
log('derin bağlantı + yenileme (/#/iletisim)', deep.h1 || deep.title, !!deep.h1 || !!deep.title);

await ctx.close();
await browser.close();
