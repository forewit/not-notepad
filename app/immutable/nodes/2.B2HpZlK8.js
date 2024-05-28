import{r as J,s as R,n as L,i as se,b as K,c as ie,y as ae,f as ce}from"../chunks/scheduler._-uiodl9.js";import{l as D,n as V,S as F,i as H,e as k,c as w,a as C,d as b,o as m,p as G,g as B,h as I,z as y,A as ue,s as M,u as x,f as z,v as O,B as Z,C as W,w as U,D as fe,x as N,q as de,m as he,E as le,F as ve,G as _e}from"../chunks/index.4ZfS5K5C.js";import{b as oe,w as me}from"../chunks/paths.B8eajj40.js";function ee(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function ge(n,e){D(n,1,1,()=>{e.delete(n.key)})}function be(n,e,t,s,a,i,o,h,_,f,c,l){let d=n.length,g=i.length,u=d;const r={};for(;u--;)r[n[u].key]=u;const v=[],E=new Map,S=new Map,A=[];for(u=g;u--;){const p=l(a,i,u),$=t(p);let T=o.get($);T?A.push(()=>T.p(p,e)):(T=f($,p),T.c()),E.set($,v[u]=T),$ in r&&S.set($,Math.abs(u-r[$]))}const Q=new Set,Y=new Set;function j(p){V(p,1),p.m(h,c),o.set(p.key,p),c=p.first,g--}for(;d&&g;){const p=v[g-1],$=n[d-1],T=p.key,P=$.key;p===$?(c=p.first,d--,g--):E.has(P)?!o.has(T)||Q.has(T)?j(p):Y.has(P)?d--:S.get(T)>S.get(P)?(Y.add(T),j(p)):(Q.add(P),d--):(_($,o),d--)}for(;d--;){const p=n[d];E.has(p.key)||_(p,o)}for(;g;)j(v[g-1]);return J(A),v}function pe(n){let e,t,s,a;return{c(){e=k("button"),t=k("div"),this.h()},l(i){e=w(i,"BUTTON",{class:!0});var o=C(e);t=w(o,"DIV",{class:!0,style:!0}),C(t).forEach(b),o.forEach(b),this.h()},h(){m(t,"class","icon svelte-fsrv9v"),G(t,"-webkit-mask","url("+n[1]+") no-repeat center / contain"),G(t,"mask","url("+n[1]+") no-repeat center / contain"),m(e,"class","svelte-fsrv9v")},m(i,o){B(i,e,o),I(e,t),s||(a=y(e,"click",ue(function(){se(n[0])&&n[0].apply(this,arguments)})),s=!0)},p(i,[o]){n=i,o&2&&G(t,"-webkit-mask","url("+n[1]+") no-repeat center / contain"),o&2&&G(t,"mask","url("+n[1]+") no-repeat center / contain")},i:L,o:L,d(i){i&&b(e),s=!1,a()}}}function ke(n,e,t){let{onClick:s=()=>{}}=e,{url:a=""}=e;return n.$$set=i=>{"onClick"in i&&t(0,s=i.onClick),"url"in i&&t(1,a=i.url)},[s,a]}class re extends F{constructor(e){super(),H(this,e,ke,pe,R,{onClick:0,url:1})}}function we(n){let e,t,s,a,i,o,h,_,f;return o=new re({props:{url:oe+"/images/svg/cancel.svg",onClick:n[2]}}),{c(){e=k("div"),t=k("button"),s=k("input"),a=M(),i=k("div"),x(o.$$.fragment),this.h()},l(c){e=w(c,"DIV",{class:!0});var l=C(e);t=w(l,"BUTTON",{class:!0});var d=C(t);s=w(d,"INPUT",{autocorrect:!0,autocomplete:!0,spellcheck:!0,type:!0,class:!0}),a=z(d),i=w(d,"DIV",{class:!0});var g=C(i);O(o.$$.fragment,g),g.forEach(b),d.forEach(b),l.forEach(b),this.h()},h(){m(s,"autocorrect","off"),m(s,"autocomplete","off"),m(s,"spellcheck","false"),m(s,"type","text"),m(s,"class","svelte-i6zefg"),m(i,"class","close-button svelte-i6zefg"),m(t,"class","tab svelte-i6zefg"),Z(t,"active",n[1]),m(e,"class","container svelte-i6zefg")},m(c,l){B(c,e,l),I(e,t),I(t,s),n[5](s),W(s,n[0]),I(t,a),I(t,i),U(o,i,null),h=!0,_||(f=[y(s,"input",n[6]),y(t,"dblclick",fe(n[7])),y(t,"click",function(){se(n[3])&&n[3].apply(this,arguments)})],_=!0)},p(c,[l]){n=c,l&1&&s.value!==n[0]&&W(s,n[0]);const d={};l&4&&(d.onClick=n[2]),o.$set(d),(!h||l&2)&&Z(t,"active",n[1])},i(c){h||(V(o.$$.fragment,c),h=!0)},o(c){D(o.$$.fragment,c),h=!1},d(c){c&&b(e),n[5](null),N(o),_=!1,J(f)}}}function Ie(n,e,t){let{title:s=""}=e,{active:a=!1}=e,{onClose:i=()=>{}}=e,{onClick:o=()=>{}}=e,h;function _(l){K[l?"unshift":"push"](()=>{h=l,t(4,h)})}function f(){s=this.value,t(0,s)}const c=()=>h.select();return n.$$set=l=>{"title"in l&&t(0,s=l.title),"active"in l&&t(1,a=l.active),"onClose"in l&&t(2,i=l.onClose),"onClick"in l&&t(3,o=l.onClick)},[s,a,i,o,h,_,f,c]}class Ce extends F{constructor(e){super(),H(this,e,Ie,we,R,{title:0,active:1,onClose:2,onClick:3})}}const q=me({tabs:[],activeIndex:0}),X={newTab:({title:n="Untitled",text:e=""}={})=>{q.update(t=>(t.tabs.push({title:n,text:e}),t.activeIndex=t.tabs.length-1,t))},removeTab:n=>{q.update(e=>(e.tabs.splice(n,1),e.activeIndex=Math.min(e.activeIndex,e.tabs.length-1),e))},setActiveIndex:n=>{q.update(e=>(e.activeIndex=n<0||n>=e.tabs.length?0:n,e))}};function Ee(n){return n*n}function $e(n){return-n*(n-2)}function te(n,e,t){const s=n.slice();return s[8]=e[t],s[9]=e,s[10]=t,s}function ne(n,e){let t,s,a,i,o,h,_,f,c;function l(){return e[5](e[10])}function d(){return e[6](e[10])}function g(r){e[7](r,e[10])}let u={active:e[0].activeIndex==e[10],onClose:l,onClick:d};return e[0].tabs[e[10]].title!==void 0&&(u.title=e[0].tabs[e[10]].title),s=new Ce({props:u}),K.push(()=>le(s,"title",g)),{key:n,first:null,c(){t=k("div"),x(s.$$.fragment),i=M(),this.h()},l(r){t=w(r,"DIV",{class:!0});var v=C(t);O(s.$$.fragment,v),i=z(v),v.forEach(b),this.h()},h(){m(t,"class","tab-container svelte-w6q47"),this.first=t},m(r,v){B(r,t,v),U(s,t,null),I(t,i),_=!0,f||(c=[y(t,"introstart",ye),y(t,"outroend",qe)],f=!0)},p(r,v){e=r;const E={};v&1&&(E.active=e[0].activeIndex==e[10]),v&1&&(E.onClose=l),v&1&&(E.onClick=d),!a&&v&1&&(a=!0,E.title=e[0].tabs[e[10]].title,ae(()=>a=!1)),s.$set(E)},i(r){_||(V(s.$$.fragment,r),r&&ce(()=>{_&&(h&&h.end(1),o=ve(t,e[1],{}),o.start())}),_=!0)},o(r){D(s.$$.fragment,r),o&&o.invalidate(),r&&(h=_e(t,e[2],{})),_=!1},d(r){r&&b(t),N(s),r&&h&&h.end(),f=!1,J(c)}}}function Te(n){let e,t,s,a=[],i=new Map,o,h,_,f,c,l,d=ee(n[0].tabs);const g=u=>u[8];for(let u=0;u<d.length;u+=1){let r=te(n,d,u),v=g(r);i.set(v,a[u]=ne(v,r))}return _=new re({props:{url:oe+"/images/svg/plus.svg",onClick:X.newTab}}),{c(){e=k("div"),t=k("div"),s=k("div");for(let u=0;u<a.length;u+=1)a[u].c();o=M(),h=k("div"),x(_.$$.fragment),f=M(),c=k("div"),this.h()},l(u){e=w(u,"DIV",{});var r=C(e);t=w(r,"DIV",{class:!0});var v=C(t);s=w(v,"DIV",{class:!0});var E=C(s);for(let A=0;A<a.length;A+=1)a[A].l(E);E.forEach(b),o=z(v),h=w(v,"DIV",{class:!0});var S=C(h);O(_.$$.fragment,S),S.forEach(b),v.forEach(b),f=z(r),c=w(r,"DIV",{class:!0}),C(c).forEach(b),r.forEach(b),this.h()},h(){m(s,"class","tabs svelte-w6q47"),m(h,"class","buttons svelte-w6q47"),m(t,"class","toolbar svelte-w6q47"),m(c,"class","separator svelte-w6q47")},m(u,r){B(u,e,r),I(e,t),I(t,s);for(let v=0;v<a.length;v+=1)a[v]&&a[v].m(s,null);I(t,o),I(t,h),U(_,h,null),I(e,f),I(e,c),l=!0},p(u,[r]){r&25&&(d=ee(u[0].tabs),de(),a=be(a,r,g,1,u,d,i,s,ge,ne,null,te),he())},i(u){if(!l){for(let r=0;r<d.length;r+=1)V(a[r]);V(_.$$.fragment,u),l=!0}},o(u){for(let r=0;r<a.length;r+=1)D(a[r]);D(_.$$.fragment,u),l=!1},d(u){u&&b(e);for(let r=0;r<a.length;r+=1)a[r].d();N(_)}}}const ye=()=>{},qe=()=>{};function De(n,e,t){let s;ie(n,q,l=>t(0,s=l));function a(l){let d=l.getBoundingClientRect();return{duration:120,easing:$e,css:g=>`max-width: ${d.width*g}px;`}}function i(l){var g;let d=l.getBoundingClientRect();return(g=l.querySelector(".tab"))==null||g.classList.remove("active"),{duration:80,easing:Ee,css:u=>`max-width: ${d.width*u}px;`}}function o(l){X.setActiveIndex(l)}function h(l){s.tabs.length!=1&&X.removeTab(l)}const _=l=>h(l),f=l=>o(l);function c(l,d){n.$$.not_equal(s.tabs[d].title,l)&&(s.tabs[d].title=l,q.set(s))}return[s,a,i,o,h,_,f,c]}class Ve extends F{constructor(e){super(),H(this,e,De,Te,R,{})}}function Se(n){let e,t,s,a;return{c(){e=k("div"),t=k("textarea"),this.h()},l(i){e=w(i,"DIV",{id:!0,class:!0});var o=C(e);t=w(o,"TEXTAREA",{spellcheck:!0,name:!0,id:!0,class:!0}),C(t).forEach(b),o.forEach(b),this.h()},h(){m(t,"spellcheck","false"),m(t,"name","editor"),m(t,"id","text"),m(t,"class","svelte-7cpmmf"),m(e,"id","editor"),m(e,"class","svelte-7cpmmf")},m(i,o){B(i,e,o),I(e,t),W(t,n[0]),s||(a=y(t,"input",n[1]),s=!0)},p(i,[o]){o&1&&W(t,i[0])},i:L,o:L,d(i){i&&b(e),s=!1,a()}}}function Ae(n,e,t){let{text:s}=e;function a(){s=this.value,t(0,s)}return n.$$set=i=>{"text"in i&&t(0,s=i.text)},[s,a]}class Be extends F{constructor(e){super(),H(this,e,Ae,Se,R,{text:0})}}function Me(n){let e,t,s,a,i,o;t=new Ve({});function h(f){n[1](f)}let _={};return n[0].tabs[n[0].activeIndex].text!==void 0&&(_.text=n[0].tabs[n[0].activeIndex].text),a=new Be({props:_}),K.push(()=>le(a,"text",h)),{c(){e=k("div"),x(t.$$.fragment),s=M(),x(a.$$.fragment),this.h()},l(f){e=w(f,"DIV",{class:!0});var c=C(e);O(t.$$.fragment,c),s=z(c),O(a.$$.fragment,c),c.forEach(b),this.h()},h(){m(e,"class","container svelte-16qa0xo")},m(f,c){B(f,e,c),U(t,e,null),I(e,s),U(a,e,null),o=!0},p(f,[c]){const l={};!i&&c&1&&(i=!0,l.text=f[0].tabs[f[0].activeIndex].text,ae(()=>i=!1)),a.$set(l)},i(f){o||(V(t.$$.fragment,f),V(a.$$.fragment,f),o=!0)},o(f){D(t.$$.fragment,f),D(a.$$.fragment,f),o=!1},d(f){f&&b(e),N(t),N(a)}}}function xe(n,e,t){let s;ie(n,q,i=>t(0,s=i)),X.newTab({title:"Hello 👋",text:"Welcome to notep... not notepad. Something completely different (Microsoft, don't sue me). v0.13"});function a(i){n.$$.not_equal(s.tabs[s.activeIndex].text,i)&&(s.tabs[s.activeIndex].text=i,q.set(s))}return[s,a]}class Ne extends F{constructor(e){super(),H(this,e,xe,Me,R,{})}}export{Ne as component};
