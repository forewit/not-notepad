const s=location.pathname.split("/").slice(0,-1).join("/"),l=[s+"/app/immutable/entry/app.CpoUW34s.js",s+"/app/immutable/nodes/0.kTMT9pNb.js",s+"/app/immutable/assets/0.BMHDB2Rx.css",s+"/app/immutable/assets/theme.BqhJFLYd.css",s+"/app/immutable/nodes/1.C9D4r8o8.js",s+"/app/immutable/nodes/2.Cm1U_Tho.js",s+"/app/immutable/assets/2.oc0l73N8.css",s+"/app/immutable/nodes/3.49BhFTKD.js",s+"/app/immutable/assets/3.CAQF70sP.css",s+"/app/immutable/nodes/4.BzWCyqW5.js",s+"/app/immutable/assets/4.aioj5ZVm.css",s+"/app/immutable/chunks/animate.C9o6I5aN.js",s+"/app/immutable/chunks/entry.DdtiOVET.js",s+"/app/immutable/chunks/index.BanqFhYS.js",s+"/app/immutable/chunks/paths.CmF6KM-O.js",s+"/app/immutable/chunks/preload-helper.D6kgxu3v.js",s+"/app/immutable/chunks/scheduler.DVqiRabw.js",s+"/app/immutable/entry/start.Cm0rN7aR.js",s+"/app/immutable/chunks/quill.BqYzQad1.js"],o=[s+"/images/favicon.png",s+"/images/field_512.png",s+"/images/svg/cancel.svg",s+"/images/svg/plus.svg",s+"/images/svg/swap.svg",s+"/images/svg/triangle-down.svg",s+"/images/svg/triangle-left.svg",s+"/images/svg/triangle-right.svg",s+"/images/svg/triangle-up.svg",s+"/manifest.json"],r="1719596492505",c=`cache-${r}`,m=[...l,...o];self.addEventListener("install",a=>{async function i(){await(await caches.open(c)).addAll(m)}a.waitUntil(i())});self.addEventListener("activate",a=>{async function i(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}a.waitUntil(i())});self.addEventListener("fetch",a=>{if(a.request.method!=="GET")return;async function i(){const t=new URL(a.request.url),n=await caches.open(c);if(m.includes(t.pathname)){const e=await n.match(t.pathname);if(e)return e}try{const e=await fetch(a.request);if(!(e instanceof Response))throw new Error("invalid response from fetch");return e.status===200&&n.put(a.request,e.clone()),e}catch(e){const p=await n.match(a.request);if(p)return p;throw e}}a.respondWith(i())});
