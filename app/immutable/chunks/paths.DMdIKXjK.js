import{n as b,s as _}from"./scheduler._-uiodl9.js";const e=[];function g(n,l=b){let i;const o=new Set;function r(t){if(_(n,t)&&(n=t,i)){const c=!e.length;for(const s of o)s[1](),e.push(s,n);if(c){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function a(t){r(t(n))}function p(t,c=b){const s=[t,c];return o.add(s),o.size===1&&(i=l(r,a)||b),t(n),()=>{o.delete(s),o.size===0&&i&&(i(),i=null)}}return{set:r,update:a,subscribe:p}}var f;const h=((f=globalThis.__sveltekit_6iapcj)==null?void 0:f.base)??"/not-notepad";var u;const q=((u=globalThis.__sveltekit_6iapcj)==null?void 0:u.assets)??h;export{q as a,h as b,g as w};
