import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

function renderTabs(props: Record<string, unknown> = {}) {
  return render(
    <Tabs defaultValue="tab-1" {...props}>
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3" disabled>
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab-1">Content 1</Tabs.Content>
      <Tabs.Content value="tab-2">Content 2</Tabs.Content>
      <Tabs.Content value="tab-3">Content 3</Tabs.Content>
    </Tabs>,
  );
}

describe("Tabs", () => {
  describe("Rendering", () => {
    it("renders all triggers", () => {
      renderTabs();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
    });

    it("renders the active tab content", () => {
      renderTabs();
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });

    it("renders the tablist", () => {
      renderTabs();
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("switches tab on click", async () => {
      const user = userEvent.setup();
      renderTabs();

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("does not activate a disabled tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      await user.click(screen.getByRole("tab", { name: "Tab 3" }));
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
    });

    it("navigates with ArrowRight", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    });

    it("navigates with ArrowLeft", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 2" }).focus();
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("wraps around with ArrowRight from last to first", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 2" }).focus();
      await user.keyboard("{ArrowRight}");
      // Skips disabled tab 3, wraps to tab 1
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("navigates to first with Home", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 2" }).focus();
      await user.keyboard("{Home}");
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("navigates to last with End", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{End}");
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    });
  });

  describe("Controlled behavior", () => {
    it("reflects controlled value", () => {
      renderTabs({ value: "tab-2", defaultValue: undefined });
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("calls onValueChange when a tab is clicked", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderTabs({ value: "tab-1", defaultValue: undefined, onValueChange });

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      expect(onValueChange).toHaveBeenCalledWith("tab-2");
    });
  });

  describe("Accessibility", () => {
    it("active trigger has aria-selected=true", () => {
      renderTabs();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("active trigger has tabIndex 0, others have -1", () => {
      renderTabs();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "tabindex",
        "0",
      );
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    it("trigger has aria-controls pointing to content panel", () => {
      renderTabs();
      const trigger = screen.getByRole("tab", { name: "Tab 1" });
      const controlsId = trigger.getAttribute("aria-controls") ?? "";
      const panel = document.getElementById(controlsId);
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute("role", "tabpanel");
    });

    it("content panel has aria-labelledby pointing to trigger", () => {
      renderTabs();
      const trigger = screen.getByRole("tab", { name: "Tab 1" });
      const panel = screen.getByRole("tabpanel");
      expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
    });

    it("content panel has tabIndex 0 for keyboard access", () => {
      renderTabs();
      expect(screen.getByRole("tabpanel")).toHaveAttribute("tabindex", "0");
    });
  });
});
