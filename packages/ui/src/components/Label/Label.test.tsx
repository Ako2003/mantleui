import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders a label element", () => {
    render(<Label>Username</Label>);
    const el = screen.getByText("Username");
    expect(el.tagName).toBe("LABEL");
  });

  it("applies the base class", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toHaveClass("mantle-label");
  });

  it("links to a form element via htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>);
    const el = screen.getByText("Email") as HTMLLabelElement;
    expect(el.htmlFor).toBe("email");
  });

  it("shows a red asterisk when required", () => {
    render(<Label required>Name</Label>);
    const el = screen.getByText("Name");
    const asterisk = el.querySelector(".mantle-label-required");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent("*");
  });

  it("does not show asterisk when not required", () => {
    render(<Label>Name</Label>);
    const el = screen.getByText("Name");
    const asterisk = el.querySelector(".mantle-label-required");
    expect(asterisk).not.toBeInTheDocument();
  });

  it("applies disabled style", () => {
    render(<Label disabled>Notes</Label>);
    expect(screen.getByText("Notes")).toHaveClass("mantle-label--disabled");
  });

  it("applies custom className", () => {
    render(<Label className="custom">Field</Label>);
    expect(screen.getByText("Field")).toHaveClass("mantle-label", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("passes through HTML attributes", () => {
    render(<Label data-testid="label-test">Test</Label>);
    expect(screen.getByTestId("label-test")).toBeInTheDocument();
  });
});
