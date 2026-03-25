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

  it("calls onValueChange on input change", () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={20} onValueChange={onChange} />);
    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: "30" } });
    expect(onChange).toHaveBeenCalledWith(30);
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

  it("disables the input when disabled", () => {
    render(<Slider disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
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
});
