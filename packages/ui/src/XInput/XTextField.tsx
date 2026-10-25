/**
 * Kind: external
 * Purpose: the text field. Masks and hidden secrets stay in this control.
 * Used by: forms.
 */

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

import { XIconHide, XIconShow } from "../XIcon";
import { applyMask, type Mask } from "./masks";

export type XTextFieldProps = Omit<TextFieldProps, "onChange" | "type"> & {
  value: string;
  onChange: (value: string) => void;
  mask?: Mask;
  secret?: boolean;
};

export function XTextField({ value, onChange, mask, secret = false, label, ...props }: XTextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const shown = mask ? applyMask(mask, value) : value;
  return (
    <TextField
      fullWidth
      label={label}
      value={shown}
      type={secret && !revealed ? "password" : "text"}
      onChange={(event) => onChange(mask ? applyMask(mask, event.target.value) : event.target.value)}
      InputProps={
        secret
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label={revealed ? "Hide value" : "Show value"} onClick={() => setRevealed((open) => !open)}>
                    {revealed ? <XIconHide size="1em" /> : <XIconShow size="1em" />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      {...props}
    />
  );
}
