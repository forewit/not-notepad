function g(){}const A=t=>t;function w(t,n){for(const e in n)t[e]=n[e];return t}function v(t){return t()}function B(){return Object.create(null)}function j(t){t.forEach(v)}function E(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function P(t){return Object.keys(t).length===0}function y(t,...n){if(t==null){for(const o of n)o(void 0);return g}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t){let n;return y(t,e=>n=e)(),n}function U(t,n,e){t.$$.on_destroy.push(y(n,e))}function C(t,n,e,o){if(t){const r=m(t,n,e,o);return t[0](r)}}function m(t,n,e,o){return t[1]&&o?w(e.ctx.slice(),t[1](o(n))):e.ctx}function D(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],f=Math.max(n.dirty.length,r.length);for(let u=0;u<f;u+=1)l[u]=n.dirty[u]|r[u];return l}return n.dirty|r}return n.dirty}function G(t,n,e,o,r,l){if(r){const f=m(n,e,o,l);t.p(f,r)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function I(t,n,e){return t.set(e),n}function J(t){return t&&E(t.destroy)?t.destroy:g}let i;function d(t){i=t}function k(){if(!i)throw new Error("Function called outside component initialization");return i}function K(t){k().$$.on_mount.push(t)}function L(t){k().$$.after_update.push(t)}const a=[],b=[];let s=[];const h=[],x=Promise.resolve();let p=!1;function O(){p||(p=!0,x.then(z))}function N(){return O(),x}function q(t){s.push(t)}function Q(t){h.push(t)}const _=new Set;let c=0;function z(){if(c!==0)return;const t=i;do{try{for(;c<a.length;){const n=a[c];c++,d(n),M(n.$$)}}catch(n){throw a.length=0,c=0,n}for(d(null),a.length=0,c=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];_.has(e)||(_.add(e),e())}s.length=0}while(a.length);for(;h.length;)h.pop()();p=!1,_.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function R(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{Q as A,S as B,I as a,L as b,U as c,b as d,E as e,q as f,B as g,z as h,A as i,P as j,R as k,i as l,d as m,g as n,K as o,v as p,a as q,j as r,F as s,N as t,O as u,C as v,G as w,H as x,D as y,J as z};
