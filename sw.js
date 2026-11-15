// Central Operacional GAD — funcionamento offline.
// Guarda o aplicativo e as bibliotecas no aparelho. Os DADOS ficam no banco local
// (IndexedDB) e são sincronizados pelo próprio app; aqui nada de dados é guardado.
const VERSAO = 'central-gad-v1';
const BASE = ['./', './index.html', './config.js', './manifest.json', './icon-192.png', './icon-512.png', './instalar.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // banco de dados e login: sempre direto, nunca em cache
  if (/supabase\.co$/.test(url.hostname) || url.pathname.includes('/auth/') || url.pathname.includes('/rest/')) return;
  // telas do próprio app: tenta a rede (pega atualização) e cai para o que está guardado
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  // bibliotecas e fontes de fora: usa o que está guardado, e guarda na primeira vez
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(resp => { const c = resp.clone(); caches.open(VERSAO).then(x => x.put(req, c)); return resp; })));
});
