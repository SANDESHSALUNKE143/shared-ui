/**
 * Kind: external
 * Purpose: a section title inside a form. It is not the page title.
 * Used by: forms and review flows.
 */

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { XIconError, XIconSuccess } from "../XIcon";

export type XSectionHeaderProps = {
  title: string;
  caption?: string;
  status?: "success" | "error";
};

export function XSectionHeader({ title, caption, status }: XSectionHeaderProps) {
  const StatusIcon = status === "success" ? XIconSuccess : status === "error" ? XIconError : null;
  return (
    <Stack spacing={0.5} sx={{ width: "100%" }}>
      <Divider textAlign="left" sx={{ "&::before": { width: 0 } }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" color="primary.main">
            {title}
          </Typography>
          {StatusIcon ? <StatusIcon size="1em" aria-label={status} /> : null}
        </Stack>
      </Divider>
      {caption ? (
        <Typography variant="caption" color="text.secondary">
          {caption}
        </Typography>
      ) : null}
    </Stack>
  );
}
