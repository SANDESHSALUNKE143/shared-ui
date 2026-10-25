/**
 * Kind: external
 * Purpose: the outlined card. Radius comes from the theme.
 * Used by: app pages through the package entry.
 */

import Card, { type CardProps } from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type XCardProps = CardProps & {
  label?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  dim?: boolean;
};

export function XCard({ label, title, subtitle, actions, dim = false, children, ...props }: XCardProps) {
  return (
    <Card variant="outlined" {...props} sx={{ position: "relative", borderRadius: 2, backdropFilter: "blur(20px)", opacity: dim ? 0.6 : 1, ...props.sx }}>
      {label ? <Chip label={label} size="small" sx={{ position: "absolute", top: 8, left: 12 }} /> : null}
      {title ? (
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} spacing={1} sx={{ px: 2, pt: label ? 5 : 2 }}>
          <Stack sx={{ flex: 1 }}>
            <Typography variant="h6">{title}</Typography>
            {subtitle ? (
              <Typography variant="subtitle2" color="tertiary.dark" sx={{ fontWeight: 700 }}>
                {subtitle}
              </Typography>
            ) : null}
          </Stack>
          {actions}
        </Stack>
      ) : null}
      {children}
    </Card>
  );
}
