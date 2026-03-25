import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("renders with role=toolbar", () => {
    render(
      <Toolbar aria-label="Actions">
        <button>Save</button>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("applies horizontal orientation by default", () => {
    render(
      <Toolbar aria-label="Actions">
        <button>Save</button>
      </Toolbar>,
    );

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toHaveAttribute("aria-orientation", "horizontal");
    expect(toolbar).toHaveClass("mantle-toolbar", "mantle-toolbarHorizontal");
  });

  it("applies vertical orientation", () => {
    render(
      <Toolbar orientation="vertical" aria-label="Actions">
        <button>Save</button>
      </Toolbar>,
    );

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toHaveAttribute("aria-orientation", "vertical");
    expect(toolbar).toHaveClass("mantle-toolbar", "mantle-toolbarVertical");
  });

  it("renders children", () => {
    render(
      <Toolbar aria-label="Actions">
        <button>Bold</button>
        <button>Italic</button>
      </Toolbar>,
    );

    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
  });

  it("passes className", () => {
    render(
      <Toolbar aria-label="Actions" className="custom">
        <button>Save</button>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar")).toHaveClass("mantle-toolbar", "custom");
  });
});
