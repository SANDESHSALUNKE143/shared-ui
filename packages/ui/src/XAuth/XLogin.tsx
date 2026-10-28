/**
 * Kind: external
 * Purpose: the sign-in screen. Email, password, and optional SSO stay in one form.
 * Used by: app sign-in routes through the package entry.
 */

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FormEvent, ReactNode } from "react";

import { XButton } from "../XButtons";
import { XCard } from "../XCards";
import { XAlert } from "../XFeedback";
import { XTextField } from "../XInput";

export type XLoginSso = {
  id: string;
  label: string;
  onClick: () => void;
};

export type XLoginProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (value: { email: string; password: string }) => void;
  title?: string;
  subtitle?: string;
  error?: string;
  submitting?: boolean;
  sso?: XLoginSso[];
  footer?: ReactNode;
};

export function XLogin({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  title = "Sign In",
  subtitle,
  error,
  submitting = false,
  sso = [],
  footer,
}: XLoginProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    onSubmit({ email, password });
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", p: 2 }}>
      <XCard sx={{ width: "100%", maxWidth: 420 }}>
        <Box component="form" onSubmit={submit} sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5">{title}</Typography>
            {subtitle ? (
              <Typography variant="subtitle2" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
            {error ? <XAlert severity="error">{error}</XAlert> : null}
            <XTextField label="Email" autoComplete="username" value={email} onChange={onEmailChange} disabled={submitting} />
            <XTextField label="Password" secret autoComplete="current-password" value={password} onChange={onPasswordChange} disabled={submitting} />
            <XButton type="submit" loading={submitting} data-testid="sign-in" disabled={submitting}>
              Sign In
            </XButton>
            {sso.length > 0 ? (
              <>
                <Divider>Or</Divider>
                {sso.map((provider) => (
                  <XButton key={provider.id} type="button" variant="outlined" onClick={provider.onClick} disabled={submitting}>
                    {provider.label}
                  </XButton>
                ))}
              </>
            ) : null}
            {footer}
          </Stack>
        </Box>
      </XCard>
    </Box>
  );
}
