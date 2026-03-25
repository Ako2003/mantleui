import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders image when src is provided", () => {
    render(<Avatar src="/photo.jpg" alt="Jane Doe" />);
    const imgs = screen.getAllByRole("img", { name: "Jane Doe" });
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    const imgEl =
      imgs.at(0)?.querySelector("img") ?? imgs.find((el) => el.tagName === "IMG");
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute("src", "/photo.jpg");
    expect(imgEl).toHaveAttribute("alt", "Jane Doe");
  });

  it("shows initials when no src is provided", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows single initial for single name", () => {
    render(<Avatar name="Jane" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Avatar name="A B" size="lg" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-avatar-lg");
  });

  it("applies md size by default", () => {
    render(<Avatar name="A B" />);
    expect(screen.getByRole("img")).toHaveClass("mantle-avatar-md");
  });

  it("sets data-color attribute", () => {
    render(<Avatar name="A B" color="purple" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-color", "purple");
  });

  it("defaults color to blue", () => {
    render(<Avatar name="A B" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-color", "blue");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} name="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
