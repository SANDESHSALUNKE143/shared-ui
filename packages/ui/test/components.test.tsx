import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { XBackButton, XButton, XIconButton, XToggleButtonGroup } from "../src/XButtons";
import { XCard, XPanel } from "../src/XCards";
import { useXNotify, XAlert, XEmpty, XErrorBoundary, XLoader, XNotifyProvider, XSectionHeader, XSkeleton, XStatusChip, XTooltip } from "../src/XFeedback";
import { XCheckbox, XMultiSelect, XRadioGroup, XSelect, XTextField } from "../src/XInput";
import { XLink, XTabs } from "../src/XNavigation";
import { XPageHeader } from "../src/XTemplates";
import { XDataGrid } from "../src/XDataGrid";
import { XConfirm, XDialog, XDialogHeader } from "../src/XDialog";
import { XDrawer } from "../src/XDrawer";
import { XIconAdd, XIconBold, XIconDashboard, XIconDelete, XIconSearch, XIconSettings } from "../src/XIcon";
import { renderWithTheme } from "./render";

function SecretField() {
  const [value, setValue] = useState("secret");
  return <XTextField label="Token" secret value={value} onChange={setValue} />;
}

function PhoneField() {
  const [value, setValue] = useState("");
  return <XTextField label="Phone" mask="phone" value={value} onChange={setValue} />;
}

function StatusSelect() {
  const [value, setValue] = useState("submitted");
  return (
    <XSelect
      label="Status"
      value={value}
      onChange={setValue}
      options={[
        { value: "submitted", label: "Submitted" },
        { value: "failed", label: "Failed" },
      ]}
    />
  );
}

function Tags() {
  const [value, setValue] = useState<string[]>(["a"]);
  return (
    <XMultiSelect
      label="Tags"
      value={value}
      onChange={setValue}
      options={[
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
      ]}
    />
  );
}

function Agree() {
  const [checked, setChecked] = useState(false);
  return <XCheckbox label="Agree" checked={checked} onChange={setChecked} />;
}

function TabsProbe() {
  const [value, setValue] = useState("one");
  return <XTabs value={value} onChange={setValue} tabs={[{ id: "one", label: "My Documents" }, { id: "two", label: "History" }]} />;
}

function NoticeButton() {
  const notify = useXNotify();
  return (
    <XButton
      onClick={() => {
        notify("The file was saved.", "success", "Saved");
      }}
    >
      Save
    </XButton>
  );
}

describe("controls", () => {
  it("renders a loading button and an icon button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <>
        <XButton loading>Create Item</XButton>
        <XIconButton label="Add" onClick={onClick}>
          <XIconAdd size="1em" />
        </XIconButton>
      </>,
    );
    expect(screen.getByRole("button", { name: "Create Item" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("stacks a page header and shows a skeleton while loading", () => {
    const { rerender } = renderWithTheme(<XPageHeader title="Documents" subtitle="Upload a file to get started." />);
    expect(screen.getByRole("heading", { name: "Documents" }).tagName).toBe("H5");
    expect(screen.getByText("Upload a file to get started.")).toBeInTheDocument();
    rerender(<XPageHeader title="Details" nested />);
    expect(screen.getByRole("heading", { name: "Details" }).tagName).toBe("H6");
    rerender(<XPageHeader title="Documents" loading />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders a card, a panel, an empty state, and a section", () => {
    renderWithTheme(
      <>
        <XCard>Body</XCard>
        <XPanel title="Volume" subtitle="Last 7 days" empty="No chart data." />
        <XPanel title="Filled">
          <span>Chart</span>
        </XPanel>
        <XEmpty message="Upload a file to get started." action={<XButton>Create Item</XButton>} />
        <XSectionHeader title="Identity" caption="Legal name." />
      </>,
    );
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByText("No chart data.")).toBeInTheDocument();
    expect(screen.getByText("Upload a file to get started.")).toBeInTheDocument();
    expect(screen.getByText("Identity")).toBeInTheDocument();
  });

  it("shows a status label and an alert", () => {
    renderWithTheme(
      <>
        <XStatusChip value="SUBMITTED" />
        <XAlert severity="error">The file is missing.</XAlert>
      </>,
    );
    expect(screen.getByText("Submitted")).toBeInTheDocument();
    expect(screen.queryByText("SUBMITTED")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("The file is missing.");
  });

  it("masks a phone and reveals a secret", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <PhoneField />
        <SecretField />
      </>,
    );
    await user.type(screen.getByLabelText("Phone"), "4155551212");
    expect(screen.getByLabelText("Phone")).toHaveValue("(415) 555-1212");
    expect(screen.getByLabelText("Token")).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show value" }));
    expect(screen.getByLabelText("Token")).toHaveAttribute("type", "text");
  });

  it("changes a select, a checkbox, and a tab", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <StatusSelect />
        <Tags />
        <Agree />
        <TabsProbe />
        <XLink href="/docs">All items</XLink>
      </>,
    );
    await user.click(screen.getByRole("combobox", { name: "Status" }));
    await user.click(screen.getByRole("option", { name: "Failed" }));
    expect(screen.getByRole("combobox", { name: "Status" })).toHaveTextContent("Failed");
    await user.click(screen.getByRole("combobox", { name: "Tags" }));
    await user.click(screen.getByRole("option", { name: "Beta" }));
    expect(screen.getByText("Alpha, Beta")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("checkbox", { name: "Agree" }));
    expect(screen.getByRole("checkbox", { name: "Agree" })).toBeChecked();
    await user.click(screen.getByRole("tab", { name: "History" }));
    expect(screen.getByRole("tab", { name: "History" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: "All items" })).toHaveAttribute("href", "/docs");
  });

  it("closes a dialog and confirms a destructive action", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderWithTheme(
      <>
        <XDialog open onClose={onClose} size="lg">
          <XDialogHeader>Delete item</XDialogHeader>
        </XDialog>
        <XConfirm open title="Delete item" message="This cannot be undone." onClose={onClose} onConfirm={onConfirm} />
      </>,
    );
    const closeButtons = screen.getAllByRole("button", { name: "Close" });
    await user.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("opens a drawer and lists rows as cards on a phone", () => {
    renderWithTheme(
      <>
        <XDrawer open title="Details" onClose={() => undefined}>
          Detail
        </XDrawer>
        <XDataGrid compact rows={[{ id: 1, name: "Ada" }]} columns={[{ field: "name", headerName: "Name" }]} />
        <XDataGrid compact rows={[]} columns={[{ field: "name", headerName: "Name" }]} />
      </>,
    );
    expect(screen.getByText("Detail")).toBeInTheDocument();
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders the grid on a wide screen", () => {
    renderWithTheme(<XDataGrid compact={false} rows={[{ id: 1, name: "Ada" }]} columns={[{ field: "name", headerName: "Name", flex: 1 }]} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { name: "Ada" })).toBeInTheDocument();
  });

  it("toasts through the notify helper and refuses to notify outside it", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <XNotifyProvider>
        <NoticeButton />
      </XNotifyProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saved. The file was saved.")).toBeInTheDocument();
    expect(() => renderWithTheme(<NoticeButton />)).toThrow("useXNotify must be used inside XNotifyProvider");
  });

  it("covers the remaining shared controls", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onPick = vi.fn();
    function Boom(): null {
      throw new Error("section failed");
    }
    renderWithTheme(
      <>
        <XBackButton onClick={onBack}>All items</XBackButton>
        <XCard title="Record" subtitle="Open" label="New" actions={<XButton>Edit</XButton>}>
          Body
        </XCard>
        <XSectionHeader title="Review" status="success" />
        <XSectionHeader title="Problems" status="error" />
        <XRadioGroup
          label="Kind"
          value="b"
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
          ]}
          onChange={onPick}
        />
        <XTooltip title="More">
          <span>Hint</span>
        </XTooltip>
        <XSkeleton />
        <XLoader />
        <XIconBold icon={XIconDashboard} />
        <XIconDelete size="1em" />
        <XIconSearch size="1em" />
        <XIconSettings size="1em" />
        <XErrorBoundary>
          <Boom />
        </XErrorBoundary>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "All items" }));
    expect(onBack).toHaveBeenCalledOnce();
    expect(screen.getByText("Record")).toBeInTheDocument();
    expect(screen.getByText("This section could not be shown.")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: "Alpha" }));
    expect(onPick).toHaveBeenCalledWith("a");
  });

  it("switches one toggle and collects several", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    const onTags = vi.fn();
    renderWithTheme(
      <>
        <XToggleButtonGroup
          label="View"
          value="list"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
          onChange={onView}
        />
        <XToggleButtonGroup
          exclusive={false}
          label="Tags"
          value={["alpha"]}
          options={[
            { value: "alpha", label: "Alpha tag" },
            { value: "beta", label: "Beta tag" },
          ]}
          onChange={onTags}
        />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "List" }));
    expect(onView).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Grid" }));
    expect(onView).toHaveBeenCalledWith("grid");
    await user.click(screen.getByRole("button", { name: "Beta tag" }));
    expect(onTags).toHaveBeenCalledWith(["alpha", "beta"]);
  });
});
