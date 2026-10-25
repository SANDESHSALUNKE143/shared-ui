/**
 * Kind: external
 * Purpose: the dialog title row. Leaves room for the close button.
 * Used by: XDialog.
 */

import DialogTitle from "@mui/material/DialogTitle";
import type { ReactNode } from "react";

export function XDialogHeader({ children }: { children: ReactNode }) {
  return <DialogTitle sx={{ pr: 6 }}>{children}</DialogTitle>;
}
