(function(){const e=document.createElement("div");e.id="my-stock-extension-widget";Object.assign(e.style,{position:"fixed",bottom:"20px",right:"20px",width:"260px",backgroundColor:"#121212",border:"1px solid #333333",borderRadius:"12px",boxShadow:"0 8px 24px rgba(0,0,0,0.5)",padding:"16px",zIndex:"999999",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',color:"#e8eaed",transform:"translateX(120%)",transition:"transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"});document.body.appendChild(e);function m(t){e.innerHTML=`
        <div style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 4px;">
            ${t}
        </div>
        <div style="font-size: 12px; color: #9aa0a6;">Loading official data...</div>
    `,e.style.transform="translateX(0)";const i="d6d8k81r01qgk7ml0g80d6d8k81r01qgk7ml0g8g";Promise.all([fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${t}&token=${i}`).then(o=>o.json()),fetch(`https://finnhub.io/api/v1/quote?symbol=${t}&token=${i}`).then(o=>o.json()),fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${t}&metric=all&token=${i}`).then(o=>o.json())]).then(([o,d,h])=>{const l=o.name||t,b=d.c.toFixed(2),s=d.dp.toFixed(2),f=s>=0?"#00c805":"#ff5000",x=s>=0?"+":"",p=h?.metric?.beta||1;let a="Moderate Risk",n="#fbbc04",r="50%";p>1.3?(a="High Risk (Volatile)",n="#ff5000",r="85%"):p<.8&&(a="Low Risk (Stable)",n="#00c805",r="20%"),e.onclick=()=>window.open(`https://finance.yahoo.com/quote/${t}`,"_blank"),e.style.cursor="pointer",e.innerHTML=`
            <div style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${l}">
                ${l}
            </div>
            
            <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
                <span style="font-size: 24px; font-weight: bold; color: ${f};">
                    $${b}
                </span>
                <span style="font-size: 14px; font-weight: bold; color: ${f};">
                    ${x}${s}%
                </span>
            </div>

            <div style="margin-bottom: 12px; background: #202124; padding: 10px; border-radius: 8px; border: 1px solid #3c4043;">
                <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 6px; color: #9aa0a6; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px;">
                    <span>Volatility Risk</span>
                    <span style="color: ${n};">${a}</span>
                </div>
                <div style="width: 100%; background: #3c4043; height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="width: ${r}; background: ${n}; height: 100%; border-radius: 3px; transition: width 1s ease-in-out;"></div>
                </div>
            </div>

            <div style="font-size: 11px; color: #9aa0a6; text-transform: uppercase;">
                ${t} Live Market Data
            </div>
        `}).catch(o=>{e.innerHTML=`
            <div style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 4px;">${t}</div>
            <div style="color: #ff5000; font-size: 12px;">Error fetching API data.</div>
        `,console.error("API Error:",o)}),setTimeout(()=>{e.style.transform="translateX(120%)"},15e3)}chrome.runtime.onMessage.addListener((t,i,o)=>{t.action==="updateTicker"&&m(t.ticker)});const g=window.location.href,c=g.match(/\/stocks\/([A-Z0-9]+)/);c&&m(c[1]);
})()