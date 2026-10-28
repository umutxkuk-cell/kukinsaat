import { chromium } from 'playwright';

const browser = await chromium.launch();

async function measure(label, url, vp, mobile) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();

  await page.addInitScript(() => {
    window.__cwv = { lcp: 0, cls: 0, fcp: 0, ttfb: 0, entries: [], shifts: [] };
    new PerformanceObserver(l => {
      const e = l.getEntries(); if (e.length) window.__cwv.lcp = e[e.length-1].startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(l => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cwv.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(l => {
      const e = l.getEntries(); if (e.length) window.__cwv.fcp = e[0].startTime;
    }).observe({ type: 'paint', buffered: true });
    new PerformanceObserver(l => {
      for (const e of l.getEntries()) window.__cwv.shifts.push({
        v: e.value.toFixed(4), node: e.sources?.[0]?.node?.tagName || '?', cls: (e.sources?.[0]?.node?.className||'').toString().slice(0,30)
      });
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3500);

  const m = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const w = window.__cwv;
    const lcpEl = document.querySelector('img');
    return {
      ttfb: nav ? Math.round(nav.responseStart) : 0,
      fcp: Math.round(w.fcp),
      lcp: Math.round(w.lcp),
      cls: +w.cls.toFixed(4),
      shifts: w.shifts.slice(0, 4),
      imgs: document.images.length,
      imgsLoaded: [...document.images].filter(i => i.complete && i.naturalWidth > 0).length,
      docH: document.documentElement.scrollHeight,
    };
  });
  await ctx.close();
  return m;
}

console.log('══════ CORE WEB VITALS — GERÇEK ÖLÇÜM ══════\n');
console.log('Google hedefleri: LCP ≤ 2500ms · CLS ≤ 0.1 · (INP alan verisi gerektirir)\n');

for (const [label, url, vp, mob] of [
  ['Masaüstü 1440×900 · ana sayfa', 'http://localhost:4173/', {width:1440,height:900}, false],
  ['Mobil 390×844 · ana sayfa',     'http://localhost:4173/', {width:390,height:844}, true],
  ['Mobil 390×844 · /hizmetler',    'http://localhost:4173/#/hizmetler', {width:390,height:844}, true],
  ['Mobil 390×844 · /gizlilik',     'http://localhost:4173/#/gizlilik', {width:390,height:844}, true],
]) {
  const m = await measure(label, url, vp, mob);
  const lcpOK = m.lcp <= 2500, clsOK = m.cls <= 0.1;
  console.log(`▸ ${label}`);
  console.log(`   TTFB ${m.ttfb}ms · FCP ${m.fcp}ms · LCP ${m.lcp}ms ${lcpOK?'✓':'✗ (hedef 2500)'} · CLS ${m.cls} ${clsOK?'✓':'✗ (hedef 0.1)'}`);
  console.log(`   görseller: ${m.imgsLoaded}/${m.imgs} yüklendi · sayfa yüksekliği ${m.docH}px`);
  if (m.cls > 0.001) {
    console.log('   ⚠ yerleşim kayması kaynakları:');
    m.shifts.forEach(s => console.log(`      ${s.v} → <${s.node}> ${s.cls}`));
  }
  console.log('');
}
await browser.close();
