/**
 * Utility functions for the Koru React SDK.
 */

/**
 * Sleep for a specified duration.
 * @param ms - Duration in milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generate cache key for authorization data.
 * @param websiteId - Website identifier
 * @param appId - App identifier
 */
export const getCacheKey = (websiteId: string, appId: string): string => {
  return `koru_auth_${websiteId}_${appId}`;
};

/**
 * Log debug message if debug mode is enabled.
 * @param debug - Whether debug mode is enabled
 * @param message - Message to log
 * @param args - Additional arguments
 */
export const log = (debug: boolean, message: string, ...args: unknown[]): void => {
  if (debug) {
    console.log('[Koru React SDK]', message, ...args);
  }
};

/**
 * Log error message.
 * @param message - Error message
 * @param error - Error object
 */
export const logError = (message: string, error: unknown): void => {
  console.error('[Koru React SDK]', message, error);
};
