import{n as c,s as _}from"./scheduler.B3svg8oL.js";const e=[];function g(n,l=c){let i;const o=new Set;function r(t){if(_(n,t)&&(n=t,i)){const b=!e.length;for(const s of o)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function f(t){r(t(n))}function p(t,b=c){const s=[t,b];return o.add(s),o.size===1&&(i=l(r,f)||c),t(n),()=>{o.delete(s),o.size===0&&i&&(i(),i=null)}}return{set:r,update:f,subscribe:p}}var u;const h=((u=globalThis.__sveltekit_1p7im7y)==null?void 0:u.base)??"/not-notepad";var a;const m=((a=globalThis.__sveltekit_1p7im7y)==null?void 0:a.assets)??h;export{m as a,h as b,g as w};
