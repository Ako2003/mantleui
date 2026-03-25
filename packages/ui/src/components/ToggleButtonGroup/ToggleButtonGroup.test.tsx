import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToggleButtonGroup } from "./ToggleButtonGroup";

describe("ToggleButtonGroup", () => {
  it("renders a group with items", () => {
    render(
      <ToggleButtonGroup aria-label="Options">
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
        <ToggleButtonGroup.Item value="b">B</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("selects an item on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ToggleButtonGroup onValueChange={onValueChange} aria-label="Options">
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
        <ToggleButtonGroup.Item value="b">B</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    await user.click(screen.getByText("A"));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("supports multiple selection mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ToggleButtonGroup
        multiple
        defaultValue={["a"]}
        onValueChange={onValueChange}
        aria-label="Options"
      >
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
        <ToggleButtonGroup.Item value="b">B</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    await user.click(screen.getByText("B"));
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("applies vertical orientation class", () => {
    render(
      <ToggleButtonGroup orientation="vertical" aria-label="Options">
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "mantle-togglebuttongroup",
      "mantle-togglebuttongroupVertical",
    );
  });

  it("applies horizontal orientation class by default", () => {
    render(
      <ToggleButtonGroup aria-label="Options">
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "mantle-togglebuttongroup",
      "mantle-togglebuttongroupHorizontal",
    );
  });

  it("sets aria-pressed on selected items", () => {
    render(
      <ToggleButtonGroup value="a" aria-label="Options">
        <ToggleButtonGroup.Item value="a">A</ToggleButtonGroup.Item>
        <ToggleButtonGroup.Item value="b">B</ToggleButtonGroup.Item>
      </ToggleButtonGroup>,
    );

    expect(screen.getByText("A")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("B")).toHaveAttribute("aria-pressed", "false");
  });
});
