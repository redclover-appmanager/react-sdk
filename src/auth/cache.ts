import { AuthResponse, CachedAuth } from '../types';
import { getCacheKey, log } from '../utils';

/**
 * Get cached authorization data from localStorage.
 * @param websiteId - Website identifier
 * @param appId - App identifier
 * @param cacheDuration - Cache TTL in seconds
 * @param debug - Whether debug mode is enabled
 * @returns Cached auth data or null if expired/not found
 */
export const getFromCache = (
  websiteId: string,
  appId: string,
  cacheDuration: number,
  debug: boolean
): AuthResponse | null => {
  try {
    const key = getCacheKey(websiteId, appId);
    const cached = localStorage.getItem(key);
    
    if (!cached) {
      log(debug, 'No cached authorization found');
      return null;
    }

    const { data, timestamp }: CachedAuth = JSON.parse(cached);
    const age = (Date.now() - timestamp) / 1000;

    if (age > cacheDuration) {
      log(debug, `Cache expired (age: ${age}s, max: ${cacheDuration}s)`);
      clearCache(websiteId, appId);
      return null;
    }

    log(debug, `Using cached authorization (age: ${age}s)`);
    return data;
  } catch (error) {
    log(debug, 'Failed to read cache:', error);
    return null;
  }
};

/**
 * Save authorization data to localStorage cache.
 * @param websiteId - Website identifier
 * @param appId - App identifier
 * @param data - Authorization response to cache
 * @param debug - Whether debug mode is enabled
 */
export const saveToCache = (
  websiteId: string,
  appId: string,
  data: AuthResponse,
  debug: boolean
): void => {
  try {
    const key = getCacheKey(websiteId, appId);
    const cached: CachedAuth = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cached));
    log(debug, 'Authorization cached successfully');
  } catch (error) {
    log(debug, 'Failed to cache authorization:', error);
  }
};

/**
 * Clear cached authorization data from localStorage.
 * @param websiteId - Website identifier
 * @param appId - App identifier
 */
export const clearCache = (websiteId: string, appId: string): void => {
  try {
    const key = getCacheKey(websiteId, appId);
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};
