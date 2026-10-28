import { chromium } from 'playwright';
const base = 'https://kukinsaat.com';
const paths = [
  '/', '/kurumsal', '/hizmetler',
  '/hizmetler/insaat-ve-yapi-uygulamalari',
  '/hizmetler/muhendislik-hizmetleri',
  '/hizmetler/proje-gelistirme-ve-teknik-koordinasyon',
  '/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi',
  '/hizmetler/teknik-danismanlik', '/projeler', '/iletisim', '/gizlilik',
];
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: {width:1440,height:900} });
const page = await context.newPage();
const pageErrors=[]; const consoleErrors=[]; const failedRequests=[];
page.on('pageerror',e=>pageErrors.push(e.message));
page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
page.on('requestfailed',r=>failedRequests.push([r.url(),r.failure()?.errorText]));
const globalLinks=new Set();

console.log('CANLI SİTE: 11 URL HEAD/CONTENT/INTERNAL LINKS\n');
for(const path of paths){
  const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:40000});
  await page.waitForTimeout(120);
  const r=await page.evaluate(()=>{
    const t=e=>e?.textContent?.replace(/\s+/g,' ').trim()||'';
    const metas=[...document.querySelectorAll('meta[name="description"]')].map(x=>x.content);
    const links=[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:t(a).slice(0,55)})).filter(a=>a.href.startsWith(location.origin));
    const imgs=[...document.images].map(i=>({alt:i.alt,loaded:i.complete&&i.naturalWidth>0,url:i.currentSrc||i.src}));
    const types=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)['@type']}catch{return 'INVALID'}});
    return {title:document.title,description:metas[0]||'',descCount:metas.length,canonical:document.querySelector('link[rel="canonical"]')?.href||'',robots:document.querySelector('meta[name="robots"]')?.content||'(default)',h1:[...document.querySelectorAll('h1')].map(t),h1Count:document.querySelectorAll('h1').length,h2:[...document.querySelectorAll('h2')].map(t),types,links,imgs,body:t(document.body)};
  });
  r.links.forEach(a=>globalLinks.add(new URL(a.href).pathname));
  const titleDup=r.descCount!==1;
  const h1Issue=r.h1Count!==1;
  console.log(`${response.status()} ${path}`);
  console.log(`  title (${r.title.length}): ${r.title}`);
  console.log(`  desc (${r.description.length})${titleDup?' !dup':''}: ${r.description}`);
  console.log(`  canonical: ${r.canonical} ${r.canonical===base+(path==='/'?'/':path)?'✓':'⚠'}`);
  console.log(`  robots: ${r.robots} | H1(${r.h1Count})${h1Issue?' !':''}: ${r.h1[0]||'NONE'}`);
  console.log(`  JSON-LD: ${r.types.join(', ')||'-'} | images loaded ${r.imgs.filter(x=>x.loaded).length}/${r.imgs.length}`);
  if(path==='/projeler') console.log(`  projects empty text: ${r.body.includes('yakında burada')} | claims completed: ${/tamamladığımız/i.test(r.body)}`);
}
console.log('\nINTERNAL PATHS DISCOVERED:',[...globalLinks].sort().join(', '));
console.log('PAGEERRORS:',pageErrors.length,pageErrors.slice(0,4));
console.log('CONSOLE ERRORS:',consoleErrors.length,consoleErrors.slice(0,4));
console.log('FAILED REQUESTS:',failedRequests.length,failedRequests.slice(0,4));
await browser.close();
