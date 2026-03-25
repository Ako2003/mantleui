import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders with default props", () => {
    render(<Chip>Tag</Chip>);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Chip>Tag</Chip>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("applies variant class", () => {
    render(<Chip variant="outline">Outline</Chip>);
    expect(screen.getByText("Outline")).toHaveClass("mantle-chip-outline");
  });

  it("applies size class", () => {
    render(<Chip size="sm">Small</Chip>);
    expect(screen.getByText("Small")).toHaveClass("mantle-chip-sm");
  });

  it("shows dismiss button when onDismiss is provided", () => {
    render(<Chip onDismiss={() => {}}>Dismiss</Chip>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not show dismiss button by default", () => {
    render(<Chip>No dismiss</Chip>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(<Chip onDismiss={onDismiss}>Tag</Chip>);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("applies selected class when selected", () => {
    render(<Chip selected>Sel</Chip>);
    expect(screen.getByText("Sel")).toHaveClass("mantle-chip-selected");
  });

  it("does not apply selected class by default", () => {
    render(<Chip>Not</Chip>);
    expect(screen.getByText("Not")).not.toHaveClass("mantle-chip-selected");
  });

  it("applies disabled class when disabled", () => {
    render(<Chip disabled>Dis</Chip>);
    expect(screen.getByText("Dis")).toHaveClass("mantle-chip-disabled");
  });

  it("sets data-color attribute", () => {
    render(<Chip color="red">Red</Chip>);
    expect(screen.getByText("Red")).toHaveAttribute("data-color", "red");
  });

  it("calls onSelectedChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Chip onSelectedChange={onChange}>Toggle</Chip>);
    await user.click(screen.getByText("Toggle"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
