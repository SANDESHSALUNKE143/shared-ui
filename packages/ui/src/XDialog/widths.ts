/**
 * Kind: external
 * Purpose: dialog widths from the organization design system.
 * Used by: XDialog.
 */

export const dialogWidths = {
  sm: 600,
  md: 800,
  lg: 1000,
  xl: 1200,
} as const;

export type DialogSize = keyof typeof dialogWidths;
