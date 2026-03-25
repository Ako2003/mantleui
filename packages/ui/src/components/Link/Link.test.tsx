import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor element", () => {
    render(<Link href="/about">About</Link>);
    const el = screen.getByText("About");
    expect(el.tagName).toBe("A");
  });

  it("applies href attribute", () => {
    render(<Link href="https://example.com">Example</Link>);
    expect(screen.getByText("Example")).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("adds target and rel for external links", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const el = screen.getByText("External").closest("a") as HTMLElement;
    expect(el).toHaveAttribute("target", "_blank");
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not add target and rel for internal links", () => {
    render(<Link href="/about">Internal</Link>);
    const el = screen.getByText("Internal");
    expect(el).not.toHaveAttribute("target");
    expect(el).not.toHaveAttribute("rel");
  });

  it("applies underline-hover class by default", () => {
    render(<Link href="/">Home</Link>);
    expect(screen.getByText("Home")).toHaveClass("mantle-link-underline-hover");
  });

  it("applies underline-always class", () => {
    render(
      <Link href="/" underline="always">
        Always
      </Link>,
    );
    expect(screen.getByText("Always")).toHaveClass(
      "mantle-link-underline-always",
    );
  });

  it("applies underline-none class", () => {
    render(
      <Link href="/" underline="none">
        None
      </Link>,
    );
    expect(screen.getByText("None")).toHaveClass("mantle-link-underline-none");
  });

  it("sets data-color attribute", () => {
    render(
      <Link href="/" color="green">
        Green
      </Link>,
    );
    expect(screen.getByText("Green")).toHaveAttribute("data-color", "green");
  });

  it("defaults color to blue", () => {
    render(<Link href="/">Blue</Link>);
    expect(screen.getByText("Blue")).toHaveAttribute("data-color", "blue");
  });

  it("applies custom className", () => {
    render(
      <Link href="/" className="custom">
        Custom
      </Link>,
    );
    expect(screen.getByText("Custom")).toHaveClass("mantle-link", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href="/">
        Ref
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
