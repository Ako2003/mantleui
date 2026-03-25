import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputGroup } from "./InputGroup";

describe("InputGroup", () => {
  it("renders group", () => {
    render(
      <InputGroup data-testid="group">
        <input />
      </InputGroup>,
    );
    expect(screen.getByTestId("group")).toBeInTheDocument();
    expect(screen.getByTestId("group").className).toContain(
      "mantle-inputGroup",
    );
  });

  it("renders addons", () => {
    render(
      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <input />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>,
    );
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
    expect(screen.getByText("$").className).toContain("mantle-inputGroupAddon");
  });

  it("applies className", () => {
    render(
      <InputGroup className="custom-class" data-testid="group">
        <input />
      </InputGroup>,
    );
    expect(screen.getByTestId("group").className).toContain("custom-class");
  });

  it("applies className to addon", () => {
    render(
      <InputGroup>
        <InputGroup.Addon className="addon-custom">$</InputGroup.Addon>
        <input />
      </InputGroup>,
    );
    expect(screen.getByText("$").className).toContain("addon-custom");
  });
});
