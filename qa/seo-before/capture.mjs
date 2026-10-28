import {chromium} from 'playwright';
const b=await chromium.launch();
for(const [n,p,w,h,m] of [['home-desktop','/',1440,900,false],['home-mobile','/',390,844,true],['projects-mobile','/projeler',390,844,true],['services-mobile','/hizmetler',390,844,true]]){
 const c=await b.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m}); const page=await c.newPage();
 await page.goto('http://localhost:4173'+(p==='/'?'/':'/#'+p),{waitUntil:'networkidle'}); await page.waitForTimeout(2600);
 await page.screenshot({path:`qa/seo-before/${n}.png`}); await c.close();
 console.log('saved',n);
}
await b.close();
