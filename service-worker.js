const s=location.pathname.split("/").slice(0,-1).join("/"),l=[s+"/app/immutable/entry/app.gICIWBXO.js",s+"/app/immutable/nodes/0.CrHUS1nK.js",s+"/app/immutable/assets/0.x8NKOXIW.css",s+"/app/immutable/nodes/1.DfOhB4bc.js",s+"/app/immutable/nodes/2.CcTbXz-y.js",s+"/app/immutable/assets/2.DaIzh1nD.css",s+"/app/immutable/nodes/3.Cb1Z2AI-.js",s+"/app/immutable/assets/3.CAQF70sP.css",s+"/app/immutable/nodes/4.nIE6FXiO.js",s+"/app/immutable/assets/4.aioj5ZVm.css",s+"/app/immutable/chunks/animate.BOGdB0XF.js",s+"/app/immutable/chunks/entry.DJMc6wkU.js",s+"/app/immutable/chunks/index.CFDFe1_f.js",s+"/app/immutable/chunks/paths.c1VpAmIW.js",s+"/app/immutable/chunks/scheduler.DVqiRabw.js",s+"/app/immutable/entry/start.C2xvTgAp.js"],o=[s+"/images/favicon.png",s+"/images/field_512.png",s+"/images/svg/cancel.svg",s+"/images/svg/plus.svg",s+"/images/svg/swap.svg",s+"/images/svg/triangle-down.svg",s+"/images/svg/triangle-left.svg",s+"/images/svg/triangle-right.svg",s+"/images/svg/triangle-up.svg",s+"/manifest.json"],r="1719412878272",c=`cache-${r}`,m=[...l,...o];self.addEventListener("install",e=>{async function n(){await(await caches.open(c)).addAll(m)}e.waitUntil(n())});self.addEventListener("activate",e=>{async function n(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}e.waitUntil(n())});self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;async function n(){const t=new URL(e.request.url),i=await caches.open(c);if(m.includes(t.pathname)){const a=await i.match(t.pathname);if(a)return a}try{const a=await fetch(e.request);if(!(a instanceof Response))throw new Error("invalid response from fetch");return a.status===200&&i.put(e.request,a.clone()),a}catch(a){const p=await i.match(e.request);if(p)return p;throw a}}e.respondWith(n())});
