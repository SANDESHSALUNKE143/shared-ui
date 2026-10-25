/**
 * Kind: external
 * Purpose: a link that underlines on hover and inherits color.
 * Used by: body copy and back actions.
 */

import Link, { type LinkProps } from "@mui/material/Link";

export type XLinkProps = LinkProps;

export function XLink({ children, ...props }: XLinkProps) {
  return (
    <Link color="inherit" underline="hover" {...props}>
      {children}
    </Link>
  );
}
