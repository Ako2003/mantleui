import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
  it("renders with aria-label Close", () => {
    render(<CloseButton />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<CloseButton onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies size class", () => {
    render(<CloseButton size="lg" />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
      "mantle-closebutton-lg",
    );
  });

  it("applies md size class by default", () => {
    render(<CloseButton />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
      "mantle-closebutton-md",
    );
  });

  it("applies sm size class", () => {
    render(<CloseButton size="sm" />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
      "mantle-closebutton-sm",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<CloseButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("sets data-color attribute", () => {
    render(<CloseButton color="red" />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-color",
      "red",
    );
  });

  it("applies custom className", () => {
    render(<CloseButton className="custom" />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
      "mantle-closebutton",
      "custom",
    );
  });

  it("can be disabled", () => {
    render(<CloseButton disabled />);
    expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
  });
});
