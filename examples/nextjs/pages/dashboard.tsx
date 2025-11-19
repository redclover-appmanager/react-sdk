import React from 'react';
import { KoruProtected, useKoruAuth } from '@redclover/koru-react-sdk';
import Link from 'next/link';

function DashboardContent() {
  const { config, token, reload } = useKoruAuth();

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Protected Dashboard</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>App Configuration</h2>
        <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Auth Token</h2>
        <code style={{ background: '#f5f5f5', padding: '10px', display: 'block', borderRadius: '8px' }}>
          {token}
        </code>
      </div>

      <button 
        onClick={reload}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Refresh Authorization
      </button>

      <nav style={{ marginTop: '40px' }}>
        <Link href="/">Back to Home</Link>
      </nav>
    </div>
  );
}

export default function Dashboard() {
  return (
    <KoruProtected
      loading={<div style={{ padding: '40px' }}>Loading...</div>}
      fallback={
        <div style={{ padding: '40px' }}>
          <h1>Access Denied</h1>
          <p>You are not authorized to view this page.</p>
          <Link href="/">Go Home</Link>
        </div>
      }
    >
      <DashboardContent />
    </KoruProtected>
  );
}
