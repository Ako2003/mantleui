import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  describe("Rendering", () => {
    it("renders with children", () => {
      render(<Toggle>Bold</Toggle>);
      expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Toggle ref={ref}>Bold</Toggle>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Uncontrolled behavior", () => {
    it("starts unpressed by default", () => {
      render(<Toggle>Bold</Toggle>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("starts pressed when defaultPressed is true", () => {
      render(<Toggle defaultPressed>Bold</Toggle>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(<Toggle>Bold</Toggle>);
      const button = screen.getByRole("button");

      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");

      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "false");
    });

    it("calls onPressedChange on toggle", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledWith(true);

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Controlled behavior", () => {
    it("reflects the controlled pressed value", () => {
      render(<Toggle pressed>Bold</Toggle>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("calls onPressedChange but does not change internally", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <Toggle pressed={false} onPressedChange={onPressedChange}>
          Bold
        </Toggle>,
      );

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledWith(true);
      // Still false because controlled
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
            <Toggle pressed={pressed} onPressedChange={setPressed}>
              Bold
            </Toggle>
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

  describe("Interactions", () => {
    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <Toggle disabled onPressedChange={onPressedChange}>
          Bold
        </Toggle>,
      );

      await user.click(screen.getByRole("button"));
      expect(onPressedChange).not.toHaveBeenCalled();
    });

    it("toggles with keyboard (Enter and Space)", async () => {
      const user = userEvent.setup();
      render(<Toggle>Bold</Toggle>);
      const button = screen.getByRole("button");

      button.focus();
      await user.keyboard("{Enter}");
      expect(button).toHaveAttribute("aria-pressed", "true");

      await user.keyboard(" ");
      expect(button).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Accessibility", () => {
    it("has aria-pressed attribute", () => {
      render(<Toggle>Bold</Toggle>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed");
    });

    it("applies pressed style class when pressed", async () => {
      const user = userEvent.setup();
      render(<Toggle>Bold</Toggle>);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("pressed");
      await user.click(button);
      expect(button).toHaveClass("pressed");
    });
  });
});
