import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorField } from "./ColorField";

describe("ColorField", () => {
  it("renders an input", () => {
    render(<ColorField value="#ff0000" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("#ff0000");
  });

  it("shows color preview swatch", () => {
    render(<ColorField value="#00ff00" />);
    const swatch = screen.getByTestId("color-field-swatch");
    expect(swatch).toBeInTheDocument();
    expect(swatch).toHaveStyle({ backgroundColor: "#00ff00" });
  });

  it("calls onValueChange when typing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ColorField defaultValue="#000000" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, "#aabbcc");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("renders label when provided", () => {
    render(<ColorField value="#ff0000" label="Pick a color" />);
    expect(screen.getByText("Pick a color")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    render(<ColorField value="#ff0000" error="Invalid color" />);
    expect(screen.getByText("Invalid color")).toBeInTheDocument();
  });

  it("disables the input when disabled", () => {
    render(<ColorField value="#ff0000" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ColorField value="#ff0000" className="custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom");
  });
});
