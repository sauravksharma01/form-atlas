import React,{useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowUpRight,BarChart3,Battery,Check,ChevronDown,ChevronRight,Columns3,Command,Cpu,Inbox,Layers,LayoutList,Lock,Plus,Search,ShoppingBag,Sparkles,Sun,Target,Volume2,Zap,Globe,Shield,Repeat,LineChart as LineIcon,CircleUser,FolderKanban,RefreshCcw} from 'lucide-react';
import {Drawer} from './ui';
import {Counter,useReveal,useScrollProgress} from './motion';

const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-');
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
function Confirm({children}){return <p className="sc-confirm" role="status"><Check size={16}/> {children}</p>}

/* ───────────────────────── 11 · Meridian — Insight Consultancy (ref: Netscribes) ───────────────────────── */

const merServices=[
  {icon:BarChart3,title:'Market intelligence',copy:'Sizing, competitive landscapes and demand signals across 40+ countries.',points:['Market sizing & forecasting','Competitive intelligence','Customer & channel research']},
  {icon:Cpu,title:'Digital & AI enablement',copy:'Turn fragmented data into decision systems your teams actually use.',points:['Data foundations','Decision dashboards','Generative AI pilots']},
  {icon:Sparkles,title:'Content & brand',copy:'Research-backed storytelling that earns attention and trust.',points:['Thought leadership','Analyst-grade content','Campaign intelligence']},
  {icon:Target,title:'Growth strategy',copy:'Go-to-market plans grounded in evidence, built to be executed.',points:['Market entry','Pricing & packaging','Partner ecosystems']}
];
const merIndustries={
  Technology:{h:'Where platforms meet the next wave of demand.',stat:'3.1×',label:'faster growth in AI-native software segments',points:['Category & TAM modelling for emerging tech','Competitive teardown of 120+ vendors','Buyer journey research with IT decision-makers'],bars:[38,52,61,74,92]},
  Healthcare:{h:'Clinical insight. Commercial clarity.',stat:'62%',label:'of providers plan new digital-care investment',points:['Therapy-area landscapes & pipeline tracking','HCP and patient research in 30 markets','Market access and pricing intelligence'],bars:[44,48,57,66,71]},
  'Financial services':{h:'Sharper signals for every risk and return.',stat:'$4.6T',label:'embedded-finance volume forecast by 2030',points:['Competitive benchmarking for banks & fintechs','Regulatory horizon scanning','Customer sentiment & churn drivers'],bars:[30,41,55,70,86]},
  Consumer:{h:'Know the shopper before the shelf does.',stat:'48%',label:'of purchases now begin on a social or AI surface',points:['Shopper & category insight','Social listening at scale','Retail media effectiveness'],bars:[52,49,60,63,78]},
  Energy:{h:'Intelligence for the transition.',stat:'2.7×',label:'growth in grid-scale storage tenders',points:['Policy & incentive tracking','Supply-chain risk mapping','Technology readiness assessments'],bars:[26,35,47,62,81]}
};
const merClients=['Northwind','Atlas Bank','Helio Health','Verdant','Quanta Labs','Brightline','Oakmont','Sable & Co.','Kestrel Energy','Lumio'];
const merInsights=[
  {type:'Report',time:'18 min read',tone:'ocean',title:'The 2027 enterprise AI adoption outlook',summary:'A survey of 1,400 enterprise leaders on where AI budgets are moving and what separates pilots from production.',findings:['Two in three firms now fund AI from operating budgets, not innovation pools.','Data readiness — not model quality — is the top blocker.','Leaders measure AI value in cycle time, not headcount.']},
  {type:'Case study',time:'6 min read',tone:'signal',title:'How a global insurer re-entered three markets in nine months',summary:'Market sizing, partner mapping and pricing research that de-risked a multi-country relaunch.',findings:['Identified a $1.2B underserved SME segment.','Shortlisted 14 distribution partners from 220.','Launch pricing landed within 3% of the modelled optimum.']},
  {type:'Whitepaper',time:'12 min read',tone:'ink',title:'Pricing power in the age of agentic commerce',summary:'What happens to brand premiums when AI agents do the comparison shopping.',findings:['Agents compress price dispersion by up to 40% in tested categories.','Verified reviews and spec completeness become ranking signals.','Brands with first-party data hold premium best.']}
];

function MerContact({close}){const[done,setDone]=useState(false);return <Drawer title="Talk to an expert" onClose={close}>{done?<div className="success-state"><Check size={38}/><h3>Thanks — an expert will be in touch</h3><p>This is a demonstration. No message was sent.</p><button className="button" onClick={close}>Close</button></div>:<form className="sc-form" onSubmit={e=>{e.preventDefault();setDone(true)}}><p className="drawer-intro">Tell us what you’re solving for. A specialist replies within one business day.</p><label>Full name<input required name="name" autoComplete="name"/></label><label>Work email<input required type="email" name="email" autoComplete="email"/></label><label>Company<input name="company" autoComplete="organization"/></label><label>Area of interest<select name="interest">{merServices.map(s=><option key={s.title}>{s.title}</option>)}</select></label><label>How can we help?<textarea rows={4} name="message"/></label><button className="mer-btn red" type="submit">Send message <ArrowRight size={15}/></button></form>}</Drawer>}

function MerRead({item,close}){const[req,setReq]=useState(false);return <Drawer title={item.title} onClose={close}><span className="sc-chip">{item.type} · {item.time}</span><p className="drawer-intro">{item.summary}</p><h4 className="sc-subhead">Key findings</h4><ol className="sc-findings">{item.findings.map(f=><li key={f}>{f}</li>)}</ol>{req?<Confirm>Request received — illustrative demo, nothing was sent.</Confirm>:<button className="mer-btn red" onClick={()=>setReq(true)}>Request the full {item.type==='Capability'?'brief':'report'} <ArrowRight size={15}/></button>}</Drawer>}

export function Insights(){
  const ref=useReveal();
  const[menu,setMenu]=useState(false),[industry,setIndustry]=useState('Technology'),[read,setRead]=useState(null),[contact,setContact]=useState(false);
  const ind=merIndustries[industry];
  const service=s=>({title:s.title,type:'Capability',time:'Overview',summary:s.copy,findings:s.points});
  useEffect(()=>{if(!menu)return;const h=e=>{if(e.key==='Escape')setMenu(false)};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h)},[menu]);
  return <div className="sc meridian" ref={ref}>
    <header className="mer-nav">
      <a className="mer-logo" href="#mer-top" aria-label="Meridian home"><span/>meridian</a>
      <nav aria-label="Primary">
        <button aria-expanded={menu} onClick={()=>setMenu(!menu)}>Services <ChevronDown size={14}/></button>
        <a href="#mer-industries">Industries</a><a href="#mer-insights">Insights</a><a href="#mer-about">About</a>
      </nav>
      <button className="mer-cta" onClick={()=>setContact(true)}>Talk to an expert <ArrowRight size={15}/></button>
      {menu&&<div className="mer-mega" onMouseLeave={()=>setMenu(false)}>
        <div className="mer-mega-list">{merServices.map(s=><button key={s.title} onClick={()=>{setMenu(false);setRead(service(s))}}><span className="mer-icon"><s.icon size={18}/></span><span><b>{s.title}</b><small>{s.copy}</small></span></button>)}</div>
        <div className="mer-mega-feature"><small>FEATURED REPORT</small><b>{merInsights[0].title}</b><button className="mer-link light" onClick={()=>{setMenu(false);setRead(merInsights[0])}}>Read now <ArrowUpRight size={14}/></button></div>
      </div>}
    </header>

    <section className="mer-hero" id="mer-top">
      <div className="mer-grid" aria-hidden="true"/>
      <div className="mer-hero-copy">
        <div className="mer-kicker"><span/> Research · Analytics · Growth</div>
        <h1 className="mer-title"><span>Intelligence that</span> <span>moves <em>markets.</em></span></h1>
        <p>We help ambitious organisations see further, decide faster and grow with conviction — powered by 1,200 analysts and a decade of proprietary data.</p>
        <div className="mer-actions"><button className="mer-btn red" onClick={()=>setContact(true)}>Start a conversation <ArrowRight size={15}/></button><a className="mer-btn ghost" href="#mer-insights">Explore insights</a></div>
      </div>
      <div className="mer-hero-art" aria-hidden="true">
        <div className="mer-orb"/><div className="mer-orb two"/>
        <div className="mer-float a"><small>Market signal</small><b>+18.4%</b><svg viewBox="0 0 120 34"><path d="M0 30 L15 26 L30 28 L45 18 L60 21 L75 12 L90 15 L105 5 L120 7" fill="none" stroke="currentColor" strokeWidth="2.4"/></svg></div>
        <div className="mer-float b"><small>Analysts on this brief</small><b>42</b><div className="mer-avatars"><i/><i/><i/><i/></div></div>
        <div className="mer-float c"><Check size={14}/> Insight delivered</div>
      </div>
    </section>

    <section className="mer-marquee" aria-label="Selected clients (illustrative)">
      <p>Trusted by ambitious teams in 40+ countries</p>
      <div className="mer-track"><div>{[...merClients,...merClients].map((c,i)=><span key={i} aria-hidden={i>=merClients.length||undefined}>{c}</span>)}</div></div>
    </section>

    <section className="mer-stats" id="mer-about">{[[500,'+','Global clients'],[40,'+','Countries covered'],[1200,'','Analysts & specialists'],[95,'%','Repeat engagements']].map(([n,s,l],i)=><div key={l} data-reveal style={{'--d':i*90+'ms'}}><strong><Counter to={n} suffix={s}/></strong><span>{l}</span></div>)}</section>

    <section className="mer-section">
      <div className="mer-head" data-reveal><div className="mer-eyebrow">WHAT WE DO</div><h2>Four disciplines.<br/>One point of view.</h2></div>
      <div className="mer-service-grid">{merServices.map((s,i)=><article key={s.title} data-reveal style={{'--d':i*100+'ms'}}><span className="mer-icon"><s.icon size={20}/></span><h3>{s.title}</h3><p>{s.copy}</p><ul>{s.points.map(p=><li key={p}>{p}</li>)}</ul><button className="mer-link" onClick={()=>setRead(service(s))}>Explore <ArrowUpRight size={14}/></button></article>)}</div>
    </section>

    <section className="mer-section mer-industries" id="mer-industries">
      <div className="mer-head" data-reveal><div className="mer-eyebrow">INDUSTRIES WE SERVE</div><h2>Deep sector fluency.</h2></div>
      <div className="mer-tabs" role="tablist" aria-label="Industries">{Object.keys(merIndustries).map(k=><button key={k} role="tab" aria-selected={k===industry} className={k===industry?'active':''} onClick={()=>setIndustry(k)}>{k}</button>)}</div>
      <div className="mer-industry" key={industry} role="tabpanel" aria-label={industry}>
        <div><h3>{ind.h}</h3><ul>{ind.points.map(p=><li key={p}><Check size={16}/>{p}</li>)}</ul><button className="mer-link" onClick={()=>setContact(true)}>Speak to a {industry.toLowerCase()} specialist <ArrowRight size={14}/></button></div>
        <div className="mer-industry-stat"><strong>{ind.stat}</strong><span>{ind.label}</span><div className="mer-bars">{ind.bars.map((b,i)=><i key={i} style={{height:b+'%','--d':i*70+'ms'}}/>)}</div><small>Illustrative figures</small></div>
      </div>
    </section>

    <section className="mer-section" id="mer-insights">
      <div className="mer-head row" data-reveal><div><div className="mer-eyebrow">LATEST THINKING</div><h2>Insights worth acting on.</h2></div><button className="mer-link" onClick={()=>setRead(merInsights[0])}>View all resources <ArrowRight size={14}/></button></div>
      <div className="mer-insight-grid">{merInsights.map((x,i)=><article key={x.title} className={'mer-insight '+x.tone} data-reveal style={{'--d':i*110+'ms'}}><div className="mer-insight-art" aria-hidden="true"><i/><i/></div><span className="sc-chip">{x.type}</span><h3>{x.title}</h3><div className="mer-insight-foot"><small>{x.time}</small><button className="mer-link" onClick={()=>setRead(x)} aria-label={'Read: '+x.title}>Read <ArrowUpRight size={14}/></button></div></article>)}</div>
    </section>

    <section className="mer-cta-band" data-reveal><div><div className="mer-eyebrow light">TOGETHER WE GROW</div><h2>Let’s build what’s next, together.</h2></div><button className="mer-btn white" onClick={()=>setContact(true)}>Book a discovery call <ArrowRight size={15}/></button></section>
    <footer className="mer-footer"><a className="mer-logo" href="#mer-top"><span/>meridian</a><span>Fictional brand · Illustrative data · Not affiliated with any reference company.</span><span>© 2026</span></footer>
    {read&&<MerRead item={read} close={()=>setRead(null)}/>}
    {contact&&<MerContact close={()=>setContact(false)}/>}
  </div>;
}

/* ───────────────────────── 12 · Lumen — Cinematic Product (ref: Apple) ───────────────────────── */

const lumFinishes=[{id:'Midnight',a:'#3a4152',b:'#0b0d12',glow:'#7b93ff'},{id:'Starlight',a:'#f6f1e9',b:'#bdb3a3',glow:'#ffe2a8'},{id:'Ocean',a:'#6cb4d6',b:'#103a5c',glow:'#62d8ff'},{id:'Coral',a:'#ffa48f',b:'#a8392f',glow:'#ffb39e'}];
const lumChapters=[
  {id:'Spatial audio',kicker:'Sound',h:'Sound that fills the room. Not just the corner.',p:'Seven beam-forming drivers map your space in seconds and place every instrument exactly where it belongs.'},
  {id:'Adaptive light',kicker:'Light',h:'A glow that follows the music.',p:'A ring of 128 micro-LEDs breathes with the tempo and dims as the room gets darker.'},
  {id:'All-day battery',kicker:'Power',h:'Take the party. Leave the cable.',p:'Up to 30 hours of playback — and three more from a ten-minute charge.'}
];
function Orb({chapter=-1}){return <div className={'lum-orb'+(chapter>=0?' ch-'+chapter:'')} aria-hidden="true"><div className="lum-orb-waves"><i/><i/><i/></div><div className="lum-orb-body"/><div className="lum-orb-ring"/><div className="lum-orb-power"/><div className="lum-orb-shadow"/></div>}

function LumBuy({finish,setFinish,close,onAdd}){const[added,setAdded]=useState(false);return <Drawer title="Buy Lumen Orb" onClose={close}><div className="lum-buy-stage"><Orb/></div><p className="lum-buy-price">$299 <small>or $24.91/mo. for 12 mo.*</small></p><fieldset className="lum-buy-fins"><legend>Finish — {finish.id}</legend><div>{lumFinishes.map(f=><button type="button" key={f.id} aria-label={f.id} aria-pressed={f.id===finish.id} className={f.id===finish.id?'active':''} style={{'--a':f.a,'--b':f.b}} onClick={()=>setFinish(f)}/>)}</div></fieldset>{added?<Confirm>Added to your bag. This is a demo — nothing was charged.</Confirm>:<button className="lum-pill wide" onClick={()=>{setAdded(true);onAdd()}}>Add to bag</button>}<p className="lum-fine">* Illustrative pricing for a fictional product.</p></Drawer>}

export function Cinematic(){
  const ref=useReveal(),heroRef=useScrollProgress(),storyRef=useRef(null);
  const[finish,setFinish]=useState(lumFinishes[0]),[chapter,setChapter]=useState(0),[buy,setBuy]=useState(false),[bag,setBag]=useState(0);
  useEffect(()=>{
    const on=()=>{const el=storyRef.current;if(!el)return;const mid=window.innerHeight/2;el.querySelectorAll('.lum-step').forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.height&&r.top<mid&&r.bottom>mid)setChapter(i)})};
    window.addEventListener('scroll',on,{passive:true});return()=>window.removeEventListener('scroll',on);
  },[]);
  const go=i=>{setChapter(i);storyRef.current?.querySelectorAll('.lum-step')[i]?.scrollIntoView({behavior:'smooth',block:'center'})};
  return <div className="sc lumen" ref={ref} style={{'--fin-a':finish.a,'--fin-b':finish.b,'--fin-glow':finish.glow}}>
    <header className="lum-global"><a href="#lum-top" className="lum-mark" aria-label="Lumen home"><span/></a><nav aria-label="Global">{['Store','Orb','Slate','Buds','Home','Support'].map(x=><a key={x} href="#lum-top">{x}</a>)}</nav><span className="lum-global-icons"><Search size={15} aria-hidden="true"/><button className="lum-bag" aria-label={'Bag, '+bag+' items'} onClick={()=>setBuy(true)}><ShoppingBag size={15}/>{bag>0&&<b>{bag}</b>}</button></span></header>
    <div className="lum-local"><b>Lumen Orb</b><nav aria-label="Product">{['Overview','Why Lumen','Tech Specs'].map((x,i)=><a key={x} href={i===2?'#lum-specs':'#lum-story'} className={i===0?'active':''}>{x}</a>)}</nav><button className="lum-pill" onClick={()=>setBuy(true)}>Buy</button></div>

    <section className="lum-hero" id="lum-top" ref={heroRef}>
      <p className="lum-eyebrow">Lumen Orb</p>
      <h1>Sound,<br/>sculpted.</h1>
      <p className="lum-sub">From $299 or $24.91/mo. for 12 mo.*</p>
      <div className="lum-ctas"><button className="lum-pill" onClick={()=>setBuy(true)}>Buy</button><a className="lum-more" href="#lum-story">Learn more <ChevronRight size={15}/></a></div>
      <div className="lum-stage"><Orb/></div>
    </section>

    <section className="lum-tiles">
      <article className="lum-tile light" data-reveal><p className="lum-eyebrow">Lumen Slate</p><h2>Thin. Then thinner.</h2><p>The 5.1 mm tablet with an all-day display.</p><div className="lum-ctas"><a className="lum-more" href="#lum-top">Learn more <ChevronRight size={15}/></a><a className="lum-more" href="#lum-top">Pre-order <ChevronRight size={15}/></a></div><div className="lum-slate" aria-hidden="true"><i/></div></article>
      <article className="lum-tile dark" data-reveal style={{'--d':'120ms'}}><p className="lum-eyebrow">Lumen Buds</p><h2>Silence, on demand.</h2><p>Adaptive noise control that learns your day.</p><div className="lum-ctas"><a className="lum-more" href="#lum-top">Learn more <ChevronRight size={15}/></a><a className="lum-more" href="#lum-top">Pre-order <ChevronRight size={15}/></a></div><div className="lum-buds" aria-hidden="true"><i/><i/></div></article>
    </section>

    <section className="lum-story" id="lum-story" ref={storyRef}>
      <div className="lum-sticky" data-chapter={chapter}>
        <Orb chapter={chapter}/>
        <div className="lum-chapter-tabs" role="tablist" aria-label="Features">{lumChapters.map((c,i)=><button key={c.id} role="tab" aria-selected={i===chapter} className={i===chapter?'active':''} onClick={()=>go(i)}>{c.id}</button>)}</div>
      </div>
      <div className="lum-steps">{lumChapters.map((c,i)=><article key={c.id} className={'lum-step'+(i===chapter?' active':'')}><p className="lum-eyebrow">{c.kicker}</p><h2>{c.h}</h2><p>{c.p}</p></article>)}</div>
    </section>

    <section className="lum-finish">
      <h2 data-reveal>Pick your finish.<br/><span>Then pick a room.</span></h2>
      <div className="lum-finish-stage"><Orb/></div>
      <p className="lum-finish-name" aria-live="polite">{finish.id}</p>
      <div className="lum-swatches">{lumFinishes.map(f=><button key={f.id} aria-label={f.id+' finish'} aria-pressed={f.id===finish.id} className={f.id===finish.id?'active':''} style={{'--a':f.a,'--b':f.b}} onClick={()=>setFinish(f)}/>)}</div>
    </section>

    <section className="lum-numbers">{[[30,' hrs','of battery life'],[360,'°','sound field'],[7,'','beam-forming drivers'],[128,'','micro-LEDs']].map(([n,s,l],i)=><div key={l} data-reveal style={{'--d':i*100+'ms'}}><strong><Counter to={n} suffix={s}/></strong><span>{l}</span></div>)}</section>

    <section className="lum-specs" id="lum-specs"><h2 data-reveal>Why Lumen.</h2><div className="lum-spec-grid">{[[Volume2,'Spatial audio','Room-mapped sound that adapts as you move.'],[Sun,'Adaptive light','A tempo-aware glow with ambient dimming.'],[Battery,'30-hour battery','Fast-charge 3 hours in 10 minutes.'],[Lock,'Private by design','On-device voice processing. Always.']].map(([I,t,p],i)=><div key={t} data-reveal style={{'--d':i*90+'ms'}}><I size={30} strokeWidth={1.5}/><h3>{t}</h3><p>{p}</p></div>)}</div></section>

    <footer className="lum-footer"><p>* Illustrative pricing. Lumen is a fictional brand created for this design reference and is not affiliated with any company.</p><p>Copyright © 2026 Lumen. All rights reserved.</p></footer>
    {buy&&<LumBuy finish={finish} setFinish={setFinish} close={()=>setBuy(false)} onAdd={()=>setBag(b=>b+1)}/>}
  </div>;
}

/* ───────────────────────── 13 · Orbit — Product Momentum (ref: Linear) ───────────────────────── */

const orbStatuses=['In progress','In review','Todo','Backlog','Done'];
const orbSeed=[
  {id:'ORB-142',title:'Command menu fuzzy search ranks recent items first',status:'In progress',priority:'Urgent',label:'Feature',assignee:'AK',est:3},
  {id:'ORB-139',title:'Cycle burn-up misses carried-over scope',status:'In progress',priority:'High',label:'Bug',assignee:'JM',est:2},
  {id:'ORB-137',title:'Keyboard shortcut overlay for triage view',status:'Todo',priority:'Medium',label:'Feature',assignee:'SC',est:2},
  {id:'ORB-133',title:'Sync pull request status into the issue timeline',status:'Todo',priority:'High',label:'Integration',assignee:'RP',est:5},
  {id:'ORB-131',title:'Trim initial bundle for the workspace switcher',status:'In review',priority:'Medium',label:'Performance',assignee:'AK',est:3},
  {id:'ORB-128',title:'Weekly project updates digest email',status:'In review',priority:'Low',label:'Feature',assignee:'LT',est:1},
  {id:'ORB-124',title:'Roadmap timeline zoom levels',status:'Backlog',priority:'Low',label:'Feature',assignee:'JM',est:3},
  {id:'ORB-120',title:'Offline mode conflict resolution',status:'Done',priority:'High',label:'Bug',assignee:'RP',est:5},
  {id:'ORB-117',title:'Sub-issue progress on parent rows',status:'Done',priority:'Medium',label:'Feature',assignee:'SC',est:2}
];
function Status({s}){return <span className={'orb-status s-'+slug(s)} title={s} aria-label={s} role="img"/>}
function Priority({p}){return <span className={'orb-prio p-'+slug(p)} title={p+' priority'} aria-label={p+' priority'} role="img">{p==='Urgent'?'!':<><i/><i/><i/></>}</span>}
const orbCommands=[['Create new issue','C'],['Switch to board view','B'],['Switch to list view','L'],['Assign ORB-137 to me','I'],['Go to inbox','G I'],['Open cycle 24','G C']];

function OrbPalette({close,run}){
  const[q,setQ]=useState(''),[active,setActive]=useState(0);const input=useRef(null);const closeRef=useRef(close);closeRef.current=close;
  const list=orbCommands.filter(([a])=>a.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{input.current?.focus();const h=e=>{if(e.key==='Escape')closeRef.current()};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h)},[]);
  return <div className="orb-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><div className="orb-palette" role="dialog" aria-modal="true" aria-label="Command menu">
    <div className="orb-palette-input"><Search size={16}/><input ref={input} value={q} aria-label="Type a command" placeholder="Type a command or search…" onChange={e=>{setQ(e.target.value);setActive(0)}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setActive(a=>Math.min(a+1,list.length-1))}if(e.key==='ArrowUp'){e.preventDefault();setActive(a=>Math.max(a-1,0))}if(e.key==='Enter'&&list[active])run(list[active][0])}}/><kbd>esc</kbd></div>
    <div className="orb-palette-list" role="listbox" aria-label="Commands">{list.map(([a,k],i)=><button key={a} role="option" aria-selected={i===active} className={i===active?'active':''} onMouseEnter={()=>setActive(i)} onClick={()=>run(a)}><span>{a}</span><kbd>{k}</kbd></button>)}{!list.length&&<p className="orb-empty">No commands match “{q}”.</p>}</div>
  </div></div>;
}

function OrbCreate({status,close,create}){return <Drawer title="New issue" onClose={close}><form className="sc-form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);create({title:f.get('title')||'Untitled issue',priority:f.get('priority'),status:f.get('status')})}}><label>Title<input name="title" placeholder="Issue title" autoFocus/></label><label>Status<select name="status" defaultValue={status}>{orbStatuses.map(s=><option key={s}>{s}</option>)}</select></label><label>Priority<select name="priority" defaultValue="Medium">{['Urgent','High','Medium','Low'].map(p=><option key={p}>{p}</option>)}</select></label><button className="orb-btn primary" type="submit">Create issue</button></form></Drawer>}

function OrbIssue({issue,close,update}){return <Drawer title={issue.id} onClose={close} wide><h3 className="orb-issue-title">{issue.title}</h3><dl className="orb-props"><dt>Status</dt><dd><Status s={issue.status}/> {issue.status}</dd><dt>Priority</dt><dd><Priority p={issue.priority}/> {issue.priority}</dd><dt>Assignee</dt><dd><span className="orb-avatar">{issue.assignee}</span></dd><dt>Label</dt><dd><span className={'orb-label l-'+slug(issue.label)}>{issue.label}</span></dd><dt>Estimate</dt><dd>{issue.est} points</dd><dt>Cycle</dt><dd>Cycle 24</dd></dl><div className="orb-activity">{['created the issue · 6 days ago','moved from Backlog to Todo · 4 days ago','linked a pull request · 2 hours ago'].map(t=><p key={t}><span className="orb-dot"/>{issue.assignee} {t}</p>)}</div>{issue.status==='Done'?<Confirm>Marked as done — demo only.</Confirm>:<button className="orb-btn primary" onClick={()=>update(issue.id,{status:'Done'})}><Check size={14}/> Mark as done</button>}</Drawer>}

export function Momentum(){
  const[items,setItems]=useState(orbSeed),[view,setView]=useState('List'),[nav,setNav]=useState('Issues'),[open,setOpen]=useState(null),[palette,setPalette]=useState(false),[creating,setCreating]=useState(null),[toast,setToast]=useState('');
  useEffect(()=>{const h=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(p=>!p)}};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h)},[]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)},[toast]);
  const update=(id,patch)=>setItems(l=>l.map(i=>i.id===id?{...i,...patch}:i));
  const total=items.reduce((a,i)=>a+i.est,0),done=items.filter(i=>i.status==='Done').reduce((a,i)=>a+i.est,0),pct=Math.round(done/total*100);
  const run=cmd=>{setPalette(false);if(cmd.startsWith('Create'))setCreating('Todo');else if(cmd.includes('board'))setView('Board');else if(cmd.includes('list'))setView('List');else if(cmd.includes('inbox')){setNav('Inbox');setToast('Inbox is clear — nice work')}else if(cmd.startsWith('Assign')){update('ORB-137',{assignee:'SC'});setToast('ORB-137 assigned to you')}else setToast('Cycle 24 is '+pct+'% complete')};
  const issue=open&&items.find(i=>i.id===open);
  const row=(i,idx)=><button key={i.id} className="orb-row" style={{'--d':idx*35+'ms'}} onClick={()=>setOpen(i.id)}><Priority p={i.priority}/><span className="orb-id">{i.id}</span><Status s={i.status}/><span className="orb-title">{i.title}</span><span className={'orb-label l-'+slug(i.label)}>{i.label}</span><span className="orb-est">{i.est}</span><span className="orb-avatar">{i.assignee}</span></button>;
  return <div className="sc orbit">
    <aside className="orb-side">
      <div className="orb-ws"><span className="orb-ws-mark">O</span><b>Orbit</b><ChevronDown size={13}/></div>
      <button className="orb-search" onClick={()=>setPalette(true)}><Search size={14}/> Search<kbd>⌘K</kbd></button>
      <nav aria-label="Workspace">{[[Inbox,'Inbox',3],[CircleUser,'My issues'],[Layers,'Views']].map(([I,t,n])=><button key={t} className={nav===t?'active':''} onClick={()=>setNav(t)}><I size={15}/>{t}{n&&<span className="orb-count">{n}</span>}</button>)}</nav>
      <div className="orb-side-label">Your teams</div>
      <nav aria-label="Team Core">{[[FolderKanban,'Issues'],[RefreshCcw,'Cycles'],[Target,'Projects']].map(([I,t])=><button key={t} className={nav===t?'active':''} onClick={()=>setNav(t)}><I size={15}/>{t}</button>)}</nav>
      <div className="orb-cycle"><small>Cycle 24 · {pct}%</small><div className="orb-cycle-track"><i style={{width:pct+'%'}}/></div></div>
    </aside>
    <main className="orb-main">
      <header className="orb-bar"><span className="orb-crumb">Core <ChevronRight size={13}/> <b>{nav}</b></span><div className="orb-views" role="group" aria-label="View">{[[LayoutList,'List'],[Columns3,'Board']].map(([I,t])=><button key={t} aria-pressed={view===t} className={view===t?'active':''} onClick={()=>setView(t)}><I size={14}/>{t}</button>)}</div><button className="orb-btn" onClick={()=>setPalette(true)}><Command size={13}/> Command menu</button><button className="orb-btn primary" onClick={()=>setCreating('Todo')}><Plus size={14}/> New issue</button></header>
      <section className="orb-hero">
        <div><span className="orb-pill"><Sparkles size={12}/> Cycle 24 · ends in 4 days</span><h1>Ship in rhythm.</h1><p>{items.filter(i=>i.status!=='Done').length} issues in flight across Core. {pct}% of cycle scope complete.</p></div>
        <svg className="orb-chart" viewBox="0 0 320 120" role="img" aria-label={'Cycle burn-up, '+pct+' percent complete'}><defs><linearGradient id="orb-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5e6ad2" stopOpacity=".45"/><stop offset="1" stopColor="#5e6ad2" stopOpacity="0"/></linearGradient></defs>{[30,60,90].map(y=><line key={y} x1="0" x2="320" y1={y} y2={y} stroke="currentColor" opacity=".07"/>)}<path d="M0 20 L320 20" stroke="currentColor" opacity=".25" strokeDasharray="4 5"/><path d="M0 110 L40 104 L80 96 L120 80 L160 72 L200 55 L240 46 L240 120 L0 120Z" fill="url(#orb-fill)"/><path className="orb-chart-line" d="M0 110 L40 104 L80 96 L120 80 L160 72 L200 55 L240 46" fill="none" stroke="#7c86ff" strokeWidth="2.4"/><path d="M240 46 L320 22" stroke="#7c86ff" strokeDasharray="3 4" opacity=".6" fill="none"/><circle cx="240" cy="46" r="4" fill="#fff"/></svg>
      </section>
      {view==='List'?<div className="orb-list" key="list">{orbStatuses.map(s=>{const rows=items.filter(i=>i.status===s);if(!rows.length)return null;return <section key={s} className="orb-group"><header><Status s={s}/><b>{s}</b><span>{rows.length}</span><button className="orb-ghost" aria-label={'Add issue to '+s} onClick={()=>setCreating(s)}><Plus size={14}/></button></header>{rows.map(row)}</section>})}</div>
      :<div className="orb-board" key="board">{orbStatuses.map(s=><section key={s} className="orb-col"><header><Status s={s}/><b>{s}</b><span>{items.filter(i=>i.status===s).length}</span></header>{items.filter(i=>i.status===s).map((i,idx)=><button key={i.id} className="orb-card" style={{'--d':idx*40+'ms'}} onClick={()=>setOpen(i.id)}><span className="orb-id">{i.id}</span><span className="orb-title">{i.title}</span><span className="orb-card-foot"><Priority p={i.priority}/><span className={'orb-label l-'+slug(i.label)}>{i.label}</span><span className="orb-avatar">{i.assignee}</span></span></button>)}</section>)}</div>}
    </main>
    {toast&&<div className="orb-toast" role="status"><Zap size={14}/> {toast}</div>}
    {palette&&<OrbPalette close={()=>setPalette(false)} run={run}/>}
    {creating&&<OrbCreate status={creating} close={()=>setCreating(null)} create={x=>{const id='ORB-'+(143+items.length-orbSeed.length);setItems(l=>[{id,label:'Feature',assignee:'SC',est:1,...x},...l]);setCreating(null);setToast(id+' created')}}/>}
    {issue&&<OrbIssue issue={issue} close={()=>setOpen(null)} update={update}/>}
  </div>;
}

/* ───────────────────────── 14 · Tessel — Gradient Platform (ref: Stripe) ───────────────────────── */

const tesCode={
  Node:`import Tessel from 'tessel';\nconst tessel = new Tessel(process.env.TESSEL_KEY);\n\nconst payment = await tessel.payments.create({\n  amount: 2400,\n  currency: 'usd',\n  method: 'card',\n});`,
  Python:`import tessel\nimport os\n\ntessel.api_key = os.environ["TESSEL_KEY"]\n\npayment = tessel.Payment.create(\n    amount=2400,\n    currency="usd",\n    method="card",\n)`,
  cURL:`curl https://api.tessel.example/v1/payments \\\n  -u "$TESSEL_KEY:" \\\n  -d amount=2400 \\\n  -d currency=usd \\\n  -d method=card`
};
function Highlight({code}){return code.split(/('[^'\n]*'|"[^"\n]*"|\b(?:import|from|const|await|new|curl)\b|\b\d+\b)/).map((t,i)=>i%2?<span key={i} className={/^['"]/.test(t)?'tk-str':/^\d/.test(t)?'tk-num':'tk-kw'}>{t}</span>:t)}
function HoverArrow(){return <svg className="tes-arrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path className="line" d="M0 5h7"/><path className="tip" d="M1 1l4 4-4 4"/></svg>}
const tesProducts=[[Repeat,'Checkout','A conversion-optimised payment page, ready in an afternoon.'],[RefreshCcw,'Subscriptions','Recurring billing with proration, trials and smart retries.'],[Globe,'Payouts','Pay sellers and suppliers in 47 countries.'],[LineIcon,'Revenue analytics','Live MRR, churn and cohort views, without a data team.']];

export function Gradient(){
  const ref=useReveal();
  const[volume,setVolume]=useState(120000),[lang,setLang]=useState('Node'),[sales,setSales]=useState(false),[processed,setProcessed]=useState(1284906120);
  useEffect(()=>{const t=setInterval(()=>setProcessed(v=>v+1800+Math.round(Math.random()*4200)),1100);return()=>clearInterval(t)},[]);
  const rate=volume>=250000?.025:.029,count=Math.round(volume/80),fees=volume*rate+count*.3;
  return <div className="sc tessel" ref={ref}>
    <div className="tes-mesh" aria-hidden="true"><i/><i/><i/><i/></div>
    <header className="tes-nav"><a className="tes-logo" href="#tes-top">tessel</a><nav aria-label="Primary">{['Products','Solutions','Developers','Resources','Pricing'].map(x=><a key={x} href="#tes-top">{x}</a>)}</nav><a className="tes-signin" href="#tes-top">Sign in <HoverArrow/></a><button className="tes-pill light" onClick={()=>setSales(true)}>Contact sales <HoverArrow/></button></header>
    <section className="tes-hero" id="tes-top">
      <div className="tes-hero-copy"><span className="tes-badge"><b>New</b> Revenue analytics is now in preview <ChevronRight size={13}/></span><h1>Payments infrastructure for ambitious builders.</h1><p>Millions of businesses — from new start-ups to global enterprises — use Tessel to accept payments, send payouts and manage revenue online.</p><div className="tes-actions"><button className="tes-pill" onClick={()=>setSales(true)}>Start now <HoverArrow/></button><button className="tes-pill outline" onClick={()=>setSales(true)}>Contact sales <HoverArrow/></button></div></div>
      <div className="tes-visual" aria-hidden="true">
        <div className="tes-dash"><small>Gross volume</small><b>$48,210.43</b><svg viewBox="0 0 220 70"><path className="tes-spark" d="M0 60 L20 54 L40 57 L60 44 L80 47 L100 33 L120 37 L140 24 L160 28 L180 14 L200 18 L220 6" fill="none" stroke="#635bff" strokeWidth="2.2"/></svg><div className="tes-dash-row"><span>Net volume<b>$41,980</b></span><span>New customers<b>1,284</b></span></div></div>
        <div className="tes-phone"><small>Aurora Coffee Roasters</small><b>$24.00</b><span className="tes-field">Card · •••• 4242</span><span className="tes-field">12 / 29 · 123</span><span className="tes-pay">Pay $24.00</span></div>
        <div className="tes-toast"><Check size={13}/> Payment succeeded</div>
      </div>
    </section>
    <section className="tes-logos" aria-label="Customers (illustrative)">{['ALPINE','northwind','Helio','QUANTA','verdant','Brightline'].map(x=><span key={x}>{x}</span>)}</section>

    <section className="tes-section"><div className="tes-head" data-reveal><span className="tes-eyebrow">Modular solutions</span><h2>A fully integrated suite of payments products.</h2><p>Reduce costs, grow revenue and run your business more efficiently on one platform.</p></div>
      <div className="tes-products">{tesProducts.map(([I,t,p],i)=><a key={t} href="#tes-top" className="tes-product" data-reveal style={{'--d':i*90+'ms'}}><span className="tes-product-icon"><I size={18}/></span><h3>{t}</h3><p>{p}</p><span className="tes-more">Learn more <HoverArrow/></span></a>)}</div>
    </section>

    <section className="tes-stats">{[['volume','processed today'],['99.999%','historical uptime'],['135+','currencies & payment methods'],['47','countries with local acquiring']].map(([v,l],i)=><div key={l} data-reveal style={{'--d':i*90+'ms'}}><strong>{v==='volume'?money(processed):v}</strong><span>{l}</span></div>)}</section>

    <section className="tes-section tes-pricing" data-reveal>
      <div><span className="tes-eyebrow">Pricing</span><h2>Pay as you grow. No surprises.</h2><p>Volume pricing applies automatically above $250,000 a month. Illustrative rates for this demo.</p></div>
      <div className="tes-calc">
        <label htmlFor="tes-volume">Monthly payment volume<b>{money(volume)}</b></label>
        <input id="tes-volume" type="range" min={10000} max={1000000} step={10000} value={volume} onChange={e=>setVolume(+e.target.value)} style={{'--fill':(volume-10000)/9900+'%'}}/>
        <div className="tes-calc-out"><div><small>Estimated monthly fees</small><strong className="tes-fees">{money(fees)}</strong></div><div><small>Rate</small><strong>{(rate*100).toFixed(1)}% + 30¢</strong></div><div><small>Effective rate</small><strong>{(fees/volume*100).toFixed(2)}%</strong></div></div>
      </div>
    </section>

    <section className="tes-dev">
      <div className="tes-dev-copy" data-reveal><span className="tes-eyebrow light">Designed for developers</span><h2>Ship faster with powerful, easy-to-use APIs.</h2><p>Save engineering time with unified payments, typed SDKs in every major language and test mode that mirrors production.</p><div className="tes-dev-points">{[[Zap,'Prebuilt UI components'],[Shield,'Built-in fraud protection'],[Cpu,'Typed SDKs & webhooks']].map(([I,t])=><span key={t}><I size={15}/>{t}</span>)}</div></div>
      <div className="tes-code-window" data-reveal style={{'--d':'120ms'}}><div className="tes-code-tabs" role="tablist" aria-label="Language">{Object.keys(tesCode).map(k=><button key={k} role="tab" aria-selected={k===lang} className={k===lang?'active':''} onClick={()=>setLang(k)}>{k}</button>)}</div><pre className="tes-code" key={lang}><code><Highlight code={tesCode[lang]}/></code></pre></div>
    </section>

    <section className="tes-cta" data-reveal><div><h2>Ready to get started?</h2><p>Explore Tessel, or create an account instantly and start accepting payments.</p><div className="tes-actions"><button className="tes-pill" onClick={()=>setSales(true)}>Start now <HoverArrow/></button><button className="tes-pill outline" onClick={()=>setSales(true)}>Contact sales <HoverArrow/></button></div></div><div className="tes-cta-cards">{[['Always know what you pay','Integrated per-transaction pricing with no hidden fees.'],['Start your integration','Get up and running in as little as 10 minutes.']].map(([t,p])=><div key={t}><ArrowUpRight size={18}/><h3>{t}</h3><p>{p}</p></div>)}</div></section>
    <footer className="tes-footer">tessel · Fictional brand for a design reference · Illustrative data · © 2026</footer>
    {sales&&<TesSales close={()=>setSales(false)}/>}
  </div>;
}
function TesSales({close}){const[done,setDone]=useState(false);return <Drawer title="Contact sales" onClose={close}>{done?<div className="success-state"><Check size={38}/><h3>Thanks — our team will reach out</h3><p>This is a demonstration. No data was sent.</p><button className="button" onClick={close}>Close</button></div>:<form className="sc-form" onSubmit={e=>{e.preventDefault();setDone(true)}}><label>Work email<input required type="email" name="email" autoComplete="email"/></label><label>Company website<input name="site" placeholder="example.com"/></label><label>Annual online revenue<select name="revenue"><option>Under $1M</option><option>$1M – $20M</option><option>$20M – $100M</option><option>Over $100M</option></select></label><button className="tes-pill" type="submit">Request a call <HoverArrow/></button></form>}</Drawer>}
