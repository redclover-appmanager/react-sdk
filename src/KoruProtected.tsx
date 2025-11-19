import React from 'react';
import { useKoruAuth } from './useKoruAuth';
import { KoruProtectedProps } from './types';

/**
 * KoruProtected component.
 * Wraps components that require authorization.
 * Shows loading state while checking auth, and fallback UI if not authorized.
 * 
 * @example
 * ```tsx
 * import { KoruProtected } from '@redclover/koru-react-sdk';
 * 
 * function App() {
 *   return (
 *     <KoruProtected
 *       loading={<div>Checking authorization...</div>}
 *       fallback={<div>Access denied</div>}
 *     >
 *       <YourProtectedApp />
 *     </KoruProtected>
 *   );
 * }
 * ```
 */
export const KoruProtected: React.FC<KoruProtectedProps> = ({
  fallback = <div>Not authorized</div>,
  loading: loadingComponent = <div>Loading...</div>,
  children,
}) => {
  const { isAuthorized, loading, error } = useKoruAuth();

  // Show loading state
  if (loading) {
    return <>{loadingComponent}</>;
  }

  // Show error or not authorized
  if (error || !isAuthorized) {
    return <>{fallback}</>;
  }

  // Show protected content
  return <>{children}</>;
};
