import { chromium } from 'playwright';
const base='https://kukinsaat.com';
const pages=['/','/kurumsal','/hizmetler','/hizmetler/insaat-ve-yapi-uygulamalari','/hizmetler/muhendislik-hizmetleri','/hizmetler/proje-gelistirme-ve-teknik-koordinasyon','/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi','/hizmetler/teknik-danismanlik','/projeler','/iletisim','/gizlilik'];
const browser=await chromium.launch();
const ctx=await browser.newContext();
const page=await ctx.newPage();
const found=new Map();
for(const p of pages){
  await page.goto(base+p,{waitUntil:'domcontentloaded'});
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>({href:a.href,text:a.innerText.trim().replace(/\s+/g,' ').slice(0,45)})));
  for(const l of links){try{const u=new URL(l.href);if(u.origin===base&&!u.hash)found.set(u.pathname,{text:l.text,from:p});}catch{}}
}
console.log('Canlı site iç bağlantı URL sayısı:',found.size);
let fail=0;
for(const [path,meta] of found){
  const r=await ctx.request.get(base+path,{timeout:25000});
  const ok=r.status()===200;
  if(!ok)fail++;
  console.log(`${ok?'✓':'✗'} HTTP ${r.status()} ${path} ← ${meta.from} (${meta.text})`);
}
console.log('\nKırık/bozuk dahili URL:',fail);
await ctx.close();await browser.close();
