import{s as A,v as N,w as W,x as B,y as G,c as g,n as R,o as Z,a as V}from"../chunks/scheduler.CIGC0wka.js";import{S as L,i as M,H as ee,s as O,D as te,f as F,g as j,n as E,l as C,d as p,e as y,c as w,v as se,w as b,A as v,p as K,E as ae,q as Q,h as D,r as X,u as Y,a as x}from"../chunks/index.B2jrl3UH.js";import{s as I,a as $,c as re,d as U,e as q,g as ne,h as oe,b as P,f as ie}from"../chunks/firebaseStore.CClSYpTG.js";import{t as z,a as J,m as le}from"../chunks/tabsStore.Duw27B6l.js";import{g as ce}from"../chunks/entry.miub7LWv.js";import{b as H}from"../chunks/paths.oo8Ioy6k.js";import{t as ue}from"../chunks/themes.BTx5Q4mv.js";const fe=!0,de="always",Ce=Object.freeze(Object.defineProperty({__proto__:null,prerender:fe,trailingSlash:de},Symbol.toStringTag,{value:"Module"}));function me(n){let e,r,a;const o=n[3].default,t=N(o,n,n[2],null);return{c(){e=new ee(!1),r=O(),t&&t.c(),this.h()},l(s){e=te(s,!1),r=F(s),t&&t.l(s),this.h()},h(){e.a=r},m(s,u){e.m(n[0],s,u),j(s,r,u),t&&t.m(s,u),a=!0},p(s,[u]){(!a||u&1)&&e.p(s[0]),t&&t.p&&(!a||u&4)&&W(t,o,s,s[2],a?G(o,s[2],u,null):B(s[2]),null)},i(s){a||(E(t,s),a=!0)},o(s){C(t,s),a=!1},d(s){s&&(e.d(),p(r)),t&&t.d(s)}}}function pe(n,e,r){let a,o;g(n,I,c=>r(1,o=c));let{$$slots:t={},$$scope:s}=e;function u(c){const i=ue.find(f=>f.name===c);return i?`<style>
    :root {
    --bg: ${i.bg};
    --bg-alt: ${i.bgAlt};
    --main: ${i.main};
    --caret: ${i.caret};
    --error: ${i.error};
    --sub: ${i.sub};
    --text: ${i.text};
    }
    </style>`:""}return n.$$set=c=>{"$$scope"in c&&r(2,s=c.$$scope)},n.$$.update=()=>{n.$$.dirty&2&&r(0,a=u(o.theme))},[a,o,s,t]}class he extends L{constructor(e){super(),M(this,e,pe,me,A,{})}}function ge(n){let e,r=`<span class="status-icon svelte-1mx6eh7" style="-webkit-mask: url(${H}/images/svg/double-checkmark.svg) no-repeat center / contain; mask: url(${H}/images/svg/double-checkmark.svg) no-repeat center / contain;"></span>`;return{c(){e=y("div"),e.innerHTML=r,this.h()},l(a){e=w(a,"DIV",{class:!0,"data-svelte-h":!0}),se(e)!=="svelte-jbp3id"&&(e.innerHTML=r),this.h()},h(){b(e,"class","status svelte-1mx6eh7"),v(e,"saving",n[0].savingStatus==="saving"),v(e,"saved",n[0].savingStatus==="saved"),v(e,"error",n[0].savingStatus==="error")},m(a,o){j(a,e,o)},p(a,[o]){o&1&&v(e,"saving",a[0].savingStatus==="saving"),o&1&&v(e,"saved",a[0].savingStatus==="saved"),o&1&&v(e,"error",a[0].savingStatus==="error")},i:R,o:R,d(a){a&&p(e)}}}function _e(n,e,r){let a;return g(n,$,o=>r(0,a=o)),[a]}class ve extends L{constructor(e){super(),M(this,e,_e,ge,A,{})}}function be(n){let e,r,a,o,t,s;const u=n[2].default,c=N(u,n,n[3],null);return t=new ve({}),{c(){e=y("div"),r=y("div"),c&&c.c(),a=O(),o=y("div"),K(t.$$.fragment),this.h()},l(i){e=w(i,"DIV",{class:!0});var f=x(e);r=w(f,"DIV",{class:!0});var h=x(r);c&&c.l(h),a=F(h),o=w(h,"DIV",{class:!0});var k=x(o);Q(t.$$.fragment,k),k.forEach(p),h.forEach(p),f.forEach(p),this.h()},h(){b(o,"class","sync-status svelte-14x3dky"),b(r,"class","content svelte-14x3dky"),b(e,"class","container svelte-14x3dky")},m(i,f){j(i,e,f),D(e,r),c&&c.m(r,null),D(r,a),D(r,o),X(t,o,null),s=!0},p(i,f){c&&c.p&&(!s||f&8)&&W(c,u,i,i[3],s?G(u,i[3],f,null):B(i[3]),null)},i(i){s||(E(c,i),E(t.$$.fragment,i),s=!0)},o(i){C(c,i),C(t.$$.fragment,i),s=!1},d(i){i&&p(e),c&&c.d(i),Y(t)}}}function Se(n){let e,r,a,o;return a=new he({props:{$$slots:{default:[be]},$$scope:{ctx:n}}}),{c(){e=y("meta"),r=O(),K(a.$$.fragment),this.h()},l(t){const s=ae("svelte-1xk05yi",document.head);e=w(s,"META",{name:!0,content:!0}),s.forEach(p),r=F(t),Q(a.$$.fragment,t),this.h()},h(){b(e,"name","viewport"),b(e,"content","width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover")},m(t,s){D(document.head,e),j(t,r,s),X(a,t,s),o=!0},p(t,[s]){const u={};s&8&&(u.$$scope={dirty:s,ctx:t}),a.$set(u)},i(t){o||(E(a.$$.fragment,t),o=!0)},o(t){C(a.$$.fragment,t),o=!1},d(t){t&&p(r),p(e),Y(a,t)}}}function $e(n,e,r){let a,o,t,s,u;g(n,I,l=>r(5,a=l)),g(n,P,l=>r(6,o=l)),g(n,$,l=>r(1,t=l)),g(n,le,l=>r(7,s=l)),g(n,z,l=>r(8,u=l));let{$$slots:c={},$$scope:i}=e,f=!0;function h(){if(f)return;let l={};Object.entries(u).forEach(([m,d])=>{l[m]=JSON.stringify(d)});const S={activeIndex:s.activeIndex,settings:a,tabs:l};$.update(m=>({...m,data:S})),ie.publish()}z.subscribe(h),I.subscribe(h);function k(l){Object.entries(l).forEach(([S,m])=>{try{J.newTabFromString(S,m)}catch(d){console.warn("Failed to parse tab!",m,d);return}})}let T=!1;return Z(()=>{re.onAuthStateChanged(async l=>{if(!l){$.update(_=>({..._,isLoading:!1,currentUser:l})),r(0,T=!0);return}const S=U(q,"users",l.uid),m=await ne(S);let d={tabs:{},activeIndex:0,settings:{theme:"Canvas",spellCheck:!0}};if(m.exists())console.log("Fetching firestore user doc..."),d=m.data();else{console.log("Creating firestore user doc...");const _=U(q,"users",l.uid);await oe(_,d,{merge:!0})}k(d.tabs),J.setActiveIndex(d.activeIndex),V(I,a=d.settings,a),$.update(_=>({..._,isLoading:!1,currentUser:l,data:d})),r(0,T=!0),f=!1})}),n.$$set=l=>{"$$scope"in l&&r(3,i=l.$$scope)},n.$$.update=()=>{n.$$.dirty&3&&!t.currentUser&&T&&(V(P,o=window.location.pathname.slice(H.length),o),ce(H+"/login"))},[T,t,c,i]}class He extends L{constructor(e){super(),M(this,e,$e,Se,A,{})}}export{He as component,Ce as universal};
