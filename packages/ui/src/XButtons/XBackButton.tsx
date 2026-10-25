/**
 * Kind: external
 * Purpose: a short back label with the chevron. The label is not a sentence.
 * Used by: page headers.
 */

import { XIconChevronLeft } from "../XIcon";
import { XButton } from "./XButton";

export type XBackButtonProps = {
  children: string;
  onClick: () => void;
};

export function XBackButton({ children, onClick }: XBackButtonProps) {
  return (
    <XButton variant="text" color="inherit" startIcon={<XIconChevronLeft size="1em" />} onClick={onClick} sx={{ textTransform: "none", alignSelf: "flex-start" }}>
      {children}
    </XButton>
  );
}
