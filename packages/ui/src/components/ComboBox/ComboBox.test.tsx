import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ComboBox } from "./ComboBox";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("ComboBox", () => {
  it("renders a combobox input", () => {
    render(<ComboBox options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens a listbox on focus with options", async () => {
    const user = userEvent.setup();
    render(<ComboBox options={options} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("selects an option and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ComboBox options={options} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Banana"));

    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("has displayName ComboBox", () => {
    expect(ComboBox.displayName).toBe("ComboBox");
  });
});
