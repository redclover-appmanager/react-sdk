import React from 'react';
import { KoruProvider, useKoruAuth, KoruProtected } from '@redclover/koru-react-sdk';

/**
 * Basic example demonstrating Koru React SDK usage
 */

// Dashboard component using useKoruAuth hook
function Dashboard() {
  const { isAuthorized, loading, error, config, token, reload } = useKoruAuth();

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
        <p>Checking authorization with Koru...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error</h2>
        <p>{error.message}</p>
        <button onClick={reload}>Retry</button>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Not Authorized</h2>
        <p>Your app is not authorized to access Koru platform.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Koru Dashboard</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Configuration</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Auth Token</h2>
        <code style={{ background: '#f5f5f5', padding: '10px', display: 'block', borderRadius: '4px' }}>
          {token}
        </code>
      </div>

      <button 
        onClick={reload}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Refresh Authorization
      </button>
    </div>
  );
}

// Protected content example
function ProtectedContent() {
  return (
    <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '4px' }}>
      <h2>🔒 Protected Content</h2>
      <p>This content is only visible to authorized users.</p>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <KoruProvider
      websiteId="your-website-id"
      appId="your-app-id"
      koruUrl="https://app.koru.com"
      options={{
        cache: true,
        cacheDuration: 3600,
        retryAttempts: 3,
        retryDelay: 1000,
        debug: true
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '20px', background: '#1976d2', color: 'white' }}>
          <h1>Koru React SDK - Basic Example</h1>
        </header>

        <Dashboard />

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ padding: '0 20px' }}>Protected Component Example</h2>
          <KoruProtected
            loading={<div style={{ padding: '20px' }}>Checking access...</div>}
            fallback={<div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px' }}>
              ❌ Access Denied
            </div>}
          >
            <ProtectedContent />
          </KoruProtected>
        </div>
      </div>
    </KoruProvider>
  );
}
