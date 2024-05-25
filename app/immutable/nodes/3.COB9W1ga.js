import{s as H,i as x,n as J,r as nt,b as M,x as z}from"../chunks/scheduler.B3svg8oL.js";import{S as R,i as X,e as T,c as I,a as C,d as p,m as v,x as G,g as j,h as D,p as y,s as A,A as O,f as U,B as N,n as V,o as K,C as P,E as L,w,u as W,D as F,y as it,v as at,q as lt,F as B}from"../chunks/index.B0sbfZXq.js";import{e as Q}from"../chunks/each.D6YF6ztN.js";import{b as $}from"../chunks/paths.BeBXILC-.js";function st(e){let t,n,i,o;return{c(){t=T("button"),n=T("div"),this.h()},l(l){t=I(l,"BUTTON",{class:!0});var s=C(t);n=I(s,"DIV",{class:!0,style:!0}),C(n).forEach(p),s.forEach(p),this.h()},h(){v(n,"class","icon svelte-1vruf3r"),G(n,"-webkit-mask","url("+e[1]+") no-repeat center / contain"),G(n,"mask","url("+e[1]+") no-repeat center / contain"),v(t,"class","svelte-1vruf3r")},m(l,s){j(l,t,s),D(t,n),i||(o=y(t,"click",function(){x(e[0])&&e[0].apply(this,arguments)}),i=!0)},p(l,[s]){e=l,s&2&&G(n,"-webkit-mask","url("+e[1]+") no-repeat center / contain"),s&2&&G(n,"mask","url("+e[1]+") no-repeat center / contain")},i:J,o:J,d(l){l&&p(t),i=!1,o()}}}function ot(e,t,n){let{onClick:i=()=>{}}=t,{url:o=""}=t;return e.$$set=l=>{"onClick"in l&&n(0,i=l.onClick),"url"in l&&n(1,o=l.url)},[i,o]}class tt extends R{constructor(t){super(),X(this,t,ot,st,H,{onClick:0,url:1})}}function rt(e){let t,n,i,o,l,s,_,g,h;return s=new tt({props:{url:$+"/images/svg/cancel.svg",onClick:e[3]}}),{c(){t=T("button"),n=T("div"),i=A(),o=T("input"),l=A(),O(s.$$.fragment),this.h()},l(u){t=I(u,"BUTTON",{class:!0,draggable:!0});var a=C(t);n=I(a,"DIV",{class:!0}),C(n).forEach(p),i=U(a),o=I(a,"INPUT",{autocorrect:!0,autocomplete:!0,spellcheck:!0,type:!0,class:!0}),l=U(a),N(s.$$.fragment,a),a.forEach(p),this.h()},h(){v(n,"class","divider svelte-1vrzp70"),v(o,"autocorrect","off"),v(o,"autocomplete","off"),v(o,"spellcheck","false"),v(o,"type","text"),v(o,"class","svelte-1vrzp70"),v(t,"class","tab svelte-1vrzp70"),v(t,"draggable","true"),V(t,"lockMaxWidth",e[5]>0),V(t,"active",e[1]),V(t,"hidden",e[2])},m(u,a){j(u,t,a),D(t,n),D(t,i),D(t,o),e[10](o),K(o,e[0]),D(t,l),P(s,t,null),e[12](t),_=!0,g||(h=[y(o,"input",e[11]),y(t,"dblclick",L(e[13])),y(t,"click",L(function(){x(e[4])&&e[4].apply(this,arguments)})),y(t,"dragstart",L(e[8]))],g=!0)},p(u,[a]){e=u,a&1&&o.value!==e[0]&&K(o,e[0]);const m={};a&8&&(m.onClick=e[3]),s.$set(m),(!_||a&32)&&V(t,"lockMaxWidth",e[5]>0),(!_||a&2)&&V(t,"active",e[1]),(!_||a&4)&&V(t,"hidden",e[2])},i(u){_||(w(s.$$.fragment,u),_=!0)},o(u){W(s.$$.fragment,u),_=!1},d(u){u&&p(t),e[10](null),F(s),e[12](null),g=!1,nt(h)}}}function ut(e,t,n){let{title:i=""}=t,{active:o=!1}=t,{hidden:l=!1}=t,{onClose:s=()=>{}}=t,{onClick:_=()=>{}}=t,{onDragStart:g=d=>{}}=t,{lockMaxWidth:h=0}=t;const u=d=>{g(d)};let a,m;function f(d){M[d?"unshift":"push"](()=>{a=d,n(7,a)})}function r(){i=this.value,n(0,i)}function c(d){M[d?"unshift":"push"](()=>{m=d,n(6,m)})}const k=()=>a.select();return e.$$set=d=>{"title"in d&&n(0,i=d.title),"active"in d&&n(1,o=d.active),"hidden"in d&&n(2,l=d.hidden),"onClose"in d&&n(3,s=d.onClose),"onClick"in d&&n(4,_=d.onClick),"onDragStart"in d&&n(9,g=d.onDragStart),"lockMaxWidth"in d&&n(5,h=d.lockMaxWidth)},e.$$.update=()=>{e.$$.dirty&96&&m&&h>0&&m.style.setProperty("--max-width",`${h}px`)},[i,o,l,s,_,h,m,a,u,g,f,r,c,k]}class ct extends R{constructor(t){super(),X(this,t,ut,rt,H,{title:0,active:1,hidden:2,onClose:3,onClick:4,onDragStart:9,lockMaxWidth:5})}}function Y(e,t,n){const i=e.slice();return i[16]=t[n],i[17]=t,i[18]=n,i}function Z(e){let t,n,i,o;function l(){return e[8](e[16])}function s(){return e[9](e[16])}function _(u){e[10](u,e[16])}function g(u){e[11](u)}let h={active:e[1]==e[16].id,onClose:l,onClick:s,onDragStart:e[7]};return e[16].title!==void 0&&(h.title=e[16].title),e[3]!==void 0&&(h.lockMaxWidth=e[3]),t=new ct({props:h}),M.push(()=>B(t,"title",_)),M.push(()=>B(t,"lockMaxWidth",g)),{c(){O(t.$$.fragment)},l(u){N(t.$$.fragment,u)},m(u,a){P(t,u,a),o=!0},p(u,a){e=u;const m={};a&3&&(m.active=e[1]==e[16].id),a&1&&(m.onClose=l),a&1&&(m.onClick=s),!n&&a&1&&(n=!0,m.title=e[16].title,z(()=>n=!1)),!i&&a&8&&(i=!0,m.lockMaxWidth=e[3],z(()=>i=!1)),t.$set(m)},i(u){o||(w(t.$$.fragment,u),o=!0)},o(u){W(t.$$.fragment,u),o=!1},d(u){F(t,u)}}}function ft(e){let t,n,i,o,l,s,_,g,h,u=Q(e[0]),a=[];for(let f=0;f<u.length;f+=1)a[f]=Z(Y(e,u,f));const m=f=>W(a[f],1,1,()=>{a[f]=null});return s=new tt({props:{url:$+"/images/svg/plus.svg",onClick:e[5]}}),{c(){t=T("div"),n=T("div"),i=T("div");for(let f=0;f<a.length;f+=1)a[f].c();o=A(),l=T("div"),O(s.$$.fragment),_=A(),g=T("div"),this.h()},l(f){t=I(f,"DIV",{});var r=C(t);n=I(r,"DIV",{class:!0});var c=C(n);i=I(c,"DIV",{class:!0});var k=C(i);for(let q=0;q<a.length;q+=1)a[q].l(k);k.forEach(p),o=U(c),l=I(c,"DIV",{class:!0});var d=C(l);N(s.$$.fragment,d),d.forEach(p),c.forEach(p),_=U(r),g=I(r,"DIV",{class:!0}),C(g).forEach(p),r.forEach(p),this.h()},h(){v(i,"class","tabs svelte-185rz3b"),v(l,"class","buttons"),v(n,"class","toolbar svelte-185rz3b"),v(g,"class","separator svelte-185rz3b")},m(f,r){j(f,t,r),D(t,n),D(n,i);for(let c=0;c<a.length;c+=1)a[c]&&a[c].m(i,null);e[12](i),D(n,o),D(n,l),P(s,l,null),D(t,_),D(t,g),h=!0},p(f,[r]){if(r&219){u=Q(f[0]);let c;for(c=0;c<u.length;c+=1){const k=Y(f,u,c);a[c]?(a[c].p(k,r),w(a[c],1)):(a[c]=Z(k),a[c].c(),w(a[c],1),a[c].m(i,null))}for(it(),c=u.length;c<a.length;c+=1)m(c);at()}},i(f){if(!h){for(let r=0;r<u.length;r+=1)w(a[r]);w(s.$$.fragment,f),h=!0}},o(f){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)W(a[r]);W(s.$$.fragment,f),h=!1},d(f){f&&p(t),lt(a,f),e[12](null),F(s)}}}function dt(e,t,n){let{tabs:i}=t,{activeTabID:o}=t,l=i.map(b=>b.id),s,_=0;const g=(b,E=300)=>{let S;return(...et)=>{clearTimeout(S),S=setTimeout(()=>{b.apply(void 0,et)},E)}},h=b=>{let E=l.indexOf(b);n(3,_=s.children[0].clientWidth),u(),n(0,i=i.filter(S=>S.id!=b)),l=l.filter(S=>S!=b),m(l[Math.min(E,l.length-1)])},u=g(()=>{console.log("debounced closing tabs..."),n(3,_=0)},700),a=()=>{let b=Date.now().toString();i.push({id:b,title:"Untitled"}),l.push(b),n(0,i),m(b)},m=b=>{n(1,o=b),!(_>0)&&setTimeout(()=>{var E;(E=s.querySelector(".tab.active"))==null||E.scrollIntoView({behavior:"smooth"})})},f=()=>{console.log("tab drag start")},r=b=>h(b.id),c=b=>m(b.id);function k(b,E){e.$$.not_equal(E.title,b)&&(E.title=b,n(0,i))}function d(b){_=b,n(3,_)}function q(b){M[b?"unshift":"push"](()=>{s=b,n(2,s)})}return e.$$set=b=>{"tabs"in b&&n(0,i=b.tabs),"activeTabID"in b&&n(1,o=b.activeTabID)},[i,o,s,_,h,a,m,f,r,c,k,d,q]}class ht extends R{constructor(t){super(),X(this,t,dt,ft,H,{tabs:0,activeTabID:1})}}function bt(e){let t,n,i,o;return{c(){t=T("div"),n=T("textarea"),this.h()},l(l){t=I(l,"DIV",{id:!0,class:!0});var s=C(t);n=I(s,"TEXTAREA",{spellcheck:!0,name:!0,id:!0,class:!0}),C(n).forEach(p),s.forEach(p),this.h()},h(){v(n,"spellcheck","false"),v(n,"name","editor"),v(n,"id","text"),v(n,"class","svelte-7cpmmf"),v(t,"id","editor"),v(t,"class","svelte-7cpmmf")},m(l,s){j(l,t,s),D(t,n),K(n,e[0]),i||(o=y(n,"input",e[1]),i=!0)},p(l,[s]){s&1&&K(n,l[0])},i:J,o:J,d(l){l&&p(t),i=!1,o()}}}function _t(e,t,n){let{text:i}=t;function o(){i=this.value,n(0,i)}return e.$$set=l=>{"text"in l&&n(0,i=l.text)},[i,o]}class gt extends R{constructor(t){super(),X(this,t,_t,bt,H,{text:0})}}function mt(e){let t,n,i,o,l,s,_,g;function h(r){e[3](r)}function u(r){e[4](r)}let a={};e[0]!==void 0&&(a.tabs=e[0]),e[1]!==void 0&&(a.activeTabID=e[1]),n=new ht({props:a}),M.push(()=>B(n,"tabs",h)),M.push(()=>B(n,"activeTabID",u));function m(r){e[5](r)}let f={};return e[2].text!==void 0&&(f.text=e[2].text),s=new gt({props:f}),M.push(()=>B(s,"text",m)),{c(){t=T("div"),O(n.$$.fragment),l=A(),O(s.$$.fragment),this.h()},l(r){t=I(r,"DIV",{class:!0});var c=C(t);N(n.$$.fragment,c),l=U(c),N(s.$$.fragment,c),c.forEach(p),this.h()},h(){v(t,"class","container svelte-16qa0xo")},m(r,c){j(r,t,c),P(n,t,null),D(t,l),P(s,t,null),g=!0},p(r,[c]){const k={};!i&&c&1&&(i=!0,k.tabs=r[0],z(()=>i=!1)),!o&&c&2&&(o=!0,k.activeTabID=r[1],z(()=>o=!1)),n.$set(k);const d={};!_&&c&4&&(_=!0,d.text=r[2].text,z(()=>_=!1)),s.$set(d)},i(r){g||(w(n.$$.fragment,r),w(s.$$.fragment,r),g=!0)},o(r){W(n.$$.fragment,r),W(s.$$.fragment,r),g=!1},d(r){r&&p(t),F(n),F(s)}}}function vt(e,t,n){let i,o=[{id:Date.now().toString(),title:"Hello 👋",text:"Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.3"}],l=o[0].id;function s(h){o=h,n(0,o)}function _(h){l=h,n(1,l)}function g(h){e.$$.not_equal(i.text,h)&&(i.text=h,n(2,i),n(0,o),n(1,l))}return e.$$.update=()=>{e.$$.dirty&3&&n(2,i=o.find(h=>h.id==l)||{text:"Click the ➕ above to create a new tab."})},[o,l,i,s,_,g]}class It extends R{constructor(t){super(),X(this,t,vt,mt,H,{})}}export{It as component};
