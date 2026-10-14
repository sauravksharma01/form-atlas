import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';

const canObserve=()=>typeof window!=='undefined'&&typeof window.IntersectionObserver==='function';
const prefersReduced=()=>typeof window!=='undefined'&&!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Adds data-in to every [data-reveal] descendant as it scrolls into view.
// A data attribute (not a class) survives React re-renders of className.
// Pass a key that changes when the revealed children change (e.g. filtered ids).
export function useReveal(key=''){
  const ref=useRef(null);
  useEffect(()=>{
    const root=ref.current;if(!root)return;
    const items=[...root.querySelectorAll('[data-reveal]:not([data-in])')];
    if(!canObserve()||prefersReduced()){items.forEach(el=>el.setAttribute('data-in',''));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    items.forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[key]);
  return ref;
}

// Counts up to `to` once visible. Renders the final value without JS support or with reduced motion.
export function Counter({to,prefix='',suffix='',decimals=0,duration=1400}){
  const ref=useRef(null);const[v,setV]=useState(to);
  useLayoutEffect(()=>{
    const el=ref.current;
    if(!el||!canObserve()||prefersReduced()||typeof window.requestAnimationFrame!=='function')return;
    let raf;setV(0);
    const io=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return;io.disconnect();
      const start=performance.now();
      const tick=t=>{const p=Math.min(1,(t-start)/duration);setV(to*(1-Math.pow(1-p,3)));if(p<1)raf=requestAnimationFrame(tick)};
      raf=requestAnimationFrame(tick);
    },{threshold:.4});
    io.observe(el);
    return()=>{io.disconnect();cancelAnimationFrame(raf)};
  },[to,duration]);
  const fmt=n=>n.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
  return <span ref={ref}><span aria-hidden="true">{prefix}{fmt(v)}{suffix}</span><span className="sr-only">{prefix}{fmt(to)}{suffix}</span></span>;
}

// Writes a 0→1 scroll progress for the element into the CSS variable --p.
export function useScrollProgress(){
  const ref=useRef(null);
  useEffect(()=>{
    const on=()=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(r.height||1)));el.style.setProperty('--p',p.toFixed(3))};
    on();window.addEventListener('scroll',on,{passive:true});
    return()=>window.removeEventListener('scroll',on);
  },[]);
  return ref;
}
