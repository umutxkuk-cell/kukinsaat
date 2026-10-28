import { chromium } from 'playwright';
const browser=await chromium.launch();
const page=await browser.newPage();
for(const p of ['/','/kurumsal','/hizmetler','/projeler','/iletisim','/gizlilik','/hizmetler/muhendislik-hizmetleri']){
  await page.goto('http://localhost:4173'+p,{waitUntil:'networkidle'});
  await page.waitForTimeout(300);
  const r=await page.evaluate(()=>({url:location.href,title:document.title,h1:document.querySelector('h1')?.innerText.trim().slice(0,50),canonical:document.querySelector('link[rel="canonical"]')?.href,desc:document.querySelector('meta[name="description"]')?.content?.slice(0,55),links:[...document.querySelectorAll('a[href]')].slice(0,6).map(a=>a.getAttribute('href'))}));
  console.log('\n'+p+' → '+r.url+' | '+r.title+' | H1: '+r.h1+' | canonical: '+r.canonical+' | desc: '+r.desc);
  console.log('  link sample:',r.links.join(' · '));
}
await browser.close();
