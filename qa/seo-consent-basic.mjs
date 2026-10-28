import { chromium } from 'playwright';
const b=await chromium.launch();
const log=(k,v,ok)=>console.log(`  ${ok?'✓':'✗'} ${k.padEnd(44)} ${v}`);
const url='http://localhost:4173/';

async function testChoice(choice){
  const c=await b.newContext({viewport:{width:1280,height:800}});
  const p=await c.newPage();
  const ga=[];
  p.on('request',r=>{if(/googletagmanager\.com|google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect/.test(r.url()))ga.push(r.url());});
  await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(2400);
  const before=await p.evaluate(()=>({tag:!!document.querySelector('#kuk-ga4-tag'), gaCookies:document.cookie.split(';').map(s=>s.trim()).filter(s=>s.startsWith('_ga')).length, banner:!!document.querySelector('[role="dialog"]')}));
  const noPreConsent=ga.length===0 && !before.tag && before.gaCookies===0;
  log(`${choice}: Google requests/cookies before choice`,`${ga.length} requests, tag=${before.tag}, _ga=${before.gaCookies}`,noPreConsent);
  if(choice==='decline'){
    await p.getByRole('button',{name:'Yalnızca zorunlu çerezler'}).click();
    await p.waitForTimeout(1200);
    const after=await p.evaluate(()=>({tag:!!document.querySelector('#kuk-ga4-tag'), choice:localStorage.getItem('kuk-cookie-consent')}));
    log('reddet: tag yüklenmedi',`${after.tag} · tercih=${after.choice}`,!after.tag&&after.choice==='declined'&&ga.length===0);
  } else {
    await p.getByRole('button',{name:'Tümünü kabul et'}).click();
    await p.waitForTimeout(1800);
    const after=await p.evaluate(()=>({tag:!!document.querySelector('#kuk-ga4-tag'),choice:localStorage.getItem('kuk-cookie-consent'),ga:document.cookie.split(';').map(s=>s.trim().split('=')[0]).filter(s=>s.startsWith('_ga'))}));
    log('kabul: tag onaydan sonra yüklendi',`tag=${after.tag} · choice=${after.choice} · cookies=${after.ga.join(',')||'cookie henüz yazılmadı'}`,after.tag&&after.choice==='accepted');
    const beforeRoute=ga.filter(x=>/collect/.test(x)).length;
    await p.getByRole('link',{name:/Hizmetlerimiz/}).first().click();
    await p.waitForTimeout(1400);
    const afterRoute=ga.filter(x=>/collect/.test(x)).length;
    log('new path navigation page_view',`collect ${beforeRoute}→${afterRoute}`,afterRoute===beforeRoute+1);
  }
  await c.close();
}

console.log('══════ GA4 BASIC CONSENT MODE — GERÇEK AĞ TESTİ ══════\n');
await testChoice('decline');
console.log('');
await testChoice('accept');
console.log('\nBilinçli seçimlerin dışında Google tag isteği olmamalı.');
await b.close();
