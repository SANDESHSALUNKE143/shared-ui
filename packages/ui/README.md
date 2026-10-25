# @shared-ui/react

The shared component package. Install, versions, features, and component usage are in the repository [README](../../README.md).

Import from this package only:

```tsx
import { XButton, XCssBaseline, XLightTheme, XPageHeader, XThemeProvider } from "@shared-ui/react";

A screen does not import `@mui/material`. `XThemeProvider` and `XCssBaseline` come from this package.

Every component name starts with `X`. The toast hook is `useXNotify`.
```

Do not import a second button, icon, or dialog library in an application screen. Add a missing shared control here and re-export it from `src/index.ts`.
