var S=Object.defineProperty;var C=(t,e,n)=>e in t?S(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var p=(t,e,n)=>(C(t,typeof e!="symbol"?e+"":e,n),n);import{r as m,n as y,f as b,h as T,i as A,j,k as v,l as B,m as D,p as N,q as L,v as P,w as H}from"./scheduler._wRqQmaL.js";let $=!1;function I(){$=!0}function q(){$=!1}function M(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function O(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let a=0;a<e.length;a++){const o=e[a];o.claim_order!==void 0&&s.push(o)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const a=e[s].claim_order,o=(r>0&&e[n[r]].claim_order<=a?r+1:M(1,r,_=>e[n[_]].claim_order,a))-1;i[s]=n[o]+1;const c=o+1;n[c]=s,r=Math.max(c,r)}const f=[],l=[];let u=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(f.push(e[s-1]);u>=s;u--)l.push(e[u]);u--}for(;u>=0;u--)l.push(e[u]);f.reverse(),l.sort((s,a)=>s.claim_order-a.claim_order);for(let s=0,a=0;s<l.length;s++){for(;a<f.length&&l[s].claim_order>=f[a].claim_order;)a++;const o=a<f.length?f[a]:null;t.insertBefore(l[s],o)}}function R(t,e){if($){for(O(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function tt(t,e,n){$&&!n?R(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function z(t){t.parentNode&&t.parentNode.removeChild(t)}function U(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function et(){return x(" ")}function nt(){return x("")}function it(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function rt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function st(t){return function(e){e.target===this&&t.call(this,e)}}function at(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function V(t){return Array.from(t.childNodes)}function W(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function E(t,e,n,i,r=!1){W(t);const f=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const u=t[l];if(e(u)){const s=n(u);return s===void 0?t.splice(l,1):t[l]=s,r||(t.claim_info.last_index=l),u}}for(let l=t.claim_info.last_index-1;l>=0;l--){const u=t[l];if(e(u)){const s=n(u);return s===void 0?t.splice(l,1):t[l]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,u}}return i()})();return f.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,f}function F(t,e,n,i){return E(t,r=>r.nodeName===e,r=>{const f=[];for(let l=0;l<r.attributes.length;l++){const u=r.attributes[l];n[u.name]||f.push(u.name)}f.forEach(l=>r.removeAttribute(l))},()=>i(e))}function lt(t,e,n){return F(t,e,n,U)}function G(t,e){return E(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>x(e),!0)}function ft(t){return G(t," ")}function ut(t,e){e=""+e,t.data!==e&&(t.data=e)}function ct(t,e){t.value=e??""}function ot(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function dt(t,e,n){t.classList.toggle(e,!!n)}function _t(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const f=r.textContent.trim();f===`HEAD_${t}_END`?(i-=1,n.push(r)):f===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function ht(t,e){return new t(e)}const h=new Set;let d;function mt(){d={r:0,c:[],p:d}}function $t(){d.r||m(d.c),d=d.p}function J(t,e){t&&t.i&&(h.delete(t),t.i(e))}function pt(t,e,n,i){if(t&&t.o){if(h.has(t))return;h.add(t),d.c.push(()=>{h.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function yt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function xt(t){t&&t.c()}function gt(t,e){t&&t.l(e)}function K(t,e,n){const{fragment:i,after_update:r}=t.$$;i&&i.m(e,n),v(()=>{const f=t.$$.on_mount.map(L).filter(A);t.$$.on_destroy?t.$$.on_destroy.push(...f):m(f),t.$$.on_mount=[]}),r.forEach(v)}function Q(t,e){const n=t.$$;n.fragment!==null&&(B(n.after_update),m(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){t.$$.dirty[0]===-1&&(P.push(t),H(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function wt(t,e,n,i,r,f,l=null,u=[-1]){const s=D;N(t);const a=t.$$={fragment:null,ctx:[],props:f,update:y,not_equal:r,bound:b(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:b(),dirty:u,skip_bound:!1,root:e.target||s.$$.root};l&&l(a.root);let o=!1;if(a.ctx=n?n(t,e.props||{},(c,_,...g)=>{const w=g.length?g[0]:_;return a.ctx&&r(a.ctx[c],a.ctx[c]=w)&&(!a.skip_bound&&a.bound[c]&&a.bound[c](w),o&&X(t,c)),_}):[],a.update(),o=!0,m(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){I();const c=V(e.target);a.fragment&&a.fragment.l(c),c.forEach(z)}else a.fragment&&a.fragment.c();e.intro&&J(t.$$.fragment),K(t,e.target,e.anchor),q(),T()}N(s)}class bt{constructor(){p(this,"$$");p(this,"$$set")}$destroy(){Q(this,1),this.$destroy=y}$on(e,n){if(!A(n))return y;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!j(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Y="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Y);export{rt as A,dt as B,ct as C,st as D,yt as E,bt as S,V as a,G as b,lt as c,z as d,U as e,ft as f,tt as g,R as h,wt as i,ut as j,nt as k,pt as l,$t as m,J as n,at as o,ot as p,mt as q,ht as r,et as s,x as t,xt as u,gt as v,K as w,Q as x,_t as y,it as z};
