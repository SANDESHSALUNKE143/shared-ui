import { describe, expect, it } from "vitest";

import { allowedFonts, defaultFont, themeTokens } from "./tokens";
import { XDarkTheme, XLightTheme } from "./theme";

describe("theme", () => {
  it("uses the organization defaults", () => {
    expect(defaultFont).toBe("Roboto");
    expect(allowedFonts).toContain("Inter");
    expect(XLightTheme.palette.primary.main).toBe(themeTokens.primary);
    expect(XLightTheme.palette.mode).toBe("light");
    expect(XDarkTheme.palette.mode).toBe("dark");
    expect(XDarkTheme.palette.background.default).toBe(themeTokens.background.dark);
    expect(XLightTheme.shape.borderRadius).toBe(themeTokens.radius);
  });
});
