import{n as b,s as h}from"./scheduler.CIGC0wka.js";const e=[];function g(n,l=b){let o;const i=new Set;function r(t){if(h(n,t)&&(n=t,o)){const c=!e.length;for(const s of i)s[1](),e.push(s,n);if(c){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function f(t){r(t(n))}function _(t,c=b){const s=[t,c];return i.add(s),i.size===1&&(o=l(r,f)||b),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:f,subscribe:_}}var u;const d=((u=globalThis.__sveltekit_1x2dc9h)==null?void 0:u.base)??"/not-notepad";var a;const q=((a=globalThis.__sveltekit_1x2dc9h)==null?void 0:a.assets)??d;export{q as a,d as b,g as w};
