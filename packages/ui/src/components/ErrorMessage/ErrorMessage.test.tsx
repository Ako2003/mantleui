import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders a p element with role=alert", () => {
    render(<ErrorMessage>Error occurred</ErrorMessage>);
    const el = screen.getByRole("alert");
    expect(el.tagName).toBe("P");
  });

  it("shows the error text", () => {
    render(<ErrorMessage>This field is required.</ErrorMessage>);
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("applies the base class", () => {
    render(<ErrorMessage>Error</ErrorMessage>);
    expect(screen.getByRole("alert")).toHaveClass("mantle-error-message");
  });

  it("applies custom className", () => {
    render(<ErrorMessage className="custom">Error</ErrorMessage>);
    expect(screen.getByRole("alert")).toHaveClass(
      "mantle-error-message",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<ErrorMessage ref={ref}>Ref</ErrorMessage>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it("passes through HTML attributes", () => {
    render(<ErrorMessage data-testid="err-test">Test</ErrorMessage>);
    expect(screen.getByTestId("err-test")).toBeInTheDocument();
  });
});
