# Next.js Example

This example demonstrates how to use `@redclover/koru-react-sdk` with Next.js.

## Features Demonstrated

- ✅ Next.js App Router integration
- ✅ Environment variables configuration
- ✅ Protected routes
- ✅ SSR-compatible setup
- ✅ TypeScript support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Update environment variables in `.env.local`:
```env
NEXT_PUBLIC_KORU_WEBSITE_ID=your-website-id
NEXT_PUBLIC_KORU_APP_ID=your-app-id
NEXT_PUBLIC_KORU_URL=https://app.koru.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nextjs/
├── pages/
│   ├── _app.tsx          # KoruProvider setup
│   ├── index.tsx         # Home page
│   └── dashboard.tsx     # Protected dashboard
├── .env.example          # Environment variables template
└── package.json
```

## Key Concepts

### Provider Setup (_app.tsx)

The `KoruProvider` is set up in `_app.tsx` to wrap the entire application:

```tsx
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
```

### Protected Routes

Use `KoruProtected` component to protect specific pages:

```tsx
export default function Dashboard() {
  return (
    <KoruProtected fallback={<AccessDenied />}>
      <DashboardContent />
    </KoruProtected>
  );
}
```

### Environment Variables

Next.js requires the `NEXT_PUBLIC_` prefix for client-side environment variables.

## Building for Production

```bash
npm run build
npm start
```

## Notes

- The SDK is fully compatible with Next.js SSR
- Authorization happens on the client side
- Environment variables must be prefixed with `NEXT_PUBLIC_`
- The provider should be set up in `_app.tsx` for app-wide access
