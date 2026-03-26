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

  it("applies size style for sm", () => {
    render(<Spinner size="sm" />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("16px");
  });

  it("applies size style for md by default", () => {
    render(<Spinner />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("24px");
  });

  it("applies size style for lg", () => {
    render(<Spinner size="lg" />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("32px");
  });

  it("applies color for red", () => {
    render(<Spinner color="red" />);
    const el = screen.getByRole("status");
    expect(el.style.borderTopColor).toBeTruthy();
  });

  it("defaults color to blue", () => {
    render(<Spinner />);
    const el = screen.getByRole("status");
    expect(el.style.borderTopColor).toBeTruthy();
  });

  it("applies custom className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("mantle-spinner", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
