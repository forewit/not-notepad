const s=location.pathname.split("/").slice(0,-1).join("/"),l=[s+"/app/immutable/entry/app.BHx2Dri7.js",s+"/app/immutable/nodes/0.eoImDwRx.js",s+"/app/immutable/assets/0.BMJJ3nCK.css",s+"/app/immutable/nodes/1.CSwYvPrh.js",s+"/app/immutable/nodes/2.CfkZ1gF4.js",s+"/app/immutable/assets/2.dp3IOYq5.css",s+"/app/immutable/nodes/3.CozdaYm-.js",s+"/app/immutable/assets/3.C2hubh8Z.css",s+"/app/immutable/nodes/4.CXMJzpdH.js",s+"/app/immutable/assets/4.CxeLakie.css",s+"/app/immutable/assets/Spinner.DVk0brZ3.css",s+"/app/immutable/chunks/Spinner.C3JSi9wk.js",s+"/app/immutable/chunks/core.CG__ofcG.js",s+"/app/immutable/chunks/each.COQoO-Ld.js",s+"/app/immutable/chunks/entry.-EmmxIl6.js",s+"/app/immutable/chunks/firebaseStore.IpKJEeDt.js",s+"/app/immutable/chunks/index.Bn23-NmW.js",s+"/app/immutable/chunks/paths.DMQUgJWY.js",s+"/app/immutable/chunks/preload-helper.D6kgxu3v.js",s+"/app/immutable/chunks/scheduler.uUNFeN3d.js",s+"/app/immutable/chunks/settingsStore.DE--jHh7.js",s+"/app/immutable/chunks/tabsStore.Dd0WpvX_.js",s+"/app/immutable/chunks/themes.BTx5Q4mv.js",s+"/app/immutable/entry/start.Bi5ex2X8.js",s+"/app/immutable/chunks/quill.Bk4jDS0q.js"],u=[s+"/images/favicon.png",s+"/images/field_512.png",s+"/images/svg/cancel.svg",s+"/images/svg/double-checkmark.svg",s+"/images/svg/gear.svg",s+"/images/svg/login.svg",s+"/images/svg/logout.svg",s+"/images/svg/plus.svg",s+"/images/svg/swap.svg",s+"/images/svg/triangle-down.svg",s+"/images/svg/triangle-left.svg",s+"/images/svg/triangle-right.svg",s+"/images/svg/triangle-up.svg",s+"/manifest.json"],o="1720555939817",p=`cache-${o}`,c=[...l,...u];self.addEventListener("install",e=>{async function i(){await(await caches.open(p)).addAll(c)}e.waitUntil(i())});self.addEventListener("activate",e=>{async function i(){for(const t of await caches.keys())t!==p&&await caches.delete(t)}e.waitUntil(i())});self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;async function i(){const t=new URL(e.request.url),n=await caches.open(p);if(c.includes(t.pathname)){const a=await n.match(t.pathname);if(a)return a}try{const a=await fetch(e.request);if(!(a instanceof Response))throw new Error("invalid response from fetch");return a.status===200&&n.put(e.request,a.clone()),a}catch(a){const m=await n.match(e.request);if(m)return m;throw a}}e.respondWith(i())});
