/**
 * Kind: external
 * Purpose: detail beside a list. On a phone it covers the screen.
 * Used by: list and detail screens.
 */

import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { ReactNode } from "react";

export type XDrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function XDrawer({ open, title, onClose, children }: XDrawerProps) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: compact ? "100%" : 360 }, "aria-label": title }}>
      {children}
    </Drawer>
  );
}
