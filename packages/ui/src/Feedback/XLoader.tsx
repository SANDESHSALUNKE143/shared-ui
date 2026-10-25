/**
 * Kind: external
 * Purpose: block the screen during a full fetch without a centered spinner.
 * Used by: app roots while the first request is in flight.
 */

import Box from "@mui/material/Box";

import { XSkeleton } from "./XSkeleton";

export function XLoader() {
  return (
    <Box role="status" aria-label="Loading" sx={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", bgcolor: "background.default", px: 3 }}>
      <XSkeleton width="100%" height={16} sx={{ maxWidth: 360 }} />
    </Box>
  );
}
