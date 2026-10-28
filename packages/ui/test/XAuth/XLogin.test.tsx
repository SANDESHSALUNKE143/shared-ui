import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "../render";
import { XLogin } from "../../src/XAuth";

function LoginForm({
  onSubmit,
  sso,
  error,
  submitting = false,
  footer,
  subtitle,
}: {
  onSubmit: (value: { email: string; password: string }) => void;
  sso?: { id: string; label: string; onClick: () => void }[];
  error?: string;
  submitting?: boolean;
  footer?: ReactNode;
  subtitle?: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <XLogin
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={onSubmit}
      sso={sso}
      error={error}
      submitting={submitting}
      footer={footer}
      subtitle={subtitle}
    />
  );
}

describe("XLogin", () => {
  it("submits the email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithTheme(<LoginForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("autocomplete", "username");
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "current-password");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByTestId("sign-in"));
    expect(onSubmit).toHaveBeenCalledWith({ email: "ada@example.com", password: "secret" });
  });

  it("shows an error and optional SSO actions", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onSso = vi.fn();
    const { rerender } = renderWithTheme(<LoginForm onSubmit={onSubmit} error="The email or password is incorrect." />);
    expect(screen.getByRole("alert")).toHaveTextContent("The email or password is incorrect.");
    expect(screen.queryByRole("button", { name: "Continue with SSO" })).not.toBeInTheDocument();
    rerender(
      <LoginForm
        onSubmit={onSubmit}
        sso={[{ id: "sso", label: "Continue with SSO", onClick: onSso }]}
        footer={<a href="/forgot">Forgot Password</a>}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Continue with SSO" }));
    expect(onSso).toHaveBeenCalledOnce();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Forgot Password" })).toHaveAttribute("href", "/forgot");
  });

  it("disables the form while submitting", () => {
    const onSubmit = vi.fn();
    renderWithTheme(<LoginForm onSubmit={onSubmit} submitting subtitle="Use your work email." />);
    expect(screen.getByTestId("sign-in")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Password")).toBeDisabled();
    expect(screen.getByText("Use your work email.")).toBeInTheDocument();
    fireEvent.submit(screen.getByTestId("sign-in").closest("form") as HTMLFormElement);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
