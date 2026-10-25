/**
 * Kind: external
 * Purpose: a labeled checkbox with a 44px target.
 * Used by: forms.
 */

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export type XCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function XCheckbox({ label, checked, onChange }: XCheckboxProps) {
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} sx={{ minWidth: 44, minHeight: 44 }} />}
    />
  );
}
