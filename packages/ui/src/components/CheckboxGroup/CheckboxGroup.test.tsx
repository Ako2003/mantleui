import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "./CheckboxGroup";
import { CheckboxGroupContext } from "./CheckboxGroup";

/** Helper consumer that renders checkboxes wired to the group context. */
function TestCheckbox({ value, label }: { value: string; label: string }) {
  const ctx = useContext(CheckboxGroupContext);
  if (!ctx) return null;
  return (
    <label>
      <input
        type="checkbox"
        checked={ctx.value.includes(value)}
        onChange={() => ctx.toggle(value)}
      />
      {label}
    </label>
  );
}

describe("CheckboxGroup", () => {
  it("renders a fieldset with a legend", () => {
    render(<CheckboxGroup label="Colors" />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("Colors")).toBeInTheDocument();
  });

  it("manages checked values in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup label="Pick" defaultValue={["a"]}>
        <TestCheckbox value="a" label="A" />
        <TestCheckbox value="b" label="B" />
      </CheckboxGroup>,
    );

    const checkboxA = screen.getByRole("checkbox", { name: "A" });
    const checkboxB = screen.getByRole("checkbox", { name: "B" });

    expect(checkboxA).toBeChecked();
    expect(checkboxB).not.toBeChecked();

    await user.click(checkboxB);
    expect(checkboxB).toBeChecked();

    await user.click(checkboxA);
    expect(checkboxA).not.toBeChecked();
  });

  it("calls onValueChange when a value is toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CheckboxGroup label="Pick" defaultValue={[]} onValueChange={onChange}>
        <TestCheckbox value="x" label="X" />
      </CheckboxGroup>,
    );

    await user.click(screen.getByRole("checkbox", { name: "X" }));
    expect(onChange).toHaveBeenCalledWith(["x"]);
  });

  it("supports controlled mode", () => {
    const onChange = vi.fn();

    const { rerender } = render(
      <CheckboxGroup label="Ctrl" value={["a"]} onValueChange={onChange}>
        <TestCheckbox value="a" label="A" />
        <TestCheckbox value="b" label="B" />
      </CheckboxGroup>,
    );

    expect(screen.getByRole("checkbox", { name: "A" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "B" })).not.toBeChecked();

    rerender(
      <CheckboxGroup label="Ctrl" value={["a", "b"]} onValueChange={onChange}>
        <TestCheckbox value="a" label="A" />
        <TestCheckbox value="b" label="B" />
      </CheckboxGroup>,
    );

    expect(screen.getByRole("checkbox", { name: "B" })).toBeChecked();
  });

  it("applies orientation class", () => {
    render(<CheckboxGroup label="Horiz" orientation="horizontal" />);
    expect(screen.getByRole("group")).toHaveClass(
      "mantle-checkboxgroup-horizontal",
    );
  });

  it("applies vertical orientation by default", () => {
    render(<CheckboxGroup label="Vert" />);
    expect(screen.getByRole("group")).toHaveClass(
      "mantle-checkboxgroup-vertical",
    );
  });

  it("sets data-color attribute", () => {
    render(<CheckboxGroup label="Col" color="green" />);
    expect(screen.getByRole("group")).toHaveAttribute("data-color", "green");
  });

  it("forwards className", () => {
    render(<CheckboxGroup label="Cls" className="custom" />);
    expect(screen.getByRole("group")).toHaveClass(
      "mantle-checkboxgroup",
      "custom",
    );
  });
});
