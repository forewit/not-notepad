import{s as E,q as H,u as F,v as I,w as k,c as A,o as R}from"../chunks/scheduler.cfeIpFhx.js";import{S as C,i as j,H as U,m as w,s as q,D as L,E as O,g as u,h as M,k as g,j as $,a as S,t as v,e as _,p as V,c as b,q as G,w as p,r as P,u as W,d as y}from"../chunks/index.BC2r3XlJ.js";import{b as B,a as h,d as z,c as T,g as J,s as K}from"../chunks/firebaseStore.BnHnmvqp.js";import{t as D}from"../chunks/tabsStore.tZ-wagmx.js";import{g as Q}from"../chunks/entry.DDGKKOZe.js";import{b as X}from"../chunks/paths.bXkiZD-u.js";import{s as Y}from"../chunks/settingsStore.CsKC20lt.js";import{t as Z}from"../chunks/themes.ChGLdU4W.js";const x=!0,N="always",pe=Object.freeze(Object.defineProperty({__proto__:null,prerender:x,trailingSlash:N},Symbol.toStringTag,{value:"Module"}));function ee(l){let o,n,r,c;const t=l[3].default,e=H(t,l,l[2],null);return{c(){o=new U(!1),n=w(),r=q(),e&&e.c(),this.h()},l(s){const a=L("svelte-v08gfe",document.head);o=O(a,!1),n=w(),a.forEach(u),r=M(s),e&&e.l(s),this.h()},h(){o.a=n},m(s,a){o.m(l[0],document.head),g(document.head,n),$(s,r,a),e&&e.m(s,a),c=!0},p(s,[a]){(!c||a&1)&&o.p(s[0]),e&&e.p&&(!c||a&4)&&F(e,t,s,s[2],c?k(t,s[2],a,null):I(s[2]),null)},i(s){c||(S(e,s),c=!0)},o(s){v(e,s),c=!1},d(s){s&&(o.d(),u(r)),u(n),e&&e.d(s)}}}function te(l,o,n){let r,c;A(l,Y,a=>n(1,c=a));let{$$slots:t={},$$scope:e}=o;function s(a){console.log(a);const i=Z.find(f=>f.name===a);return i?`<style>
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
    </style>`:""}return l.$$set=a=>{"$$scope"in a&&n(2,e=a.$$scope)},l.$$.update=()=>{l.$$.dirty&2&&n(0,r=s(c.theme))},[r,c,e,t]}class se extends C{constructor(o){super(),j(this,o,te,ee,E,{})}}function ae(l){let o,n,r;const c=l[2].default,t=H(c,l,l[3],null);return{c(){o=_("div"),n=_("div"),t&&t.c(),this.h()},l(e){o=b(e,"DIV",{class:!0});var s=y(o);n=b(s,"DIV",{class:!0});var a=y(n);t&&t.l(a),a.forEach(u),s.forEach(u),this.h()},h(){p(n,"class","content svelte-1kodcgf"),p(o,"class","container svelte-1kodcgf")},m(e,s){$(e,o,s),g(o,n),t&&t.m(n,null),r=!0},p(e,s){t&&t.p&&(!r||s&8)&&F(t,c,e,e[3],r?k(c,e[3],s,null):I(e[3]),null)},i(e){r||(S(t,e),r=!0)},o(e){v(t,e),r=!1},d(e){e&&u(o),t&&t.d(e)}}}function oe(l){let o,n,r,c;return r=new se({props:{$$slots:{default:[ae]},$$scope:{ctx:l}}}),{c(){o=_("meta"),n=q(),V(r.$$.fragment),this.h()},l(t){const e=L("svelte-1xk05yi",document.head);o=b(e,"META",{name:!0,content:!0}),e.forEach(u),n=M(t),G(r.$$.fragment,t),this.h()},h(){p(o,"name","viewport"),p(o,"content","width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover")},m(t,e){g(document.head,o),$(t,n,e),P(r,t,e),c=!0},p(t,[e]){const s={};e&8&&(s.$$scope={dirty:e,ctx:t}),r.$set(s)},i(t){c||(S(r.$$.fragment,t),c=!0)},o(t){v(r.$$.fragment,t),c=!1},d(t){t&&u(n),u(o),W(r,t)}}}function re(l,o,n){let r;A(l,h,a=>n(1,r=a));let{$$slots:c={},$$scope:t}=o;function e(a){a.length!==0&&a.forEach(i=>{try{D.newTabFromString(i)}catch(f){console.warn("Failed to parse tab!",i,f);return}})}let s=!1;return R(()=>{B.onAuthStateChanged(async a=>{if(!a){h.update(d=>({...d,isLoading:!1,currentUser:a})),n(0,s=!0);return}const i=z(T,"users",a.uid),f=await J(i);let m={tabs:[],activeIndex:0};if(f.exists())console.log("Fetching firestore user doc..."),m=f.data();else{console.log("Creating firestore user doc...");const d=z(T,"users",a.uid);await K(d,m,{merge:!0})}e(m.tabs),D.setActiveIndex(m.activeIndex),h.update(d=>({...d,isLoading:!1,currentUser:a,data:m})),n(0,s=!0)})}),l.$$set=a=>{"$$scope"in a&&n(3,t=a.$$scope)},l.$$.update=()=>{l.$$.dirty&3&&!r.currentUser&&s&&Q(X+"/login")},[s,r,c,t]}class he extends C{constructor(o){super(),j(this,o,re,oe,E,{})}}export{he as component,pe as universal};
