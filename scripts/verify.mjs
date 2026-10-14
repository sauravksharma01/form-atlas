import {JSDOM} from 'jsdom';
import {createServer} from 'vite';
import assert from 'node:assert/strict';
const dom=new JSDOM('<!doctype html><html><body><div id="test"></div></body></html>',{url:'http://localhost/'});
for(const key of ['window','document','HTMLElement','HTMLInputElement','Event','MouseEvent','KeyboardEvent','localStorage','location'])globalThis[key]=dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
HTMLElement.prototype.scrollIntoView=function(){};
const React=await import('react');const {createRoot}=await import('react-dom/client');const {act}=React;
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
const root=createRoot(document.getElementById('test'));
let checks=0;const ok=(v,msg)=>{assert(v,msg);checks++};
async function click(text){const b=[...document.querySelectorAll('button')].find(e=>e.textContent.includes(text));assert(b,'Button missing: '+text);await act(async()=>b.click());}
async function close(){await act(async()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})));ok(!document.querySelector('[role="dialog"]'),'Dialog closes on Escape');}
async function setRange(el,value){const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;await act(async()=>{set.call(el,String(value));el.dispatchEvent(new Event('input',{bubbles:true}))});}
const submit=async()=>act(async()=>document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
async function select(value,index=0){const e=document.querySelectorAll('select')[index];await act(async()=>{e.value=value;e.dispatchEvent(new Event('change',{bubbles:true}))});}
try{
 const {sampleComponents}=await server.ssrLoadModule('/src/Samples.jsx');
 for(const [id,C] of Object.entries(sampleComponents)){
  await act(async()=>root.render(React.createElement(C)));
  ok(document.querySelector('h1'),id+' heading renders');ok(document.querySelector('button'),id+' interactive controls render');
  if(id==='executive'){await select('Last quarter');ok(document.body.textContent.includes('$2.52M'),'Executive period updates');await click('Explore the insight');ok(document.querySelector('[role="dialog"]'),'Executive drawer');await close();}
  if(id==='enterprise'){await click('New request');ok(document.querySelector('form'),'Request form');await act(async()=>document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));ok(document.body.textContent.includes('Request created in demo'),'Demo form success');await close();await click('Review');ok(document.querySelectorAll('tbody tr').length===1,'Queue status filter');}
  if(id==='intelligence'){await click('Cost');ok(document.body.textContent.includes('USD'),'Telemetry tab changes');await click('case-narrative');ok(document.body.textContent.includes('Model inference'),'Trace detail');await close();}
  if(id==='research'){await click('Healthcare');ok(document.querySelector('h1').textContent.includes('care'),'Industry navigation');await click('Explore the outlook');await close();}
  if(id==='finance'){await click('Approvals');ok(document.querySelectorAll('tbody tr').length===1,'Approval queue');await act(async()=>document.querySelector('[aria-label="Inspect Studio North"]').click());await click('Approve demo transaction');ok(document.body.textContent.includes('Approved in demo'),'Approval state');await close();}
  if(id==='operations'){await select('At risk');ok(document.querySelectorAll('.shipment-item').length===1,'Shipment filter');await click('Berlin');ok(document.querySelector('h1').textContent.includes('Berlin'),'Shipment inspection');}
  if(id==='people'){await click('Amelia');ok(document.body.textContent.includes('Professional growth profile'),'Person drawer');await close();}
  if(id==='technical'){await click('Deploy preview');ok(document.body.textContent.includes('Preview deployment ready'),'Deployment demo state');await click('Logs');ok(document.querySelector('.terminal'),'Logs view');}
  if(id==='corporate'){await click('Growth');ok(document.querySelector('.allocation .progress-track i').style.width==='40%','Scenario updates');await click('Explore');ok(document.querySelector('.corporate-menu'),'Full height menu');await close();}
  if(id==='analytical'){await click('Filters');await select('APAC',1);await click('Apply filters');ok(document.body.textContent.includes('$2.02M'),'Region filter recalculates revenue');}
  if(id==='insights'){await click('Healthcare');ok(document.querySelector('.mer-industry h3').textContent.includes('Clinical'),'Industry explorer');await click('Services');ok(document.querySelector('.mer-mega'),'Mega menu opens');await close();ok(!document.querySelector('.mer-mega'),'Mega menu closes on Escape');await click('Talk to an expert');ok(document.querySelector('form'),'Contact form');await submit();ok(document.body.textContent.includes('an expert will be in touch'),'Contact demo success');await close();}
  if(id==='cinematic'){await act(async()=>document.querySelector('[aria-label="Ocean finish"]').click());ok(document.querySelector('.lum-finish-name').textContent==='Ocean','Finish picker');await click('Adaptive light');ok(document.querySelector('.lum-step.active').textContent.includes('glow'),'Scroll story chapter');await click('Buy');await click('Add to bag');ok(document.body.textContent.includes('Added to your bag'),'Add to bag demo');await close();ok(document.querySelector('[aria-label="Bag, 1 items"]'),'Bag count updates');}
  if(id==='momentum'){await click('Board');ok(document.querySelector('.orb-board'),'Board view');await click('List');ok(document.querySelector('.orb-list'),'List view');await click('ORB-128');ok(document.querySelector('[role="dialog"]'),'Issue detail');await click('Mark as done');ok(document.body.textContent.includes('Marked as done'),'Issue status update');await close();await click('Command menu');ok(document.querySelector('.orb-palette'),'Command menu opens');await close();}
  if(id==='gradient'){await setRange(document.querySelector('#tes-volume'),500000);ok(document.querySelector('.tes-fees').textContent==='$14,375','Pricing calculator');await click('Python');ok(document.querySelector('.tes-code').textContent.includes('tessel.Payment.create'),'Code tabs');await click('Contact sales');await submit();ok(document.body.textContent.includes('our team will reach out'),'Sales form demo');await close();}
  await act(async()=>root.render(null));
 }
 const {Gallery}=await server.ssrLoadModule('/src/main.jsx');const {designs}=await server.ssrLoadModule('/src/data.js');
 await act(async()=>root.render(React.createElement(Gallery)));
 ok(document.querySelectorAll('.design-card').length===designs.length,'Gallery includes every design');ok(document.querySelectorAll('.design-card[data-in]').length===designs.length,'Cards revealed without IntersectionObserver');
 ok([...document.querySelectorAll('.preview-link')].every(a=>a.target==='_blank'&&a.rel.includes('noopener')),'All sample links open safely in new tabs');
 await click('Analytics');ok(document.querySelectorAll('.design-card').length===2,'Category filter');await click('Brand');ok(document.querySelectorAll('.design-card').length===3,'Brand category filter');
 await click('All designs');await act(async()=>document.querySelector('[aria-label="Save Executive Minimal"]').click());
 ok(JSON.parse(localStorage.getItem('form-atlas-saved')).includes('executive'),'Favourites persisted');
 await click('Saved');ok(document.querySelectorAll('.design-card').length===1,'Saved shortlist');
 await click('Details');ok(document.querySelector('[role="dialog"]'),'Design specification drawer');await close();
 console.log(`PASS: ${checks} render and interaction assertions across ${designs.length} samples and the gallery.`);
}catch(e){console.error(e);process.exitCode=1}finally{await act(async()=>root.unmount());await server.close();dom.window.close()}
