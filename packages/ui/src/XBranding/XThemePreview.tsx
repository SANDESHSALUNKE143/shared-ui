/**
 * Kind: external
 * Purpose: a live sample of one theme mode. The selected default mode is marked.
 * Used by: packages/ui/src/XBranding/XBranding.tsx.
 */

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { XBrand, XBrandMode } from "./brand";

export type XThemePreviewProps = {
  mode: XBrandMode;
  brand: XBrand;
  isDefault: boolean;
};

export function XThemePreview({ mode, brand, isDefault }: XThemePreviewProps) {
  const background = mode === "light" ? brand.backgroundLight : brand.backgroundDark;
  const text = mode === "light" ? "#121212" : "#ffffff";
  const muted = mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)";
  const samples = [
    ["Primary Button", brand.primary],
    ["Secondary Button", brand.secondary],
    ["Tertiary Button", brand.tertiary],
  ] as const;
  const alerts = [
    ["Success", brand.success],
    ["Warning", brand.warning],
    ["Error", brand.error],
    ["Info", brand.info],
  ] as const;

  return (
    <Box
      data-testid={`theme-preview-${mode}`}
      sx={{
        position: "relative",
        flex: 1,
        minWidth: 220,
        p: 2,
        borderRadius: 1,
        bgcolor: background,
        color: text,
        border: isDefault ? 2 : 1,
        borderColor: isDefault ? "primary.main" : "divider",
      }}
    >
      {isDefault ? <Chip label="Default" size="small" color="primary" sx={{ position: "absolute", top: 8, right: 8 }} /> : null}
      <Typography variant="caption">{mode === "dark" ? "Dark Mode" : "Light Mode"}</Typography>
      <Typography variant="h6">Title</Typography>
      <Typography>Header</Typography>
      <Typography variant="body2">Body</Typography>
      <Typography variant="caption" sx={{ color: muted }}>
        Caption
      </Typography>
      <Divider sx={{ my: 1, borderColor: brand.divider, color: muted }}>Divider</Divider>
      <Stack spacing={1}>
        {samples.map(([label, color]) => (
          <Box key={label} sx={{ bgcolor: color, color: "#ffffff", py: 1, textAlign: "center", borderRadius: `${brand.radius}px` }}>
            {label}
          </Box>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
        {alerts.map(([label, color]) => (
          <Chip key={label} label={label} size="small" sx={{ bgcolor: color, color: "#ffffff" }} />
        ))}
      </Stack>
    </Box>
  );
}
