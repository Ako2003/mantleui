import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  describe("Rendering", () => {
    it("renders a switch", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("renders a label", () => {
      render(<Switch label="Dark mode" />);
      expect(screen.getByText("Dark mode")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Uncontrolled behavior", () => {
    it("starts unchecked by default", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "false",
      );
    });

    it("starts checked when defaultChecked is true", () => {
      render(<Switch defaultChecked />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const sw = screen.getByRole("switch");

      await user.click(sw);
      expect(sw).toHaveAttribute("aria-checked", "true");

      await user.click(sw);
      expect(sw).toHaveAttribute("aria-checked", "false");
    });

    it("calls onCheckedChange", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();
      render(<Switch onCheckedChange={onCheckedChange} />);

      await user.click(screen.getByRole("switch"));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Controlled behavior", () => {
    it("reflects controlled state", () => {
      render(<Switch checked />);
      expect(screen.getByRole("switch")).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("calls onCheckedChange in controlled mode", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={onCheckedChange} />);

      await user.click(screen.getByRole("switch"));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Accessibility", () => {
    it("has role=switch", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is set", () => {
      render(<Switch disabled />);
      expect(screen.getByRole("switch")).toBeDisabled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();
      render(<Switch disabled onCheckedChange={onCheckedChange} />);

      await user.click(screen.getByRole("switch"));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });
});
