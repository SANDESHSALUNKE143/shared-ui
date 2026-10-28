/**
 * Kind: external
 * Purpose: a labeled hex color with a native swatch.
 * Used by: packages/ui/src/XBranding/XBranding.tsx and app forms.
 */

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { XTextField } from "./XTextField";

export type XColorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function swatchValue(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";
}

export function XColorField({ label, value, onChange, disabled = false }: XColorFieldProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        component="input"
        type="color"
        aria-label={`${label} swatch`}
        value={swatchValue(value)}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        sx={{ width: 44, height: 44, p: 0, border: 0, bgcolor: "transparent", cursor: "pointer" }}
      />
      <XTextField label={label} value={value} onChange={onChange} disabled={disabled} />
    </Stack>
  );
}
