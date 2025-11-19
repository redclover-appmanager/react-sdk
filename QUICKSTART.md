# Quick Start Guide

Get started with Koru React SDK in 5 minutes!

## Installation

```bash
npm install @redclover/koru-react-sdk
```

## Basic Setup

### 1. Wrap your app with KoruProvider

```tsx
// src/App.tsx
import { KoruProvider } from '@redclover/koru-react-sdk';
import Dashboard from './Dashboard';

function App() {
  return (
    <KoruProvider
      websiteId="your-website-id"
      appId="your-app-id"
      koruUrl="https://app.koru.com"
    >
      <Dashboard />
    </KoruProvider>
  );
}

export default App;
```

### 2. Use the hook in your components

```tsx
// src/Dashboard.tsx
import { useKoruAuth } from '@redclover/koru-react-sdk';

function Dashboard() {
  const { isAuthorized, loading, config } = useKoruAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthorized) return <div>Not authorized</div>;

  return (
    <div>
      <h1>Welcome!</h1>
      <p>App Name: {config.appName}</p>
    </div>
  );
}

export default Dashboard;
```

## Environment Variables

Create a `.env` file:

```env
REACT_APP_KORU_WEBSITE_ID=your-website-id
REACT_APP_KORU_APP_ID=your-app-id
REACT_APP_KORU_URL=https://app.koru.com
```

Use in your app:

```tsx
<KoruProvider
  websiteId={process.env.REACT_APP_KORU_WEBSITE_ID}
  appId={process.env.REACT_APP_KORU_APP_ID}
  koruUrl={process.env.REACT_APP_KORU_URL}
>
  <App />
</KoruProvider>
```

## Protected Routes

```tsx
import { KoruProtected } from '@redclover/koru-react-sdk';

function App() {
  return (
    <KoruProtected fallback={<div>Access Denied</div>}>
      <YourProtectedApp />
    </KoruProtected>
  );
}
```

## Configuration Options

```tsx
<KoruProvider
  websiteId="ws_123"
  appId="app_456"
  koruUrl="https://app.koru.com"
  options={{
    cache: true,           // Enable caching (default: true)
    cacheDuration: 3600,   // Cache for 1 hour (default: 3600)
    retryAttempts: 3,      // Retry 3 times (default: 3)
    retryDelay: 1000,      // Wait 1s between retries (default: 1000)
    debug: true            // Enable debug logs (default: false)
  }}
>
  <App />
</KoruProvider>
```

## Next.js Setup

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { KoruProvider } from '@redclover/koru-react-sdk';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KoruProvider
      websiteId={process.env.NEXT_PUBLIC_KORU_WEBSITE_ID!}
      appId={process.env.NEXT_PUBLIC_KORU_APP_ID!}
      koruUrl={process.env.NEXT_PUBLIC_KORU_URL!}
    >
      <Component {...pageProps} />
    </KoruProvider>
  );
}

export default MyApp;
```

## Common Patterns

### Access auth token for API calls

```tsx
function DataFetcher() {
  const { token } = useKoruAuth();

  const fetchData = async () => {
    const response = await fetch('/api/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  };

  // ...
}
```

### Manual reload

```tsx
function RefreshButton() {
  const { reload, loading } = useKoruAuth();

  return (
    <button onClick={reload} disabled={loading}>
      {loading ? 'Refreshing...' : 'Refresh'}
    </button>
  );
}
```

### Error handling

```tsx
function ErrorHandler() {
  const { error, reload } = useKoruAuth();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  return <YourApp />;
}
```

## TypeScript

The SDK is fully typed. Import types as needed:

```tsx
import type { 
  KoruConfig, 
  AuthResponse, 
  UseKoruAuthReturn 
} from '@redclover/koru-react-sdk';

interface MyConfig extends KoruConfig {
  apiUrl: string;
  theme: 'light' | 'dark';
}

function MyComponent() {
  const auth: UseKoruAuthReturn = useKoruAuth();
  const config = auth.config as MyConfig;
  
  return <div>{config.apiUrl}</div>;
}
```

## Need Help?

- 📖 [Full Documentation](./README.md)
- 💡 [Examples](./examples/)
- 🐛 [Report Issues](https://github.com/redclover-appmanager/react-sdk/issues)
- 📧 Email: soporte@redclover.com.ar

## What's Next?

1. Check out the [examples](./examples/) folder for complete working examples
2. Read the [full documentation](./README.md) for advanced features
3. Explore the [API reference](./README.md#-api-reference)

Happy coding! 🚀
