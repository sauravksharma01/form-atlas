import React from 'react';

// Gallery thumbnails for the brand/website-style samples (11–14).
const minis={
  insights:()=><>
    <div className="mini-bar"><b><span className="mm-dot"/>meridian</b><span>Services　Industries　Insights　About</span><em className="mm-red">Talk to an expert</em></div>
    <div className="mm-hero"><div className="mm-blob"/><div><small>RESEARCH · ANALYTICS · GROWTH</small><h3>Intelligence that<br/>moves <em>markets.</em></h3><span className="mm-red">Start a conversation →</span></div><div className="mm-float"><small>Market signal</small><b>+18.4%</b></div></div>
    <div className="mm-marquee">Northwind　Atlas Bank　Helio Health　Verdant　Quanta Labs　Brightline</div>
    <div className="mm-cards">{['Market intelligence','Digital & AI','Content & brand'].map(x=><div key={x}><i/><b>{x}</b><span/><span/></div>)}</div>
  </>,
  cinematic:()=><>
    <div className="mm-glass"><i/><span>Store　Orb　Slate　Buds　Home　Support</span></div>
    <div className="mm-lum-hero"><small>Lumen Orb</small><h3>Sound,<br/>sculpted.</h3><span><em>Buy</em>　Learn more ›</span><div className="mm-orb"/></div>
    <div className="mm-tiles"><div><b>Thin. Then thinner.</b><i/></div><div><b>Silence, on demand.</b><i/></div></div>
  </>,
  momentum:()=><div className="mm-orbit">
    <div className="mm-side">{[1,2,3,4,5,6].map(x=><i key={x}/>)}</div>
    <div className="mm-main"><small>✦ Cycle 24 · ends in 4 days</small><h3>Ship in rhythm.</h3>
      {[['ORB-142','Command menu fuzzy search','p'],['ORB-139','Cycle burn-up scope','p'],['ORB-131','Trim initial bundle','r'],['ORB-137','Shortcut overlay','t'],['ORB-133','Sync pull request status','t']].map(([id,t,s])=><div key={id} className="mm-row"><i className={'mm-st '+s}/><span>{id}</span><b>{t}</b><em/></div>)}
    </div>
    <div className="mm-palette"><span>⌕ Type a command…</span><b>Create new issue</b><span>Switch to board view</span></div>
  </div>,
  gradient:()=><>
    <div className="mm-mesh"><i/><i/><i/></div>
    <div className="mm-tes-bar"><b>tessel</b><span>Products　Solutions　Developers　Pricing</span><em>Contact sales ›</em></div>
    <div className="mm-tes-hero"><div><h3>Payments infrastructure for ambitious builders.</h3><span><em>Start now ›</em>　Contact sales ›</span></div><div className="mm-tes-card"><small>Gross volume</small><b>$48,210.43</b><svg viewBox="0 0 100 30"><path d="M0 26 L15 22 L30 24 L45 15 L60 17 L75 8 L100 3" fill="none" stroke="currentColor" strokeWidth="2"/></svg></div><div className="mm-tes-code"><i/><i/><i/><i/></div></div>
  </>
};
export function MiniShowcase({id}){const M=minis[id];return M?<M/>:null}
export const hasMini=id=>id in minis;
