import{s as H,v as B,w as G,x as J,y as K,c as _,o as N,n as q,a as z,d as te}from"../chunks/scheduler.CIGC0wka.js";import{S as j,i as L,H as se,s as M,D as ae,h as R,j as D,a as E,t as T,g as d,e as $,c as S,v as ne,w as f,A as b,p as Q,E as re,q as X,k as P,r as Y,u as Z,d as O}from"../chunks/index.Dl2TOe6M.js";import{s as y,a as v,c as oe,d as U,e as V,g as ie,h as le,b as F,f as ce}from"../chunks/firebaseStore.Cy3w71fQ.js";import{t as ue,a as x,m as me}from"../chunks/tabsStore.DamBL7xm.js";import{b as C,g as de}from"../chunks/entry.BY_YvmEg.js";import{t as W}from"../chunks/themes.BTx5Q4mv.js";const fe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global,pe=!0,he="always",Ae=Object.freeze(Object.defineProperty({__proto__:null,prerender:pe,trailingSlash:he},Symbol.toStringTag,{value:"Module"}));function ge(r){let e,o,s;const a=r[3].default,i=B(a,r,r[2],null);return{c(){e=new se(!1),o=M(),i&&i.c(),this.h()},l(t){e=ae(t,!1),o=R(t),i&&i.l(t),this.h()},h(){e.a=o},m(t,n){e.m(r[0],t,n),D(t,o,n),i&&i.m(t,n),s=!0},p(t,[n]){(!s||n&1)&&e.p(t[0]),i&&i.p&&(!s||n&4)&&G(i,a,t,t[2],s?K(a,t[2],n,null):J(t[2]),null)},i(t){s||(E(i,t),s=!0)},o(t){T(i,t),s=!1},d(t){t&&(e.d(),d(o)),i&&i.d(t)}}}function be(r,e,o){let s,a;_(r,y,c=>o(1,a=c));let{$$slots:i={},$$scope:t}=e;function n(c){const m=W.find(p=>p.name===c);return m?`<style>
    :root {
    --bg: ${m.bg};
    --bg-alt: ${m.bgAlt};
    --main: ${m.main};
    --caret: ${m.caret};
    --error: ${m.error};
    --sub: ${m.sub};
    --text: ${m.text};
    }
    </style>`:""}function l(){var m;const c=W.find(p=>p.name===a.theme);c&&((m=document.querySelector('meta[name="theme-color"]'))==null||m.setAttribute("content",c.bg))}return N(()=>{n(a.theme),y.subscribe(l)}),r.$$set=c=>{"$$scope"in c&&o(2,t=c.$$scope)},r.$$.update=()=>{r.$$.dirty&2&&o(0,s=n(a.theme))},[s,a,t,i]}class _e extends j{constructor(e){super(),L(this,e,be,ge,H,{})}}function ve(r){let e,o=`<span class="status-icon svelte-1mx6eh7" style="-webkit-mask: url(${C}/images/svg/double-checkmark.svg) no-repeat center / contain; mask: url(${C}/images/svg/double-checkmark.svg) no-repeat center / contain;"></span>`;return{c(){e=$("div"),e.innerHTML=o,this.h()},l(s){e=S(s,"DIV",{class:!0,"data-svelte-h":!0}),ne(e)!=="svelte-jbp3id"&&(e.innerHTML=o),this.h()},h(){f(e,"class","status svelte-1mx6eh7"),b(e,"saving",r[0].savingStatus==="saving"),b(e,"saved",r[0].savingStatus==="saved"),b(e,"error",r[0].savingStatus==="error")},m(s,a){D(s,e,a)},p(s,[a]){a&1&&b(e,"saving",s[0].savingStatus==="saving"),a&1&&b(e,"saved",s[0].savingStatus==="saved"),a&1&&b(e,"error",s[0].savingStatus==="error")},i:q,o:q,d(s){s&&d(e)}}}function ye(r,e,o){let s;return _(r,v,a=>o(0,s=a)),[s]}class $e extends j{constructor(e){super(),L(this,e,ye,ve,H,{})}}const{document:A}=fe;function Se(r){let e,o,s,a,i;const t=r[3].default,n=B(t,r,r[5],null);return a=new $e({}),{c(){e=$("div"),n&&n.c(),o=M(),s=$("div"),Q(a.$$.fragment),this.h()},l(l){e=S(l,"DIV",{class:!0});var c=O(e);n&&n.l(c),o=R(c),s=S(c,"DIV",{class:!0});var m=O(s);X(a.$$.fragment,m),m.forEach(d),c.forEach(d),this.h()},h(){f(s,"class","sync-status svelte-j4k8tx"),f(e,"class","layout-container svelte-j4k8tx")},m(l,c){D(l,e,c),n&&n.m(e,null),P(e,o),P(e,s),Y(a,s,null),r[4](e),i=!0},p(l,c){n&&n.p&&(!i||c&32)&&G(n,t,l,l[5],i?K(t,l[5],c,null):J(l[5]),null)},i(l){i||(E(n,l),E(a.$$.fragment,l),i=!0)},o(l){T(n,l),T(a.$$.fragment,l),i=!1},d(l){l&&d(e),n&&n.d(l),Z(a),r[4](null)}}}function we(r){let e,o,s,a,i;return a=new _e({props:{$$slots:{default:[Se]},$$scope:{ctx:r}}}),{c(){e=$("meta"),o=$("meta"),s=M(),Q(a.$$.fragment),this.h()},l(t){const n=re("svelte-17tnzz8",A.head);e=S(n,"META",{name:!0,content:!0}),o=S(n,"META",{name:!0,content:!0}),n.forEach(d),s=R(t),X(a.$$.fragment,t),this.h()},h(){f(e,"name","viewport"),f(e,"content","width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"),f(o,"name","theme-color"),f(o,"content","var(--bg)")},m(t,n){P(A.head,e),P(A.head,o),D(t,s,n),Y(a,t,n),i=!0},p(t,[n]){const l={};n&33&&(l.$$scope={dirty:n,ctx:t}),a.$set(l)},i(t){i||(E(a.$$.fragment,t),i=!0)},o(t){T(a.$$.fragment,t),i=!1},d(t){t&&d(s),d(e),d(o),Z(a,t)}}}function ke(){switch(screen.orientation.type){case"portrait-primary":document.documentElement.style.setProperty("--safe-area-top","env(safe-area-inset-top)"),document.documentElement.style.setProperty("--safe-area-left","0px"),document.documentElement.style.setProperty("--safe-area-right","0px");break;case"landscape-primary":document.documentElement.style.setProperty("--safe-area-top","0px"),document.documentElement.style.setProperty("--safe-area-left","env(safe-area-inset-left)"),document.documentElement.style.setProperty("--safe-area-right","0px");break;case"landscape-secondary":document.documentElement.style.setProperty("--safe-area-top","0px"),document.documentElement.style.setProperty("--safe-area-left","0px"),document.documentElement.style.setProperty("--safe-area-right","env(safe-area-inset-right)");break}}function Ee(r,e,o){let s,a,i,t;_(r,y,u=>o(7,s=u)),_(r,F,u=>o(8,a=u)),_(r,v,u=>o(2,i=u)),_(r,me,u=>o(9,t=u));let{$$slots:n={},$$scope:l}=e,c=!0,m;function p(){if(c)return;const u=x.packTabs(),I={activeIndex:t.activeIndex,settings:s,tabs:u};v.update(k=>({...k,data:I})),ce.publish()}ue.subscribe(p),y.subscribe(p);let w=!1;N(()=>{screen.orientation.addEventListener("change",ke),oe.onAuthStateChanged(async u=>{if(!u){v.update(g=>({...g,isLoading:!1,currentUser:u})),o(1,w=!0);return}const I=U(V,"users",u.uid),k=await ie(I);let h={tabs:{},activeIndex:0,settings:{theme:"Canvas",spellCheck:!0}};if(k.exists())console.log("Fetching firestore user doc..."),h=k.data();else{console.log("Creating firestore user doc...");const g=U(V,"users",u.uid);await le(g,h,{merge:!0})}x.loadPackedTabs(h.tabs),x.setActiveIndex(h.activeIndex),z(y,s=h.settings,s),v.update(g=>({...g,isLoading:!1,currentUser:u,data:h})),o(1,w=!0),c=!1})});function ee(u){te[u?"unshift":"push"](()=>{m=u,o(0,m)})}return r.$$set=u=>{"$$scope"in u&&o(5,l=u.$$scope)},r.$$.update=()=>{r.$$.dirty&6&&!i.currentUser&&w&&(z(F,a=window.location.pathname.slice(C.length),a),de(C+"/login"))},[m,w,i,n,ee,l]}class He extends j{constructor(e){super(),L(this,e,Ee,we,H,{})}}export{He as component,Ae as universal};
