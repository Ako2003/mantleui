import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Surface } from "./Surface";

describe("Surface", () => {
  it("renders children", () => {
    render(<Surface>Content</Surface>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies elevation shadow class", () => {
    render(<Surface elevation="md">Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass(
      "mantle-surface",
      "mantle-surface-elevation-md",
    );
  });

  it("applies default elevation of none", () => {
    render(<Surface>Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass(
      "mantle-surface-elevation-none",
    );
  });

  it("applies bordered class when bordered is true", () => {
    render(<Surface bordered>Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass("mantle-surface-bordered");
  });

  it("does not apply bordered class by default", () => {
    render(<Surface>Content</Surface>);
    expect(screen.getByText("Content")).not.toHaveClass(
      "mantle-surface-bordered",
    );
  });

  it("applies rounded class", () => {
    render(<Surface rounded="lg">Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass(
      "mantle-surface-rounded-lg",
    );
  });

  it("applies default rounded of md", () => {
    render(<Surface>Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass(
      "mantle-surface-rounded-md",
    );
  });

  it("passes className", () => {
    render(<Surface className="custom">Content</Surface>);
    expect(screen.getByText("Content")).toHaveClass("mantle-surface", "custom");
  });
});
