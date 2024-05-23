var ke=Object.defineProperty;var _e=(e,i,s)=>i in e?ke(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s;var x=(e,i,s)=>(_e(e,typeof i!="symbol"?i+"":i,s),s);import{s as Te,n as ce,r as he,o as Ye,a as Xe,b as re}from"../chunks/scheduler.Bmg8oFKD.js";import{S as Ce,i as De,s as M,e as _,k as Me,d as X,f as I,c as T,a as H,l as ee,m as u,n as P,g as ae,h as p,o as te,p as q,q as Ie}from"../chunks/index.Ui-3iRQh.js";import{e as oe}from"../chunks/each.D6YF6ztN.js";const de=500,He=300,ue=500,Pe=300;class Ae{constructor(){x(this,"isMoving",!1);x(this,"isLongclick",!1);x(this,"button",0);x(this,"lastX",0);x(this,"lastY",0);x(this,"consecutiveClicks",0);x(this,"lastMouseupTime",0);x(this,"activeElement",null);this.reset()}reset(){this.isMoving=!1,this.isLongclick=!1,this.button=0,this.lastX=0,this.lastY=0,this.consecutiveClicks=0,this.lastMouseupTime=0,this.activeElement=null}}class Ve{constructor(){x(this,"isDragging",!1);x(this,"isPinching",!1);x(this,"isLongpressed",!1);x(this,"consecutiveTaps",0);x(this,"lastTouchendTime",0);x(this,"lastCenterX",0);x(this,"lastCenterY",0);x(this,"identifier",0);x(this,"x",0);x(this,"y",0);x(this,"hypotenuse",0);x(this,"activeElement",null);this.reset()}reset(){this.isDragging=!1,this.isPinching=!1,this.isLongpressed=!1,this.consecutiveTaps=0,this.lastTouchendTime=0,this.lastCenterX=0,this.lastCenterY=0,this.identifier=0,this.x=0,this.y=0,this.hypotenuse=0,this.activeElement=null}}let R=[],n=new Ae,t=new Ve;const c=(e,i)=>{e!=null&&e.dispatchEvent(new CustomEvent("gesture",{detail:i,bubbles:!1,cancelable:!1}))},fe=e=>{n.reset(),t.reset(),n.lastMouseupTime=Date.now(),window.removeEventListener("mousemove",ne),window.removeEventListener("mouseup",se),window.removeEventListener("touchmove",ie),window.removeEventListener("touchend",U)},me=e=>{if(window.removeEventListener("mousemove",ne),window.removeEventListener("mouseup",se),window.removeEventListener("touchmove",ie),window.removeEventListener("touchend",U),n.isMoving)if(n.isMoving=!1,n.isLongclick)n.isLongclick=!1,c(n.activeElement,{event:e,name:"longclick-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});else switch(n.button){case 0:c(n.activeElement,{event:e,name:"left-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break;case 1:c(n.activeElement,{event:e,name:"middle-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break;case 2:c(n.activeElement,{event:e,name:"right-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break}n.isLongclick&&c(n.activeElement,{event:e,name:"longclick-release",x:n.lastX,y:n.lastY,dx:0,dy:0}),n.reset(),t.isDragging&&(t.isDragging=!1,t.isLongpressed?(t.isLongpressed=!1,c(t.activeElement,{event:e,name:"longpress-drag-end",x:t.lastCenterX,y:t.lastCenterY,dx:0,dy:0})):c(t.activeElement,{event:e,name:"touch-drag-end",x:t.lastCenterX,y:t.lastCenterY,dx:0,dy:0})),t.isLongpressed&&c(t.activeElement,{event:e,name:"longpress-release",x:t.lastCenterX,y:t.lastCenterY,dx:0,dy:0}),t.reset()},pe=e=>{c(e.target,{event:e,name:"wheel",x:e.clientX,y:e.clientY,dx:0,dy:0})},xe=e=>{e.preventDefault(),e.stopPropagation()},ye=e=>{document.activeElement!==e.target&&(window.addEventListener("mousemove",ne),window.addEventListener("mouseup",se),n.activeElement=e.target,n.lastX=e.clientX,n.lastY=e.clientY,n.isMoving||(n.button=e.button),n.button===0&&window.setTimeout(()=>{Date.now()-n.lastMouseupTime>=ue&&!n.isMoving&&(n.isLongclick=!0,c(n.activeElement,{event:e,name:"longclick",x:e.clientX,y:e.clientY,dx:0,dy:0}))},ue))},ne=e=>{if(e.movementX===0&&e.movementY===0)return;let i=e.clientX-n.lastX,s=e.clientY-n.lastY;if(!n.isMoving)if(n.isLongclick)c(n.activeElement,{event:e,name:"longclick-drag-start",x:e.clientX,y:e.clientY,dx:0,dy:0});else switch(n.button){case 0:c(n.activeElement,{event:e,name:"left-click-drag-start",x:e.clientX,y:e.clientY,dx:0,dy:0});break;case 1:c(n.activeElement,{event:e,name:"middle-click-drag-start",x:e.clientX,y:e.clientY,dx:0,dy:0});break;case 2:c(n.activeElement,{event:e,name:"right-click-drag-start",x:e.clientX,y:e.clientY,dx:0,dy:0});break}if(n.isMoving=!0,n.lastX=e.clientX,n.lastY=e.clientY,n.isLongclick)c(n.activeElement,{event:e,name:"longclick-dragging",x:e.clientX,y:e.clientY,dx:i,dy:s});else switch(n.button){case 0:c(n.activeElement,{event:e,name:"left-click-dragging",x:e.clientX,y:e.clientY,dx:i,dy:s});break;case 1:c(n.activeElement,{event:e,name:"middle-click-dragging",x:e.clientX,y:e.clientY,dx:i,dy:s});break;case 2:c(n.activeElement,{event:e,name:"right-click-dragging",x:e.clientX,y:e.clientY,dx:i,dy:s});break}},se=e=>{if(window.removeEventListener("mousemove",ne),window.removeEventListener("mouseup",se),n.lastMouseupTime=Date.now(),n.isMoving)if(n.isMoving=!1,n.isLongclick)n.isLongclick=!1,c(n.activeElement,{event:e,name:"longclick-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});else switch(n.button){case 0:c(n.activeElement,{event:e,name:"left-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break;case 1:c(n.activeElement,{event:e,name:"middle-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break;case 2:c(n.activeElement,{event:e,name:"right-click-drag-end",x:n.lastX,y:n.lastY,dx:0,dy:0});break}else n.isLongclick||(e.button===2?c(n.activeElement,{event:e,name:"right-click",x:e.clientX,y:e.clientY,dx:0,dy:0}):e.button===1?c(n.activeElement,{event:e,name:"middle-click",x:e.clientX,y:e.clientY,dx:0,dy:0}):(n.consecutiveClicks===0&&c(n.activeElement,{event:e,name:"left-click",x:e.clientX,y:e.clientY,dx:0,dy:0}),n.consecutiveClicks++,window.setTimeout(()=>{n.consecutiveClicks>1&&c(n.activeElement,{event:e,name:"double-click",x:e.clientX,y:e.clientY,dx:0,dy:0}),n.consecutiveClicks=0},Pe)));n.isLongclick&&c(n.activeElement,{event:e,name:"longclick-release",x:e.clientX,y:e.clientY,dx:0,dy:0}),n.isLongclick=!1},Ee=e=>{if(e.touches.length>1,document.activeElement!==e.target){if(e.touches.length>1){if(e.touches[0].identifier===t.identifier)return;t.isPinching=!0}window.addEventListener("touchmove",ie,{passive:!1}),window.addEventListener("touchend",U),window.addEventListener("touchcancel",U),t.identifier=e.touches[0].identifier,t.x=e.touches[0].clientX,t.y=e.touches[0].clientY,t.activeElement=e.target,window.setTimeout(()=>{t.isPinching||t.isDragging||Date.now()-t.lastTouchendTime>=de&&(t.isDragging=!1,t.isPinching=!1,t.hypotenuse=null,t.isLongpressed=!0,c(t.activeElement,{event:e,name:"longpress",x:t.x,y:t.y,dx:0,dy:0}))},de)}},ie=e=>{if(t.isDragging){let i=t.x,s=t.y;t.x=e.touches[0].clientX,t.y=e.touches[0].clientY;let o=t.x-i,r=t.y-s;t.isLongpressed?c(t.activeElement,{event:e,name:"longpress-dragging",x:t.x,y:t.y,dx:o,dy:r,force:e.touches[0].force}):c(t.activeElement,{event:e,name:"touch-dragging",x:t.x,y:t.y,dx:o,dy:r,force:e.touches[0].force});return}else if(!t.isLongpressed&&(t.isPinching||e.touches.length>1)){t.x=e.touches[0].clientX,t.y=e.touches[0].clientY;let i={x:e.touches[1].clientX,y:e.touches[1].clientY},s={x:(t.x+i.x)/2,y:(t.y+i.y)/2},o=Math.hypot(t.x-i.x,t.y-i.y);t.hypotenuse===null&&(t.hypotenuse=o,t.lastCenterX=s.x,t.lastCenterY=s.y,c(t.activeElement,{event:e,name:"pinch-start",x:s.x,y:s.y,dx:0,dy:0})),t.isPinching=!0;let r=o/t.hypotenuse,E=s.x-t.lastCenterX,f=s.y-t.lastCenterY;c(t.activeElement,{event:e,name:"pinching",x:s.x,y:s.y,zoom:r,dx:E,dy:f}),t.hypotenuse=o,t.lastCenterX=s.x,t.lastCenterY=s.y;return}else t.isDragging=!0,t.isLongpressed?(c(t.activeElement,{event:e,name:"longpress-drag-start",x:t.x,y:t.y,dx:0,dy:0,force:e.touches[0].force}),t.x=e.touches[0].clientX,t.y=e.touches[0].clientY,c(t.activeElement,{event:e,name:"longpress-dragging",x:t.x,y:t.y,dx:0,dy:0,force:e.touches[0].force})):(c(t.activeElement,{event:e,name:"touch-drag-start",x:t.x,y:t.y,dx:0,dy:0,force:e.touches[0].force}),t.x=e.touches[0].clientX,t.y=e.touches[0].clientY,c(t.activeElement,{event:e,name:"touch-dragging",x:t.x,y:t.y,dx:0,dy:0,force:e.touches[0].force}))},U=e=>{t.isDragging&&e.touches.length>0&&e.touches[0].identifier===t.identifier||(t.lastTouchendTime=Date.now(),window.removeEventListener("touchmove",ie),window.removeEventListener("touchend",U),window.removeEventListener("touchcancel",U),t.isDragging?(t.isDragging=!1,t.isLongpressed?(t.isLongpressed=!1,c(t.activeElement,{event:e,name:"longpress-drag-end",x:t.x,y:t.y,dx:0,dy:0})):c(t.activeElement,{event:e,name:"touch-drag-end",x:t.x,y:t.y,dx:0,dy:0})):t.isPinching?(t.isPinching=!1,t.hypotenuse=null,c(t.activeElement,{event:e,name:"pinch-end",x:t.lastCenterX,y:t.lastCenterY,dx:0,dy:0})):t.isLongpressed||(t.consecutiveTaps===0&&c(t.activeElement,{event:e,name:"tap",x:t.x,y:t.y,dx:0,dy:0}),t.consecutiveTaps++,window.setTimeout(()=>{t.consecutiveTaps>1&&c(t.activeElement,{event:e,name:"double-tap",x:t.x,y:t.y,dx:0,dy:0}),t.consecutiveTaps=0},He)),t.isLongpressed&&c(t.activeElement,{event:e,name:"longpress-release",x:t.x,y:t.y,dx:0,dy:0}),t.isLongpressed=!1)};function Be(...e){for(let i of e)R.findIndex(s=>s===i)===-1&&(R.length==0&&(window.addEventListener("blur",me),window.addEventListener("focus",fe)),R.push(i),i.addEventListener("touchstart",Ee,{passive:!1}),i.addEventListener("mousedown",ye,{passive:!1}),i.addEventListener("contextmenu",xe,{passive:!1}),i.addEventListener("wheel",pe,{passive:!1}))}function We(...e){const i=s=>{s.removeEventListener("touchstart",Ee),s.removeEventListener("mousedown",ye),s.removeEventListener("contextmenu",xe),s.removeEventListener("wheel",pe)};if(e.length==0){for(let s of R)i(s);R=[]}else for(let s of e){let o=R.findIndex(r=>r===s);o!==-1&&(i(s),R.splice(o,1))}R.length==0&&(window.removeEventListener("blur",me),window.removeEventListener("focus",fe))}function ve(e,i,s){const o=e.slice();return o[34]=i[s],o[35]=i,o[36]=s,o}function ge(e){let i,s,o,r,E,f,a='<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" class="svelte-1xsd055"><path fill-rule="evenodd" d="M21.002,26.588l10.357,10.604c1.039,1.072,1.715,1.083,2.773,0l2.078-2.128 c1.018-1.042,1.087-1.726,0-2.839L25.245,21L36.211,9.775c1.027-1.055,1.047-1.767,0-2.84l-2.078-2.127 c-1.078-1.104-1.744-1.053-2.773,0L21.002,15.412L10.645,4.809c-1.029-1.053-1.695-1.104-2.773,0L5.794,6.936 c-1.048,1.073-1.029,1.785,0,2.84L16.759,21L5.794,32.225c-1.087,1.113-1.029,1.797,0,2.839l2.077,2.128 c1.049,1.083,1.725,1.072,2.773,0L21.002,26.588z"></path></svg>',m,h,A;function b(){e[12].call(r,e[35],e[36])}function S(){return e[13](e[34])}return{c(){i=_("div"),s=_("div"),o=M(),r=_("input"),E=M(),f=_("div"),f.innerHTML=a,this.h()},l(L){i=T(L,"DIV",{id:!0,class:!0});var v=H(i);s=T(v,"DIV",{class:!0}),H(s).forEach(X),o=I(v),r=T(v,"INPUT",{name:!0,type:!0,class:!0}),E=I(v),f=T(v,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),ee(f)!=="svelte-13nifp1"&&(f.innerHTML=a),v.forEach(X),this.h()},h(){u(s,"class","tab-divider svelte-1xsd055"),u(r,"name","title-input"),u(r,"type","text"),u(r,"class","svelte-1xsd055"),u(f,"id","close-tab"),u(f,"class","tab-bar-btn svelte-1xsd055"),u(i,"id",m=e[34].id),u(i,"class","tab svelte-1xsd055"),P(i,"closing",e[4]),P(i,"active",e[34].id===e[1])},m(L,v){ae(L,i,v),p(i,s),p(i,o),p(i,r),te(r,e[34].title),p(i,E),p(i,f),h||(A=[q(r,"input",b),q(f,"click",S)],h=!0)},p(L,v){e=L,v[0]&1&&r.value!==e[34].title&&te(r,e[34].title),v[0]&1&&m!==(m=e[34].id)&&u(i,"id",m),v[0]&16&&P(i,"closing",e[4]),v[0]&3&&P(i,"active",e[34].id===e[1])},d(L){L&&X(i),h=!1,he(A)}}}function Oe(e){let i,s,o,r,E='<svg viewBox="-3 -3 22 22" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(270)" class="svelte-1xsd055"><path fill="currentColor" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"></path></svg>',f,a,m,h,A,b,S='<svg viewBox="-3 -3 22 22" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)" class="svelte-1xsd055"><path fill="currentColor" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"></path></svg>',L,v,z=`<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" xml:space="preserve" class="svelte-1xsd055"><path d="M39.5,22.5v-3c0-1.48-0.43-2-2-2h-13v-13c0-1.48-0.49-2-2-2h-3c-1.55,0-2,0.52-2,2v13h-14c-1.48,0-2,0.49-2,2v3
                  c0,1.55,0.52,2,2,2h14v14c0,1.51,0.48,2,2,2h3c1.48,0,2-0.43,2-2v-14h13C39.01,24.5,39.5,24.02,39.5,22.5z"></path></svg>`,F,B,j,W,Y,K,V,J,Q,O=oe(e[0]),y=[];for(let g=0;g<O.length;g+=1)y[g]=ge(ve(e,O,g));return{c(){i=M(),s=_("div"),o=_("div"),r=_("div"),r.innerHTML=E,f=M(),a=_("div");for(let g=0;g<y.length;g+=1)y[g].c();m=M(),h=_("div"),A=M(),b=_("div"),b.innerHTML=S,L=M(),v=_("div"),v.innerHTML=z,F=M(),B=_("div"),j=M(),W=_("div"),Y=_("textarea"),K=M(),V=_("div"),this.h()},l(g){Me("svelte-x0909",document.head).forEach(X),i=I(g),s=T(g,"DIV",{class:!0});var d=H(s);o=T(d,"DIV",{class:!0});var D=H(o);r=T(D,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),ee(r)!=="svelte-ti7f9m"&&(r.innerHTML=E),f=I(D),a=T(D,"DIV",{id:!0,class:!0});var N=H(a);for(let Z=0;Z<y.length;Z+=1)y[Z].l(N);m=I(N),h=T(N,"DIV",{id:!0,class:!0}),H(h).forEach(X),N.forEach(X),A=I(D),b=T(D,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),ee(b)!=="svelte-1uju0bs"&&(b.innerHTML=S),L=I(D),v=T(D,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),ee(v)!=="svelte-m0qxev"&&(v.innerHTML=z),D.forEach(X),F=I(d),B=T(d,"DIV",{class:!0}),H(B).forEach(X),j=I(d),W=T(d,"DIV",{class:!0});var $=H(W);Y=T($,"TEXTAREA",{spellcheck:!0,name:!0,id:!0,class:!0}),H(Y).forEach(X),$.forEach(X),K=I(d),V=T(d,"DIV",{class:!0}),H(V).forEach(X),d.forEach(X),this.h()},h(){document.title="Not Notepad",u(r,"id","back"),u(r,"class","tab-bar-btn svelte-1xsd055"),P(r,"hide",!e[5]),u(h,"id","placeholder"),u(h,"class","tab svelte-1xsd055"),u(a,"id","tabs"),u(a,"class","svelte-1xsd055"),u(b,"id","forward"),u(b,"class","tab-bar-btn svelte-1xsd055"),P(b,"hide",!e[5]),u(v,"id","new-tab"),u(v,"class","tab-bar-btn svelte-1xsd055"),u(o,"class","tab-bar svelte-1xsd055"),P(o,"minimal",!e[5]),u(B,"class","toolbar svelte-1xsd055"),u(Y,"spellcheck","false"),u(Y,"name","editor"),u(Y,"id","text"),u(Y,"class","svelte-1xsd055"),u(W,"class","editor svelte-1xsd055"),u(V,"class","status-bar svelte-1xsd055"),u(s,"class","main-grid svelte-1xsd055")},m(g,C){ae(g,i,C),ae(g,s,C),p(s,o),p(o,r),p(o,f),p(o,a);for(let d=0;d<y.length;d+=1)y[d]&&y[d].m(a,null);p(a,m),p(a,h),e[14](h),e[15](a),p(o,A),p(o,b),p(o,L),p(o,v),p(s,F),p(s,B),p(s,j),p(s,W),p(W,Y),te(Y,e[6].text),p(s,K),p(s,V),J||(Q=[q(window,"resize",e[7]),q(r,"click",e[11]),q(b,"click",e[16]),q(v,"click",e[9]),q(Y,"input",e[17])],J=!0)},p(g,C){if(C[0]&32&&P(r,"hide",!g[5]),C[0]&1043){O=oe(g[0]);let d;for(d=0;d<O.length;d+=1){const D=ve(g,O,d);y[d]?y[d].p(D,C):(y[d]=ge(D),y[d].c(),y[d].m(a,m))}for(;d<y.length;d+=1)y[d].d(1);y.length=O.length}C[0]&32&&P(b,"hide",!g[5]),C[0]&32&&P(o,"minimal",!g[5]),C[0]&64&&te(Y,g[6].text)},i:ce,o:ce,d(g){g&&(X(i),X(s)),Ie(y,g),e[14](null),e[15](null),J=!1,he(Q)}}}function Re(e,i,s){let o,r=[],E=[],f=null,a,m,h,A=0,b=0,S=0,L=!1,v=!1,z=!1;const F=(l,w=300)=>{let k;return(...G)=>{clearTimeout(k),k=setTimeout(()=>{l.apply(this,G)},w)}},B=()=>{s(5,z=a.scrollWidth>a.clientWidth)},j=l=>{a.scrollBy({left:l,behavior:"smooth"})},W=()=>{let l=Date.now().toString();r.push({id:l,title:"Untitled",text:""}),E.push(l),s(0,r),V(l),setTimeout(()=>{s(2,a.scrollLeft=a.scrollWidth,a)},0)},Y=l=>{let w=E.indexOf(l);if(s(0,r=r.filter(k=>k.id!=l)),E=E.filter(k=>k!=l),s(4,L=!0),S=a.children[w].clientWidth,a.style.setProperty("--max-width",`${S}px`),z){let k=h.cloneNode();k.classList.add("filler"),k.style.backgroundColor="transparent",k.style.pointerEvents="none",a.appendChild(k)}K(),f==l&&V(E[Math.min(w,E.length-1)]||null)},K=F(()=>{a.querySelectorAll(".filler").forEach(l=>{l.remove()}),s(4,L=!1)},700),V=l=>{f!=l&&((l==null||!E.includes(l))&&s(1,f=null),s(1,f=l))},J=l=>{v=!0,m=l.target,A=l.detail.x-m.getBoundingClientRect().x,m.insertAdjacentElement("afterend",h),a.insertAdjacentElement("afterend",m),m.classList.add("dragging"),m.style.setProperty("--max-width",`${h.clientWidth}px`),requestAnimationFrame(y),Q(l),setTimeout(()=>{m.classList.add("dragging-then")},0)},Q=l=>{b=l.detail.x,m.style.setProperty("--x",`${b-A}px`);let w=m.getBoundingClientRect().x+m.offsetWidth/2;for(let k=0;k<a.children.length;k++){let G=a.children[k];if(G===h)continue;let le=G.getBoundingClientRect();if(!(w<le.left||w>le.right)){h.getBoundingClientRect().left>le.left?G.insertAdjacentElement("beforebegin",h):G.insertAdjacentElement("afterend",h);break}}},O=()=>{v=!1,m.classList.remove("dragging"),m.classList.remove("dragging-then"),h.insertAdjacentElement("afterend",m),h.remove(),E=[];for(let l=0;l<a.children.length;l++){let w=a.children[l];w.classList.contains("tab")&&E.push(w.id)}C()},y=()=>{v&&(b<a.offsetLeft&&s(2,a.scrollLeft-=2,a),b>a.offsetLeft+a.clientWidth&&s(2,a.scrollLeft+=2,a),requestAnimationFrame(y))},g=l=>{if(!l.classList.contains("tab"))return;l.children.namedItem("title-input").select()},C=()=>{We();for(let l=0;l<a.children.length;l++){let w=a.children[l];w.classList.contains("tab")&&(Be(w),w.addEventListener("gesture",d))}},d=l=>{switch(l.detail.name){case"left-click-drag-start":case"longclick":case"longpress":l.detail.event.preventDefault(),J(l);break;case"left-click-dragging":case"longclick-dragging":case"longpress-dragging":Q(l);break;case"left-click-drag-end":case"longclick-drag-end":case"longclick-release":case"longpress-drag-end":case"longpress-release":O();break;case"left-click":case"tap":V(l.target.id);break;case"double-click":case"double-tap":g(l.target);break}};Ye(()=>{h.remove()}),Xe(()=>{B(),C()});const D=()=>j(-80);function N(l,w){l[w].title=this.value,s(0,r)}const $=l=>Y(l.id);function Z(l){re[l?"unshift":"push"](()=>{h=l,s(3,h)})}function be(l){re[l?"unshift":"push"](()=>{a=l,s(2,a)})}const we=()=>{j(80)};function Le(){o.text=this.value,s(6,o),s(0,r),s(1,f)}return e.$$.update=()=>{e.$$.dirty[0]&3&&s(6,o=r.find(l=>l.id==f)||{text:"Click the ➕ above to create a new tab."})},[r,f,a,h,L,z,o,B,j,W,Y,D,N,$,Z,be,we,Le]}class Ne extends Ce{constructor(i){super(),De(this,i,Re,Oe,Te,{},null,[-1,-1])}}export{Ne as component};
