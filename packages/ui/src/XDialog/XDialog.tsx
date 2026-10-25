/**
 * Kind: external
 * Purpose: the shared dialog. Default size is md.
 * Used by: app pages through the package entry.
 */

import Dialog, { type DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { XIconClose } from "../XIcon";
import { dialogWidths, type DialogSize } from "./widths";

export type XDialogProps = Omit<DialogProps, "maxWidth" | "fullScreen"> & {
  size?: DialogSize;
  onClose: () => void;
};

export function XDialog({ size = "md", onClose, children, ...props }: XDialogProps) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullWidth
      fullScreen={compact}
      maxWidth={false}
      onClose={onClose}
      {...props}
      PaperProps={{ sx: { maxWidth: compact ? "100%" : dialogWidths[size], m: compact ? 0 : 2 } }}
    >
      <IconButton aria-label="Close" onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: "tertiary.main", minWidth: 44, minHeight: 44 }}>
        <XIconClose size="1em" />
      </IconButton>
      {children}
    </Dialog>
  );
}
