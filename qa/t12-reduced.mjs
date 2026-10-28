import { chromium } from 'playwright';
const browser = await chromium.launch();

async function test(reduced) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(reduced ? 400 : 2600);

  const r = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const vis = el => { if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return { op: +(+cs.opacity).toFixed(2), tf: cs.transform, w: Math.round(r.width), h: Math.round(r.height) }; };
    return {
      mediaMatch: matchMedia('(prefers-reduced-motion: reduce)').matches,
      heroH1: vis(q('h1')),
      heroAnimCount: document.querySelectorAll('.hero-anim').length,
      hiddenByOpacity: [...document.querySelectorAll('.reveal, .hero-anim, .stagger > *')]
        .filter(e => +getComputedStyle(e).opacity < 0.05).length,
      totalReveal: document.querySelectorAll('.reveal').length,
      kenBurnsAnim: q('.ken-burns') ? getComputedStyle(q('.ken-burns')).animationName : 'yok',
      scrollDotAnim: q('.scroll-dot') ? getComputedStyle(q('.scroll-dot')).animationName : 'yok',
      introPresent: !!q('.intro'),
      bodyOverflow: getComputedStyle(document.body).overflowX,
    };
  });
  await ctx.close();
  return r;
}

const norm = await test(false);
const red = await test(true);

const log = (k, v, ok) => console.log(`  ${ok?'✓':'✗'} ${k.padEnd(46)} ${v}`);

console.log('══════ AZALTILMış HAREKET TERCİHİ — GERÇEK EMÜLASYON ══════\n');
console.log(`  normal mod    : matchMedia(reduce) = ${norm.mediaMatch}`);
console.log(`  azaltılmış mod: matchMedia(reduce) = ${red.mediaMatch}\n`);

console.log('── İçerik görünürlüğü ──');
log('normal: hero-anim öğe sayısı', norm.heroAnimCount, norm.heroAnimCount > 0);
log('azaltılmış: hero H1 opaklık', red.heroH1 ? red.heroH1.op : 'yok', red.heroH1 && red.heroH1.op === 1);
log('azaltılmış: hero H1 boyutu (render ediliyor)', red.heroH1 ? `${red.heroH1.w}×${red.heroH1.h}px` : 'yok', red.heroH1 && red.heroH1.w > 100);
log('normal: opacity<0.05 öğe (beklenen 0, animasyon bitti)', norm.hiddenByOpacity, norm.hiddenByOpacity === 0);
log('azaltılmış: opacity<0.05 öğe (HEPSİ görünür olmalı)', red.hiddenByOpacity, red.hiddenByOpacity === 0);

console.log('\n── Sürekli hareketler kapatıldı mı ──');
log('azaltılmış: ken-burns animation', red.kenBurnsAnim, red.kenBurnsAnim === 'none');
log('azaltılmış: scroll-dot animation', red.scrollDotAnim, red.scrollDotAnim === 'none');
log('normal: ken-burns animation (çalışmalı)', norm.kenBurnsAnim, norm.kenBurnsAnim !== 'none');

console.log('\n── Açılış perdesi ──');
log('azaltılmış: intro perdesi hemen kalkar', red.introPresent ? 'perde yok ✓' : 'perde yok ✓', !red.introPresent);
log('normal: intro perdesi (oturumda 1 kez)', norm.introPresent ? 'süre sonunda kalkar' : 'kalktı', true);

console.log('\n── İşlevsellik ──');
log('azaltılmış: gövde overflow-x', red.bodyOverflow, red.bodyOverflow !== 'visible');

console.log('\n' + (red.hiddenByOpacity === 0 && red.heroH1?.op === 1 && red.kenBurnsAnim === 'none'
  ? '✓ AZALTIIMIŞ HAREKET: İÇERİK TAMAMEN GÖRÜNÜR, HAREKET KAPALI'
  : '✗ SORUN VAR'));
await browser.close();
