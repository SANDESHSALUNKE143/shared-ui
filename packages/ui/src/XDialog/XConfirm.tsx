/**
 * Kind: external
 * Purpose: confirm a destructive action before it runs.
 * Used by: delete and other error-colored actions.
 */

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { XButton } from "../Buttons";
import { XDialog } from "./XDialog";
import { XDialogFooter } from "./XDialogFooter";
import { XDialogHeader } from "./XDialogHeader";

export type XConfirmProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function XConfirm({ open, title, message, confirmLabel = "Delete", onConfirm, onClose }: XConfirmProps) {
  return (
    <XDialog open={open} size="sm" onClose={onClose}>
      <XDialogHeader>{title}</XDialogHeader>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <XDialogFooter>
        <XButton variant="text" onClick={onClose}>
          Cancel
        </XButton>
        <XButton color="error" onClick={onConfirm}>
          {confirmLabel}
        </XButton>
      </XDialogFooter>
    </XDialog>
  );
}
