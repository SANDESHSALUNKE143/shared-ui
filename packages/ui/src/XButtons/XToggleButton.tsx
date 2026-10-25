/**
 * Kind: external
 * Purpose: a button that stays pressed to show the current choice.
 * Used by: view switches and filter rows.
 */

import ToggleButton, { type ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export type XToggleButtonProps = ToggleButtonProps;

export function XToggleButton({ children, ...props }: XToggleButtonProps) {
  return (
    <ToggleButton {...props} sx={{ textTransform: "none", minHeight: 44, px: 2, ...props.sx }}>
      {children}
    </ToggleButton>
  );
}

export type XToggleOption = {
  value: string;
  label: string;
};

type XToggleSharedProps = {
  label: string;
  options: XToggleOption[];
};

type XToggleExclusiveProps = XToggleSharedProps & {
  exclusive?: true;
  value: string;
  onChange: (value: string) => void;
};

type XToggleMultipleProps = XToggleSharedProps & {
  exclusive: false;
  value: string[];
  onChange: (value: string[]) => void;
};

export type XToggleButtonGroupProps = XToggleExclusiveProps | XToggleMultipleProps;

export function XToggleButtonGroup(props: XToggleButtonGroupProps) {
  const { label, options } = props;
  const theme = useTheme();
  const stacked = useMediaQuery(theme.breakpoints.down("sm"));
  const exclusive = props.exclusive !== false;

  return (
    <ToggleButtonGroup
      exclusive={exclusive}
      value={props.value}
      aria-label={label}
      orientation={stacked ? "vertical" : "horizontal"}
      fullWidth={stacked}
      onChange={(_event, next: string | string[] | null) => {
        if (props.exclusive === false) {
          props.onChange(Array.isArray(next) ? next : []);
          return;
        }
        if (typeof next === "string") props.onChange(next);
      }}
    >
      {options.map((option) => (
        <XToggleButton key={option.value} value={option.value}>
          {option.label}
        </XToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
