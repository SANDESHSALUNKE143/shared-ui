import { describe, expect, it } from "vitest";

import { allowedFonts, defaultFont, themeTokens } from "../../src/XTheme/tokens";
import { createXTheme, XDarkTheme, XLightTheme } from "../../src/XTheme/theme";

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

  it("applies a saved brand without changing the default themes", () => {
    const branded = createXTheme("dark", {
      primary: "#000000",
      backgroundDark: "#010101",
      divider: "rgba(0, 0, 0, 0.5)",
      radius: 12,
      font: "Inter",
    });
    expect(branded.palette.primary.main).toBe("#000000");
    expect(branded.palette.background.default).toBe("#010101");
    expect(branded.palette.divider).toBe("rgba(0, 0, 0, 0.5)");
    expect(branded.shape.borderRadius).toBe(12);
    expect(branded.typography.fontFamily).toContain("Inter");
    expect(XLightTheme.palette.primary.main).toBe(themeTokens.primary);
    expect(XLightTheme.typography.fontFamily).toContain("Roboto");
  });
});
