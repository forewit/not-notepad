import{n as c,s as d}from"./scheduler.DVqiRabw.js";const e=[];function g(n,l=c){let o;const i=new Set;function r(t){if(d(n,t)&&(n=t,o)){const b=!e.length;for(const s of i)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function f(t){r(t(n))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(o=l(r,f)||c),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:f,subscribe:_}}var u;const p=((u=globalThis.__sveltekit_153fykd)==null?void 0:u.base)??"/not-notepad";var a;const k=((a=globalThis.__sveltekit_153fykd)==null?void 0:a.assets)??p;export{k as a,p as b,g as w};
