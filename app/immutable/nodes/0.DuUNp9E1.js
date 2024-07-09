import{s as T,q as D,u as E,v as H,w as F,c as I,o as L}from"../chunks/scheduler.cfeIpFhx.js";import{S as k,i as A,H as M,s as C,D as R,h as j,j as g,a as $,t as S,g as u,e as _,p as U,E as O,c as b,q as V,w as p,k as q,r as G,u as P,d as v}from"../chunks/index.D2coaRY5.js";import{b as W,a as h,d as w,c as y,g as B,s as J}from"../chunks/firebaseStore.DYZP6Coa.js";import{t as z}from"../chunks/tabsStore.D-N-9ZP9.js";import{g as K,b as Q}from"../chunks/entry.CDzcEwSh.js";import{s as X}from"../chunks/settingsStore.D-jEOfoB.js";import{t as Y}from"../chunks/themes.ChGLdU4W.js";const Z=!0,x="always",de=Object.freeze(Object.defineProperty({__proto__:null,prerender:Z,trailingSlash:x},Symbol.toStringTag,{value:"Module"}));function N(l){let a,r,s;const c=l[3].default,t=D(c,l,l[2],null);return{c(){a=new M(!1),r=C(),t&&t.c(),this.h()},l(e){a=R(e,!1),r=j(e),t&&t.l(e),this.h()},h(){a.a=r},m(e,o){a.m(l[0],e,o),g(e,r,o),t&&t.m(e,o),s=!0},p(e,[o]){(!s||o&1)&&a.p(e[0]),t&&t.p&&(!s||o&4)&&E(t,c,e,e[2],s?F(c,e[2],o,null):H(e[2]),null)},i(e){s||($(t,e),s=!0)},o(e){S(t,e),s=!1},d(e){e&&(a.d(),u(r)),t&&t.d(e)}}}function ee(l,a,r){let s,c;I(l,X,n=>r(1,c=n));let{$$slots:t={},$$scope:e}=a;function o(n){console.log(n);const i=Y.find(f=>f.name===n);return i?`<style>
    :root {
    --bg: ${i.bg};
    --bg-alt: ${i.bgAlt};
    --main: ${i.main};
    --caret: ${i.caret};
    --error: ${i.error};
    --sub: ${i.sub};
    --text: ${i.text};
    --font: ${i.font};
    --font-size: ${i.fontSize};
    --ui-font: ${i.uiFont};
    --ui-font-size: ${i.uiFontSize};
    --transition-speed: ${i.transitionSpeed};
    --tabbar-scrollbar-size: ${i.tabbarScrollbarSize};
    --tabbar-height: ${i.tabbarHeight};
    --tab-height: ${i.tabHeight};
    --tab-radius: ${i.tabRadius};
    --tab-gaps: ${i.tabGaps};
    --editor-scrollbar-size: ${i.editorScrollbarSize};
    }
    </style>`:""}return l.$$set=n=>{"$$scope"in n&&r(2,e=n.$$scope)},l.$$.update=()=>{l.$$.dirty&2&&r(0,s=o(c.theme))},[s,c,e,t]}class te extends k{constructor(a){super(),A(this,a,ee,N,T,{})}}function se(l){let a,r,s;const c=l[2].default,t=D(c,l,l[3],null);return{c(){a=_("div"),r=_("div"),t&&t.c(),this.h()},l(e){a=b(e,"DIV",{class:!0});var o=v(a);r=b(o,"DIV",{class:!0});var n=v(r);t&&t.l(n),n.forEach(u),o.forEach(u),this.h()},h(){p(r,"class","content svelte-1kodcgf"),p(a,"class","container svelte-1kodcgf")},m(e,o){g(e,a,o),q(a,r),t&&t.m(r,null),s=!0},p(e,o){t&&t.p&&(!s||o&8)&&E(t,c,e,e[3],s?F(c,e[3],o,null):H(e[3]),null)},i(e){s||($(t,e),s=!0)},o(e){S(t,e),s=!1},d(e){e&&u(a),t&&t.d(e)}}}function ae(l){let a,r,s,c;return s=new te({props:{$$slots:{default:[se]},$$scope:{ctx:l}}}),{c(){a=_("meta"),r=C(),U(s.$$.fragment),this.h()},l(t){const e=O("svelte-1xk05yi",document.head);a=b(e,"META",{name:!0,content:!0}),e.forEach(u),r=j(t),V(s.$$.fragment,t),this.h()},h(){p(a,"name","viewport"),p(a,"content","width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover")},m(t,e){q(document.head,a),g(t,r,e),G(s,t,e),c=!0},p(t,[e]){const o={};e&8&&(o.$$scope={dirty:e,ctx:t}),s.$set(o)},i(t){c||($(s.$$.fragment,t),c=!0)},o(t){S(s.$$.fragment,t),c=!1},d(t){t&&u(r),u(a),P(s,t)}}}function re(l,a,r){let s;I(l,h,n=>r(1,s=n));let{$$slots:c={},$$scope:t}=a;function e(n){n.length!==0&&n.forEach(i=>{try{z.newTabFromString(i)}catch(f){console.warn("Failed to parse tab!",i,f);return}})}let o=!1;return L(()=>{W.onAuthStateChanged(async n=>{if(!n){h.update(d=>({...d,isLoading:!1,currentUser:n})),r(0,o=!0);return}const i=w(y,"users",n.uid),f=await B(i);let m={tabs:[],activeIndex:0};if(f.exists())console.log("Fetching firestore user doc..."),m=f.data();else{console.log("Creating firestore user doc...");const d=w(y,"users",n.uid);await J(d,m,{merge:!0})}e(m.tabs),z.setActiveIndex(m.activeIndex),h.update(d=>({...d,isLoading:!1,currentUser:n,data:m})),r(0,o=!0)})}),l.$$set=n=>{"$$scope"in n&&r(3,t=n.$$scope)},l.$$.update=()=>{l.$$.dirty&3&&!s.currentUser&&o&&K(Q+"/login")},[o,s,c,t]}class me extends k{constructor(a){super(),A(this,a,re,ae,T,{})}}export{me as component,de as universal};
