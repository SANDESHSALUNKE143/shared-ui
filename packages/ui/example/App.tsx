/**
 * Kind: internal
 * Purpose: example app that shows the shared sign-in screen, then the branding screen.
 * Used by: an application entry that wants the reference integration.
 */

import { useState } from "react";

import { BrandingPage } from "./BrandingPage";
import { SignInPage } from "./SignInPage";

export function App() {
  const [screen, setScreen] = useState<"sign-in" | "branding">("sign-in");
  if (screen === "branding") {
    return <BrandingPage onBack={() => setScreen("sign-in")} />;
  }
  return <SignInPage onSignedIn={() => setScreen("branding")} />;
}
