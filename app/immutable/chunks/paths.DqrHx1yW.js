import{n as c,s as d}from"./scheduler.DvlNEcs7.js";const e=[];function g(o,l=c){let n;const i=new Set;function r(t){if(d(o,t)&&(o=t,n)){const b=!e.length;for(const s of i)s[1](),e.push(s,o);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function f(t){r(t(o))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(n=l(r,f)||c),t(o),()=>{i.delete(s),i.size===0&&n&&(n(),n=null)}}return{set:r,update:f,subscribe:_}}var u;const p=((u=globalThis.__sveltekit_1o2ridt)==null?void 0:u.base)??"/not-notepad";var a;const q=((a=globalThis.__sveltekit_1o2ridt)==null?void 0:a.assets)??p;export{q as a,p as b,g as w};
