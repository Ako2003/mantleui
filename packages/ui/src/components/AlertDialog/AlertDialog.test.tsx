import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./AlertDialog";

function renderDialog(
  props: { open?: boolean; onOpenChange?: (open: boolean) => void } = {},
) {
  const onOpenChange = props.onOpenChange ?? vi.fn();
  return render(
    <AlertDialog open={props.open ?? true} onOpenChange={onOpenChange}>
      <AlertDialog.Content
        title="Delete item?"
        description="This action cannot be undone."
      >
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action onClick={vi.fn()}>Delete</AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog>,
  );
}

describe("AlertDialog", () => {
  describe("Rendering", () => {
    it("renders when open", () => {
      renderDialog();
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      renderDialog({ open: false });
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("renders title and description", () => {
      renderDialog();
      expect(screen.getByText("Delete item?")).toBeInTheDocument();
      expect(
        screen.getByText("This action cannot be undone."),
      ).toBeInTheDocument();
    });

    it("renders action and cancel buttons", () => {
      renderDialog();
      expect(
        screen.getByRole("button", { name: "Delete" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" }),
      ).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onOpenChange(false) when Cancel is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderDialog({ onOpenChange });

      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("calls onClick and closes when Action is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderDialog({ onOpenChange });

      await user.click(screen.getByRole("button", { name: "Delete" }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("closes on Escape key", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderDialog({ onOpenChange });

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Accessibility", () => {
    it("has role=alertdialog", () => {
      renderDialog();
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });

    it("has aria-modal=true", () => {
      renderDialog();
      expect(screen.getByRole("alertdialog")).toHaveAttribute(
        "aria-modal",
        "true",
      );
    });

    it("has aria-labelledby pointing to title", () => {
      renderDialog();
      const dialog = screen.getByRole("alertdialog");
      const labelId = dialog.getAttribute("aria-labelledby") ?? "";
      expect(document.getElementById(labelId)).toHaveTextContent(
        "Delete item?",
      );
    });

    it("has aria-describedby pointing to description", () => {
      renderDialog();
      const dialog = screen.getByRole("alertdialog");
      const descId = dialog.getAttribute("aria-describedby") ?? "";
      expect(document.getElementById(descId)).toHaveTextContent(
        "This action cannot be undone.",
      );
    });
  });
});
