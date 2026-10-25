/**
 * Kind: external
 * Purpose: the shared tab bar. Tabs scroll on a narrow screen and keep the route title case.
 * Used by: feature screens.
 */

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export type XTabItem = { id: string; label: string };

export type XTabsProps = {
  value: string;
  tabs: XTabItem[];
  onChange: (id: string) => void;
};

export function XTabs({ value, tabs, onChange }: XTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={(_event, next: string) => onChange(next)}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} value={tab.id} label={tab.label} />
      ))}
    </Tabs>
  );
}
