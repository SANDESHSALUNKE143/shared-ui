/**
 * Kind: external
 * Purpose: the branding value and the organization default.
 * Used by: packages/ui/src/XBranding/XBranding.tsx and apps that save a brand.
 */

import { allowedFonts, defaultFont, themeTokens, type AllowedFont } from "../XTheme/tokens";

export type XBrandMode = "light" | "dark";

export type XBrandMediaSlot = "logoLight" | "logoDark" | "icon";

export type XBrandMedia = {
  logoLight: string | null;
  logoDark: string | null;
  icon: string | null;
};

export type XBrand = {
  mode: XBrandMode;
  font: AllowedFont;
  primary: string;
  secondary: string;
  tertiary: string;
  success: string;
  info: string;
  warning: string;
  error: string;
  backgroundLight: string;
  backgroundDark: string;
  divider: string;
  radius: number;
  media: XBrandMedia;
};

export const xBrandFonts = allowedFonts;

export const XDefaultBrand: XBrand = {
  mode: themeTokens.mode,
  font: defaultFont,
  primary: themeTokens.primary,
  secondary: themeTokens.secondary,
  tertiary: themeTokens.tertiary,
  success: themeTokens.success,
  info: themeTokens.info,
  warning: themeTokens.warning,
  error: themeTokens.error,
  backgroundLight: themeTokens.background.light,
  backgroundDark: themeTokens.background.dark,
  divider: "rgba(0, 0, 0, 0.12)",
  radius: themeTokens.radius,
  media: {
    logoLight: null,
    logoDark: null,
    icon: null,
  },
};
