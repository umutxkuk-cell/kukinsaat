import {chromium} from 'playwright';
const paths=['/','/kurumsal','/hizmetler','/hizmetler/insaat-ve-yapi-uygulamalari','/hizmetler/muhendislik-hizmetleri','/hizmetler/proje-gelistirme-ve-teknik-koordinasyon','/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi','/hizmetler/teknik-danismanlik','/projeler','/iletisim','/gizlilik'];
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();
const errors=[];p.on('requestfailed',r=>errors.push(r.url()+' '+r.failure()?.errorText));
const all=new Map();
for(const path of paths){
 await p.goto('https://kukinsaat.com'+path,{waitUntil:'domcontentloaded',timeout:40000});
 let h=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<h;y+=700){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(100);}
 await p.waitForTimeout(400);
 const imgs=await p.evaluate(()=>[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt,loaded:i.complete&&i.naturalWidth>0})));
 imgs.forEach(i=>{if(!all.has(i.src))all.set(i.src,i)});
 console.log(path,imgs.filter(i=>i.loaded).length+'/'+imgs.length,'yükleme');
}
const broken=[...all.values()].filter(i=>!i.loaded);
const noAlt=[...all.values()].filter(i=>!i.alt);
console.log('\nbenzersiz img:',all.size,'kırık:',broken.length,'boş alt:',noAlt.length,'request failed:',errors.length);
broken.forEach(i=>console.log('BROKEN',i.src));
noAlt.slice(0,10).forEach(i=>console.log('ALT EMPTY (possibly decorative)',i.src));
errors.slice(0,5).forEach(e=>console.log('REQ FAILED',e));
await c.close();await b.close();
