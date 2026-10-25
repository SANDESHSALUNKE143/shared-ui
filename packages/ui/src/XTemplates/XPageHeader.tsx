/**
 * Kind: external
 * Purpose: the page header. Title comes from the route. One primary action sits on the right.
 * Used by: feature screens.
 */

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type XPageHeaderProps = {
  title: string;
  subtitle?: string;
  loading?: boolean;
  actions?: ReactNode;
  nested?: boolean;
};

export function XPageHeader({ title, subtitle, loading = false, actions, nested = false }: XPageHeaderProps) {
  if (loading) {
    return <Skeleton variant="rounded" height={nested ? 32 : 40} />;
  }
  return (
    <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} spacing={1}>
      <Box sx={{ flex: 1 }}>
        <Typography variant={nested ? "h6" : "h5"} sx={{ letterSpacing: nested ? 2 : 3 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="subtitle2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {actions}
    </Stack>
  );
}
