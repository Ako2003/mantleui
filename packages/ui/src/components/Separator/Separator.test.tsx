import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders with correct role", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("has horizontal orientation by default", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
  });

  it("applies horizontal class by default", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveClass(
      "mantle-separator-horizontal",
    );
  });

  it("supports vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep).toHaveClass("mantle-separator-vertical");
  });

  it("applies base class", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveClass("mantle-separator");
  });

  it("merges custom className", () => {
    render(<Separator className="my-custom" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveClass("mantle-separator");
    expect(sep).toHaveClass("my-custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
