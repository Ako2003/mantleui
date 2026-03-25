import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

function renderModal(
  props: { open?: boolean; onOpenChange?: (open: boolean) => void } = {},
) {
  const onOpenChange = props.onOpenChange ?? vi.fn();
  return render(
    <Modal open={props.open ?? true} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>
          <button type="button">Close</button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
  );
}

describe("Modal", () => {
  describe("Rendering", () => {
    it("renders when open", () => {
      renderModal();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      renderModal({ open: false });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders header, body, and footer", () => {
      renderModal();
      expect(screen.getByText("Modal Title")).toBeInTheDocument();
      expect(screen.getByText("Modal body content")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("closes on Escape key", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderModal({ onOpenChange });

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Accessibility", () => {
    it("has role=dialog", () => {
      renderModal();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has aria-modal=true", () => {
      renderModal();
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });
  });
});
