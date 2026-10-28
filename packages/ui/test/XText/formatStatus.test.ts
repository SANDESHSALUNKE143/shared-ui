import { describe, expect, it } from "vitest";

import { formatStatus } from "../../src/XText/formatStatus";

describe("formatStatus", () => {
  it("turns a raw enum into title case words", () => {
    expect(formatStatus("SUBMITTED")).toBe("Submitted");
    expect(formatStatus("needs_approval")).toBe("Needs Approval");
    expect(formatStatus("  ")).toBe("");
  });
});
