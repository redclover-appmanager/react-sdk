import { AuthResponse, KoruOptions } from '../types';
import { log, logError } from '../utils';
import { getFromCache, saveToCache, clearCache } from './cache';
import { withRetry } from './retry';

/**
 * Authorize with Koru platform.
 * Handles caching, retry logic, and error handling.
 * 
 * @param websiteId - Website identifier
 * @param appId - App identifier
 * @param koruUrl - Base URL of Koru platform
 * @param options - Configuration options
 * @returns Authorization response
 * @throws Error if authorization fails after all retries
 */
export const authorize = async (
  websiteId: string,
  appId: string,
  koruUrl: string,
  options: Required<KoruOptions>,
  customData?: string
): Promise<AuthResponse> => {
  const { cache, cacheDuration, retryAttempts, retryDelay, debug } = options;

  // Check cache first
  if (cache) {
    const cached = getFromCache(websiteId, appId, cacheDuration, debug);
    if (cached) {
      return cached;
    }
  }

  // Authorize with retry logic
  try {
    const data = await withRetry(
      async () => {
        log(debug, 'Authorizing with Koru...');

        let url = `${koruUrl}/api/auth/widget?website_id=${websiteId}&app_id=${appId}`;
        if (customData) {
          url += `&custom_data=${encodeURIComponent(customData)}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Authorization failed: ${response.status} ${response.statusText}`);
        }

        const data: AuthResponse = await response.json();
        log(debug, 'Authorization successful', data);

        return data;
      },
      retryAttempts,
      retryDelay,
      (attempt, error) => {
        log(debug, `Authorization attempt ${attempt}/${retryAttempts} failed:`, error.message);
      }
    );

    // Cache successful response
    if (cache) {
      saveToCache(websiteId, appId, data, debug);
    }

    return data;
  } catch (error) {
    logError('Authorization failed after all retries', error);
    throw error;
  }
};

/**
 * Clear authorization cache.
 * @param websiteId - Website identifier
 * @param appId - App identifier
 */
export const clearAuthCache = (websiteId: string, appId: string): void => {
  clearCache(websiteId, appId);
};
