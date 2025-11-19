import React from 'react';
import { useKoruAuth, KoruProtected } from '@redclover/koru-react-sdk';
import Link from 'next/link';

export default function Home() {
  const { isAuthorized, loading, config } = useKoruAuth();

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Koru React SDK + Next.js</h1>
      
      {loading && <p>Loading authorization...</p>}
      
      {!loading && isAuthorized && (
        <div>
          <p style={{ color: 'green' }}>✅ Authorized</p>
          <h2>Configuration</h2>
          <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      )}

      <nav style={{ marginTop: '40px' }}>
        <Link href="/dashboard">Go to Dashboard</Link>
      </nav>
    </div>
  );
}
