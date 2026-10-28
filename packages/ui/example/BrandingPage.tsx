/**
 * Kind: internal
 * Purpose: example branding screen. Color edits update the theme, and a chosen image is shown from a local URL.
 * Used by: packages/ui/example/App.tsx
 */

import { useState } from "react";
import { createXTheme, XBackButton, XBranding, XCssBaseline, XDefaultBrand, XPageHeader, XThemeProvider, type XBrand, type XBrandMediaSlot } from "@shared-ui/react";

export type BrandingPageProps = {
  onBack: () => void;
};

export function BrandingPage({ onBack }: BrandingPageProps) {
  const [brand, setBrand] = useState<XBrand>(XDefaultBrand);
  const theme = createXTheme(brand.mode, brand);

  function upload(slot: XBrandMediaSlot, file: File) {
    const url = URL.createObjectURL(file);
    setBrand((current) => ({ ...current, media: { ...current.media, [slot]: url } }));
  }

  return (
    <XThemeProvider theme={theme}>
      <XCssBaseline />
      <XPageHeader title="Branding" subtitle="Manage how the product looks." actions={<XBackButton onClick={onBack}>Sign In</XBackButton>} />
      <XBranding value={brand} onChange={setBrand} onMediaPick={upload} />
    </XThemeProvider>
  );
}
