// Advanced Service Worker for Network Optimization
const CACHE_VERSION = 'fabric-gallery-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/favicon.ico',
  '/site.webmanifest',
  '/tata_matching_icon.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for API calls
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for images
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  // Network only for critical updates
  NETWORK_ONLY: 'network-only'
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(CRITICAL_RESOURCES)),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.startsWith(CACHE_VERSION)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Advanced fetch handler with multiple strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Determine cache strategy based on request type
  const strategy = getCacheStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Determine appropriate cache strategy
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // Static assets (JS, CSS, images)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // API calls to Supabase
  if (url.hostname.includes('supabase') || url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Images from Supabase storage
  if (url.hostname.includes('supabase') && url.pathname.includes('storage')) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  // HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Default to network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Handle requests with appropriate strategy
async function handleRequest(request, strategy) {
  const url = new URL(request.url);
  
  try {
    switch (strategy) {
      case CACHE_STRATEGIES.CACHE_FIRST:
        return await cacheFirst(request);
      
      case CACHE_STRATEGIES.NETWORK_FIRST:
        return await networkFirst(request);
      
      case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
        return await staleWhileRevalidate(request);
      
      default:
        return await fetch(request);
    }
  } catch (error) {
    console.error('Request failed:', error);
    // Return offline page for navigation requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/') || new Response('Offline', { status: 503 });
    }
    throw error;
  }
}

// Cache first strategy - check cache first, fallback to network
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network first strategy - try network first, fallback to cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale while revalidate - return cached version immediately, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Update cache in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  // Return cached version immediately if available
  return cachedResponse || fetchPromise;
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications for updates
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/tata_matching_icon.png',
      badge: '/tata_matching_icon.png',
      tag: 'fabric-update',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Updates'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync implementation
async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Performing background sync...');
}
