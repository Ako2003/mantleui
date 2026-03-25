import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollShadow } from "./ScrollShadow";

describe("ScrollShadow", () => {
  it("renders children", () => {
    render(<ScrollShadow>Content</ScrollShadow>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies vertical orientation class by default", () => {
    render(<ScrollShadow data-testid="scroll">Content</ScrollShadow>);
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass(
      "mantle-scrollshadow",
      "mantle-scrollshadowVertical",
    );
  });

  it("applies horizontal orientation class", () => {
    render(
      <ScrollShadow orientation="horizontal" data-testid="scroll">
        Content
      </ScrollShadow>,
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass(
      "mantle-scrollshadow",
      "mantle-scrollshadowHorizontal",
    );
  });

  it("sets max-height as a style", () => {
    render(
      <ScrollShadow maxHeight={200} data-testid="scroll">
        Content
      </ScrollShadow>,
    );
    const el = screen.getByTestId("scroll");
    expect(el.style.maxHeight).toBe("200px");
  });

  it("sets max-width as a style", () => {
    render(
      <ScrollShadow maxWidth="50rem" data-testid="scroll">
        Content
      </ScrollShadow>,
    );
    const el = screen.getByTestId("scroll");
    expect(el.style.maxWidth).toBe("50rem");
  });

  it("passes className", () => {
    render(
      <ScrollShadow className="custom" data-testid="scroll">
        Content
      </ScrollShadow>,
    );
    expect(screen.getByTestId("scroll")).toHaveClass(
      "mantle-scrollshadow",
      "custom",
    );
  });
});
