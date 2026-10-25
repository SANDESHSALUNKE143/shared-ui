/**
 * Kind: external
 * Purpose: an icon-only action with a 44px target and an accessible name.
 * Used by: dense rows and dialog chrome.
 */

import IconButton, { type IconButtonProps } from "@mui/material/IconButton";

export type XIconButtonProps = IconButtonProps & { label: string };

export function XIconButton({ label, children, ...props }: XIconButtonProps) {
  return (
    <IconButton aria-label={label} size="small" {...props} sx={{ minWidth: 44, minHeight: 44, ...props.sx }}>
      {children}
    </IconButton>
  );
}
