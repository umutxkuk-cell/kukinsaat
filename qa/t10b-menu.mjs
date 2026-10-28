import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2400);

const log = (k, v, ok) => console.log(`  ${ok?'✓':'✗'} ${k.padEnd(46)} ${v}`);

console.log('══════ NAV GİZLİLİK DOĞRULAMASI (mobil 390px) ══════\n');
const navInfo = await page.evaluate(() => {
  const navs = [...document.querySelectorAll('header nav')];
  return navs.map(n => {
    const cs = getComputedStyle(n);
    const links = [...n.querySelectorAll('a')];
    return {
      cls: n.className.slice(0, 40),
      display: cs.display,
      linkCount: links.length,
      focusable: links.filter(a => a.offsetParent !== null).length,
    };
  });
});
navInfo.forEach((n, i) => {
  console.log(`  nav[${i}] class="${n.cls}"`);
  console.log(`    display=${n.display} · link=${n.linkCount} · görünen/odaklanabilir=${n.focusable}`);
});
const hiddenNavs = navInfo.filter(n => n.display === 'none');
log('mobilde masaüstü nav display:none (odaklanamaz)', `${hiddenNavs.length}/${navInfo.length} nav gizli`, hiddenNavs.length >= 1);

console.log('\n══════ MOBİL MENÜ — GERÇEK TIKLAMA ══════\n');
const btn = page.locator('header button[aria-expanded]');
await btn.click();
await page.waitForTimeout(450);

// mobil menü öğeleri (görünen nav içinden)
const mobile = await page.evaluate(() => {
  const navs = [...document.querySelectorAll('header nav')];
  const visible = navs.find(n => getComputedStyle(n).display !== 'none');
  return [...visible.querySelectorAll('a')].map(a => ({
    t: a.textContent.trim().replace(/→$/,''),
    visible: a.offsetParent !== null && a.getBoundingClientRect().width > 0,
  }));
});
log('menü açıkken görünür bağlantı', mobile.length + ' adet', mobile.length >= 5);
log('hepsi gerçekten görünür', mobile.filter(m=>m.visible).length + '/' + mobile.length, mobile.every(m=>m.visible));
console.log('   öğeler:', mobile.map(m=>m.t).join(' · '));

const exp = await page.evaluate(() => document.querySelector('header button[aria-expanded]')?.getAttribute('aria-expanded'));
log('aria-expanded=true', exp, exp === 'true');
const lock = await page.evaluate(() => getComputedStyle(document.body).overflow);
log('gövde kaydırma kilidi', lock, lock === 'hidden');

// Hizmetlerimiz'e tıkla (mobil menü içindeki)
await page.locator('header nav').filter({ has: page.locator('a') }).locator('a', { hasText: 'Hizmetlerimiz' }).last().click();
await page.waitForTimeout(1500);

const after = await page.evaluate(() => ({
  title: document.title,
  exp: document.querySelector('header button[aria-expanded]')?.getAttribute('aria-expanded'),
  h1: document.querySelector('h1')?.textContent?.trim().slice(0,44),
  lock: getComputedStyle(document.body).overflow,
}));
log('menüden geçiş → başlık', after.title.slice(0,44), after.title.includes('Hizmetlerimiz'));
log('menü otomatik kapandı', 'aria-expanded=' + after.exp, after.exp === 'false');
log('H1 gerçekten render edildi', `"${after.h1}"`, !!after.h1);
log('gövde kilidi bırakıldı', after.lock, after.lock !== 'hidden');

console.log('\n══════ GERİ/İLERİ + DERİN BAĞLANTI ══════\n');
await page.goBack();
await page.waitForTimeout(1400);
log('tarayıcı geri → önceki sayfa', (await page.title()).slice(0,40), (await page.title()).includes('Kuk'));

await page.goto('http://localhost:4173/#/iletisim', { waitUntil: 'networkidle' });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2400);
const deep = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent?.trim().slice(0,34), t: document.title.slice(0,34) }));
log('derin bağlantı + F5 yenileme', `h1="${deep.h1}"`, !!deep.h1);

await ctx.close(); await browser.close();
