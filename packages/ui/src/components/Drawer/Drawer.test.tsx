import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer";

function renderDrawer(
  props: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: "left" | "right" | "bottom";
  } = {},
) {
  const onOpenChange = props.onOpenChange ?? vi.fn();
  return render(
    <Drawer
      open={props.open ?? true}
      onOpenChange={onOpenChange}
      side={props.side}
    >
      <p>Drawer content</p>
    </Drawer>,
  );
}

describe("Drawer", () => {
  describe("Rendering", () => {
    it("renders when open", () => {
      renderDrawer();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      renderDrawer({ open: false });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders children", () => {
      renderDrawer();
      expect(screen.getByText("Drawer content")).toBeInTheDocument();
    });

    it("applies side class for right (default)", () => {
      renderDrawer();
      expect(screen.getByRole("dialog")).toHaveClass("mantle-drawer--right");
    });

    it("applies side class for left", () => {
      renderDrawer({ side: "left" });
      expect(screen.getByRole("dialog")).toHaveClass("mantle-drawer--left");
    });

    it("applies side class for bottom", () => {
      renderDrawer({ side: "bottom" });
      expect(screen.getByRole("dialog")).toHaveClass("mantle-drawer--bottom");
    });
  });

  describe("Interactions", () => {
    it("closes on Escape key", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderDrawer({ onOpenChange });

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Accessibility", () => {
    it("has role=dialog", () => {
      renderDrawer();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has aria-modal=true", () => {
      renderDrawer();
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });
  });
});
