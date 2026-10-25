/**
 * Kind: external
 * Purpose: the empty state. One sentence, centered, with the primary action when the user can fix it.
 * Used by: lists and dashboards.
 */

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type XEmptyProps = {
  message: string;
  action?: ReactNode;
};

export function XEmpty({ message, action }: XEmptyProps) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 4, px: 2, textAlign: "center" }}>
      <Typography color="text.secondary">{message}</Typography>
      {action}
    </Stack>
  );
}
