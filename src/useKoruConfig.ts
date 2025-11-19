import { useContext, useMemo } from 'react';
import { KoruContext } from './KoruContext';
import { UseKoruConfigReturn } from './types';

/**
 * Hook to access Koru configuration.
 * Convenience hook that returns only the config object.
 * Must be used within a KoruProvider.
 * 
 * @returns Configuration object from Koru platform
 * 
 * @example
 * ```tsx
 * import { useKoruConfig } from '@redclover/koru-react-sdk';
 * 
 * function MyComponent() {
 *   const { config, loading, error } = useKoruConfig();
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!config) return <div>No configuration</div>;
 * 
 *   return (
 *     <div>
 *       <h1>App Title: {config.title}</h1>
 *       <p>API URL: {config.apiUrl}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @throws Error if used outside of KoruProvider
 */
export const useKoruConfig = (): UseKoruConfigReturn => {
  const context = useContext(KoruContext);

  if (!context) {
    throw new Error('useKoruConfig must be used within a KoruProvider');
  }

  const { authData, loading, error } = context;

  // Memoize result
  const result = useMemo<UseKoruConfigReturn>(
    () => ({
      config: authData?.config ?? null,
      loading,
      error,
    }),
    [authData, loading, error]
  );

  return result;
};
