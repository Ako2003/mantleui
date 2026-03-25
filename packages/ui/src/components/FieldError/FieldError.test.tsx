import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { FieldError } from "./FieldError";

describe("FieldError", () => {
  it("renders nothing when error is undefined", () => {
    const { container } = render(<FieldError error={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when error is an empty string", () => {
    const { container } = render(<FieldError error="" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a span with role=alert when error is present", () => {
    render(<FieldError error="Required field" />);
    const el = screen.getByRole("alert");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveTextContent("Required field");
  });

  it("applies the base class", () => {
    render(<FieldError error="Error" />);
    expect(screen.getByRole("alert")).toHaveClass("mantle-field-error");
  });

  it("applies custom className", () => {
    render(<FieldError error="Error" className="custom" />);
    expect(screen.getByRole("alert")).toHaveClass(
      "mantle-field-error",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<FieldError ref={ref} error="Error" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("passes through HTML attributes", () => {
    render(<FieldError error="Error" data-testid="field-err-test" />);
    expect(screen.getByTestId("field-err-test")).toBeInTheDocument();
  });
});
