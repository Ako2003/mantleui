import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a slider", () => {
    render(<Slider label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("shows value when showValue is true", () => {
    render(<Slider defaultValue={42} showValue />);
    expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent("42");
  });

  it("renders label text", () => {
    render(<Slider label="Brightness" />);
    expect(screen.getByText("Brightness")).toBeInTheDocument();
  });

  it("respects min and max attributes", () => {
    render(<Slider min={10} max={50} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "50");
  });

  it("sets aria-valuenow", () => {
    render(<Slider defaultValue={75} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
  });

  it("applies className", () => {
    const { container } = render(<Slider className="custom" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-slider", "custom");
  });

  it("applies disabled state", () => {
    const { container } = render(<Slider disabled />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-sliderDisabled");
    expect(screen.getByRole("slider")).toHaveAttribute("aria-disabled", "true");
  });

  it("supports controlled mode", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Slider value={10} onValueChange={onChange} showValue />,
    );
    expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent("10");

    rerender(<Slider value={50} onValueChange={onChange} showValue />);
    expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent("50");
  });

  it("responds to ArrowRight key", () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} onValueChange={onChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it("responds to ArrowLeft key", () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={50} onValueChange={onChange} />);
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it("responds to Home and End keys", () => {
    const onChange = vi.fn();
    render(
      <Slider defaultValue={50} onValueChange={onChange} min={0} max={100} />,
    );
    const slider = screen.getByRole("slider");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(onChange).toHaveBeenCalledWith(0);

    fireEvent.keyDown(slider, { key: "End" });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("applies vertical orientation", () => {
    const { container } = render(<Slider orientation="vertical" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-sliderVertical");
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("applies size classes", () => {
    const { container: sm } = render(<Slider size="sm" />);
    expect(sm.firstElementChild).toHaveClass("mantle-sliderSm");

    const { container: lg } = render(<Slider size="lg" />);
    expect(lg.firstElementChild).toHaveClass("mantle-sliderLg");
  });

  describe("Range mode", () => {
    it("renders range slider with two thumbs", () => {
      const { container } = render(
        <Slider defaultValue={[20, 80] as [number, number]} />,
      );
      const thumbs = container.querySelectorAll(".mantle-slider-thumb");
      expect(thumbs).toHaveLength(2);
    });

    it("shows formatted range value", () => {
      render(
        <Slider
          defaultValue={[20, 80] as [number, number]}
          showValue
          label="Range"
        />,
      );
      expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent(
        "20 – 80",
      );
    });

    it("supports controlled range", () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Slider
          value={[10, 90] as [number, number]}
          onValueChange={onChange}
          showValue
        />,
      );
      expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent(
        "10 – 90",
      );

      rerender(
        <Slider
          value={[30, 70] as [number, number]}
          onValueChange={onChange}
          showValue
        />,
      );
      expect(screen.getByTestId("mantle-slider-value")).toHaveTextContent(
        "30 – 70",
      );
    });
  });
});
