import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el.tagName).toBe("DIV");
  });

  it("applies width and height as numbers", () => {
    render(<Skeleton data-testid="skeleton" width={200} height={20} />);
    const el = screen.getByTestId("skeleton");
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("20px");
  });

  it("applies width and height as strings", () => {
    render(<Skeleton data-testid="skeleton" width="100%" height="2rem" />);
    const el = screen.getByTestId("skeleton");
    expect(el.style.width).toBe("100%");
    expect(el.style.height).toBe("2rem");
  });

  it("applies rounded class", () => {
    render(<Skeleton data-testid="skeleton" rounded="full" />);
    expect(screen.getByTestId("skeleton")).toHaveClass(
      "mantle-skeleton-rounded-full",
    );
  });

  it("applies md rounded class by default", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass(
      "mantle-skeleton-rounded-md",
    );
  });

  it("has animate class by default", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass(
      "mantle-skeleton-animate",
    );
  });

  it("can disable animation", () => {
    render(<Skeleton data-testid="skeleton" animate={false} />);
    expect(screen.getByTestId("skeleton")).not.toHaveClass(
      "mantle-skeleton-animate",
    );
  });

  it("applies custom className", () => {
    render(<Skeleton data-testid="skeleton" className="custom" />);
    expect(screen.getByTestId("skeleton")).toHaveClass(
      "mantle-skeleton",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
