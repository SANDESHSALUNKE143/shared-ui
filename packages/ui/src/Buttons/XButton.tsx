/**
 * Kind: external
 * Purpose: the one button. Pass loading while a submit is in flight.
 * Used by: app pages through the package entry.
 */

import LoadingButton, { type LoadingButtonProps } from "@mui/lab/LoadingButton";

export type XButtonProps = LoadingButtonProps;

export function XButton({ loading = false, variant = "contained", ...props }: XButtonProps) {
  return <LoadingButton variant={variant} {...props} loading={loading} />;
}
