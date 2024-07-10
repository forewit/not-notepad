import{s as j,v as W,w as B,x as G,y as K,c as h,o as Q,n as F,a as R,d as ae}from"../chunks/scheduler.CIGC0wka.js";import{S as A,i as L,H as ne,s as M,D as re,h as O,j as D,a as T,t as k,g as d,e as S,c as $,v as oe,w as g,A as b,p as X,E as ie,q as Y,k as P,r as Z,u as ee,d as z}from"../chunks/index.Dl2TOe6M.js";import{s as E,a as y,c as le,d as U,e as V,g as ce,h as ue,b as q,f as me}from"../chunks/firebaseStore.DflwW1xJ.js";import{t as J,a as N,m as fe}from"../chunks/tabsStore.CeezCEDL.js";import{g as de}from"../chunks/entry.CiYmD63i.js";import{b as C}from"../chunks/paths.DMi7W92V.js";import{t as pe}from"../chunks/themes.BTx5Q4mv.js";const he=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global,ge=!0,_e="always",Me=Object.freeze(Object.defineProperty({__proto__:null,prerender:ge,trailingSlash:_e},Symbol.toStringTag,{value:"Module"}));function be(r){let e,o,s;const a=r[3].default,i=W(a,r,r[2],null);return{c(){e=new ne(!1),o=M(),i&&i.c(),this.h()},l(t){e=re(t,!1),o=O(t),i&&i.l(t),this.h()},h(){e.a=o},m(t,n){e.m(r[0],t,n),D(t,o,n),i&&i.m(t,n),s=!0},p(t,[n]){(!s||n&1)&&e.p(t[0]),i&&i.p&&(!s||n&4)&&B(i,a,t,t[2],s?K(a,t[2],n,null):G(t[2]),null)},i(t){s||(T(i,t),s=!0)},o(t){k(i,t),s=!1},d(t){t&&(e.d(),d(o)),i&&i.d(t)}}}function ve(r,e,o){let s,a;h(r,E,l=>o(1,a=l));let{$$slots:i={},$$scope:t}=e;function n(l){const u=pe.find(p=>p.name===l);return u?`<style>
    :root {
    --bg: ${u.bg};
    --bg-alt: ${u.bgAlt};
    --main: ${u.main};
    --caret: ${u.caret};
    --error: ${u.error};
    --sub: ${u.sub};
    --text: ${u.text};
    }
    </style>`:""}return Q(()=>{n(a.theme)}),r.$$set=l=>{"$$scope"in l&&o(2,t=l.$$scope)},r.$$.update=()=>{r.$$.dirty&2&&o(0,s=n(a.theme))},[s,a,t,i]}class ye extends A{constructor(e){super(),L(this,e,ve,be,j,{})}}function Se(r){let e,o=`<span class="status-icon svelte-1mx6eh7" style="-webkit-mask: url(${C}/images/svg/double-checkmark.svg) no-repeat center / contain; mask: url(${C}/images/svg/double-checkmark.svg) no-repeat center / contain;"></span>`;return{c(){e=S("div"),e.innerHTML=o,this.h()},l(s){e=$(s,"DIV",{class:!0,"data-svelte-h":!0}),oe(e)!=="svelte-jbp3id"&&(e.innerHTML=o),this.h()},h(){g(e,"class","status svelte-1mx6eh7"),b(e,"saving",r[0].savingStatus==="saving"),b(e,"saved",r[0].savingStatus==="saved"),b(e,"error",r[0].savingStatus==="error")},m(s,a){D(s,e,a)},p(s,[a]){a&1&&b(e,"saving",s[0].savingStatus==="saving"),a&1&&b(e,"saved",s[0].savingStatus==="saved"),a&1&&b(e,"error",s[0].savingStatus==="error")},i:F,o:F,d(s){s&&d(e)}}}function $e(r,e,o){let s;return h(r,y,a=>o(0,s=a)),[s]}class we extends A{constructor(e){super(),L(this,e,$e,Se,j,{})}}const{document:H}=he;function Ee(r){let e,o,s,a,i;const t=r[3].default,n=W(t,r,r[5],null);return a=new we({}),{c(){e=S("div"),n&&n.c(),o=M(),s=S("div"),X(a.$$.fragment),this.h()},l(l){e=$(l,"DIV",{class:!0});var u=z(e);n&&n.l(u),o=O(u),s=$(u,"DIV",{class:!0});var p=z(s);Y(a.$$.fragment,p),p.forEach(d),u.forEach(d),this.h()},h(){g(s,"class","sync-status svelte-1raio45"),g(e,"class","layout-container svelte-1raio45")},m(l,u){D(l,e,u),n&&n.m(e,null),P(e,o),P(e,s),Z(a,s,null),r[4](e),i=!0},p(l,u){n&&n.p&&(!i||u&32)&&B(n,t,l,l[5],i?K(t,l[5],u,null):G(l[5]),null)},i(l){i||(T(n,l),T(a.$$.fragment,l),i=!0)},o(l){k(n,l),k(a.$$.fragment,l),i=!1},d(l){l&&d(e),n&&n.d(l),ee(a),r[4](null)}}}function Te(r){let e,o,s,a,i;return a=new ye({props:{$$slots:{default:[Ee]},$$scope:{ctx:r}}}),{c(){e=S("meta"),o=S("meta"),s=M(),X(a.$$.fragment),this.h()},l(t){const n=ie("svelte-17tnzz8",H.head);e=$(n,"META",{name:!0,content:!0}),o=$(n,"META",{name:!0,content:!0}),n.forEach(d),s=O(t),Y(a.$$.fragment,t),this.h()},h(){g(e,"name","viewport"),g(e,"content","width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"),g(o,"name","theme-color"),g(o,"content","var(--bg)")},m(t,n){P(H.head,e),P(H.head,o),D(t,s,n),Z(a,t,n),i=!0},p(t,[n]){const l={};n&33&&(l.$$scope={dirty:n,ctx:t}),a.$set(l)},i(t){i||(T(a.$$.fragment,t),i=!0)},o(t){k(a.$$.fragment,t),i=!1},d(t){t&&d(s),d(e),d(o),ee(a,t)}}}function ke(){switch(screen.orientation.type){case"portrait-primary":document.documentElement.style.setProperty("--safe-area-top","env(safe-area-inset-top)"),document.documentElement.style.setProperty("--safe-area-left","0px"),document.documentElement.style.setProperty("--safe-area-right","0px");break;case"landscape-primary":document.documentElement.style.setProperty("--safe-area-top","0px"),document.documentElement.style.setProperty("--safe-area-left","env(safe-area-inset-left)"),document.documentElement.style.setProperty("--safe-area-right","0px");break;case"landscape-secondary":document.documentElement.style.setProperty("--safe-area-top","0px"),document.documentElement.style.setProperty("--safe-area-left","0px"),document.documentElement.style.setProperty("--safe-area-right","env(safe-area-inset-right)");break}}function Pe(r,e,o){let s,a,i,t,n;h(r,E,c=>o(7,s=c)),h(r,q,c=>o(8,a=c)),h(r,y,c=>o(2,i=c)),h(r,fe,c=>o(9,t=c)),h(r,J,c=>o(10,n=c));let{$$slots:l={},$$scope:u}=e,p=!0,I;function x(){if(p)return;let c={};Object.entries(n).forEach(([f,m])=>{c[f]=JSON.stringify(m)});const v={activeIndex:t.activeIndex,settings:s,tabs:c};y.update(f=>({...f,data:v})),me.publish()}J.subscribe(x),E.subscribe(x);function te(c){c&&Object.entries(c).forEach(([v,f])=>{try{N.newTabFromString(v,f)}catch(m){console.warn("Failed to parse tab!",f,m);return}})}let w=!1;Q(()=>{screen.orientation.addEventListener("change",ke),le.onAuthStateChanged(async c=>{if(!c){y.update(_=>({..._,isLoading:!1,currentUser:c})),o(1,w=!0);return}const v=U(V,"users",c.uid),f=await ce(v);let m={tabs:{},activeIndex:0,settings:{theme:"Canvas",spellCheck:!0}};if(f.exists())console.log("Fetching firestore user doc..."),m=f.data();else{console.log("Creating firestore user doc...");const _=U(V,"users",c.uid);await ue(_,m,{merge:!0})}te(m.tabs),N.setActiveIndex(m.activeIndex),R(E,s=m.settings,s),y.update(_=>({..._,isLoading:!1,currentUser:c,data:m})),o(1,w=!0),p=!1})});function se(c){ae[c?"unshift":"push"](()=>{I=c,o(0,I)})}return r.$$set=c=>{"$$scope"in c&&o(5,u=c.$$scope)},r.$$.update=()=>{r.$$.dirty&6&&!i.currentUser&&w&&(R(q,a=window.location.pathname.slice(C.length),a),de(C+"/login"))},[I,w,i,l,se,u]}class Oe extends A{constructor(e){super(),L(this,e,Pe,Te,j,{})}}export{Oe as component,Me as universal};