import{s as ce,n as K,r as Ne,j as se,y as Oe,b as S,c as Ie,o as ke,a as We,z as De}from"../chunks/scheduler.DVqiRabw.js";import{S as fe,i as he,e as C,s as O,c as L,a as P,f as W,k as Ce,d as k,l as _,C as N,g as $,h as I,D as be,m as V,E as ve,F as Xe,G as ae,x as ie,y as oe,z as re,v as Ue,q as Ye,r as Z,p as x,A as ue,H as Le}from"../chunks/index.BanqFhYS.js";import{e as _e,u as Fe,o as ze,a as ge,c as G,b as we}from"../chunks/animate.C9o6I5aN.js";/* empty css                      */import{b as de,w as Qe}from"../chunks/paths.CmF6KM-O.js";import{_ as Ge}from"../chunks/preload-helper.D6kgxu3v.js";function je(s){let e,t,a,n,i,o=`<span class="close-icon svelte-1fkoqn4" style="-webkit-mask: url(${de}/images/svg/cancel.svg) no-repeat center / contain; mask: url(${de}/images/svg/cancel.svg) no-repeat center / contain;"></span>`,g,b;return{c(){e=C("div"),t=C("div"),a=C("input"),n=O(),i=C("button"),i.innerHTML=o,this.h()},l(r){e=L(r,"DIV",{class:!0});var u=P(e);t=L(u,"DIV",{role:!0,tabindex:!0,class:!0,draggable:!0});var h=P(t);a=L(h,"INPUT",{autocorrect:!0,autocomplete:!0,spellcheck:!0,type:!0,class:!0}),n=W(h),i=L(h,"BUTTON",{class:!0,draggable:!0,"data-svelte-h":!0}),Ce(i)!=="svelte-97uq8h"&&(i.innerHTML=o),h.forEach(k),u.forEach(k),this.h()},h(){_(a,"autocorrect","off"),_(a,"autocomplete","off"),_(a,"spellcheck","false"),_(a,"type","text"),_(a,"class","svelte-1fkoqn4"),_(i,"class","close-button svelte-1fkoqn4"),_(i,"draggable","true"),_(t,"role","button"),_(t,"tabindex","0"),_(t,"class","tab svelte-1fkoqn4"),_(t,"draggable","true"),N(t,"active",s[1]),_(e,"class","container svelte-1fkoqn4"),N(e,"preventHover",s[2])},m(r,u){$(r,e,u),I(e,t),I(t,a),s[8](a),be(a,s[0]),I(t,n),I(t,i),g||(b=[V(a,"input",s[9]),V(i,"click",ve(function(){se(s[3])&&s[3].apply(this,arguments)})),V(i,"dragstart",ve(Xe(s[7]))),V(t,"dblclick",ae(s[10])),V(t,"mousedown",ae(function(){se(s[4])&&s[4].apply(this,arguments)})),V(t,"touchstart",ae(function(){se(s[4])&&s[4].apply(this,arguments)})),V(t,"dragstart",ae(function(){se(s[5])&&s[5].apply(this,arguments)}))],g=!0)},p(r,[u]){s=r,u&1&&a.value!==s[0]&&be(a,s[0]),u&2&&N(t,"active",s[1]),u&4&&N(e,"preventHover",s[2])},i:K,o:K,d(r){r&&k(e),s[8](null),g=!1,Ne(b)}}}function Je(s,e,t){let{title:a=""}=e,{active:n=!1}=e,{preventHover:i=!1}=e,{onClose:o=()=>{}}=e,{onPointerdown:g=d=>{}}=e,{onDragstart:b=d=>{}}=e,r;function u(d){Oe.call(this,s,d)}function h(d){S[d?"unshift":"push"](()=>{r=d,t(6,r)})}function f(){a=this.value,t(0,a)}const H=()=>r.select();return s.$$set=d=>{"title"in d&&t(0,a=d.title),"active"in d&&t(1,n=d.active),"preventHover"in d&&t(2,i=d.preventHover),"onClose"in d&&t(3,o=d.onClose),"onPointerdown"in d&&t(4,g=d.onPointerdown),"onDragstart"in d&&t(5,b=d.onDragstart)},[a,n,i,o,g,b,r,u,h,f,H]}class He extends fe{constructor(e){super(),he(this,e,Je,je,ce,{title:0,active:1,preventHover:2,onClose:3,onPointerdown:4,onDragstart:5})}}let Ke=0;const R=Qe({tabs:[],activeIndex:0,placeholderIndex:-1}),q={newTab:s=>{const{data:e={id:Ke++,title:"Untitled",text:""},index:t=-1,callback:a=()=>{}}=s||{};R.update(n=>(n.tabs.some(i=>i.id==e.id)||(t<0?(n.tabs.push(e),n.activeIndex=n.tabs.length-1):(n.tabs.splice(t,0,e),n.activeIndex=t)),n)),a()},removeTab:s=>{R.update(e=>(s<0||s>=e.tabs.length||(e.placeholderIndex==s&&(e.placeholderIndex=-1),e.tabs.splice(s,1),s==e.activeIndex-1?e.activeIndex=Math.max(0,s):e.activeIndex=Math.min(e.activeIndex,e.tabs.length-1)),e))},setActiveIndex:s=>{R.update(e=>(s<0?e.activeIndex=0:s>e.tabs.length?e.activeIndex=e.tabs.length-1:e.activeIndex=s,e))},setPlaceholderIndex:s=>{R.update(e=>(e.placeholderIndex=s===void 0||s<0||s>=e.tabs.length?-1:s,e))},moveTab:(s,e,t=()=>{})=>{s!=e&&(R.update(a=>{if(s<0||s>=a.tabs.length||e<0||e>=a.tabs.length)return a;const n=a.tabs[s];return a.tabs.splice(s,1),a.tabs.splice(e,0,n),a.activeIndex==s&&(a.activeIndex=e),a.placeholderIndex==s&&(a.placeholderIndex=e),a}),t())}};function ye(s,e,t){const a=s.slice();return a[38]=e[t],a[39]=e,a[40]=t,a}function Te(s,e){let t,a,n,i,o=e[40],g,b,r;function u(){return e[14](e[40])}function h(...w){return e[15](e[40],...w)}function f(w){e[16](w,e[40])}let H={active:e[8].activeIndex==e[40],preventHover:e[7],onClose:u,onPointerdown:h,onDragstart:e[12]};e[8].tabs[e[40]].title!==void 0&&(H.title=e[8].tabs[e[40]].title),a=new He({props:H}),S.push(()=>Le(a,"title",f));const d=()=>e[17](t,o),A=()=>e[17](null,o);return{key:s,first:null,c(){t=C("div"),ie(a.$$.fragment),i=O(),this.h()},l(w){t=L(w,"DIV",{class:!0});var y=P(t);oe(a.$$.fragment,y),i=W(y),y.forEach(k),this.h()},h(){_(t,"class","tab-container svelte-1yl1m0u"),N(t,"placeholder",e[8].placeholderIndex==e[40]),this.first=t},m(w,y){$(w,t,y),re(a,t,null),I(t,i),d(),g=!0,b||(r=We(e[11].call(null,t)),b=!0)},p(w,y){e=w;const D={};y[0]&256&&(D.active=e[8].activeIndex==e[40]),y[0]&128&&(D.preventHover=e[7]),y[0]&256&&(D.onClose=u),y[0]&256&&(D.onPointerdown=h),!n&&y[0]&256&&(n=!0,D.title=e[8].tabs[e[40]].title,De(()=>n=!1)),a.$set(D),o!==e[40]&&(A(),o=e[40],d()),(!g||y[0]&256)&&N(t,"placeholder",e[8].placeholderIndex==e[40])},i(w){g||(Z(a.$$.fragment,w),g=!0)},o(w){x(a.$$.fragment,w),g=!1},d(w){w&&k(t),ue(a),A(),b=!1,r()}}}function Ze(s){let e,t,a,n=[],i=new Map,o,g,b,r=`<div class="new-tab-icon svelte-1yl1m0u" style="-webkit-mask: url(${de}/images/svg/plus.svg) no-repeat center / contain; mask: url(${de}/images/svg/plus.svg) no-repeat center / contain;"></div>`,u,h,f,H,d,A,w,y,D=_e(s[8].tabs);const X=v=>v[38];for(let v=0;v<D.length;v+=1){let m=ye(s,D,v),T=X(m);i.set(T,n[v]=Te(T,m))}return f=new He({props:{title:s[3].title,active:!s[5],preventHover:!0}}),{c(){e=C("div"),t=C("div"),a=C("div");for(let v=0;v<n.length;v+=1)n[v].c();o=O(),g=C("div"),b=C("button"),b.innerHTML=r,u=O(),h=C("div"),ie(f.$$.fragment),H=O(),d=C("div"),this.h()},l(v){e=L(v,"DIV",{});var m=P(e);t=L(m,"DIV",{class:!0});var T=P(t);a=L(T,"DIV",{class:!0});var ee=P(a);for(let Y=0;Y<n.length;Y+=1)n[Y].l(ee);ee.forEach(k),o=W(T),g=L(T,"DIV",{class:!0});var te=P(g);b=L(te,"BUTTON",{class:!0,"data-svelte-h":!0}),Ce(b)!=="svelte-15g65px"&&(b.innerHTML=r),te.forEach(k),u=W(T),h=L(T,"DIV",{class:!0});var ne=P(h);oe(f.$$.fragment,ne),ne.forEach(k),T.forEach(k),H=W(m),d=L(m,"DIV",{class:!0}),P(d).forEach(k),m.forEach(k),this.h()},h(){_(a,"class","tabs svelte-1yl1m0u"),_(b,"class","new-tab-button svelte-1yl1m0u"),_(g,"class","buttons svelte-1yl1m0u"),_(h,"class","clone svelte-1yl1m0u"),N(h,"dragging",s[0]),_(t,"class","tabbar svelte-1yl1m0u"),_(d,"class","separator svelte-1yl1m0u")},m(v,m){$(v,e,m),I(e,t),I(t,a);for(let T=0;T<n.length;T+=1)n[T]&&n[T].m(a,null);s[18](a),I(t,o),I(t,g),I(g,b),I(t,u),I(t,h),re(f,h,null),s[19](h),I(e,H),I(e,d),s[20](e),A=!0,w||(y=V(b,"click",s[9]),w=!0)},p(v,m){m[0]&13700&&(D=_e(v[8].tabs),Ue(),n=Fe(n,m,X,1,v,D,i,a,ze,Te,null,ye),Ye());const T={};m[0]&8&&(T.title=v[3].title),m[0]&32&&(T.active=!v[5]),f.$set(T),(!A||m[0]&1)&&N(h,"dragging",v[0])},i(v){if(!A){for(let m=0;m<D.length;m+=1)Z(n[m]);Z(f.$$.fragment,v),A=!0}},o(v){for(let m=0;m<n.length;m+=1)x(n[m]);x(f.$$.fragment,v),A=!1},d(v){v&&k(e);for(let m=0;m<n.length;m+=1)n[m].d();s[18](null),ue(f),s[19](null),s[20](null),w=!1,y()}}}const xe=12,le=140,j=70,J=200,$e=1600,Ee=.3;function et(s,e,t){let a;Ie(s,R,l=>t(8,a=l));let n,i=[],o=0,g=null,b=-1,r={id:-1,title:"",text:""},u,h,f,H=!1,d=!1,A=0,w=0,y=0,D,X=!1;const v=(l,c=300)=>{let p;return(...E)=>{clearTimeout(p),p=setTimeout(()=>{l.apply(this,E)},c)}};function m(){q.newTab()}const T=l=>{if(!i[l]){console.warn("Cannot close tab!");return}o=i[l].getBoundingClientRect().width,l<a.tabs.length-1&&(n.style.setProperty("--tab-max-width",`${o}px`),ee()),l==a.tabs.length-1?q.setActiveIndex(l-1):l==a.activeIndex&&q.setActiveIndex(l+1),ge({duration:J,easing:G,onStep:(c,p)=>{l==0?t(1,n.style.gridTemplateColumns=`minmax(${p*j}px, ${p*o}px)`,n):t(1,n.style.gridTemplateColumns=`repeat(${l}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${p*j}px, ${p*o}px)`,n)},onEnd:()=>{t(1,n.style.gridTemplateColumns="",n),q.removeTab(l)}})},ee=v(()=>{n&&(n.style.setProperty("--tab-max-width",`${le}px`),ge({duration:J,easing:G,onStep:(l,c)=>{n.style.setProperty("--tab-max-width",`${o+l*(le-o)}px`)},onEnd:()=>{n.style.setProperty("--tab-max-width",`${le}px`)}}))},$e);function te(l){if(!n)return;const c=l.getBoundingClientRect().width;ge({duration:J,easing:G,onStep:(p,E)=>{a.tabs.length==1?t(1,n.style.gridTemplateColumns=`minmax(${p*j}px, ${p*c}px)`,n):t(1,n.style.gridTemplateColumns=`repeat(${a.tabs.length-1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${p*j}px, ${p*c}px)`,n),t(1,n.scrollLeft=n.scrollWidth,n)},onEnd:()=>{t(1,n.style.gridTemplateColumns="",n)}})}const ne=(l,c)=>{const p=i[0].getBoundingClientRect().width;q.moveTab(l,c,()=>{if(l>c)for(let E=c;E<l;E++)we(i[E],{duration:J,easing:G,css:(z,B)=>`transform: translateX(-${B*p}px);`});if(l<c)for(let E=c;E>l;E--)we(i[E],{duration:J,easing:G,css:(z,B)=>`transform: translateX(${B*p}px);`})})};function Y(l){!l.target||!l.dataTransfer||(l.dataTransfer.setData("text/plain",JSON.stringify(r)),l.dataTransfer.setDragImage(new Image,0,0))}function Ae(l,c){if(l==0&&c==0){t(4,f.style.left="-1000px",f),t(4,f.style.top="-1000px",f);return}let p=D.getBoundingClientRect();if(l<p.left||l>p.right||c<p.top||c>p.bottom){d||(y=0),t(4,f.style.left=`${l+A}px`,f),t(4,f.style.top=`${c+w}px`,f),t(5,d=!0);return}d&&t(5,d=!1),t(4,f.style.left=`${l+A}px`,f),t(4,f.style.top=`${h.top}px`,f);const E=-n.scrollLeft,z=i[0].getBoundingClientRect().width;let B=-1;if(l>E+a.tabs.length*z)B=a.tabs.length-1;else for(let Q=0;Q<a.tabs.length;Q++)if(l>E+Q*z&&l<E+(Q+1)*z){B=Q;break}l<20?(y=-Ee,requestAnimationFrame(pe)):l>n.clientWidth-10?(y=Ee,requestAnimationFrame(pe)):y=0,!(B==-1||B==a.placeholderIndex)&&ne(a.placeholderIndex,B)}let F=0;function pe(l){if(!H||y==0){F=0;return}F==0&&(F=l);const c=l-F;F=l,n.scrollBy({left:y*c}),requestAnimationFrame(pe)}function me(l,c){if(!l.target)return;let p,E;l instanceof TouchEvent?(p=l.touches[0].clientX,E=l.touches[0].clientY,l.preventDefault()):(p=l.clientX,E=l.clientY),window.addEventListener("touchmove",U,{passive:!1}),window.addEventListener("touchend",M),window.addEventListener("mousemove",U),window.addEventListener("mouseup",M),window.addEventListener("drag",U),window.addEventListener("dragend",M),window.addEventListener("blur",M),q.setActiveIndex(c),u=l.target,h=u.getBoundingClientRect(),g=[p,E],A=h.left-p,w=h.top-E,t(4,f.style.width=`${h.width}px`,f),t(4,f.style.left=`${h.left}px`,f),t(4,f.style.top=`${h.top}px`,f),t(3,r={...a.tabs[c]}),b=c}function U(l){let c,p;if(l instanceof TouchEvent?(c=l.touches[0].clientX,p=l.touches[0].clientY,l.preventDefault()):(c=l.clientX,p=l.clientY),H){Ae(c,p);return}g===null||Math.hypot(g[0]-c,g[1]-p)<xe||(t(0,H=!0),q.setPlaceholderIndex(b),q.setActiveIndex(b))}function M(){window.removeEventListener("touchmove",U),window.removeEventListener("touchend",M),window.removeEventListener("mousemove",U),window.removeEventListener("mouseup",M),window.removeEventListener("drag",U),window.removeEventListener("dragend",M),window.removeEventListener("blur",M),g=null,t(5,d=!1),b=-1,A=0,w=0,q.setPlaceholderIndex(),t(0,H=!1)}ke(()=>{n.style.setProperty("--tab-max-width",`${le}px`),n.style.setProperty("--tab-min-width",`${j}px`)});const Pe=l=>T(l),qe=(l,c)=>me(c,l);function Be(l,c){s.$$.not_equal(a.tabs[c].title,l)&&(a.tabs[c].title=l,R.set(a))}function Se(l,c){S[l?"unshift":"push"](()=>{i[c]=l,t(2,i)})}function Me(l){S[l?"unshift":"push"](()=>{n=l,t(1,n)})}function Ve(l){S[l?"unshift":"push"](()=>{f=l,t(4,f)})}function Re(l){S[l?"unshift":"push"](()=>{D=l,t(6,D)})}return s.$$.update=()=>{s.$$.dirty[0]&1&&(H?t(7,X=!0):setTimeout(()=>t(7,X=!1),20))},[H,n,i,r,f,d,D,X,a,m,T,te,Y,me,Pe,qe,Be,Se,Me,Ve,Re]}class tt extends fe{constructor(e){super(),he(this,e,et,Ze,ce,{},null,[-1,-1])}}function nt(s){let e,t,a,n;return{c(){e=C("div"),t=C("div"),a=O(),n=C("div"),this.h()},l(i){e=L(i,"DIV",{id:!0,class:!0});var o=P(e);t=L(o,"DIV",{id:!0,class:!0}),P(t).forEach(k),a=W(o),n=L(o,"DIV",{id:!0}),P(n).forEach(k),o.forEach(k),this.h()},h(){_(t,"id","quill-editor"),_(t,"class","svelte-1259osz"),_(n,"id","quill-toolbar"),_(e,"id","quill-editor-wrapper"),_(e,"class","svelte-1259osz")},m(i,o){$(i,e,o),I(e,t),s[3](t),I(e,a),I(e,n),s[4](n)},p:K,i:K,o:K,d(i){i&&k(e),s[3](null),s[4](null)}}}function st(){}function at(s,e,t){let{text:a}=e,n,i,o;async function g(){const{default:u}=await Ge(()=>import("../chunks/quill.BqYzQad1.js"),[],import.meta.url);o&&(n=new u(o,{formats:["bold","italic","underline","strike","code"],placeholder:"Enter text here"}),n.on("text-change",st))}ke(()=>{g().then(()=>{n.keyboard.addBinding({key:"/",ctrlKey:!0},()=>{})})});function b(u){S[u?"unshift":"push"](()=>{o=u,t(1,o)})}function r(u){S[u?"unshift":"push"](()=>{i=u,t(0,i)})}return s.$$set=u=>{"text"in u&&t(2,a=u.text)},[i,o,a,b,r]}class lt extends fe{constructor(e){super(),he(this,e,at,nt,ce,{text:2})}}function it(s){let e,t,a,n,i,o;t=new tt({});function g(r){s[2](r)}let b={};return s[0].text!==void 0&&(b.text=s[0].text),n=new lt({props:b}),S.push(()=>Le(n,"text",g)),{c(){e=C("div"),ie(t.$$.fragment),a=O(),ie(n.$$.fragment),this.h()},l(r){e=L(r,"DIV",{class:!0});var u=P(e);oe(t.$$.fragment,u),a=W(u),oe(n.$$.fragment,u),u.forEach(k),this.h()},h(){_(e,"class","container svelte-1gpimha")},m(r,u){$(r,e,u),re(t,e,null),I(e,a),re(n,e,null),o=!0},p(r,[u]){const h={};!i&&u&1&&(i=!0,h.text=r[0].text,De(()=>i=!1)),n.$set(h)},i(r){o||(Z(t.$$.fragment,r),Z(n.$$.fragment,r),o=!0)},o(r){x(t.$$.fragment,r),x(n.$$.fragment,r),o=!1},d(r){r&&k(e),ue(t),ue(n)}}}function ot(s,e,t){let a,n;Ie(s,R,o=>t(1,n=o)),q.newTab({data:{id:-1,title:"Hello 👋",text:"Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.22"}});function i(o){s.$$.not_equal(a.text,o)&&(a.text=o,t(0,a),t(1,n))}return s.$$.update=()=>{s.$$.dirty&2&&t(0,a=n.tabs.length>0?n.tabs[n.activeIndex]:{text:"Click the ➕ above to create a new tab."})},[a,n,i]}class pt extends fe{constructor(e){super(),he(this,e,ot,it,ce,{})}}export{pt as component};
