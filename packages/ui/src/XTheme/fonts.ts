/**
 * Kind: external
 * Purpose: load the default organization font from this package.
 * Used by: packages/ui/src/index.ts
 */

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { defaultFont } from "./tokens";

export const fontFamily = `${defaultFont}, "Helvetica", "Arial", sans-serif`;
