import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const page = await ctx.newPage();

await page.goto('http://localhost:4173/#/iletisim', { waitUntil: 'networkidle' });
await page.waitForTimeout(1800);

const r = {};
const log = (k, v, ok) => console.log(`  ${ok ? '✓' : '✗'} ${k.padEnd(46)} ${v}`);

console.log('══════ İLETİŞİM FORMU — GERÇEK ETKİLEŞİM TESTİ ══════\n');

// alanların varlığı
r.name = await page.locator('#field-name').count();
r.email = await page.locator('#field-email').count();
r.msg = await page.locator('#field-message').count();
log('3 zorunlu alan mevcut (name/email/message)', `${r.name+r.email+r.msg}/3`, r.name+r.email+r.msg === 3);

// ── TEST 1: boş gönderim ──
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(500);
const errs1 = await page.evaluate(() => ({
  name: document.querySelector('#err-name')?.textContent || null,
  email: document.querySelector('#err-email')?.textContent || null,
  msg: document.querySelector('#err-message')?.textContent || null,
  invalidCount: document.querySelectorAll('[aria-invalid="true"]').length,
  alert: document.querySelector('[role="alert"]')?.textContent?.slice(0,50) || null,
}));
log('boş gönderim → alan bazlı hata mesajları', JSON.stringify(errs1).slice(0,90),
    !!errs1.name && !!errs1.email && !!errs1.msg);
log('aria-invalid="true" sayısı', errs1.invalidCount, errs1.invalidCount === 3);
log('role="alert" özeti', errs1.alert || 'yok', !!errs1.alert);

// ── TEST 2: hatalı e-posta ──
await page.fill('#field-name', 'Test Kullanıcı');
await page.fill('#field-email', 'gecersiz-eposta');
await page.fill('#field-message', 'Bu bir deneme mesajıdır, yeterince uzun.');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(500);
const e2 = await page.evaluate(() => document.querySelector('#err-email')?.textContent || null);
log('geçersiz e-posta → özel mesaj', `"${e2}"`, !!e2 && /geçerli/i.test(e2));

// ── TEST 3: kısa mesaj ──
await page.fill('#field-email', 'test@ornek.com');
await page.fill('#field-message', 'kısa');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(500);
const e3 = await page.evaluate(() => document.querySelector('#err-message')?.textContent || null);
log('kısa mesaj → özel mesaj', `"${e3}"`, !!e3);

// ── TEST 4: odak yönetimi (ilk hatalı alana) ──
await page.fill('#field-message', '');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(400);
const focused = await page.evaluate(() => document.activeElement?.id || document.activeElement?.name || 'yok');
log('hatalı alana otomatik odak', focused, focused.includes('field-'));

// ── TEST 5: geçerli gönderim → mailto ──
await page.fill('#field-name', 'Test Kullanıcı');
await page.fill('#field-email', 'test@ornek.com');
await page.fill('#field-message', 'Bu bir deneme mesajıdır, yeterince uzun.');
let mailtoPopup = null;
page.on('popup', p => { mailtoPopup = p.url(); });
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(1200);
const afterSubmit = await page.evaluate(() => ({
  success: document.body.textContent.includes('E-posta uygulamanız açıldı'),
  mailtoLink: document.querySelector('a[href^="mailto:"]')?.href?.slice(0,60) || null,
}));
log('geçerli gönderim → onay ekranı', afterSubmit.success ? 'görüntülendi' : 'yok', afterSubmit.success);
log('mailto bağlantısı üretildi', (afterSubmit.mailtoLink||'').slice(0,50), !!afterSubmit.mailtoLink);
log('e-posta adresi doğru mu', afterSubmit.mailtoLink?.includes('umut@kukinsaat.com') ? 'umut@kukinsaat.com' : 'yanlış!', afterSubmit.mailtoLink?.includes('umut@kukinsaat.com'));

// ── TEST 6: KVKK bağlantısı ──
const kvkk = await page.locator('a[href*="gizlilik"]').count();
log('KVKK/gizlilik bağlantısı formda', kvkk + ' adet', kvkk > 0);

await browser.close();
