const s=location.pathname.split("/").slice(0,-1).join("/"),l=[s+"/app/immutable/entry/app.C_KRQOTc.js",s+"/app/immutable/nodes/0.BiH2oY0i.js",s+"/app/immutable/assets/0.BG53lEwn.css",s+"/app/immutable/nodes/1.BufAJ4MH.js",s+"/app/immutable/nodes/2.CiSXh3LI.js",s+"/app/immutable/assets/2.BLTYX49_.css",s+"/app/immutable/nodes/3.A8F3FKsl.js",s+"/app/immutable/assets/3.C2hubh8Z.css",s+"/app/immutable/nodes/4.nVeZUKw8.js",s+"/app/immutable/assets/4.D9K7nQOp.css",s+"/app/immutable/assets/Spinner.nORNYfl0.css",s+"/app/immutable/chunks/Spinner.DVSMDdgP.js",s+"/app/immutable/chunks/core.CG__ofcG.js",s+"/app/immutable/chunks/each.DD9ZPifO.js",s+"/app/immutable/chunks/entry.D0E7XHuY.js",s+"/app/immutable/chunks/firebaseStore.C5P1U0sd.js",s+"/app/immutable/chunks/index.BFcqwp_n.js",s+"/app/immutable/chunks/paths.B0r-g-nk.js",s+"/app/immutable/chunks/preload-helper.D6kgxu3v.js",s+"/app/immutable/chunks/scheduler.BOxWOvYx.js",s+"/app/immutable/chunks/themes.BTx5Q4mv.js",s+"/app/immutable/entry/start.7InOgr23.js",s+"/app/immutable/chunks/quill.Bk4jDS0q.js"],u=[s+"/images/favicon.png",s+"/images/field_512.png",s+"/images/svg/cancel.svg",s+"/images/svg/double-checkmark.svg",s+"/images/svg/gear.svg",s+"/images/svg/home.svg",s+"/images/svg/login.svg",s+"/images/svg/logout.svg",s+"/images/svg/plus.svg",s+"/images/svg/refresh.svg",s+"/images/svg/swap.svg",s+"/images/svg/trash.svg",s+"/images/svg/triangle-down.svg",s+"/images/svg/triangle-left.svg",s+"/images/svg/triangle-right.svg",s+"/images/svg/triangle-up.svg",s+"/manifest.json"],r="1721149817112",c=`cache-${r}`,p=[...l,...u];self.addEventListener("install",e=>{async function i(){await(await caches.open(c)).addAll(p)}e.waitUntil(i())});self.addEventListener("activate",e=>{async function i(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}e.waitUntil(i())});self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;async function i(){const t=new URL(e.request.url),n=await caches.open(c);if(p.includes(t.pathname)){const a=await n.match(t.pathname);if(a)return a}try{const a=await fetch(e.request);if(!(a instanceof Response))throw new Error("invalid response from fetch");return a.status===200&&n.put(e.request,a.clone()),a}catch(a){const m=await n.match(e.request);if(m)return m;throw a}}e.respondWith(i())});
