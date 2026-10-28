import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
const warnings = [];
const failedReq = [];
const requests = [];

page.on('console', m => {
  if (m.type() === 'error') errors.push(m.text());
  if (m.type() === 'warning') warnings.push(m.text());
});
page.on('requestfailed', r => failedReq.push(`${r.url().slice(0,80)} → ${r.failure()?.errorText}`));
page.on('response', r => { if (r.status() >= 400) failedReq.push(`${r.url().slice(0,80)} → HTTP ${r.status()}`); });
page.on('request', r => requests.push(r.url()));

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

console.log('══════ GERÇEK TARAYICI: KONSOL VE AĞ ══════\n');
console.log('Konsol ERROR   :', errors.length === 0 ? '0 ✓' : errors.length);
errors.slice(0,5).forEach(e => console.log('   ✗', e.slice(0,110)));
console.log('Konsol WARNING :', warnings.length);
console.log('Başarısız istek:', failedReq.length === 0 ? '0 ✓' : failedReq.length);
failedReq.slice(0,5).forEach(e => console.log('   ✗', e));
console.log('Toplam istek   :', requests.length);
console.log('Görüntülenen başlık:', await page.title());

await browser.close();
