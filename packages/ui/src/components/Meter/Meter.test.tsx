import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meter } from "./Meter";

describe("Meter", () => {
  it("renders with role=meter", () => {
    render(<Meter value={50} />);
    expect(screen.getByRole("meter")).toBeInTheDocument();
  });

  it("shows the value when showValue is true", () => {
    render(<Meter value={42} showValue />);
    expect(screen.getByTestId("mantle-meter-value")).toHaveTextContent("42");
  });

  it("renders label text", () => {
    render(<Meter value={50} label="Disk usage" />);
    expect(screen.getByText("Disk usage")).toBeInTheDocument();
  });

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<Meter value={30} min={0} max={100} />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "30");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
  });

  it("applies className", () => {
    render(<Meter value={50} className="custom" />);
    expect(screen.getByRole("meter")).toHaveClass("mantle-meter", "custom");
  });

  it("clamps value to min/max", () => {
    render(<Meter value={150} min={0} max={100} showValue />);
    expect(screen.getByTestId("mantle-meter-value")).toHaveTextContent("100");
  });

  it("applies optimal segment class when value is in optimum range", () => {
    const { container } = render(
      <Meter value={50} low={25} high={75} optimum={50} />,
    );
    const fill = container.querySelector(".mantle-meter-fill") as HTMLElement;
    expect(fill).toHaveClass("mantle-meter-fill-optimal");
  });

  it("applies critical segment class when value exceeds high with low optimum", () => {
    const { container } = render(
      <Meter value={90} low={25} high={75} optimum={10} />,
    );
    const fill = container.querySelector(".mantle-meter-fill") as HTMLElement;
    expect(fill).toHaveClass("mantle-meter-fill-critical");
  });

  it("applies suboptimal segment class for mid-range with low optimum", () => {
    const { container } = render(
      <Meter value={50} low={25} high={75} optimum={10} />,
    );
    const fill = container.querySelector(".mantle-meter-fill") as HTMLElement;
    expect(fill).toHaveClass("mantle-meter-fill-suboptimal");
  });
});
