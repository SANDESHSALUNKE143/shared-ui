import { describe, expect, it } from "vitest";

import { dialogWidths } from "../../src/XDialog/widths";

describe("dialogWidths", () => {
  it("matches the design sizes", () => {
    expect(dialogWidths).toEqual({ sm: 600, md: 800, lg: 1000, xl: 1200 });
  });
});
