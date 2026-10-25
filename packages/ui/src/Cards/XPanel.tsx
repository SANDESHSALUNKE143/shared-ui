/**
 * Kind: external
 * Purpose: the outlined dashboard panel. Empty charts use a centered sentence.
 * Used by: dashboards.
 */

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { XEmpty } from "../Feedback/XEmpty";

export type XPanelProps = {
  title: string;
  subtitle?: string;
  empty?: string;
  children?: ReactNode;
};

export function XPanel({ title, subtitle, empty, children }: XPanelProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, minHeight: { xs: 280, sm: 320 } }}>
      <Typography variant="subtitle2">{title}</Typography>
      {subtitle ? (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
      {empty ? <XEmpty message={empty} /> : children}
    </Paper>
  );
}
