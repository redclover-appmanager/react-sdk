import { createContext } from 'react';
import { KoruContextValue } from './types';

/**
 * React context for Koru SDK state.
 * Provides authorization data and configuration to all child components.
 */
export const KoruContext = createContext<KoruContextValue | null>(null);

KoruContext.displayName = 'KoruContext';
