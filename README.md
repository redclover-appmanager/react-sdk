# @redclover/koru-react-sdk

> Lightweight React SDK for Koru platform authorization and integration

[![npm version](https://img.shields.io/npm/v/@redclover/koru-react-sdk.svg)](https://www.npmjs.com/package/@redclover/koru-react-sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@redclover/koru-react-sdk)](https://bundlephobia.com/package/@redclover/koru-react-sdk)
[![License](https://img.shields.io/npm/l/@redclover/koru-react-sdk.svg)](https://github.com/redclover-appmanager/react-sdk/blob/main/LICENSE)

A modern, lightweight React SDK for seamless integration with the Koru platform. Provides hooks, components, and utilities for authorization, configuration management, and protected routes.

## ✨ Features

- 🪝 **React Hooks** - `useKoruAuth`, `useKoruConfig` for easy state access
- 🔐 **Authorization** - Automatic authorization with Koru platform
- 💾 **Smart Caching** - Configurable localStorage caching with TTL
- 🔄 **Retry Logic** - Exponential backoff retry for failed requests
- 🛡️ **Protected Routes** - `KoruProtected` component for auth-gated content
- 📦 **Tiny Bundle** - < 5KB gzipped
- 🎯 **TypeScript** - Full TypeScript support with type definitions
- ⚛️ **React 16.8+** - Works with React 16.8+ (hooks support)
- 🚀 **Zero Dependencies** - No runtime dependencies except React

## 📦 Installation

```bash
npm install @redclover/koru-react-sdk
```

```bash
yarn add @redclover/koru-react-sdk
```

```bash
pnpm add @redclover/koru-react-sdk
```

## 🚀 Quick Start

### 1. Wrap your app with KoruProvider

```tsx
import { KoruProvider } from '@redclover/koru-react-sdk';

function App() {
  return (
    <KoruProvider
      websiteId="your-website-id"
      appId="your-app-id"
      koruUrl="https://app.koru.com"
      options={{ cache: true, debug: true }}
    >
      <YourApp />
    </KoruProvider>
  );
}
```

### 2. Use hooks to access auth state

```tsx
import { useKoruAuth } from '@redclover/koru-react-sdk';

function MyComponent() {
  const { isAuthorized, loading, error, config, token, reload } = useKoruAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAuthorized) return <div>Not authorized</div>;

  return (
    <div>
      <h1>Welcome!</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <button onClick={reload}>Refresh Auth</button>
    </div>
  );
}
```

### 3. Protect components with KoruProtected

```tsx
import { KoruProtected } from '@redclover/koru-react-sdk';

function App() {
  return (
    <KoruProtected
      loading={<div>Checking authorization...</div>}
      fallback={<div>Access denied</div>}
    >
      <ProtectedContent />
    </KoruProtected>
  );
}
```

## 📚 API Reference

### `<KoruProvider>`

Context provider that wraps your app to provide Koru authorization.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `websiteId` | `string` | ✅ | Unique website identifier from Koru |
| `appId` | `string` | ✅ | Unique app identifier from Koru |
| `koruUrl` | `string` | ✅ | Base URL of Koru platform |
| `options` | `KoruOptions` | ❌ | Configuration options |
| `children` | `ReactNode` | ✅ | Child components |

**Options:**

```typescript
interface KoruOptions {
  cache?: boolean;          // Enable caching (default: true)
  cacheDuration?: number;   // Cache TTL in seconds (default: 3600)
  retryAttempts?: number;   // Retry attempts (default: 3)
  retryDelay?: number;      // Retry delay in ms (default: 1000)
  debug?: boolean;          // Enable debug logging (default: false)
}
```

### `useKoruAuth()`

Hook to access Koru authorization state and data.

**Returns:**

```typescript
{
  isAuthorized: boolean;     // Whether app is authorized
  loading: boolean;          // Whether authorization is in progress
  error: Error | null;       // Error if authorization failed
  authData: AuthResponse | null;  // Full auth response
  token: string | null;      // Auth token for API calls
  config: KoruConfig | null; // App configuration
  reload: () => Promise<void>;    // Refresh authorization
}
```

**Example:**

```tsx
function Dashboard() {
  const { isAuthorized, config, token, reload } = useKoruAuth();

  const fetchData = async () => {
    const response = await fetch('/api/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  };

  return (
    <div>
      <h1>{config.title}</h1>
      <button onClick={reload}>Refresh</button>
    </div>
  );
}
```

### `useKoruConfig()`

Convenience hook to access only the configuration object.

**Returns:**

```typescript
{
  config: KoruConfig | null;  // App configuration
  loading: boolean;           // Whether loading
  error: Error | null;        // Error if any
}
```

**Example:**

```tsx
function Settings() {
  const { config, loading } = useKoruConfig();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Settings</h1>
      <p>API URL: {config.apiUrl}</p>
      <p>Theme: {config.theme}</p>
    </div>
  );
}
```

### `<KoruProtected>`

Component that wraps content requiring authorization.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fallback` | `ReactNode` | ❌ | UI to show when not authorized |
| `loading` | `ReactNode` | ❌ | UI to show while loading |
| `children` | `ReactNode` | ✅ | Protected content |

**Example:**

```tsx
<KoruProtected
  loading={<Spinner />}
  fallback={<AccessDenied />}
>
  <AdminPanel />
</KoruProtected>
```

## 🎯 Usage Examples

### Basic Usage

```tsx
import { KoruProvider, useKoruAuth } from '@redclover/koru-react-sdk';

function App() {
  return (
    <KoruProvider
      websiteId="ws_123"
      appId="app_456"
      koruUrl="https://app.koru.com"
    >
      <Dashboard />
    </KoruProvider>
  );
}

function Dashboard() {
  const { isAuthorized, loading, config } = useKoruAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthorized) return <div>Not authorized</div>;

  return <div>Welcome to {config.appName}</div>;
}
```

### With Custom Options

```tsx
<KoruProvider
  websiteId="ws_123"
  appId="app_456"
  koruUrl="https://app.koru.com"
  options={{
    cache: true,
    cacheDuration: 7200,  // 2 hours
    retryAttempts: 5,
    retryDelay: 2000,
    debug: process.env.NODE_ENV === 'development'
  }}
>
  <App />
</KoruProvider>
```

### Protected Routes

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { KoruProtected } from '@redclover/koru-react-sdk';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <KoruProtected fallback={<Navigate to="/login" />}>
              <Dashboard />
            </KoruProtected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

### Using Auth Token for API Calls

```tsx
function DataFetcher() {
  const { token, isAuthorized } = useKoruAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isAuthorized && token) {
      fetch('https://api.example.com/data', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(setData);
    }
  }, [isAuthorized, token]);

  return <div>{JSON.stringify(data)}</div>;
}
```

### Manual Reload

```tsx
function RefreshButton() {
  const { reload, loading } = useKoruAuth();

  return (
    <button onClick={reload} disabled={loading}>
      {loading ? 'Refreshing...' : 'Refresh Authorization'}
    </button>
  );
}
```

## 🔧 Advanced Usage

### Environment Variables

```bash
# .env
REACT_APP_KORU_WEBSITE_ID=ws_123
REACT_APP_KORU_APP_ID=app_456
REACT_APP_KORU_URL=https://app.koru.com
```

```tsx
<KoruProvider
  websiteId={process.env.REACT_APP_KORU_WEBSITE_ID}
  appId={process.env.REACT_APP_KORU_APP_ID}
  koruUrl={process.env.REACT_APP_KORU_URL}
>
  <App />
</KoruProvider>
```

### Next.js Usage

```tsx
// pages/_app.tsx
import { KoruProvider } from '@redclover/koru-react-sdk';

function MyApp({ Component, pageProps }) {
  return (
    <KoruProvider
      websiteId={process.env.NEXT_PUBLIC_KORU_WEBSITE_ID}
      appId={process.env.NEXT_PUBLIC_KORU_APP_ID}
      koruUrl={process.env.NEXT_PUBLIC_KORU_URL}
    >
      <Component {...pageProps} />
    </KoruProvider>
  );
}

export default MyApp;
```

### Error Handling

```tsx
function ErrorBoundary() {
  const { error, isAuthorized, reload } = useKoruAuth();

  if (error) {
    return (
      <div>
        <h1>Authorization Error</h1>
        <p>{error.message}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  return <YourApp />;
}
```

## 🧪 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  KoruConfig,
  AuthResponse,
  KoruOptions,
  UseKoruAuthReturn,
  UseKoruConfigReturn,
} from '@redclover/koru-react-sdk';

// Custom config type
interface MyAppConfig extends KoruConfig {
  apiUrl: string;
  theme: 'light' | 'dark';
  features: string[];
}

function MyComponent() {
  const { config } = useKoruAuth();
  const typedConfig = config as MyAppConfig;
  
  return <div>{typedConfig.apiUrl}</div>;
}
```

## 📊 Bundle Size

The SDK is optimized for minimal bundle size:

- **Minified**: ~8KB
- **Minified + Gzipped**: ~3KB
- **Zero runtime dependencies** (except React)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

UNLICENSED - © Red Clover

## 🔗 Links

- [GitHub Repository](https://github.com/redclover-appmanager/react-sdk)
- [Issue Tracker](https://github.com/redclover-appmanager/react-sdk/issues)
- [Koru Platform](https://koru.com)

## 💬 Support

For support, email soporte@redclover.com.ar or open an issue on GitHub.
