function g(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function j(t){return t()}function A(){return Object.create(null)}function v(t){t.forEach(j)}function E(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function y(t,...n){if(t==null){for(const o of n)o(void 0);return g}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function P(t){let n;return y(t,e=>n=e)(),n}function S(t,n,e){t.$$.on_destroy.push(y(n,e))}function U(t,n,e,o){if(t){const c=m(t,n,e,o);return t[0](c)}}function m(t,n,e,o){return t[1]&&o?w(e.ctx.slice(),t[1](o(n))):e.ctx}function C(t,n,e,o){if(t[2]&&o){const c=t[2](o(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const l=[],f=Math.max(n.dirty.length,c.length);for(let u=0;u<f;u+=1)l[u]=n.dirty[u]|c[u];return l}return n.dirty|c}return n.dirty}function D(t,n,e,o,c,l){if(c){const f=m(n,e,o,l);t.p(f,c)}}function G(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function H(t,n,e){return t.set(e),n}function I(t){return t&&E(t.destroy)?t.destroy:g}let i;function d(t){i=t}function k(){if(!i)throw new Error("Function called outside component initialization");return i}function J(t){k().$$.on_mount.push(t)}function K(t){k().$$.after_update.push(t)}function L(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const a=[],b=[];let s=[];const h=[],x=Promise.resolve();let p=!1;function O(){p||(p=!0,x.then(z))}function N(){return O(),x}function q(t){s.push(t)}function Q(t){h.push(t)}const _=new Set;let r=0;function z(){if(r!==0)return;const t=i;do{try{for(;r<a.length;){const n=a[r];r++,d(n),M(n.$$)}}catch(n){throw a.length=0,r=0,n}for(d(null),a.length=0,r=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];_.has(e)||(_.add(e),e())}s.length=0}while(a.length);for(;h.length;)h.pop()();p=!1,_.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),v(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function R(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{I as A,Q as B,H as a,K as b,S as c,b as d,A as e,z as f,P as g,F as h,E as i,q as j,R as k,i as l,d as m,g as n,J as o,j as p,a as q,v as r,B as s,N as t,O as u,U as v,D as w,G as x,C as y,L as z};