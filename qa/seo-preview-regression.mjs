import { chromium } from 'playwright';
const base='http://localhost:4173';
const paths=['/','/kurumsal','/hizmetler','/projeler','/iletisim','/gizlilik','/hizmetler/insaat-ve-yapi-uygulamalari','/hizmetler/muhendislik-hizmetleri','/hizmetler/proje-gelistirme-ve-teknik-koordinasyon','/hizmetler/proje-ve-uygulama-sureclerinin-yonetimi','/hizmetler/teknik-danismanlik'];
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1280,height:800}});const p=await c.newPage();let errors=[];p.on('pageerror',e=>errors.push(e.message));
let failed=0;const canonicals=new Set();const titles=new Set();
console.log('══════ PREVIEW PATH-BASED SEO REGRESSION ══════\n');
for(const path of paths){
 const res=await p.goto(base+path,{waitUntil:'networkidle'});await p.waitForTimeout(100);
 const x=await p.evaluate(()=>({url:location.pathname,title:document.title,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content,desc:document.querySelector('meta[name="description"]')?.content,hash:location.hash,links:[...document.querySelectorAll('header nav a')].map(a=>a.getAttribute('href'))}));
 const expectedNoindex=path==='/gizlilik'||path==='/projeler';
 const ok=res.status()===200&&x.url===path&&x.h1===1&&x.canonical===`https://kukinsaat.com${path==='/'?'/':path}`&&(expectedNoindex?x.robots?.includes('noindex'):!x.robots?.includes('noindex'))&&!x.hash;
 if(!ok)failed++;
 if(x.canonical)canonicals.add(x.canonical); if(x.title)titles.add(x.title);
 console.log(`${ok?'✓':'✗'} ${path.padEnd(56)} HTTP ${res.status()} H1:${x.h1} canonical:${x.canonical} robots:${x.robots||'index'}`);
 if(x.hash)console.log('  unexpected hash:',x.hash);
}
console.log(`\nunique canonicals ${canonicals.size}/${paths.length} | unique titles ${titles.size}/${paths.length} | page errors ${errors.length}`);

// Old shared hash URLs should migrate to a real path, not stay fragment routes.
await p.goto(base+'/#/kurumsal',{waitUntil:'networkidle'});await p.waitForTimeout(100);
const migrated=await p.evaluate(()=>({path:location.pathname,hash:location.hash,title:document.title}));
const migrationOk=migrated.path==='/kurumsal'&&migrated.hash===''&&migrated.title.startsWith('Kuk İnşaat Hakkında');
console.log(`${migrationOk?'✓':'✗'} legacy #/kurumsal migration → ${migrated.path}${migrated.hash} | ${migrated.title}`);
if(!migrationOk)failed++;

// Native internal link and browser Back behavior.
await p.goto(base+'/',{waitUntil:'networkidle'});await p.waitForTimeout(200);
await p.locator('header nav a[href="/kurumsal"]').first().click();await p.waitForTimeout(400);
const navPath=await p.evaluate(()=>location.pathname);
await p.goBack();await p.waitForTimeout(400);
const backPath=await p.evaluate(()=>location.pathname);
const navOk=navPath==='/kurumsal'&&backPath==='/';
console.log(`${navOk?'✓':'✗'} native navigation + back: ${navPath} → ${backPath}`);
if(!navOk)failed++;

console.log(`\n${failed===0?'✓ ALL ROUTES / SEO / HISTORY PASS':'✗ FAILURES '+failed}`);
if(errors.length)console.log('page errors:',errors);
await c.close();await b.close();
