import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "../tests/render";
import { XColorField } from "./XColorField";

describe("XColorField", () => {
  it("edits the hex value and the swatch", () => {
    const onChange = vi.fn();
    renderWithTheme(<XColorField label="Primary Color" value="#1A3A65" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Primary Color"), { target: { value: "#aabbcc" } });
    expect(onChange).toHaveBeenCalledWith("#aabbcc");
    fireEvent.change(screen.getByLabelText("Primary Color swatch"), { target: { value: "#112233" } });
    expect(onChange).toHaveBeenCalledWith("#112233");
  });
});
