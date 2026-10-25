/**
 * Kind: external
 * Purpose: one choice from a short list. Labels are shown, not raw values.
 * Used by: forms.
 */

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import type { XOption } from "./XSelect";

export type XRadioGroupProps = {
  label: string;
  value: string;
  options: XOption[];
  onChange: (value: string) => void;
};

export function XRadioGroup({ label, value, options, onChange }: XRadioGroupProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} label={option.label} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
