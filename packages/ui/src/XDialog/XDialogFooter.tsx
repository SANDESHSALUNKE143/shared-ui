/**
 * Kind: external
 * Purpose: dialog actions. They stack on a narrow screen.
 * Used by: XDialog.
 */

import DialogActions from "@mui/material/DialogActions";
import type { ReactNode } from "react";

export function XDialogFooter({ children }: { children: ReactNode }) {
  return (
    <DialogActions sx={{ flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "stretch", sm: "center" }, gap: 1, px: 3, pb: 2 }}>
      {children}
    </DialogActions>
  );
}
