import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorSlider } from "./ColorSlider";

describe("ColorSlider", () => {
  it("renders a range input", () => {
    render(<ColorSlider channel="hue" value={180} />);
    const input = screen.getByRole("slider");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "range");
  });

  it("calls onValueChange when slider changes", () => {
    const onValueChange = vi.fn();
    render(
      <ColorSlider channel="hue" value={180} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "200" } });
    expect(onValueChange).toHaveBeenCalledWith(200);
  });

  it("applies hue gradient class for hue channel", () => {
    render(<ColorSlider channel="hue" value={0} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveClass("mantle-colorSliderHue");
  });

  it("applies saturation gradient class for saturation channel", () => {
    render(<ColorSlider channel="saturation" value={50} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveClass("mantle-colorSliderSaturation");
  });

  it("applies lightness gradient class for lightness channel", () => {
    render(<ColorSlider channel="lightness" value={50} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveClass("mantle-colorSliderLightness");
  });

  it("sets correct min and max for hue", () => {
    render(<ColorSlider channel="hue" value={0} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "360");
  });

  it("sets correct min and max for saturation", () => {
    render(<ColorSlider channel="saturation" value={50} />);
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ColorSlider channel="hue" value={0} className="custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom");
  });
});
