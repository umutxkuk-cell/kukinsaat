import {chromium} from 'playwright';
const cases=[['desktop-home','/',{width:1440,height:900},false],['mobile-home','/',{width:390,height:844},true],['mobile-services','/hizmetler',{width:390,height:844},true],['mobile-contact','/iletisim',{width:390,height:844},true]];
const b=await chromium.launch();
for(const [name,path,vp,mob] of cases){
 const c=await b.newContext({viewport:vp,isMobile:mob,hasTouch:mob});const p=await c.newPage();
 await p.addInitScript(()=>{window.__m={lcp:0,cls:0,fcp:0};new PerformanceObserver(x=>{let e=x.getEntries();if(e.length)window.__m.lcp=e.at(-1).startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(x=>x.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__m.cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(x=>{let e=x.getEntries();if(e.length)window.__m.fcp=e[0].startTime}).observe({type:'paint',buffered:true})});
 const start=Date.now(); await p.goto('https://kukinsaat.com'+path,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(3000);
 const m=await p.evaluate(()=>({lcp:Math.round(window.__m.lcp),cls:+window.__m.cls.toFixed(4),fcp:Math.round(window.__m.fcp),ttfb:Math.round(performance.getEntriesByType('navigation')[0]?.responseStart||0),images:[...document.images].filter(i=>i.complete&&i.naturalWidth>0).length,total:document.images.length}));
 console.log(`${name}: TTFB ${m.ttfb}ms FCP ${m.fcp}ms LCP ${m.lcp}ms CLS ${m.cls} images ${m.images}/${m.total} elapsed ${Date.now()-start}ms`);
 await c.close();
}
await b.close();
