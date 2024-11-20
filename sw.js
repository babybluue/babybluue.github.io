const contentToCache=["/","index.html","404.html","offline.html","search.json","RobotoSlab.ttf","/scripts/script.js","/scripts/fancybox.esm.js","/style/style.css","/style/highlight.css","/style/fancybox.css","/images/appleicon.png","/images/launch.png","/images/avatar.png","/images/dark.png","/images/light.png","/images/favicon.ico"],APP_PREFIX="babyblue",APP_VERSION="2.7",CACHE_NAME=APP_PREFIX+"_"+APP_VERSION,CACHE_POST=APP_PREFIX+"_posts",getResponse=(self.addEventListener("fetch",t=>{t.request.url.startsWith(self.location.origin)&&t.respondWith(getResponse(t))}),self.addEventListener("install",t=>{t.waitUntil(setInstall())}),self.addEventListener("activate",t=>{t.waitUntil(setActivate())}),async t=>{var e=await caches.match(t.request);if(e)return e;try{const s=await fetch(t.request);if(s){const a=await caches.open(CACHE_POST);a.put(t.request,s.clone())}return s}catch(t){return caches.match("/offline.html")}}),setInstall=async()=>{const t=await caches.open(CACHE_NAME);if(await t.addAll(contentToCache),1<(await caches.keys()).length){const e=new BroadcastChannel("install");e.postMessage("install from sw")}const e=new BroadcastChannel("install");e.onmessage=async t=>{"update"==t.data&&await self.skipWaiting()}},setActivate=async()=>{const s=await caches.keys();await Promise.all(s.map((t,e)=>{if(t!==CACHE_NAME)return-1<t.indexOf(APP_PREFIX)?caches.delete(s[e]):void 0}))};