/**
 * Kind: external
 * Purpose: format field text for the shared masks. The raw value never stays unformatted.
 * Used by: XTextField.
 */

export const masks = ["phone", "ssn", "ein", "tin", "crd", "zip", "currency", "percent", "number"] as const;

export type Mask = (typeof masks)[number];

function digits(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}

function decimal(value: string) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot < 0) return cleaned;
  return `${cleaned.slice(0, dot)}.${cleaned.slice(dot + 1).replace(/\./g, "").slice(0, 2)}`;
}

export function applyMask(mask: Mask, raw: string): string {
  if (mask === "phone") {
    const d = digits(raw, 10);
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  if (mask === "ssn") {
    const d = digits(raw, 9);
    if (d.length <= 3) return d;
    if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
  }
  if (mask === "ein" || mask === "tin") {
    const d = digits(raw, 9);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}-${d.slice(2)}`;
  }
  if (mask === "crd") return digits(raw, 10);
  if (mask === "zip") {
    const d = digits(raw, 9);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  }
  if (mask === "number") return decimal(raw);
  if (mask === "currency") {
    const n = decimal(raw.replace(/[$,]/g, ""));
    if (!n) return "";
    const [whole, frac] = n.split(".");
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return frac === undefined ? `$${grouped}` : `$${grouped}.${frac}`;
  }
  const n = decimal(raw.replace(/%/g, ""));
  return n ? `${n}%` : "";
}
