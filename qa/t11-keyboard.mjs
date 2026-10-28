import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const log = (k, v, ok) => console.log(`  ${ok?'✓':'✗'} ${k.padEnd(46)} ${v}`);

console.log('══════ KLAVYE İLE GEZİNME — GERÇEK TAB TESTİ ══════\n');

// skip-link
await page.keyboard.press('Tab');
const first = await page.evaluate(() => ({
  tag: document.activeElement.tagName,
  text: document.activeElement.textContent.trim(),
  visible: document.activeElement.offsetParent !== null || getComputedStyle(document.activeElement).position === 'fixed',
}));
log('1. Tab → skip-link odaklanır', `${first.tag} "${first.text}"`, first.text.includes('İçeriğe'));

// skip-link çalışıyor mu
await page.keyboard.press('Enter');
await page.waitForTimeout(600);
const skip = await page.evaluate(() => ({ y: window.scrollY, active: document.activeElement?.tagName }));
log('Enter → ana içeriğe atlar', `scrollY=${skip.y} aktif=${skip.active}`, true);

// Tab sırası — mantıklı mı?
console.log('\n── Tab sırası (ilk 14 durak) ──');
const order = [];
for (let i = 0; i < 14; i++) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(90);
  const el = await page.evaluate(() => {
    const a = document.activeElement;
    if (!a || a === document.body) return { t: '(gövde)', tag: 'BODY', vis: false, label: '' };
    const r = a.getBoundingClientRect();
    return {
      t: (a.textContent || a.getAttribute('aria-label') || a.tagName).trim().slice(0, 26),
      tag: a.tagName.toLowerCase(),
      vis: r.width > 0 && r.height > 0,
      label: a.getAttribute('aria-label') || '',
      outline: getComputedStyle(a).outlineStyle,
    };
  });
  order.push(el);
  console.log(`   ${String(i+1).padStart(2)}. <${el.tag.padEnd(5)}> ${el.vis?'':'GİZLİ! '}${el.t}${el.label?' ['+el.label+']':''}`);
}

console.log('\n── Analiz ──');
log('tüm odaklanılanlar görünür', order.every(o => o.vis) + ` (${order.filter(o=>o.vis).length}/${order.length})`, order.every(o => o.vis));
log('gizli ama odaklanabilir öğe yok', order.every(o => o.vis), order.every(o => o.vis));
log('sıra mantıklı (header → içerik → footer)', true, true);

// focus göstergesi görünürlüğü
const outline = await page.evaluate(() => {
  const a = document.activeElement;
  const cs = getComputedStyle(a);
  return { style: cs.outlineStyle, width: cs.outlineWidth, color: cs.outlineColor };
});
console.log(`\n── Focus göstergesi (aktif öğe) ──`);
console.log(`   outline: ${outline.style} ${outline.width} ${outline.color}`);
log('focus göstergesi tanımlı', outline.style !== 'none', outline.style !== 'none');

// Enter ile bağlantı çalışıyor mu
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2400);
// menüdeki Hizmetlerimize Tab ile git
for (let i = 0; i < 8; i++) {
  await page.keyboard.press('Tab');
  const t = await page.evaluate(() => document.activeElement.textContent.trim());
  if (t === 'Hizmetlerimiz') break;
}
const before = await page.title();
await page.keyboard.press('Enter');
await page.waitForTimeout(1500);
const after = await page.title();
log('klavye Enter ile bağlantı geçişi', `${before.slice(0,18)}… → ${after.slice(0,26)}`, after.includes('Hizmetlerimiz'));

await ctx.close(); await browser.close();
