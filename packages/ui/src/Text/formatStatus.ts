/**
 * Kind: external
 * Purpose: turn a raw enum into a label. SUBMITTED never reaches the screen.
 * Used by: XStatusChip.
 */

export function formatStatus(value: string) {
  return value
    .trim()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
