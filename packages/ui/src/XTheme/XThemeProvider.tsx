/**
 * Kind: external
 * Purpose: the theme provider and baseline. App code imports these from this package.
 * Used by: the application root.
 */

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ComponentProps, ReactNode } from "react";

export type XThemeProviderProps = ComponentProps<typeof ThemeProvider> & { children: ReactNode };

export function XThemeProvider({ children, ...props }: XThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

export function XCssBaseline() {
  return <CssBaseline />;
}
