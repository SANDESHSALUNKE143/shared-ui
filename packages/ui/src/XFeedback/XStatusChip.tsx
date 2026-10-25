/**
 * Kind: external
 * Purpose: a status chip. The raw enum is formatted before it is shown.
 * Used by: lists and cards.
 */

import Chip from "@mui/material/Chip";

import { formatStatus } from "../XText/formatStatus";

export type XStatusChipProps = {
  value: string;
};

export function XStatusChip({ value }: XStatusChipProps) {
  return <Chip label={formatStatus(value)} size="small" />;
}
