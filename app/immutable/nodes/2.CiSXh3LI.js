const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/quill.Bk4jDS0q.js","../chunks/core.CG__ofcG.js"])))=>i.map(i=>d[i]);
import{s as Te,n as fe,r as qe,e as we,c as ee,o as We,d as se,z as Ze,A as Je,a as Ie}from"../chunks/scheduler.BOxWOvYx.js";import{S as Ee,i as De,e as H,b as $e,c as P,d as M,f as et,g as S,w as C,A as X,j as re,k as I,x as oe,G as Se,l as tt,s as J,p as ge,h as $,v as Ce,q as he,z as Pe,r as me,o as Ae,n as He,a as z,t as K,u as pe,I as nt,m as ye}from"../chunks/index.BFcqwp_n.js";import{e as ke,u as Ue,o as Xe}from"../chunks/each.DD9ZPifO.js";import{b as Q}from"../chunks/paths.B0r-g-nk.js";import{m as Ye,t as ne,a as je,d as x,s as rt,f as st}from"../chunks/firebaseStore.C5P1U0sd.js";import{_ as Be}from"../chunks/preload-helper.D6kgxu3v.js";import{S as ot}from"../chunks/Spinner.DVSMDdgP.js";function at(n){let t,e,r,o,l,d;return{c(){t=H("div"),e=H("button"),r=H("span"),o=$e(n[0]),this.h()},l(s){t=P(s,"DIV",{class:!0});var c=M(t);e=P(c,"BUTTON",{class:!0,draggable:!0});var a=M(e);r=P(a,"SPAN",{class:!0});var u=M(r);o=et(u,n[0]),u.forEach(S),a.forEach(S),c.forEach(S),this.h()},h(){C(r,"class","title svelte-1aycx2r"),C(e,"class","tab svelte-1aycx2r"),C(e,"draggable","true"),X(e,"active",n[1]),C(t,"class","tab-container svelte-1aycx2r"),X(t,"preventHover",n[2])},m(s,c){re(s,t,c),I(t,e),I(e,r),I(r,o),l||(d=[oe(e,"mousedown",Se(function(){we(n[3])&&n[3].apply(this,arguments)})),oe(e,"touchstart",Se(function(){we(n[3])&&n[3].apply(this,arguments)})),oe(e,"dragstart",Se(function(){we(n[4])&&n[4].apply(this,arguments)}))],l=!0)},p(s,[c]){n=s,c&1&&tt(o,n[0]),c&2&&X(e,"active",n[1]),c&4&&X(t,"preventHover",n[2])},i:fe,o:fe,d(s){s&&S(t),l=!1,qe(d)}}}function it(n,t,e){let{title:r=""}=t,{active:o=!1}=t,{preventHover:l=!1}=t,{onPointerdown:d=c=>{}}=t,{onDragstart:s=c=>{}}=t;return n.$$set=c=>{"title"in c&&e(0,r=c.title),"active"in c&&e(1,o=c.active),"preventHover"in c&&e(2,l=c.preventHover),"onPointerdown"in c&&e(3,d=c.onPointerdown),"onDragstart"in c&&e(4,s=c.onDragstart)},[r,o,l,d,s]}class Ge extends Ee{constructor(t){super(),De(this,t,it,at,Te,{title:0,active:1,preventHover:2,onPointerdown:3,onDragstart:4})}}function te(n){return n<.5?4*n*n*n:.5*Math.pow(2*n-2,3)+1}const Me=(n,t)=>{const{duration:e=300,easing:r=te,onEnd:o=()=>{},onStep:l=()=>{},css:d}=t;let s;function c(a){if(!n){console.warn("Cannot find element to animate");return}s===void 0&&(s=a);const u=r((a-s)/e),h=1-u;u<1?(n.style.cssText=d(u,h),l(u,h),requestAnimationFrame(c)):(n.style.cssText="",o())}requestAnimationFrame(c)},Le=n=>{const{duration:t=300,easing:e=te,onEnd:r=()=>{},onStep:o=()=>{}}=n;let l;function d(s){l===void 0&&(l=s);const c=e((s-l)/t),a=1-c;c<1?(o(c,a),requestAnimationFrame(d)):r()}requestAnimationFrame(d)};function Re(n,t,e){const r=n.slice();return r[42]=t[e],r[43]=t,r[44]=e,r}function Oe(n,t){let e,r,o,l,d=t[44],s,c,a;function u(...v){return t[19](t[44],...v)}function h(v){t[20](v,t[42])}let A={active:t[10]==t[42],preventHover:t[9],onPointerdown:u,onDragstart:t[17]};t[12][t[42]].title!==void 0&&(A.title=t[12][t[42]].title),r=new Ge({props:A}),se.push(()=>nt(r,"title",h));const V=()=>t[21](e,d),q=()=>t[21](null,d);return{key:n,first:null,c(){e=H("div"),ge(r.$$.fragment),l=J(),this.h()},l(v){e=P(v,"DIV",{class:!0});var _=M(e);he(r.$$.fragment,_),l=$(_),_.forEach(S),this.h()},h(){C(e,"class","tab-container svelte-r52wr9"),X(e,"placeholder",t[11]==t[42]),this.first=e},m(v,_){re(v,e,_),me(r,e,null),I(e,l),V(),s=!0,c||(a=Ze(t[16].call(null,e)),c=!0)},p(v,_){t=v;const m={};_[0]&1028&&(m.active=t[10]==t[42]),_[0]&512&&(m.preventHover=t[9]),_[0]&4&&(m.onPointerdown=u),!o&&_[0]&4100&&(o=!0,m.title=t[12][t[42]].title,Je(()=>o=!1)),r.$set(m),d!==t[44]&&(q(),d=t[44],V()),(!s||_[0]&2052)&&X(e,"placeholder",t[11]==t[42])},i(v){s||(z(r.$$.fragment,v),s=!0)},o(v){K(r.$$.fragment,v),s=!1},d(v){v&&S(e),pe(r),q(),c=!1,a()}}}function lt(n){let t,e,r,o=[],l=new Map,d,s,c,a=`<span class="button-icon svelte-r52wr9" style="-webkit-mask: url(${Q}/images/svg/plus.svg) no-repeat center / contain; mask: url(${Q}/images/svg/plus.svg) no-repeat center / contain;"></span>`,u,h,A,V=`<span class="button-icon svelte-r52wr9" style="-webkit-mask: url(${Q}/images/svg/trash.svg) no-repeat center / contain; mask: url(${Q}/images/svg/trash.svg) no-repeat center / contain;"></span>`,q,v,_,m,N,B,g=`<span class="button-icon svelte-r52wr9" style="-webkit-mask: url(${Q}/images/svg/gear.svg) no-repeat center / contain; mask: url(${Q}/images/svg/gear.svg) no-repeat center / contain;"></span>`,k,E,b,U,L,F,Z,Y,R=ke(n[2].order);const W=y=>y[42];for(let y=0;y<R.length;y+=1){let p=Re(n,R,y),D=W(p);l.set(D,o[y]=Oe(D,p))}return b=new Ge({props:{title:n[5],active:!n[7],preventHover:!0}}),{c(){t=H("div"),e=H("div"),r=H("div");for(let y=0;y<o.length;y+=1)o[y].c();d=J(),s=H("div"),c=H("button"),c.innerHTML=a,u=J(),h=H("div"),A=H("button"),A.innerHTML=V,q=J(),v=H("button"),_=H("span"),N=J(),B=H("a"),B.innerHTML=g,k=J(),E=H("div"),ge(b.$$.fragment),U=J(),L=H("div"),this.h()},l(y){t=P(y,"DIV",{class:!0});var p=M(t);e=P(p,"DIV",{class:!0});var D=M(e);r=P(D,"DIV",{class:!0});var ae=M(r);for(let ie=0;ie<o.length;ie+=1)o[ie].l(ae);ae.forEach(S),d=$(D),s=P(D,"DIV",{class:!0});var j=M(s);c=P(j,"BUTTON",{class:!0,"data-svelte-h":!0}),Ce(c)!=="svelte-g0ls06"&&(c.innerHTML=a),j.forEach(S),u=$(D),h=P(D,"DIV",{class:!0});var O=M(h);A=P(O,"BUTTON",{class:!0,"data-svelte-h":!0}),Ce(A)!=="svelte-hhcvrt"&&(A.innerHTML=V),q=$(O),v=P(O,"BUTTON",{class:!0});var ve=M(v);_=P(ve,"SPAN",{class:!0,style:!0}),M(_).forEach(S),ve.forEach(S),N=$(O),B=P(O,"A",{class:!0,href:!0,"data-svelte-h":!0}),Ce(B)!=="svelte-8w27ao"&&(B.innerHTML=g),O.forEach(S),k=$(D),E=P(D,"DIV",{class:!0});var be=M(E);he(b.$$.fragment,be),be.forEach(S),D.forEach(S),U=$(p),L=P(p,"DIV",{class:!0}),M(L).forEach(S),p.forEach(S),this.h()},h(){C(r,"class","tabs svelte-r52wr9"),C(c,"class","button svelte-r52wr9"),C(s,"class","new-tab-container svelte-r52wr9"),C(A,"class","close button svelte-r52wr9"),C(_,"class","button-icon svelte-r52wr9"),Pe(_,"-webkit-mask","url("+Q+"/images/svg/refresh.svg) no-repeat center / contain"),Pe(_,"mask","url("+Q+"/images/svg/refresh.svg) no-repeat center / contain"),C(v,"class","refresh button svelte-r52wr9"),v.disabled=m=n[13].savingStatus==="saving",C(B,"class","button svelte-r52wr9"),C(B,"href",Q+"/settings"),C(h,"class","settings-container svelte-r52wr9"),C(E,"class","clone svelte-r52wr9"),X(E,"dragging",n[1]),C(e,"class","tabbar svelte-r52wr9"),C(L,"class","divider svelte-r52wr9"),C(t,"class","svelte-r52wr9")},m(y,p){re(y,t,p),I(t,e),I(e,r);for(let D=0;D<o.length;D+=1)o[D]&&o[D].m(r,null);n[22](r),I(e,d),I(e,s),I(s,c),I(e,u),I(e,h),I(h,A),I(h,q),I(h,v),I(v,_),I(h,N),I(h,B),I(e,k),I(e,E),me(b,E,null),n[24](E),I(t,U),I(t,L),n[25](t),F=!0,Z||(Y=[oe(c,"click",n[14]),oe(A,"click",n[23]),oe(v,"click",function(){we(n[0])&&n[0].apply(this,arguments)})],Z=!0)},p(y,p){n=y,p[0]&400916&&(R=ke(n[2].order),Ae(),o=Ue(o,p,W,1,n,R,l,r,Xe,Oe,null,Re),He()),(!F||p[0]&8192&&m!==(m=n[13].savingStatus==="saving"))&&(v.disabled=m);const D={};p[0]&32&&(D.title=n[5]),p[0]&128&&(D.active=!n[7]),b.$set(D),(!F||p[0]&2)&&X(E,"dragging",n[1])},i(y){if(!F){for(let p=0;p<R.length;p+=1)z(o[p]);z(b.$$.fragment,y),F=!0}},o(y){for(let p=0;p<o.length;p+=1)K(o[p]);K(b.$$.fragment,y),F=!1},d(y){y&&S(t);for(let p=0;p<o.length;p+=1)o[p].d();n[22](null),pe(b),n[24](null),n[25](null),Z=!1,qe(Y)}}}const ct=12,_e=200,ue=24,de=200,ut=1600,Ve=.3;function dt(n,t,e){let r,o,l,d,s;ee(n,Ye,i=>e(2,l=i)),ee(n,ne,i=>e(12,d=i)),ee(n,je,i=>e(13,s=i));let{refreshClicked:c=()=>{}}=t,a,u=[],h=0,A=null,V=-1,q="",v,_,m,N=!1,B=!1,g=0,k=0,E,b=!1;const U=(i,f=300)=>{let w;return(...T)=>{clearTimeout(w),w=setTimeout(()=>{i.apply(void 0,T)},f)}};function L(){x.newTab()}const F=i=>{const f=l.order.findIndex(w=>w===i);if(f<0||!u[f]){console.warn("Cannot close tab!");return}h=u[f].getBoundingClientRect().width,f<l.order.length-1&&(a.style.setProperty("--tab-max-width",`${h}px`),Z()),f==l.activeIndex&&(f==l.order.length-1?x.setActiveIndex(f-1):x.setActiveIndex(f+1)),Le({duration:de,easing:te,onStep:(w,T)=>{f==0?e(3,a.style.gridTemplateColumns=`minmax(${T*ue}px, ${T*h}px)`,a):e(3,a.style.gridTemplateColumns=`repeat(${f}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${T*ue}px, ${T*h}px)`,a)},onEnd:()=>{e(3,a.style.gridTemplateColumns="",a),x.removeTab(i)}})},Z=U(()=>{a&&(a.style.setProperty("--tab-max-width",`${_e}px`),Le({duration:de,easing:te,onStep:(i,f)=>{a.style.setProperty("--tab-max-width",`${h+i*(_e-h)}px`)},onEnd:()=>{a.style.setProperty("--tab-max-width",`${_e}px`)}}))},ut);function Y(i){if(!a)return;const f=i.getBoundingClientRect().width;Le({duration:de,easing:te,onStep:(w,T)=>{l.order.length==1?e(3,a.style.gridTemplateColumns=`minmax(${w*ue}px, ${w*f}px)`,a):e(3,a.style.gridTemplateColumns=`repeat(${l.order.length-1}, minmax(var(--tab-min-width), var(--tab-max-width))) minmax(${w*ue}px, ${w*f}px)`,a),e(3,a.scrollLeft=a.scrollWidth,a)},onEnd:()=>{e(3,a.style.gridTemplateColumns="",a)}})}const R=(i,f)=>{const w=u[0].getBoundingClientRect().width;x.moveTab(i,f,()=>{if(i>f)for(let T=f;T<i;T++)Me(u[T],{duration:de,easing:te,css:(le,G)=>`transform: translateX(-${G*w}px);`});if(i<f)for(let T=f;T>i;T--)Me(u[T],{duration:de,easing:te,css:(le,G)=>`transform: translateX(${G*w}px);`})})};function W(i){!i.target||!i.dataTransfer||(i.dataTransfer.setData("text/plain",r),i.dataTransfer.setDragImage(new Image,0,0))}function y(i,f){if(i==0&&f==0){e(6,m.style.left="-1000px",m),e(6,m.style.top="-1000px",m);return}let w=E.getBoundingClientRect();if(i<w.left||i>w.right||f<w.top||f>w.bottom){B||(k=0),e(6,m.style.left=`${i+g}px`,m),e(6,m.style.top=`${f-_.height/2}px`,m),e(7,B=!0);return}B&&e(7,B=!1),e(6,m.style.left=`${i+g}px`,m),e(6,m.style.top=`${_.top}px`,m);const T=-a.scrollLeft,le=u[0].getBoundingClientRect().width;let G=-1;if(i>T+l.order.length*le)G=l.order.length-1;else for(let ce=0;ce<l.order.length;ce++)if(i>T+ce*le&&i<T+(ce+1)*le){G=ce;break}i<20?(k=-Ve,requestAnimationFrame(D)):i>a.clientWidth-10?(k=Ve,requestAnimationFrame(D)):k=0,!(G==-1||G==l.placeholderIndex)&&R(l.placeholderIndex,G)}let p=0;function D(i){if(!N||k==0){p=0;return}p==0&&(p=i);const f=i-p;p=i,a.scrollBy({left:k*f}),requestAnimationFrame(D)}function ae(i,f){if(!i.target)return;let w,T;i instanceof TouchEvent?(w=i.touches[0].clientX,T=i.touches[0].clientY):(w=i.clientX,T=i.clientY),window.addEventListener("touchmove",j,{passive:!1}),window.addEventListener("touchend",O),window.addEventListener("mousemove",j),window.addEventListener("mouseup",O),window.addEventListener("drag",j),window.addEventListener("dragend",O),window.addEventListener("blur",O),x.setActiveIndex(f),v=i.target,_=v.getBoundingClientRect(),A=[w,T],g=_.left-w,_.top-T,e(6,m.style.width=`${_.width}px`,m),e(6,m.style.left=`${_.left}px`,m),e(6,m.style.top=`${_.top}px`,m),V=f,e(5,q=d[l.order[f]].title)}function j(i){let f,w;if(i instanceof TouchEvent?(f=i.touches[0].clientX,w=i.touches[0].clientY,i.preventDefault()):(f=i.clientX,w=i.clientY),N){y(f,w);return}A===null||Math.hypot(A[0]-f,A[1]-w)<ct||(e(1,N=!0),x.setPlaceholderIndex(V),x.setActiveIndex(V))}function O(){window.removeEventListener("touchmove",j),window.removeEventListener("touchend",O),window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",O),window.removeEventListener("drag",j),window.removeEventListener("dragend",O),window.removeEventListener("blur",O),A=null,e(7,B=!1),V=-1,g=0,x.setPlaceholderIndex(),e(1,N=!1)}We(()=>{a.style.setProperty("--tab-max-width",`${_e}px`),a.style.setProperty("--tab-min-width",`${ue}px`)});const ve=(i,f)=>ae(f,i);function be(i,f){n.$$.not_equal(d[f].title,i)&&(d[f].title=i,ne.set(d))}function ie(i,f){se[i?"unshift":"push"](()=>{u[f]=i,e(4,u)})}function Qe(i){se[i?"unshift":"push"](()=>{a=i,e(3,a)})}const xe=()=>F(r);function ze(i){se[i?"unshift":"push"](()=>{m=i,e(6,m)})}function Ke(i){se[i?"unshift":"push"](()=>{E=i,e(8,E)})}return n.$$set=i=>{"refreshClicked"in i&&e(0,c=i.refreshClicked)},n.$$.update=()=>{n.$$.dirty[0]&4&&e(10,r=l.order[l.activeIndex]),n.$$.dirty[0]&4&&e(11,o=l.order[l.placeholderIndex]),n.$$.dirty[0]&2&&(N?e(9,b=!0):setTimeout(()=>e(9,b=!1),20))},[c,N,l,a,u,q,m,B,E,b,r,o,d,s,L,F,Y,W,ae,ve,be,ie,Qe,xe,ze,Ke]}class ft extends Ee{constructor(t){super(),De(this,t,dt,lt,Te,{refreshClicked:0},null,[-1,-1])}}function gt(n){let t,e;return{c(){t=H("div"),e=H("div"),this.h()},l(r){t=P(r,"DIV",{class:!0});var o=M(t);e=P(o,"DIV",{class:!0}),M(e).forEach(S),o.forEach(S),this.h()},h(){C(e,"class","quill-editor svelte-dq5srf"),C(t,"class","quill-editor-wrapper svelte-dq5srf"),X(t,"disabled",n[0])},m(r,o){re(r,t,o),I(t,e),n[5](e)},p(r,[o]){o&1&&X(t,"disabled",r[0])},i:fe,o:fe,d(r){r&&S(t),n[5](null)}}}function ht(n,t,e){let r,o;ee(n,ne,g=>e(6,r=g)),ee(n,rt,g=>e(4,o=g));let{tabID:l}=t,{disabled:d=!1}=t,s,c;const a=(g,k=300)=>{let E;return(...b)=>{clearTimeout(E),E=setTimeout(()=>{g.apply(void 0,b)},k)}};async function u(g){var U,L,F,Z;if(!s)return;const{Delta:k,Range:E}=await Be(async()=>{const{Delta:Y,Range:R}=await import("../chunks/core.CG__ofcG.js").then(W=>W.G);return{Delta:Y,Range:R}},[],import.meta.url);if(g.undo.length>0)for(var b=0;b<g.undo.length;b++){const Y=(U=g.undo[b].range)==null?void 0:U.index,R=(L=g.undo[b].range)==null?void 0:L.length,W={delta:new k(g.undo[b].delta.ops),range:Y!==void 0&&R!==void 0?new E(Y,R):null};s.history.stack.undo.push(W)}if(g.redo.length>0)for(var b=0;b<g.redo.length;b++){const R=(F=g.redo[b].range)==null?void 0:F.index,W=(Z=g.redo[b].range)==null?void 0:Z.length,y={delta:new k(g.redo[b].delta.ops),range:R!==void 0&&W!==void 0?new E(R,W):null};s.history.stack.redo.push(y)}}function h(g){var k;s&&((k=s.getSelection())==null?void 0:k.length)===0&&window.open(g.target.href,"_blank")}function A(){if(!s||!r[l])return;const g=r[l].ops;s.setContents(g);const k=r[l].history;u(k)}function V(){if(!s||!r[l])return;Ie(ne,r[l].ops=s.getContents().ops,r);const g=structuredClone(s.history.stack);Ie(ne,r[l].history=g,r)}const q=a(V,500);function v(){if(!s)return;s.formatText(0,s.getLength(),"link",!1,"api");const g=s.getText(),k=/https?:\/\/\S+/gi,E=g.matchAll(k);for(const L of E)s.formatText(L.index,L[0].length,"link",L[0],"api");const b=/.+\@.+\..+/gi,U=g.matchAll(b);for(const L of U)s.formatText(L.index,L[0].length,"link","mailto:"+L[0],"api");document.querySelectorAll(".ql-editor a").forEach(L=>{L.addEventListener("click",h)})}const _=a(v,500);function m(g,k,E){if(E==="user"){const b=s.getText().split(`
`)[0].trim();Ie(ne,r[l].title=b===""?"Untitled":b,r),_(),q()}}async function N(){const{default:g}=await Be(async()=>{const{default:k}=await import("../chunks/quill.Bk4jDS0q.js");return{default:k}},__vite__mapDeps([0,1]),import.meta.url);e(3,s=new g(c,{formats:["bold","italic","underline","strike","code","link"],placeholder:"Enter text here"})),A(),v(),s.on("text-change",m),s.keyboard.addBinding({key:"/",altKey:!0},()=>{s.format("code",!s.getFormat().code)}),s.keyboard.addBinding({key:"-",altKey:!0},()=>{s.format("strike",!s.getFormat().strike)})}We(()=>{N()});function B(g){se[g?"unshift":"push"](()=>{c=g,e(1,c)})}return n.$$set=g=>{"tabID"in g&&e(2,l=g.tabID),"disabled"in g&&e(0,d=g.disabled)},n.$$.update=()=>{n.$$.dirty&9&&(d?s==null||s.disable():s==null||s.enable()),n.$$.dirty&24&&(s==null||s.root.setAttribute("spellcheck",o.spellCheck.toString()))},[d,c,l,s,o,B]}class mt extends Ee{constructor(t){super(),De(this,t,ht,gt,Te,{tabID:2,disabled:0})}}function Ne(n,t,e){const r=n.slice();return r[4]=t[e],r}function pt(n){let t,e;return t=new ot({}),{c(){ge(t.$$.fragment)},l(r){he(t.$$.fragment,r)},m(r,o){me(t,r,o),e=!0},p:fe,i(r){e||(z(t.$$.fragment,r),e=!0)},o(r){K(t.$$.fragment,r),e=!1},d(r){pe(t,r)}}}function vt(n){let t,e,r,o=[],l=new Map,d;e=new ft({props:{refreshClicked:st.loadFromFirestore}});let s=ke(Object.keys(n[2]));const c=a=>a[4];for(let a=0;a<s.length;a+=1){let u=Ne(n,s,a),h=c(u);l.set(h,o[a]=Fe(h,u))}return{c(){t=H("div"),ge(e.$$.fragment),r=J();for(let a=0;a<o.length;a+=1)o[a].c();this.h()},l(a){t=P(a,"DIV",{class:!0});var u=M(t);he(e.$$.fragment,u),r=$(u);for(let h=0;h<o.length;h+=1)o[h].l(u);u.forEach(S),this.h()},h(){C(t,"class","page-container svelte-1kno83k")},m(a,u){re(a,t,u),me(e,t,null),I(t,r);for(let h=0;h<o.length;h+=1)o[h]&&o[h].m(t,null);d=!0},p(a,u){u&5&&(s=ke(Object.keys(a[2])),Ae(),o=Ue(o,u,c,1,a,s,l,t,Xe,Fe,null,Ne),He())},i(a){if(!d){z(e.$$.fragment,a);for(let u=0;u<s.length;u+=1)z(o[u]);d=!0}},o(a){K(e.$$.fragment,a);for(let u=0;u<o.length;u+=1)K(o[u]);d=!1},d(a){a&&S(t),pe(e);for(let u=0;u<o.length;u+=1)o[u].d()}}}function Fe(n,t){let e,r,o;return r=new mt({props:{disabled:t[4]!==t[0],tabID:t[4]}}),{key:n,first:null,c(){e=ye(),ge(r.$$.fragment),this.h()},l(l){e=ye(),he(r.$$.fragment,l),this.h()},h(){this.first=e},m(l,d){re(l,e,d),me(r,l,d),o=!0},p(l,d){t=l;const s={};d&5&&(s.disabled=t[4]!==t[0]),d&4&&(s.tabID=t[4]),r.$set(s)},i(l){o||(z(r.$$.fragment,l),o=!0)},o(l){K(r.$$.fragment,l),o=!1},d(l){l&&S(e),pe(r,l)}}}function bt(n){let t,e,r,o;const l=[vt,pt],d=[];function s(c,a){return c[1].currentUser&&!c[1].isLoading?0:1}return t=s(n),e=d[t]=l[t](n),{c(){e.c(),r=ye()},l(c){e.l(c),r=ye()},m(c,a){d[t].m(c,a),re(c,r,a),o=!0},p(c,[a]){let u=t;t=s(c),t===u?d[t].p(c,a):(Ae(),K(d[u],1,1,()=>{d[u]=null}),He(),e=d[t],e?e.p(c,a):(e=d[t]=l[t](c),e.c()),z(e,1),e.m(r.parentNode,r))},i(c){o||(z(e),o=!0)},o(c){K(e),o=!1},d(c){c&&S(r),d[t].d(c)}}}function _t(n,t,e){let r,o,l,d;return ee(n,Ye,s=>e(3,o=s)),ee(n,je,s=>e(1,l=s)),ee(n,ne,s=>e(2,d=s)),n.$$.update=()=>{n.$$.dirty&8&&e(0,r=o.order[o.activeIndex])},[r,l,d,o]}class St extends Ee{constructor(t){super(),De(this,t,_t,bt,Te,{})}}export{St as component};
