import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("renders all parts", () => {
    const { container } = render(<ColorPicker value="#ff0000" />);
    // ColorArea
    expect(container.querySelector(".mantle-colorArea")).toBeInTheDocument();
    // ColorSlider
    expect(screen.getByRole("slider")).toBeInTheDocument();
    // ColorField
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("hides the field when showField is false", () => {
    render(<ColorPicker value="#ff0000" showField={false} />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders the hex value in the field", () => {
    render(<ColorPicker value="#ff0000" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("#ff0000");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ColorPicker value="#ff0000" className="custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom");
  });

  it("accepts onValueChange callback", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <ColorPicker value="#ff0000" onValueChange={onValueChange} />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
