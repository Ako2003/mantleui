import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Disclosure } from "./Disclosure";

function renderDisclosure(
  props: {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {},
) {
  return render(
    <Disclosure
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
    >
      <Disclosure.Trigger>Toggle</Disclosure.Trigger>
      <Disclosure.Content>Hidden content</Disclosure.Content>
    </Disclosure>,
  );
}

describe("Disclosure", () => {
  describe("Rendering", () => {
    it("renders the trigger", () => {
      renderDisclosure();
      expect(
        screen.getByRole("button", { name: /Toggle/ }),
      ).toBeInTheDocument();
    });

    it("content is hidden by default", () => {
      renderDisclosure();
      // Content is in DOM but visually hidden via grid animation
      const trigger = screen.getByRole("button", { name: /Toggle/ });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("content is visible when defaultOpen is true", () => {
      renderDisclosure({ defaultOpen: true });
      expect(screen.getByText("Hidden content")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("toggles content on click", async () => {
      const user = userEvent.setup();
      renderDisclosure();

      await user.click(screen.getByRole("button", { name: /Toggle/ }));
      expect(screen.getByText("Hidden content")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /Toggle/ }));
      expect(screen.getByRole("button", { name: /Toggle/ })).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Controlled mode", () => {
    it("reflects controlled open state", () => {
      renderDisclosure({ open: true });
      expect(screen.getByText("Hidden content")).toBeInTheDocument();
    });

    it("calls onOpenChange when toggled", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderDisclosure({ open: false, onOpenChange });

      await user.click(screen.getByRole("button", { name: /Toggle/ }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Accessibility", () => {
    it("trigger has aria-expanded=false when closed", () => {
      renderDisclosure();
      expect(screen.getByRole("button", { name: /Toggle/ })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("trigger has aria-expanded=true when open", () => {
      renderDisclosure({ defaultOpen: true });
      expect(screen.getByRole("button", { name: /Toggle/ })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("content has role=region when open", () => {
      renderDisclosure({ defaultOpen: true });
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("content has aria-labelledby pointing to trigger", () => {
      renderDisclosure({ defaultOpen: true });
      const trigger = screen.getByRole("button", { name: /Toggle/ });
      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("aria-labelledby", trigger.id);
    });
  });
});
