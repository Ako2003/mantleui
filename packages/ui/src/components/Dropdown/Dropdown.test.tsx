import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

function renderDropdown(
  props: { onSelect?: () => void; disabled?: boolean } = {},
) {
  return render(
    <Dropdown>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onSelect={props.onSelect}>Edit</Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>Copy</Dropdown.Item>
        <Dropdown.Item disabled={props.disabled}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
}

describe("Dropdown", () => {
  describe("Rendering", () => {
    it("renders the trigger button", () => {
      renderDropdown();
      expect(
        screen.getByRole("button", { name: "Actions" }),
      ).toBeInTheDocument();
    });

    it("does not render the menu by default", () => {
      renderDropdown();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("has correct ARIA attributes on trigger", () => {
      renderDropdown();
      const trigger = screen.getByRole("button", { name: "Actions" });
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Opening and closing", () => {
    it("opens on click", async () => {
      const user = userEvent.setup();
      renderDropdown();

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("has correct roles on menu items", async () => {
      const user = userEvent.setup();
      renderDropdown();

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      renderDropdown();

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes on click outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Dropdown>
            <Dropdown.Trigger>Actions</Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>Edit</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button>Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("Item selection", () => {
    it("selects an item and closes the menu", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      renderDropdown({ onSelect });

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await user.click(screen.getByText("Edit"));

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("does not select disabled items", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Dropdown>
          <Dropdown.Trigger>Actions</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={onSelect} disabled>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      await user.click(screen.getByText("Delete"));

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard navigation", () => {
    it("navigates items with ArrowDown/ArrowUp and selects with Enter", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Dropdown>
          <Dropdown.Trigger>Actions</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={onSelect}>Edit</Dropdown.Item>
            <Dropdown.Item onSelect={() => {}}>Copy</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Actions" }));
      const menu = screen.getByRole("menu");
      menu.focus();

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });
});
