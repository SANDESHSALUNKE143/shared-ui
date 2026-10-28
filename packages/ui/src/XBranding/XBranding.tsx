/**
 * Kind: external
 * Purpose: branding settings. Theme, colors, and media stay in one component.
 * Used by: app settings routes through the package entry.
 */

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { XColorField, XFileDropzone, XSelect, XTextField } from "../XInput";
import { XTabs } from "../XNavigation";
import type { XBrand, XBrandMediaSlot } from "./brand";
import { xBrandFonts } from "./brand";
import { needsContrastHint } from "./contrast";
import { XThemePreview } from "./XThemePreview";

export type XBrandingProps = {
  value: XBrand;
  onChange: (value: XBrand) => void;
  onMediaPick: (slot: XBrandMediaSlot, file: File) => void;
};

const mainColors = [
  ["primary", "Primary Color"],
  ["secondary", "Secondary Color"],
  ["tertiary", "Tertiary Color"],
] as const;

const alertColors = [
  ["success", "Success Color"],
  ["info", "Info Color"],
  ["warning", "Warning Color"],
  ["error", "Error Color"],
] as const;

const mediaSlots = [
  ["logoLight", "Logo Light"],
  ["logoDark", "Logo Dark"],
  ["icon", "Icon"],
] as const;

export function XBranding({ value, onChange, onMediaPick }: XBrandingProps) {
  const [tab, setTab] = useState("theme");

  function update(patch: Partial<XBrand>) {
    onChange({ ...value, ...patch });
  }

  return (
    <Stack spacing={2} data-testid="branding">
      <XTabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: "theme", label: "Theme" },
          { id: "media", label: "Media" },
        ]}
      />
      {tab === "theme" ? (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Customize the platform colors, fonts, and borders.
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
            <Stack spacing={2} sx={{ width: { xs: "100%", md: 360 } }}>
              <Typography variant="subtitle1">Default Theme Mode</Typography>
              <XSelect
                label="Default Mode"
                value={value.mode}
                onChange={(mode) => update({ mode: mode === "dark" ? "dark" : "light" })}
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                ]}
              />
              <Typography variant="subtitle1">Font Type</Typography>
              <XSelect
                label="Font Family"
                value={value.font}
                onChange={(font) => update({ font: font as XBrand["font"] })}
                options={xBrandFonts.map((font) => ({ value: font, label: font }))}
              />
              <Typography variant="subtitle1">Main Colors</Typography>
              {mainColors.map(([key, label]) => (
                <Stack key={key} spacing={0.5}>
                  <XColorField label={label} value={value[key]} onChange={(next) => update({ [key]: next })} />
                  {key === "primary" && needsContrastHint(value.primary) ? (
                    <Typography variant="body2" color="text.secondary">
                      White text on this color is hard to read.
                    </Typography>
                  ) : null}
                </Stack>
              ))}
              <Typography variant="subtitle1">Alerts</Typography>
              {alertColors.map(([key, label]) => (
                <XColorField key={key} label={label} value={value[key]} onChange={(next) => update({ [key]: next })} />
              ))}
              <Typography variant="subtitle1">Backgrounds and Borders</Typography>
              <XColorField label="Background Light" value={value.backgroundLight} onChange={(backgroundLight) => update({ backgroundLight })} />
              <XColorField label="Background Dark" value={value.backgroundDark} onChange={(backgroundDark) => update({ backgroundDark })} />
              <XTextField label="Divider Color" value={value.divider} onChange={(divider) => update({ divider })} />
              <XTextField label="Border Radius" value={String(value.radius)} onChange={(next) => update({ radius: Number(next) || 0 })} />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ flex: 1, width: "100%" }}>
              <XThemePreview mode="dark" brand={value} isDefault={value.mode === "dark"} />
              <XThemePreview mode="light" brand={value} isDefault={value.mode === "light"} />
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Customize the images that are displayed in the product.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {mediaSlots.slice(0, 2).map(([slot, label]) => (
              <Stack key={slot} sx={{ flex: 1 }}>
                <XFileDropzone label={label} value={value.media[slot]} onPick={(file) => onMediaPick(slot, file)} />
              </Stack>
            ))}
          </Stack>
          <XFileDropzone label={mediaSlots[2][1]} value={value.media.icon} onPick={(file) => onMediaPick("icon", file)} />
        </Stack>
      )}
    </Stack>
  );
}
