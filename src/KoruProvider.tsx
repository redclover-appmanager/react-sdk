import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { KoruContext } from './KoruContext';
import { KoruProviderProps, AuthResponse, KoruOptions } from './types';
import { authorize, clearAuthCache } from './auth/authorize';
import { logError } from './utils';

/**
 * Default options for Koru SDK.
 */
const DEFAULT_OPTIONS: Required<KoruOptions> = {
  cache: true,
  cacheDuration: 3600, // 1 hour
  retryAttempts: 3,
  retryDelay: 1000,
  debug: false,
};

/**
 * KoruProvider component.
 * Wraps your app to provide Koru authorization context.
 * 
 * @example
 * ```tsx
 * import { KoruProvider } from '@redclover/koru-react-sdk';
 * 
 * function App() {
 *   return (
 *     <KoruProvider
 *       websiteId="your-website-id"
 *       appId="your-app-id"
 *       koruUrl="https://app.koru.com"
 *       options={{ cache: true, debug: true }}
 *     >
 *       <YourApp />
 *     </KoruProvider>
 *   );
 * }
 * ```
 */
export const KoruProvider: React.FC<KoruProviderProps> = ({
  websiteId,
  appId,
  koruUrl,
  options = {},
  customData,
  children,
}) => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Merge default options with provided options
  const mergedOptions = useMemo<Required<KoruOptions>>(
    () => ({ ...DEFAULT_OPTIONS, ...options }),
    [options]
  );

  // Authorization function
  const performAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await authorize(websiteId, appId, koruUrl, mergedOptions, customData);
      setAuthData(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Authorization failed');
      setError(error);
      logError('Failed to authorize', error);
    } finally {
      setLoading(false);
    }
  }, [websiteId, appId, koruUrl, mergedOptions, customData]);

  // Reload function to manually refresh authorization
  const reload = useCallback(async () => {
    clearAuthCache(websiteId, appId);
    await performAuth();
  }, [websiteId, appId, performAuth]);

  // Perform initial authorization on mount
  useEffect(() => {
    performAuth();
  }, [performAuth]);

  // Context value
  const contextValue = useMemo(
    () => ({
      websiteId,
      appId,
      koruUrl,
      customData,
      options: mergedOptions,
      authData,
      loading,
      error,
      reload,
    }),
    [websiteId, appId, koruUrl, customData, mergedOptions, authData, loading, error, reload]
  );

  return (
    <KoruContext.Provider value={contextValue}>
      {children}
    </KoruContext.Provider>
  );
};
