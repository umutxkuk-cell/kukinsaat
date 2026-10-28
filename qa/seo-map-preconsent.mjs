import{chromium}from'playwright';
const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await c.newPage();const req=[];
p.on('request',r=>{const u=r.url();if(/google|maps|pexels|font/.test(u))req.push(u)});
await p.goto('http://localhost:4173/iletisim',{waitUntil:'networkidle'});await p.waitForTimeout(900);
const before=await p.evaluate(()=>({banner:!!document.querySelector('[role="dialog"]'),cookies:document.cookie,ga:!!document.querySelector('#kuk-ga4-tag'),iframes:[...document.querySelectorAll('iframe')].map(i=>i.src)}));
const iframe=p.locator('iframe').first();await iframe.scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
const after=await p.evaluate(()=>({cookies:document.cookie,ga:!!document.querySelector('#kuk-ga4-tag'),frames:[...document.querySelectorAll('iframe')].map(i=>({src:i.src,loaded:!!i.contentWindow}))}));
console.log('before map scroll:',before);console.log('after map scroll:',after);console.log('third-party requests:',req.map(u=>u.slice(0,120)));
await b.close();
