import React from 'react';
import type { AppProps } from 'next/app';
import { KoruProvider } from '@redclover/koru-react-sdk';

/**
 * Next.js example with Koru React SDK
 * 
 * This demonstrates how to integrate the SDK with Next.js
 * using environment variables and the _app.tsx pattern.
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KoruProvider
      websiteId={process.env.NEXT_PUBLIC_KORU_WEBSITE_ID!}
      appId={process.env.NEXT_PUBLIC_KORU_APP_ID!}
      koruUrl={process.env.NEXT_PUBLIC_KORU_URL!}
      options={{
        cache: true,
        cacheDuration: 3600,
        retryAttempts: 3,
        debug: process.env.NODE_ENV === 'development'
      }}
    >
      <Component {...pageProps} />
    </KoruProvider>
  );
}

export default MyApp;
