/**
 * Kind: external
 * Purpose: light and dark themes. Same shape as a product theme module: palette, type, radius.
 * Used by: app roots that wrap the tree in ThemeProvider.
 */

import { alpha, createTheme } from "@mui/material/styles";

type ColorMode = "light" | "dark";

import "./palette";
import { fontFamily } from "./fonts";
import { themeTokens } from "./tokens";

export type XThemeBrand = {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  backgroundLight?: string;
  backgroundDark?: string;
  divider?: string;
  radius?: number;
  font?: string;
};

export function createXTheme(mode: ColorMode = themeTokens.mode, brand?: XThemeBrand) {
  const background = mode === "dark" ? (brand?.backgroundDark ?? themeTokens.background.dark) : (brand?.backgroundLight ?? themeTokens.background.light);
  const family = brand?.font ? `${brand.font}, "Helvetica", "Arial", sans-serif` : fontFamily;
  const radius = brand?.radius ?? themeTokens.radius;
  return createTheme({
    palette: {
      mode,
      primary: { main: brand?.primary ?? themeTokens.primary },
      secondary: { main: brand?.secondary ?? themeTokens.secondary },
      tertiary: { main: brand?.tertiary ?? themeTokens.tertiary },
      info: { main: brand?.info ?? themeTokens.info },
      success: { main: brand?.success ?? themeTokens.success },
      warning: { main: brand?.warning ?? themeTokens.warning },
      error: { main: brand?.error ?? themeTokens.error },
      ...(brand?.divider ? { divider: brand.divider } : {}),
      background: { default: background, paper: background },
    },
    shape: { borderRadius: radius },
    typography: { fontFamily: family },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { fontFamily: family },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: brand?.radius ?? 8 },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: alpha(background, 0.95),
            backdropFilter: "blur(20px)",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { minHeight: 44 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { minWidth: 44, minHeight: 44 },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: { minHeight: 44, textTransform: "none" },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: "none", minHeight: 44 },
        },
      },
    },
  });
}

export const XLightTheme = createXTheme("light");
export const XDarkTheme = createXTheme("dark");
