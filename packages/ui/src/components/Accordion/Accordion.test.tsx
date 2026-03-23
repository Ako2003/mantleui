import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

function renderAccordion(props: Record<string, unknown> = {}) {
  return render(
    <Accordion {...props}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Section 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Section 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3" disabled>
        <Accordion.Trigger>Section 3</Accordion.Trigger>
        <Accordion.Content>Content 3</Accordion.Content>
      </Accordion.Item>
    </Accordion>,
  );
}

describe("Accordion", () => {
  describe("Rendering", () => {
    it("renders all items", () => {
      renderAccordion();
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Section 3")).toBeInTheDocument();
    });

    it("starts with all items collapsed by default", () => {
      renderAccordion();
      const triggers = screen.getAllByRole("button");
      for (const trigger of triggers) {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      }
    });

    it("starts with defaultValue items open", () => {
      renderAccordion({ defaultValue: ["item-1"] });
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expect(screen.getByText("Section 2")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("Interactions", () => {
    it("opens an item on click", async () => {
      const user = userEvent.setup();
      renderAccordion();

      await user.click(screen.getByText("Section 1"));
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("closes an open item on click", async () => {
      const user = userEvent.setup();
      renderAccordion({ defaultValue: ["item-1"] });

      await user.click(screen.getByText("Section 1"));
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("closes previous item when opening another (single mode)", async () => {
      const user = userEvent.setup();
      renderAccordion({ defaultValue: ["item-1"] });

      await user.click(screen.getByText("Section 2"));
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(screen.getByText("Section 2")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("keeps multiple items open when multiple is true", async () => {
      const user = userEvent.setup();
      renderAccordion({ multiple: true, defaultValue: ["item-1"] });

      await user.click(screen.getByText("Section 2"));
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expect(screen.getByText("Section 2")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("does not toggle a disabled item", async () => {
      const user = userEvent.setup();
      renderAccordion();

      await user.click(screen.getByText("Section 3"));
      expect(screen.getByText("Section 3")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("Controlled behavior", () => {
    it("reflects controlled value", () => {
      renderAccordion({ value: ["item-2"] });
      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(screen.getByText("Section 2")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("calls onValueChange when toggled", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderAccordion({ value: [], onValueChange });

      await user.click(screen.getByText("Section 1"));
      expect(onValueChange).toHaveBeenCalledWith(["item-1"]);
    });
  });

  describe("Accessibility", () => {
    it("trigger has aria-controls pointing to content", () => {
      renderAccordion();
      const trigger = screen.getByText("Section 1");
      const controlsId = trigger.getAttribute("aria-controls") ?? "";
      expect(controlsId).toBeTruthy();
      expect(document.getElementById(controlsId)).toBeInTheDocument();
    });

    it("content has role=region and aria-labelledby pointing to trigger", () => {
      renderAccordion({ defaultValue: ["item-1"] });
      const trigger = screen.getByText("Section 1");
      const contentId = trigger.getAttribute("aria-controls") ?? "";
      const content = document.getElementById(contentId);

      expect(content).toHaveAttribute("role", "region");
      expect(content).toHaveAttribute("aria-labelledby", trigger.id);
    });

    it("disabled trigger is actually disabled", () => {
      renderAccordion();
      expect(screen.getByText("Section 3")).toBeDisabled();
    });
  });
});
