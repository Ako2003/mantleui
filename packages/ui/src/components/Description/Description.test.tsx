import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Description } from "./Description";

describe("Description", () => {
  it("renders a p element", () => {
    render(<Description>Help text</Description>);
    const el = screen.getByText("Help text");
    expect(el.tagName).toBe("P");
  });

  it("shows the description text", () => {
    render(<Description>Enter your email address.</Description>);
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
  });

  it("applies the base class", () => {
    render(<Description>Text</Description>);
    expect(screen.getByText("Text")).toHaveClass("mantle-description");
  });

  it("applies custom className", () => {
    render(<Description className="custom">Text</Description>);
    expect(screen.getByText("Text")).toHaveClass(
      "mantle-description",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<Description ref={ref}>Ref</Description>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it("passes through HTML attributes", () => {
    render(<Description data-testid="desc-test">Test</Description>);
    expect(screen.getByTestId("desc-test")).toBeInTheDocument();
  });
});
