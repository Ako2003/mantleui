import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColorArea } from "./ColorArea";

describe("ColorArea", () => {
  it("renders the color area", () => {
    const { container } = render(
      <ColorArea hue={0} saturation={50} brightness={50} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("mantle-colorArea");
  });

  it("applies size prop", () => {
    const { container } = render(
      <ColorArea hue={0} saturation={50} brightness={50} size={300} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveStyle({ width: "300px", height: "300px" });
  });

  it("has a thumb element", () => {
    render(<ColorArea hue={0} saturation={50} brightness={50} />);
    const thumb = screen.getByTestId("color-area-thumb");
    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveClass("mantle-colorAreaThumb");
  });

  it("positions thumb based on saturation and brightness", () => {
    render(<ColorArea hue={0} saturation={75} brightness={25} />);
    const thumb = screen.getByTestId("color-area-thumb");
    expect(thumb).toHaveStyle({ left: "75%", top: "75%" });
  });

  it("applies custom className", () => {
    const { container } = render(
      <ColorArea hue={0} saturation={50} brightness={50} className="custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom");
  });

  it("uses default size of 200", () => {
    const { container } = render(
      <ColorArea hue={0} saturation={50} brightness={50} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveStyle({ width: "200px", height: "200px" });
  });

  it("accepts callback props without errors", () => {
    const onSaturationChange = vi.fn();
    const onBrightnessChange = vi.fn();
    const { container } = render(
      <ColorArea
        hue={0}
        saturation={50}
        brightness={50}
        onSaturationChange={onSaturationChange}
        onBrightnessChange={onBrightnessChange}
      />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
