# Basic Example

This example demonstrates the basic usage of `@redclover/koru-react-sdk`.

## Features Demonstrated

- ✅ KoruProvider setup
- ✅ useKoruAuth hook
- ✅ KoruProtected component
- ✅ Loading and error states
- ✅ Manual reload functionality
- ✅ Configuration display
- ✅ Token access

## Running the Example

1. Install dependencies:
```bash
npm install
```

2. Update the credentials in `App.tsx`:
```tsx
<KoruProvider
  websiteId="your-website-id"
  appId="your-app-id"
  koruUrl="https://app.koru.com"
>
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## What to Expect

1. The app will automatically authorize with Koru on mount
2. You'll see a loading state while authorization is in progress
3. Once authorized, the dashboard will display:
   - Full configuration object
   - Authorization token
   - Protected content section
4. You can manually refresh authorization using the "Refresh Authorization" button

## Code Structure

- `App.tsx` - Main application component with KoruProvider
- `Dashboard` - Component using useKoruAuth hook
- `ProtectedContent` - Example of protected content
- `KoruProtected` - Wrapper demonstrating protected routes
