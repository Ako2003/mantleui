import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with default props", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });

  it("applies variant class", () => {
    render(<Badge variant="solid">Solid</Badge>);
    expect(screen.getByText("Solid")).toHaveClass("mantle-badge-solid");
  });

  it("applies outline variant class", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("mantle-badge-outline");
  });

  it("applies subtle variant class by default", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("mantle-badge-subtle");
  });

  it("applies size class", () => {
    render(<Badge size="md">Medium</Badge>);
    expect(screen.getByText("Medium")).toHaveClass("mantle-badge-md");
  });

  it("applies sm size class by default", () => {
    render(<Badge>Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("mantle-badge-sm");
  });

  it("sets data-color attribute", () => {
    render(<Badge color="green">Green</Badge>);
    expect(screen.getByText("Green")).toHaveAttribute("data-color", "green");
  });

  it("defaults color to blue", () => {
    render(<Badge>Blue</Badge>);
    expect(screen.getByText("Blue")).toHaveAttribute("data-color", "blue");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
