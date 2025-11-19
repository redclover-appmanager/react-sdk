import { useContext, useMemo } from 'react';
import { KoruContext } from './KoruContext';
import { UseKoruAuthReturn } from './types';

/**
 * Hook to access Koru authorization state and data.
 * Must be used within a KoruProvider.
 * 
 * @returns Authorization state including isAuthorized, loading, error, authData, token, config, and reload function
 * 
 * @example
 * ```tsx
 * import { useKoruAuth } from '@redclover/koru-react-sdk';
 * 
 * function MyComponent() {
 *   const { isAuthorized, loading, error, config, token, reload } = useKoruAuth();
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!isAuthorized) return <div>Not authorized</div>;
 * 
 *   return (
 *     <div>
 *       <h1>Authorized!</h1>
 *       <pre>{JSON.stringify(config, null, 2)}</pre>
 *       <button onClick={reload}>Refresh</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @throws Error if used outside of KoruProvider
 */
export const useKoruAuth = (): UseKoruAuthReturn => {
  const context = useContext(KoruContext);

  if (!context) {
    throw new Error('useKoruAuth must be used within a KoruProvider');
  }

  const { authData, loading, error, reload } = context;

  // Memoize derived values
  const result = useMemo<UseKoruAuthReturn>(
    () => ({
      isAuthorized: authData?.authorized ?? false,
      loading,
      error,
      authData,
      token: authData?.token ?? null,
      config: authData?.config ?? null,
      reload,
    }),
    [authData, loading, error, reload]
  );

  return result;
};
