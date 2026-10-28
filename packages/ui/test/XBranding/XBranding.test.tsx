import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "../render";
import { XBranding, XDefaultBrand, type XBrand } from "../../src/XBranding";

function Editor({
  onChange,
  onMediaPick,
}: {
  onChange: (value: XBrand) => void;
  onMediaPick: (slot: "logoLight" | "logoDark" | "icon", file: File) => void;
}) {
  const [value, setValue] = useState(XDefaultBrand);
  return (
    <XBranding
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
      onMediaPick={onMediaPick}
    />
  );
}

describe("XBranding", () => {
  it("updates a color, the default mode, and the contrast hint", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Editor onChange={onChange} onMediaPick={vi.fn()} />);
    expect(screen.getByTestId("branding")).toBeInTheDocument();
    expect(within(screen.getByTestId("theme-preview-light")).getByText("Default")).toBeInTheDocument();
    expect(within(screen.getByTestId("theme-preview-dark")).queryByText("Default")).not.toBeInTheDocument();
    expect(screen.queryByText("White text on this color is hard to read.")).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Primary Color swatch"), { target: { value: "#ffffff" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ primary: "#ffffff" }));
    expect(screen.getByText("White text on this color is hard to read.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Secondary Color"), { target: { value: "#111111" } });
    fireEvent.change(screen.getByLabelText("Tertiary Color"), { target: { value: "#222222" } });
    fireEvent.change(screen.getByLabelText("Success Color"), { target: { value: "#333333" } });
    fireEvent.change(screen.getByLabelText("Info Color"), { target: { value: "#444444" } });
    fireEvent.change(screen.getByLabelText("Warning Color"), { target: { value: "#555555" } });
    fireEvent.change(screen.getByLabelText("Error Color"), { target: { value: "#666666" } });
    fireEvent.change(screen.getByLabelText("Background Light"), { target: { value: "#fafafa" } });
    fireEvent.change(screen.getByLabelText("Background Dark"), { target: { value: "#010101" } });
    fireEvent.change(screen.getByLabelText("Divider Color"), { target: { value: "rgba(0, 0, 0, 0.2)" } });
    fireEvent.change(screen.getByLabelText("Border Radius"), { target: { value: "8" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ radius: 8, divider: "rgba(0, 0, 0, 0.2)" }));
    await user.click(screen.getByRole("combobox", { name: "Font Family" }));
    await user.click(screen.getByRole("option", { name: "Inter" }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ font: "Inter" }));
    await user.click(screen.getByRole("combobox", { name: "Default Mode" }));
    await user.click(screen.getByRole("option", { name: "Dark" }));
    expect(within(screen.getByTestId("theme-preview-dark")).getByText("Default")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ mode: "dark" }));
    await user.click(screen.getByRole("combobox", { name: "Default Mode" }));
    await user.click(screen.getByRole("option", { name: "Light" }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ mode: "light" }));
  });

  it("reports a logo file from the media tab", async () => {
    const user = userEvent.setup();
    const onMediaPick = vi.fn();
    renderWithTheme(<Editor onChange={vi.fn()} onMediaPick={onMediaPick} />);
    await user.click(screen.getByRole("tab", { name: "Media" }));
    const image = new File(["logo"], "logo.png", { type: "image/png" });
    await user.upload(screen.getByLabelText("Logo Light", { selector: "input" }), image);
    await user.upload(screen.getByLabelText("Logo Dark", { selector: "input" }), image);
    await user.upload(screen.getByLabelText("Icon", { selector: "input" }), image);
    expect(onMediaPick).toHaveBeenCalledWith("logoLight", image);
    expect(onMediaPick).toHaveBeenCalledWith("logoDark", image);
    expect(onMediaPick).toHaveBeenCalledWith("icon", image);
  });
});
