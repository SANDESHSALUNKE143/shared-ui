import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "../tests/render";
import { XFileDropzone } from "./XFileDropzone";

describe("XFileDropzone", () => {
  it("accepts an image and rejects another type", async () => {
    const user = userEvent.setup({ applyAccept: false });
    const onPick = vi.fn();
    renderWithTheme(<XFileDropzone label="Logo Light" value={null} onPick={onPick} />);
    const input = screen.getByLabelText("Logo Light", { selector: "input" });
    const image = new File(["logo"], "logo.png", { type: "image/png" });
    await user.upload(input, image);
    expect(onPick).toHaveBeenCalledWith(image);
    const notes = new File(["notes"], "notes.txt", { type: "text/plain" });
    await user.upload(input, notes);
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a PNG, JPEG, WebP, or SVG image.");
    fireEvent.change(input, { target: { files: [] } });
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it("shows the current image", () => {
    renderWithTheme(<XFileDropzone label="Icon" value="https://example.com/icon.png" onPick={vi.fn()} />);
    expect(screen.getByRole("img", { name: "Icon" })).toHaveAttribute("src", "https://example.com/icon.png");
  });
});
