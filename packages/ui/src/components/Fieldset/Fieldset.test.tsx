import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
  it("renders a fieldset element", () => {
    render(<Fieldset>Content</Fieldset>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("renders a legend when provided", () => {
    render(<Fieldset legend="Personal Info">Content</Fieldset>);
    expect(screen.getByText("Personal Info")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<Fieldset disabled>Content</Fieldset>);
    expect(screen.getByRole("group")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(<Fieldset ref={ref}>Content</Fieldset>);
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it("applies className", () => {
    render(<Fieldset className="custom">Content</Fieldset>);
    expect(screen.getByRole("group")).toHaveClass("custom");
  });
});
