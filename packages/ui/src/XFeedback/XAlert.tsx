/**
 * Kind: external
 * Purpose: an inline message. Severity is error, warning, success, or info.
 * Used by: forms.
 */

import Alert, { type AlertProps } from "@mui/material/Alert";

export type XAlertProps = AlertProps;

export function XAlert({ children, severity = "info", ...props }: XAlertProps) {
  return (
    <Alert severity={severity} {...props}>
      {children}
    </Alert>
  );
}
