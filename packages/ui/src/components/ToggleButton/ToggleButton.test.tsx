import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { ToggleButton } from "./ToggleButton";

describe("ToggleButton", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<ToggleButton>Bold</ToggleButton>);
      expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    });

    it("has aria-pressed attribute defaulting to false", () => {
      render(<ToggleButton>Bold</ToggleButton>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("applies size class", () => {
      render(<ToggleButton size="lg">Bold</ToggleButton>);
      expect(screen.getByRole("button")).toHaveClass("mantle-togglebutton-lg");
    });

    it("applies variant class", () => {
      render(<ToggleButton variant="solid">Bold</ToggleButton>);
      expect(screen.getByRole("button")).toHaveClass(
        "mantle-togglebutton-solid",
      );
    });
  });

  describe("Uncontrolled behavior", () => {
    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(<ToggleButton>Bold</ToggleButton>);
      const button = screen.getByRole("button");

      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");

      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "false");
    });

    it("starts pressed when defaultPressed is true", () => {
      render(<ToggleButton defaultPressed>Bold</ToggleButton>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("calls onPressedChange on toggle", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <ToggleButton onPressedChange={onPressedChange}>Bold</ToggleButton>,
      );

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Controlled behavior", () => {
    it("reflects the controlled pressed value", () => {
      render(<ToggleButton pressed>Bold</ToggleButton>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("calls onPressedChange but does not change internally", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <ToggleButton pressed={false} onPressedChange={onPressedChange}>
          Bold
        </ToggleButton>,
      );

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("updates when controlled prop changes", () => {
      function Wrapper() {
        const [pressed, setPressed] = useState(false);
        return (
          <>
            <ToggleButton pressed={pressed} onPressedChange={setPressed}>
              Bold
            </ToggleButton>
            <button onClick={() => setPressed(true)}>external</button>
          </>
        );
      }
      render(<Wrapper />);
      expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });
  });

  describe("Pressed styling", () => {
    it("applies pressed class when pressed", async () => {
      const user = userEvent.setup();
      render(<ToggleButton>Bold</ToggleButton>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("mantle-togglebutton-pressed");
      await user.click(button);
      expect(button).toHaveClass("mantle-togglebutton-pressed");
    });

    it("applies pressed + solid classes together", () => {
      render(
        <ToggleButton pressed variant="solid">
          Bold
        </ToggleButton>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("mantle-togglebutton-pressed");
      expect(button).toHaveClass("mantle-togglebutton-solid");
    });
  });

  describe("Disabled", () => {
    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <ToggleButton disabled onPressedChange={onPressedChange}>
          Bold
        </ToggleButton>,
      );

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).not.toHaveBeenCalled();
    });

    it("has disabled attribute", () => {
      render(<ToggleButton disabled>Bold</ToggleButton>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
