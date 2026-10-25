import { describe, expect, it } from "vitest";

import { applyMask } from "./masks";

describe("applyMask", () => {
  it("formats a phone as it is typed", () => {
    expect(applyMask("phone", "4")).toBe("4");
    expect(applyMask("phone", "4155")).toBe("(415) 5");
    expect(applyMask("phone", "4155551212")).toBe("(415) 555-1212");
    expect(applyMask("phone", "415555121299")).toBe("(415) 555-1212");
  });

  it("formats an ssn and stops at nine digits", () => {
    expect(applyMask("ssn", "123")).toBe("123");
    expect(applyMask("ssn", "1234")).toBe("123-4");
    expect(applyMask("ssn", "123456789")).toBe("123-45-6789");
  });

  it("formats ein and tin the same way", () => {
    expect(applyMask("ein", "1")).toBe("1");
    expect(applyMask("ein", "123456789")).toBe("12-3456789");
    expect(applyMask("tin", "123456789")).toBe("12-3456789");
  });

  it("keeps a crd as digits", () => {
    expect(applyMask("crd", "ab123")).toBe("123");
  });

  it("formats a zip with the optional four", () => {
    expect(applyMask("zip", "94107")).toBe("94107");
    expect(applyMask("zip", "941071234")).toBe("94107-1234");
  });

  it("keeps one decimal for a number", () => {
    expect(applyMask("number", "12.345")).toBe("12.34");
    expect(applyMask("number", "12")).toBe("12");
  });

  it("formats currency and percent", () => {
    expect(applyMask("currency", "")).toBe("");
    expect(applyMask("currency", "1200")).toBe("$1,200");
    expect(applyMask("currency", "$1,200.5")).toBe("$1,200.5");
    expect(applyMask("percent", "")).toBe("");
    expect(applyMask("percent", "12.5")).toBe("12.5%");
  });
});
