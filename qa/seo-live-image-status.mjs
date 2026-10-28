import {chromium} from 'playwright';
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();
const bad=[];p.on('response',r=>{if(r.url().includes('/_next/image')&&r.status()>=400)bad.push({status:r.status(),url:r.url(),body:null});});
for(const path of ['/hizmetler','/hizmetler/insaat-ve-yapi-uygulamalari','/hizmetler/muhendislik-hizmetleri','/hizmetler/proje-gelistirme-ve-teknik-koordinasyon','/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi','/hizmetler/teknik-danismanlik']){
 await p.goto('https://kukinsaat.com'+path,{waitUntil:'networkidle'});
 await p.evaluate(async()=>{for(const i of document.images){i.loading='eager';} await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
 await p.waitForTimeout(350);
 const imgs=await p.evaluate(()=>[...document.images].map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt,src:i.currentSrc||i.src})));
 console.log(path,imgs.filter(i=>!i.ok).map(i=>i.alt));
}
for(const r of bad){
  let body=''; try {const x=await p.request.get(r.url);body=(await x.text()).slice(0,200)}catch(e){body=String(e)}
  console.log('\nBROKEN HTTP',r.status,'body:',body,'\nURL:',r.url.slice(0,220));
}
console.log('\nImage optimizer 4xx:',bad.length);
await c.close();await b.close();
