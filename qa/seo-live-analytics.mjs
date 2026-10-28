import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const page = await ctx.newPage();
const analytics=[];
page.on('request',r=>{if(/googletagmanager|google-analytics|g\/collect|gtag/.test(r.url())) analytics.push(r.url().split('?')[0]);});
await page.goto('https://kukinsaat.com/',{waitUntil:'networkidle',timeout:60000});
await page.waitForTimeout(1200);
const r=await page.evaluate(()=>({
  verification:document.querySelector('meta[name="google-site-verification"]')?.content||null,
  gtagScripts:[...document.scripts].map(s=>s.src).filter(s=>s.includes('googletagmanager')),
  consentText:[...document.querySelectorAll('[role="dialog"], [class*="cookie"], [class*="consent"]')].map(e=>e.innerText.trim().slice(0,160)),
  buttons:[...document.querySelectorAll('button')].map(b=>b.innerText.trim()).filter(Boolean),
  robots:document.querySelector('meta[name="robots"]')?.content||null,
  canonical:document.querySelector('link[rel="canonical"]')?.href||null,
  gaCookie:document.cookie.split(';').map(x=>x.trim().split('=')[0]).filter(x=>/^_ga/.test(x)),
  localStorage:Object.keys(localStorage),
}));
console.log(JSON.stringify(r,null,2));
console.log('Analytics-related requests:',analytics);
await ctx.close();await browser.close();
