/**
 * Kind: external
 * Purpose: an enum select. The option label is shown, not the raw value, when a label is provided.
 * Used by: forms.
 */

import MenuItem from "@mui/material/MenuItem";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type XOption = { value: string; label: string };

export type XSelectProps = Omit<TextFieldProps, "select" | "onChange"> & {
  value: string;
  options: XOption[];
  onChange: (value: string) => void;
};

export function XSelect({ value, options, onChange, label, ...props }: XSelectProps) {
  return (
    <TextField select fullWidth label={label} value={value} onChange={(event) => onChange(event.target.value)} {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
