import{n as c,s as p}from"./scheduler.CE28Mlnp.js";const e=[];function g(n,l=c){let o;const i=new Set;function r(t){if(p(n,t)&&(n=t,o)){const b=!e.length;for(const s of i)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function u(t){r(t(n))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(o=l(r,u)||c),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:u,subscribe:_}}var f;const h=((f=globalThis.__sveltekit_1t7nuyl)==null?void 0:f.base)??"/notepad";var a;const q=((a=globalThis.__sveltekit_1t7nuyl)==null?void 0:a.assets)??h;export{q as a,h as b,g as w};
