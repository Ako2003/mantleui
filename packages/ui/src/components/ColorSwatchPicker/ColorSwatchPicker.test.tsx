import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorSwatchPicker } from "./ColorSwatchPicker";

const testColors = ["#ff0000", "#00ff00", "#0000ff"];

describe("ColorSwatchPicker", () => {
  it("renders swatches for each color", () => {
    render(<ColorSwatchPicker colors={testColors} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("selects a swatch on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorSwatchPicker colors={testColors} onValueChange={onValueChange} />,
    );
    const radios = screen.getAllByRole("radio");
    await user.click(radios.at(1) as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("#00ff00");
  });

  it("shows selected ring on the selected swatch", () => {
    render(<ColorSwatchPicker colors={testColors} value="#00ff00" />);
    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).toHaveAttribute("aria-checked", "false");
    expect(radios.at(1)).toHaveAttribute("aria-checked", "true");
    expect(radios.at(1)).toHaveClass("mantle-colorSwatchPickerItemSelected");
    expect(radios.at(2)).toHaveAttribute("aria-checked", "false");
  });

  it("calls onValueChange with the selected color", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ColorSwatchPicker colors={testColors} onValueChange={onValueChange} />,
    );
    const radios = screen.getAllByRole("radio");
    await user.click(radios.at(2) as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("#0000ff");
  });

  it("has radiogroup role on container", () => {
    render(<ColorSwatchPicker colors={testColors} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ColorSwatchPicker colors={testColors} className="custom-grid" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom-grid");
  });
});
