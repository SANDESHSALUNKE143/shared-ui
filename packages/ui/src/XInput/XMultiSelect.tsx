/**
 * Kind: external
 * Purpose: a multi-value select. Selected labels are shown, not raw enums.
 * Used by: forms.
 */

import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import type { XOption } from "./XSelect";

export type XMultiSelectProps = {
  label: string;
  value: string[];
  options: XOption[];
  onChange: (value: string[]) => void;
};

export function XMultiSelect({ label, value, options, onChange }: XMultiSelectProps) {
  const labels = options.filter((option) => value.includes(option.value)).map((option) => option.label);
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      SelectProps={{
        multiple: true,
        renderValue: () => labels.join(", "),
      }}
      onChange={(event) => {
        const next = event.target.value;
        onChange(typeof next === "string" ? next.split(",") : next);
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={value.includes(option.value)} />
          <ListItemText primary={option.label} />
        </MenuItem>
      ))}
    </TextField>
  );
}
