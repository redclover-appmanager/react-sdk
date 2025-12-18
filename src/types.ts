import { ReactNode } from 'react';

/**
 * Configuration object from Koru platform.
 * Contains custom configuration data for the app.
 */
export interface KoruConfig {
  [key: string]: any;
}

/**
 * Response from the Koru authorization endpoint.
 * Contains authorization status, app configuration, and metadata.
 */
export interface AuthResponse {
  /** Whether the app is authorized to run */
  authorized: boolean;
  /** Custom configuration data for the app */
  config: KoruConfig;
  /** Authorization token for authenticated API requests */
  token: string;
  /** App metadata from Koru */
  app: {
    /** Unique app identifier */
    id: string;
    /** Human-readable app name */
    name: string;
    /** App description */
    description: string;
  };
  /** Website metadata from Koru */
  website: {
    /** Unique website identifier */
    id: string;
    /** Website URL */
    url: string;
    /** Whether the website is an e-commerce site */
    is_ecommerce: boolean;
    /** Customer identifier */
    customer: string;
  };
  /** Optional custom data passed from the consumer */
  custom_data?: string;
}

/**
 * Options for configuring Koru SDK behavior.
 */
export interface KoruOptions {
  /** Enable localStorage caching of authorization data (default: true) */
  cache?: boolean;
  /** Cache time-to-live in seconds (default: 3600 = 1 hour) */
  cacheDuration?: number;
  /** Number of authorization retry attempts (default: 3) */
  retryAttempts?: number;
  /** Delay between retries in milliseconds (default: 1000) */
  retryDelay?: number;
  /** Enable debug console logging (default: false) */
  debug?: boolean;
}

/**
 * Required props for KoruProvider component.
 */
export interface KoruProviderProps {
  /** Unique website identifier from Koru */
  websiteId: string;
  /** Unique app identifier from Koru */
  appId: string;
  /** Base URL of the Koru platform (e.g., 'https://app.koru.com') */
  koruUrl: string;
  /** Optional configuration settings */
  options?: KoruOptions;
  /** Optional custom data to pass to the app */
  customData?: string;
  /** Child components */
  children: ReactNode;
}

/**
 * Props for KoruProtected component.
 */
export interface KoruProtectedProps {
  /** Component to render when not authorized */
  fallback?: ReactNode;
  /** Component to render while checking authorization */
  loading?: ReactNode;
  /** Child components to protect */
  children: ReactNode;
}

/**
 * Return type of useKoruAuth hook.
 */
export interface UseKoruAuthReturn {
  /** Whether the app is authorized */
  isAuthorized: boolean;
  /** Whether authorization is in progress */
  loading: boolean;
  /** Error that occurred during authorization, if any */
  error: Error | null;
  /** Full authorization response data */
  authData: AuthResponse | null;
  /** Authorization token for API calls */
  token: string | null;
  /** App configuration from Koru */
  config: KoruConfig | null;
  /** Function to manually refresh authorization */
  reload: () => Promise<void>;
}

/**
 * Return type of useKoruConfig hook.
 */
export interface UseKoruConfigReturn {
  /** App configuration from Koru */
  config: KoruConfig | null;
  /** Whether authorization is in progress */
  loading: boolean;
  /** Error that occurred during authorization, if any */
  error: Error | null;
}

/**
 * Internal context value type.
 */
export interface KoruContextValue {
  websiteId: string;
  appId: string;
  koruUrl: string;
  customData?: string;
  options: Required<KoruOptions>;
  authData: AuthResponse | null;
  loading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

/**
 * Cached authorization data structure.
 */
export interface CachedAuth {
  data: AuthResponse;
  timestamp: number;
}
