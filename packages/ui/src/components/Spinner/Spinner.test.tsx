import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with role=status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has default aria-label of Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("accepts custom aria-label via label prop", () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Please wait",
    );
  });

  it("applies size attribute for sm", () => {
    render(<Spinner size="sm" />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("width", "16");
    expect(el).toHaveAttribute("height", "16");
  });

  it("applies size attribute for md by default", () => {
    render(<Spinner />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("width", "24");
    expect(el).toHaveAttribute("height", "24");
  });

  it("applies size attribute for lg", () => {
    render(<Spinner size="lg" />);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("width", "32");
    expect(el).toHaveAttribute("height", "32");
  });

  it("renders with red stroke for color=red", () => {
    render(<Spinner color="red" />);
    const circle = screen.getByRole("status").querySelector("circle");
    expect(circle).toHaveAttribute("stroke", "#ef4444");
  });

  it("defaults stroke to blue", () => {
    render(<Spinner />);
    const circle = screen.getByRole("status").querySelector("circle");
    expect(circle).toHaveAttribute("stroke", "#3b82f6");
  });

  it("applies custom className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("mantle-spinner", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<SVGSVGElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
