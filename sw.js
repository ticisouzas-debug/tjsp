// Guarda o site no aparelho. Com internet, busca a versão mais nova; sem internet, usa a guardada.
const C='tjsp-v5',ARQ=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));}return r;})
  .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
