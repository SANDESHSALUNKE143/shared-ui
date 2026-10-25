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

export function createXTheme(mode: ColorMode = themeTokens.mode) {
  const background = themeTokens.background[mode];
  return createTheme({
    palette: {
      mode,
      primary: { main: themeTokens.primary },
      secondary: { main: themeTokens.secondary },
      tertiary: { main: themeTokens.tertiary },
      info: { main: themeTokens.info },
      success: { main: themeTokens.success },
      warning: { main: themeTokens.warning },
      error: { main: themeTokens.error },
      background: { default: background, paper: background },
    },
    shape: { borderRadius: themeTokens.radius },
    typography: { fontFamily },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { fontFamily },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: 8 },
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
