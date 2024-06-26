import{s as de,n as le,r as Oe,j as ne,y as Ve,b as V,c as Ie,o as We,a as Xe,z as ke}from"../chunks/scheduler.DVqiRabw.js";import{S as he,i as pe,e as L,s as q,c as A,a as P,f as U,k as De,d as k,l as _,C as O,g as Q,h as D,D as ie,m as M,E as ve,F as qe,G as se,x as oe,y as re,z as ue,v as Ue,r as Ye,p as Z,o as K,A as ce,H as Ce}from"../chunks/index.CFDFe1_f.js";import{e as _e,u as Fe,o as ze,a as me,c as j,b as we}from"../chunks/animate.BOGdB0XF.js";import{b as fe,w as Ge}from"../chunks/paths.2Ylvf52p.js";function je(s){let e,t,n,a,i,o=`<div class="close-icon svelte-bs8mi7" style="-webkit-mask: url(${fe}/images/svg/cancel.svg) no-repeat center / contain; mask: url(${fe}/images/svg/cancel.svg) no-repeat center / contain;"></div>`,b,v;return{c(){e=L("div"),t=L("button"),n=L("input"),a=q(),i=L("button"),i.innerHTML=o,this.h()},l(r){e=A(r,"DIV",{class:!0});var p=P(e);t=A(p,"BUTTON",{class:!0,draggable:!0});var d=P(t);n=A(d,"INPUT",{autocorrect:!0,autocomplete:!0,spellcheck:!0,type:!0,class:!0}),a=U(d),i=A(d,"BUTTON",{class:!0,draggable:!0,"data-svelte-h":!0}),De(i)!=="svelte-115ed59"&&(i.innerHTML=o),d.forEach(k),p.forEach(k),this.h()},h(){_(n,"autocorrect","off"),_(n,"autocomplete","off"),_(n,"spellcheck","false"),_(n,"type","text"),_(n,"class","svelte-bs8mi7"),_(i,"class","close-button svelte-bs8mi7"),_(i,"draggable","true"),_(t,"class","tab svelte-bs8mi7"),_(t,"draggable","true"),O(t,"active",s[1]),_(e,"class","container svelte-bs8mi7"),O(e,"preventHover",s[2])},m(r,p){Q(r,e,p),D(e,t),D(t,n),s[8](n),ie(n,s[0]),D(t,a),D(t,i),b||(v=[M(n,"input",s[9]),M(i,"click",ve(function(){ne(s[3])&&s[3].apply(this,arguments)})),M(i,"dragstart",ve(qe(s[7]))),M(t,"dblclick",se(s[10])),M(t,"mousedown",se(function(){ne(s[4])&&s[4].apply(this,arguments)})),M(t,"touchstart",se(function(){ne(s[4])&&s[4].apply(this,arguments)})),M(t,"dragstart",se(function(){ne(s[5])&&s[5].apply(this,arguments)}))],b=!0)},p(r,[p]){s=r,p&1&&n.value!==s[0]&&ie(n,s[0]),p&2&&O(t,"active",s[1]),p&4&&O(e,"preventHover",s[2])},i:le,o:le,d(r){r&&k(e),s[8](null),b=!1,Oe(v)}}}function xe(s,e,t){let{title:n=""}=e,{active:a=!1}=e,{preventHover:i=!1}=e,{onClose:o=()=>{}}=e,{onPointerdown:b=u=>{}}=e,{onDragstart:v=u=>{}}=e,r;function p(u){Ve.call(this,s,u)}function d(u){V[u?"unshift":"push"](()=>{r=u,t(6,r)})}function f(){n=this.value,t(0,n)}const C=()=>r.select();return s.$$set=u=>{"title"in u&&t(0,n=u.title),"active"in u&&t(1,a=u.active),"preventHover"in u&&t(2,i=u.preventHover),"onClose"in u&&t(3,o=u.onClose),"onPointerdown"in u&&t(4,b=u.onPointerdown),"onDragstart"in u&&t(5,v=u.onDragstart)},[n,a,i,o,b,v,r,p,d,f,C]}class Le extends he{constructor(e){super(),pe(this,e,xe,je,de,{title:0,active:1,preventHover:2,onClose:3,onPointerdown:4,onDragstart:5})}}let Je=0;const N=Ge({tabs:[],activeIndex:0,placeholderIndex:-1}),B={newTab:s=>{const{data:e={id:Je++,title:"Untitled",text:""},index:t=-1,callback:n=()=>{}}=s||{};N.update(a=>(a.tabs.some(i=>i.id==e.id)||(t<0?(a.tabs.push(e),a.activeIndex=a.tabs.length-1):(a.tabs.splice(t,0,e),a.activeIndex=t)),a)),n()},removeTab:s=>{N.update(e=>(s<0||s>=e.tabs.length||(e.placeholderIndex==s&&(e.placeholderIndex=-1),e.tabs.splice(s,1),s==e.activeIndex-1?e.activeIndex=Math.max(0,s):e.activeIndex=Math.min(e.activeIndex,e.tabs.length-1)),e))},setActiveIndex:s=>{N.update(e=>(s<0?e.activeIndex=0:s>e.tabs.length?e.activeIndex=e.tabs.length-1:e.activeIndex=s,e))},setPlaceholderIndex:s=>{N.update(e=>(e.placeholderIndex=s===void 0||s<0||s>=e.tabs.length?-1:s,e))},moveTab:(s,e,t=()=>{})=>{s!=e&&(N.update(n=>{if(s<0||s>=n.tabs.length||e<0||e>=n.tabs.length)return n;const a=n.tabs[s];return n.tabs.splice(s,1),n.tabs.splice(e,0,a),n.activeIndex==s&&(n.activeIndex=e),n.placeholderIndex==s&&(n.placeholderIndex=e),n}),t())}};function Te(s,e,t){const n=s.slice();return n[38]=e[t],n[39]=e,n[40]=t,n}function Ee(s,e){let t,n,a,i,o=e[40],b,v,r;function p(){return e[14](e[40])}function d(...w){return e[15](e[40],...w)}function f(w){e[16](w,e[40])}let C={active:e[8].activeIndex==e[40],preventHover:e[7],onClose:p,onPointerdown:d,onDragstart:e[12]};e[8].tabs[e[40]].title!==void 0&&(C.title=e[8].tabs[e[40]].title),n=new Le({props:C}),V.push(()=>Ce(n,"title",f));const u=()=>e[17](t,o),H=()=>e[17](null,o);return{key:s,first:null,c(){t=L("div"),oe(n.$$.fragment),i=q(),this.h()},l(w){t=A(w,"DIV",{class:!0});var T=P(t);re(n.$$.fragment,T),i=U(T),T.forEach(k),this.h()},h(){_(t,"class","tab-container svelte-12h9f9m"),O(t,"placeholder",e[8].placeholderIndex==e[40]),this.first=t},m(w,T){Q(w,t,T),ue(n,t,null),D(t,i),u(),b=!0,v||(r=Xe(e[11].call(null,t)),v=!0)},p(w,T){e=w;const I={};T[0]&256&&(I.active=e[8].activeIndex==e[40]),T[0]&128&&(I.preventHover=e[7]),T[0]&256&&(I.onClose=p),T[0]&256&&(I.onPointerdown=d),!a&&T[0]&256&&(a=!0,I.title=e[8].tabs[e[40]].title,ke(()=>a=!1)),n.$set(I),o!==e[40]&&(H(),o=e[40],u()),(!b||T[0]&256)&&O(t,"placeholder",e[8].placeholderIndex==e[40])},i(w){b||(Z(n.$$.fragment,w),b=!0)},o(w){K(n.$$.fragment,w),b=!1},d(w){w&&k(t),ce(n),H(),v=!1,r()}}}function Ze(s){let e,t,n,a=[],i=new Map,o,b,v,r=`<div class="new-tab-icon svelte-12h9f9m" style="-webkit-mask: url(${fe}/images/svg/plus.svg) no-repeat center / contain; mask: url(${fe}/images/svg/plus.svg) no-repeat center / contain;"></div>`,p,d,f,C,u,H,w,T,I=_e(s[8].tabs);const W=m=>m[38];for(let m=0;m<I.length;m+=1){let g=Te(s,I,m),E=W(g);i.set(E,a[m]=Ee(E,g))}return f=new Le({props:{title:s[3].title,active:!s[5],preventHover:!0}}),{c(){e=L("div"),t=L("div"),n=L("div");for(let m=0;m<a.length;m+=1)a[m].c();o=q(),b=L("div"),v=L("button"),v.innerHTML=r,p=q(),d=L("div"),oe(f.$$.fragment),C=q(),u=L("div"),this.h()},l(m){e=A(m,"DIV",{});var g=P(e);t=A(g,"DIV",{class:!0});var E=P(t);n=A(E,"DIV",{class:!0});var $=P(n);for(let Y=0;Y<a.length;Y+=1)a[Y].l($);$.forEach(k),o=U(E),b=A(E,"DIV",{class:!0});var ee=P(b);v=A(ee,"BUTTON",{class:!0,"data-svelte-h":!0}),De(v)!=="svelte-15g65px"&&(v.innerHTML=r),ee.forEach(k),p=U(E),d=A(E,"DIV",{class:!0});var te=P(d);re(f.$$.fragment,te),te.forEach(k),E.forEach(k),C=U(g),u=A(g,"DIV",{class:!0}),P(u).forEach(k),g.forEach(k),this.h()},h(){_(n,"class","tabs svelte-12h9f9m"),_(v,"class","new-tab-button svelte-12h9f9m"),_(b,"class","buttons svelte-12h9f9m"),_(d,"class","clone svelte-12h9f9m"),O(d,"dragging",s[0]),_(t,"class","toolbar svelte-12h9f9m"),_(u,"class","separator svelte-12h9f9m")},m(m,g){Q(m,e,g),D(e,t),D(t,n);for(let E=0;E<a.length;E+=1)a[E]&&a[E].m(n,null);s[18](n),D(t,o),D(t,b),D(b,v),D(t,p),D(t,d),ue(f,d,null),s[19](d),D(e,C),D(e,u),s[20](e),H=!0,w||(T=M(v,"click",s[9]),w=!0)},p(m,g){g[0]&13700&&(I=_e(m[8].tabs),Ue(),a=Fe(a,g,W,1,m,I,i,n,ze,Ee,null,Te),Ye());const E={};g[0]&8&&(E.title=m[3].title),g[0]&32&&(E.active=!m[5]),f.$set(E),(!H||g[0]&1)&&O(d,"dragging",m[0])},i(m){if(!H){for(let g=0;g<I.length;g+=1)Z(a[g]);Z(f.$$.fragment,m),H=!0}},o(m){for(let g=0;g<a.length;g+=1)K(a[g]);K(f.$$.fragment,m),H=!1},d(m){m&&k(e);for(let g=0;g<a.length;g+=1)a[g].d();s[18](null),ce(f),s[19](null),s[20](null),w=!1,T()}}}const Ke=12,ae=140,x=70,J=200,Qe=1600,ye=.3;function $e(s,e,t){let n;Ie(s,N,l=>t(8,n=l));let a,i=[],o=0,b=null,v=-1,r={id:-1,title:"",text:""},p,d,f,C=!1,u=!1,H=0,w=0,T=0,I,W=!1;const m=(l,c=300)=>{let h;return(...y)=>{clearTimeout(h),h=setTimeout(()=>{l.apply(this,y)},c)}};function g(){B.newTab()}const E=l=>{if(!i[l]){console.warn("Cannot close tab!");return}o=i[l].getBoundingClientRect().width,l<n.tabs.length-1&&(a.style.setProperty("--tab-max-width",`${o}px`),$()),l==n.tabs.length-1?B.setActiveIndex(l-1):l==n.activeIndex&&B.setActiveIndex(l+1),me({duration:J,easing:j,onStep:(c,h)=>{l==0?t(1,a.style.gridTemplateColumns=`minmax(${h*x}px, ${h*o}px)`,a):t(1,a.style.gridTemplateColumns=`repeat(${l}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${h*x}px, ${h*o}px)`,a)},onEnd:()=>{t(1,a.style.gridTemplateColumns="",a),B.removeTab(l)}})},$=m(()=>{a&&(a.style.setProperty("--tab-max-width",`${ae}px`),me({duration:J,easing:j,onStep:(l,c)=>{a.style.setProperty("--tab-max-width",`${o+l*(ae-o)}px`)},onEnd:()=>{a.style.setProperty("--tab-max-width",`${ae}px`)}}))},Qe);function ee(l){if(!a)return;const c=l.getBoundingClientRect().width;me({duration:J,easing:j,onStep:(h,y)=>{n.tabs.length==1?t(1,a.style.gridTemplateColumns=`minmax(${h*x}px, ${h*c}px)`,a):t(1,a.style.gridTemplateColumns=`repeat(${n.tabs.length-1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${h*x}px, ${h*c}px)`,a),t(1,a.scrollLeft=a.scrollWidth,a)},onEnd:()=>{t(1,a.style.gridTemplateColumns="",a)}})}const te=(l,c)=>{const h=i[0].getBoundingClientRect().width;B.moveTab(l,c,()=>{if(l>c)for(let y=c;y<l;y++)we(i[y],{duration:J,easing:j,css:(z,S)=>`transform: translateX(-${S*h}px);`});if(l<c)for(let y=c;y>l;y--)we(i[y],{duration:J,easing:j,css:(z,S)=>`transform: translateX(${S*h}px);`})})};function Y(l){!l.target||!l.dataTransfer||(l.dataTransfer.setData("text/plain",JSON.stringify(r)),l.dataTransfer.setDragImage(new Image,0,0))}function Ae(l,c){if(l==0&&c==0){t(4,f.style.left="-1000px",f),t(4,f.style.top="-1000px",f);return}let h=I.getBoundingClientRect();if(l<h.left||l>h.right||c<h.top||c>h.bottom){u||(T=0),t(4,f.style.left=`${l+H}px`,f),t(4,f.style.top=`${c+w}px`,f),t(5,u=!0);return}u&&t(5,u=!1),t(4,f.style.left=`${l+H}px`,f),t(4,f.style.top=`${d.top}px`,f);const y=-a.scrollLeft,z=i[0].getBoundingClientRect().width;let S=-1;if(l>y+n.tabs.length*z)S=n.tabs.length-1;else for(let G=0;G<n.tabs.length;G++)if(l>y+G*z&&l<y+(G+1)*z){S=G;break}l<20?(T=-ye,requestAnimationFrame(ge)):l>a.clientWidth-10?(T=ye,requestAnimationFrame(ge)):T=0,!(S==-1||S==n.placeholderIndex)&&te(n.placeholderIndex,S)}let F=0;function ge(l){if(!C||T==0){F=0;return}F==0&&(F=l);const c=l-F;F=l,a.scrollBy({left:T*c}),requestAnimationFrame(ge)}function be(l,c){if(!l.target)return;let h,y;l instanceof TouchEvent?(h=l.touches[0].clientX,y=l.touches[0].clientY,l.preventDefault()):(h=l.clientX,y=l.clientY),window.addEventListener("touchmove",X,{passive:!1}),window.addEventListener("touchend",R),window.addEventListener("mousemove",X),window.addEventListener("mouseup",R),window.addEventListener("drag",X),window.addEventListener("dragend",R),window.addEventListener("blur",R),B.setActiveIndex(c),p=l.target,d=p.getBoundingClientRect(),b=[h,y],H=d.left-h,w=d.top-y,t(4,f.style.width=`${d.width}px`,f),t(4,f.style.left=`${d.left}px`,f),t(4,f.style.top=`${d.top}px`,f),t(3,r={...n.tabs[c]}),v=c}function X(l){let c,h;if(l instanceof TouchEvent?(c=l.touches[0].clientX,h=l.touches[0].clientY,l.preventDefault()):(c=l.clientX,h=l.clientY),C){Ae(c,h);return}b===null||Math.hypot(b[0]-c,b[1]-h)<Ke||(t(0,C=!0),B.setPlaceholderIndex(v),B.setActiveIndex(v))}function R(){window.removeEventListener("touchmove",X),window.removeEventListener("touchend",R),window.removeEventListener("mousemove",X),window.removeEventListener("mouseup",R),window.removeEventListener("drag",X),window.removeEventListener("dragend",R),window.removeEventListener("blur",R),b=null,t(5,u=!1),v=-1,H=0,w=0,B.setPlaceholderIndex(),t(0,C=!1)}We(()=>{a.style.setProperty("--tab-max-width",`${ae}px`),a.style.setProperty("--tab-min-width",`${x}px`)});const He=l=>E(l),Pe=(l,c)=>be(c,l);function Be(l,c){s.$$.not_equal(n.tabs[c].title,l)&&(n.tabs[c].title=l,N.set(n))}function Se(l,c){V[l?"unshift":"push"](()=>{i[c]=l,t(2,i)})}function Me(l){V[l?"unshift":"push"](()=>{a=l,t(1,a)})}function Re(l){V[l?"unshift":"push"](()=>{f=l,t(4,f)})}function Ne(l){V[l?"unshift":"push"](()=>{I=l,t(6,I)})}return s.$$.update=()=>{s.$$.dirty[0]&1&&(C?t(7,W=!0):setTimeout(()=>t(7,W=!1),20))},[C,a,i,r,f,u,I,W,n,g,E,ee,Y,be,He,Pe,Be,Se,Me,Re,Ne]}class et extends he{constructor(e){super(),pe(this,e,$e,Ze,de,{},null,[-1,-1])}}function tt(s){let e,t,n,a;return{c(){e=L("div"),t=L("textarea"),this.h()},l(i){e=A(i,"DIV",{id:!0,class:!0});var o=P(e);t=A(o,"TEXTAREA",{spellcheck:!0,name:!0,id:!0,placeholder:!0,class:!0}),P(t).forEach(k),o.forEach(k),this.h()},h(){_(t,"spellcheck","false"),_(t,"name","editor"),_(t,"id","text"),_(t,"placeholder","Enter text here"),_(t,"class","svelte-7cpmmf"),_(e,"id","editor"),_(e,"class","svelte-7cpmmf")},m(i,o){Q(i,e,o),D(e,t),ie(t,s[0]),n||(a=M(t,"input",s[1]),n=!0)},p(i,[o]){o&1&&ie(t,i[0])},i:le,o:le,d(i){i&&k(e),n=!1,a()}}}function nt(s,e,t){let{text:n}=e;function a(){n=this.value,t(0,n)}return s.$$set=i=>{"text"in i&&t(0,n=i.text)},[n,a]}class st extends he{constructor(e){super(),pe(this,e,nt,tt,de,{text:0})}}function at(s){let e,t,n,a,i,o;t=new et({});function b(r){s[2](r)}let v={};return s[0].text!==void 0&&(v.text=s[0].text),a=new st({props:v}),V.push(()=>Ce(a,"text",b)),{c(){e=L("div"),oe(t.$$.fragment),n=q(),oe(a.$$.fragment),this.h()},l(r){e=A(r,"DIV",{class:!0});var p=P(e);re(t.$$.fragment,p),n=U(p),re(a.$$.fragment,p),p.forEach(k),this.h()},h(){_(e,"class","container svelte-16qa0xo")},m(r,p){Q(r,e,p),ue(t,e,null),D(e,n),ue(a,e,null),o=!0},p(r,[p]){const d={};!i&&p&1&&(i=!0,d.text=r[0].text,ke(()=>i=!1)),a.$set(d)},i(r){o||(Z(t.$$.fragment,r),Z(a.$$.fragment,r),o=!0)},o(r){K(t.$$.fragment,r),K(a.$$.fragment,r),o=!1},d(r){r&&k(e),ce(t),ce(a)}}}function lt(s,e,t){let n,a;Ie(s,N,o=>t(1,a=o)),B.newTab({data:{id:-1,title:"Hello 👋",text:"Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.21"}});function i(o){s.$$.not_equal(n.text,o)&&(n.text=o,t(0,n),t(1,a))}return s.$$.update=()=>{s.$$.dirty&2&&t(0,n=a.tabs.length>0?a.tabs[a.activeIndex]:{text:"Click the ➕ above to create a new tab."})},[n,a,i]}class ct extends he{constructor(e){super(),pe(this,e,lt,at,de,{})}}export{ct as component};
