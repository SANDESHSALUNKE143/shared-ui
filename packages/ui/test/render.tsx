import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import { XCssBaseline, XLightTheme, XThemeProvider } from "../src/XTheme";

export function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <XThemeProvider theme={XLightTheme}>
        <XCssBaseline />
        {children}
      </XThemeProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
