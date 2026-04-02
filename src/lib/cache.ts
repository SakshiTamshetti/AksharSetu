/**
 * Persistent cache utility using localStorage for small items 
 * and potentially IndexedDB for larger items (like images).
 */

const CACHE_PREFIX = "aksharsetu_cache_";
const MAX_CACHE_SIZE = 50; // Maximum number of items to keep in cache

export const persistentCache = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(CACHE_PREFIX + key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      // Check if item is expired (optional, e.g., 24 hours)
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return parsed.value;
    } catch (e) {
      console.error("Cache read error:", e);
      return null;
    }
  },

  set: (key: string, value: any, ttl: number = 24 * 60 * 60 * 1000) => {
    try {
      const cacheKeys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
      
      // Simple LRU: if cache is full, remove oldest items
      if (cacheKeys.length >= MAX_CACHE_SIZE) {
        const sorted = cacheKeys.sort(); // Simple sort by key (which includes timestamp if we wanted)
        localStorage.removeItem(sorted[0]);
      }

      const item = {
        value,
        expiry: Date.now() + ttl,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (e) {
      console.error("Cache write error:", e);
    }
  },

  clear: () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith(CACHE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
};
