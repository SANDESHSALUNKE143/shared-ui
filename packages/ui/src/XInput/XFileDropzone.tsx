/**
 * Kind: external
 * Purpose: a keyboard-reachable image picker. It reports the file and does not upload it.
 * Used by: packages/ui/src/XBranding/XBranding.tsx and app forms.
 */

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { XIconUpload } from "../XIcon";

export type XFileDropzoneProps = {
  label: string;
  value?: string | null;
  onPick: (file: File) => void;
  disabled?: boolean;
};

const allowedTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"]);

function allowedFile(file: File) {
  return allowedTypes.has(file.type) || file.name.toLowerCase().endsWith(".svg");
}

export function XFileDropzone({ label, value = null, onPick, disabled = false }: XFileDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <Stack spacing={1}>
      <Box
        component="label"
        sx={{
          display: "flex",
          minHeight: 140,
          alignItems: "center",
          justifyContent: "center",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "action.hover",
          cursor: disabled ? "default" : "pointer",
          position: "relative",
        }}
      >
        <Box
          component="input"
          type="file"
          aria-label={label}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) {
              return;
            }
            if (!allowedFile(file)) {
              setError("Choose a PNG, JPEG, WebP, or SVG image.");
              return;
            }
            setError(null);
            onPick(file);
          }}
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: 0,
          }}
        />
        <Stack spacing={1} alignItems="center">
          {value ? <Box component="img" src={value} alt={label} sx={{ maxHeight: 72, maxWidth: "100%" }} /> : <XIconUpload size="1em" />}
          <Typography variant="body2">{label}</Typography>
        </Stack>
      </Box>
      {error ? (
        <Typography variant="body2" color="error" role="alert">
          {error}
        </Typography>
      ) : null}
    </Stack>
  );
}
