import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { ColorSwatch } from "./ColorSwatch";

describe("ColorSwatch", () => {
  it("renders with role img", () => {
    render(<ColorSwatch color="#ff0000" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("sets aria-label to the color value", () => {
    render(<ColorSwatch color="#00ff00" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "#00ff00");
  });

  it("applies the background color to the inner span", () => {
    render(<ColorSwatch color="rgb(255, 0, 0)" />);
    const swatch = screen.getByRole("img");
    const inner = swatch.querySelector(".mantle-colorswatch-inner");
    expect(inner).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
  });

  it("applies size class", () => {
    render(<ColorSwatch color="#000" size="lg" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch-lg");
  });

  it("applies md size class by default", () => {
    render(<ColorSwatch color="#000" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch-md");
  });

  it("applies sm size class", () => {
    render(<ColorSwatch color="#000" size="sm" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch-sm");
  });

  it("renders as a circle by default", () => {
    render(<ColorSwatch color="#000" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch-rounded");
  });

  it("renders as a square when rounded is false", () => {
    render(<ColorSwatch color="#000" rounded={false} />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch-square");
    expect(screen.getByRole("img")).not.toHaveClass(
      "mantle-colorswatch-rounded",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<ColorSwatch ref={ref} color="#000" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    render(<ColorSwatch color="#000" className="custom" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-colorswatch", "custom");
  });
});
