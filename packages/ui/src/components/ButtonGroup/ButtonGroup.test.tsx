import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonGroup } from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders with role=group", () => {
    render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("applies horizontal orientation class by default", () => {
    render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "mantle-buttongroup",
      "mantle-buttongroupHorizontal",
    );
  });

  it("applies vertical orientation class", () => {
    render(
      <ButtonGroup orientation="vertical">
        <button>A</button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "mantle-buttongroup",
      "mantle-buttongroupVertical",
    );
  });

  it("passes className", () => {
    render(
      <ButtonGroup className="custom">
        <button>A</button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass("mantle-buttongroup", "custom");
  });

  it("sets data-color attribute", () => {
    render(
      <ButtonGroup color="red">
        <button>A</button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-color", "red");
  });

  it("renders children", () => {
    render(
      <ButtonGroup>
        <button>First</button>
        <button>Second</button>
        <button>Third</button>
      </ButtonGroup>,
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });
});
