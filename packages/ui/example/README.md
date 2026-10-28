# Example integration

These files show how an application uses the shared package. Copy them into the app and replace the two placeholders:

- `signIn` in `SignInPage.tsx` sends the email and password to the app auth API.
- `upload` in `BrandingPage.tsx` sends the image to the app file store, then saves the returned URL on `brand.media`. This copy uses a local object URL so the drop zone can show the file immediately.

The app still owns the auth request, the file upload, and saving the brand. Import only from `@shared-ui/react`.

```tsx
import { App } from "./example/App";

export function Root() {
  return <App />;
}
```
