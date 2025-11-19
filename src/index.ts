/**
 * @redclover/koru-react-sdk
 * 
 * Lightweight React SDK for Koru platform authorization and integration.
 * Provides hooks, components, and utilities for seamless Koru integration.
 * 
 * @packageDocumentation
 */

// Components
export { KoruProvider } from './KoruProvider';
export { KoruProtected } from './KoruProtected';

// Hooks
export { useKoruAuth } from './useKoruAuth';
export { useKoruConfig } from './useKoruConfig';

// Types
export type {
  KoruConfig,
  AuthResponse,
  KoruOptions,
  KoruProviderProps,
  KoruProtectedProps,
  UseKoruAuthReturn,
  UseKoruConfigReturn,
} from './types';
