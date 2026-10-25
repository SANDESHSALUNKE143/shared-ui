/**
 * Kind: external
 * Purpose: a rounded wave skeleton tinted with the primary color. It is not a page spinner.
 * Used by: headers and the full-screen loader.
 */

import Skeleton, { type SkeletonProps } from "@mui/material/Skeleton";

export type XSkeletonProps = SkeletonProps;

export function XSkeleton({ width = "100%", height = 40, sx, ...props }: XSkeletonProps) {
  return <Skeleton variant="rounded" animation="wave" width={width} height={height} sx={{ bgcolor: "primary.main", opacity: 0.12, ...sx }} {...props} />;
}
