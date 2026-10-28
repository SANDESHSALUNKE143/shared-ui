/**
 * Kind: internal
 * Purpose: example sign-in screen wired to the shared login component.
 * Used by: packages/ui/example/App.tsx
 */

import { useState } from "react";
import { XCssBaseline, XLightTheme, XLink, XLogin, XThemeProvider } from "@shared-ui/react";

export type SignInPageProps = {
  onSignedIn: () => void;
};

export function SignInPage({ onSignedIn }: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function signIn(value: { email: string; password: string }) {
    setError("");
    if (!value.email || !value.password) {
      setError("Enter an email and a password.");
      return;
    }
    setSubmitting(true);
    // Replace this with the app auth request. This example only continues after the form is filled.
    setSubmitting(false);
    onSignedIn();
  }

  return (
    <XThemeProvider theme={XLightTheme}>
      <XCssBaseline />
      <XLogin
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={signIn}
        submitting={submitting}
        error={error}
        sso={[{ id: "sso", label: "Continue with SSO", onClick: onSignedIn }]}
        footer={<XLink href="/forgot">Forgot Password</XLink>}
      />
    </XThemeProvider>
  );
}
