import{n as c,s as h}from"./scheduler.DvlNEcs7.js";const e=[];function g(n,l=c){let o;const i=new Set;function r(t){if(h(n,t)&&(n=t,o)){const b=!e.length;for(const s of i)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function a(t){r(t(n))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(o=l(r,a)||c),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:a,subscribe:_}}var f;const p=((f=globalThis.__sveltekit_183lha1)==null?void 0:f.base)??"/not-notepad";var u;const q=((u=globalThis.__sveltekit_183lha1)==null?void 0:u.assets)??p;export{q as a,p as b,g as w};
