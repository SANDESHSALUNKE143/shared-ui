import { describe, expect, it } from "vitest";

import { contrastRatio, needsContrastHint } from "../../src/XBranding/contrast";

describe("contrast", () => {
  it("flags white text that falls below the AA ratio", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeGreaterThan(4.5);
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
    expect(contrastRatio("blue", "#ffffff")).toBeNull();
    expect(needsContrastHint("#ffffff")).toBe(true);
    expect(needsContrastHint("#1A3A65")).toBe(false);
    expect(needsContrastHint("blue")).toBe(false);
  });
});
