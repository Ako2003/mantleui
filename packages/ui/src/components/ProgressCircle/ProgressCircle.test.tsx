import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { ProgressCircle } from "./ProgressCircle";

describe("ProgressCircle", () => {
  it("renders with role=progressbar", () => {
    render(<ProgressCircle value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an SVG element", () => {
    render(<ProgressCircle value={50} />);
    expect(screen.getByRole("progressbar").tagName).toBe("svg");
  });

  it("sets aria-valuenow", () => {
    render(<ProgressCircle value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  });

  it("sets aria-valuemax", () => {
    render(<ProgressCircle value={50} max={200} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "200",
    );
  });

  it("shows value text when showValue is true", () => {
    render(<ProgressCircle value={65} showValue />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("does not show value text by default", () => {
    render(<ProgressCircle value={65} />);
    expect(screen.queryByText("65%")).not.toBeInTheDocument();
  });

  it("applies sm size", () => {
    render(<ProgressCircle value={50} size="sm" />);
    const el = screen.getByRole("progressbar");
    expect(el).toHaveAttribute("width", "48");
    expect(el).toHaveAttribute("height", "48");
  });

  it("applies md size by default", () => {
    render(<ProgressCircle value={50} />);
    const el = screen.getByRole("progressbar");
    expect(el).toHaveAttribute("width", "64");
    expect(el).toHaveAttribute("height", "64");
  });

  it("applies lg size", () => {
    render(<ProgressCircle value={50} size="lg" />);
    const el = screen.getByRole("progressbar");
    expect(el).toHaveAttribute("width", "80");
    expect(el).toHaveAttribute("height", "80");
  });

  it("sets data-color attribute", () => {
    render(<ProgressCircle value={50} color="purple" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "data-color",
      "purple",
    );
  });

  it("defaults color to blue", () => {
    render(<ProgressCircle value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "data-color",
      "blue",
    );
  });

  it("applies custom className", () => {
    render(<ProgressCircle value={50} className="custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mantle-progress-circle",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<SVGSVGElement>();
    render(<ProgressCircle ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
