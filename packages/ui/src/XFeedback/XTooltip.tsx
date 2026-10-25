/**
 * Kind: external
 * Purpose: a short hint on hover or focus.
 * Used by: icon buttons.
 */

import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";

export type XTooltipProps = TooltipProps;

export function XTooltip({ children, ...props }: XTooltipProps) {
  return <Tooltip {...props}>{children}</Tooltip>;
}
