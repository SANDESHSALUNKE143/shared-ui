/**
 * Kind: external
 * Purpose: the organization default theme. Feature code reads these through the theme, not as pasted hex.
 * Used by: packages/ui/src/XTheme/theme.ts
 */

export const themeTokens = {
  primary: "#1A3A65",
  secondary: "#C4A880",
  tertiary: "#616161",
  info: "#0288d1",
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
  background: {
    light: "#ffffff",
    dark: "#121212",
  },
  radius: 4,
  mode: "light",
} as const;

export const defaultFont = "Roboto";

export const allowedFonts = [
  "Roboto",
  "Inter",
  "DM Sans",
  "IBM Plex Sans",
  "Dosis",
  "TT Chocolates",
] as const;

export type AllowedFont = (typeof allowedFonts)[number];
