import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ListBox } from "./ListBox";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("ListBox", () => {
  describe("Rendering", () => {
    it("renders a listbox with options", () => {
      render(<ListBox items={items} />);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(3);
    });

    it("displays labels for each item", () => {
      render(<ListBox items={items} />);
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Cherry")).toBeInTheDocument();
    });

    it("falls back to value when label is not provided", () => {
      render(<ListBox items={[{ value: "mango" }]} />);
      expect(screen.getByText("mango")).toBeInTheDocument();
    });
  });

  describe("Single selection", () => {
    it("selects an option on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<ListBox items={items} onValueChange={onValueChange} />);

      await user.click(screen.getByText("Banana"));
      expect(onValueChange).toHaveBeenCalledWith(["banana"]);
    });

    it("marks selected option with aria-selected", async () => {
      const user = userEvent.setup();
      render(<ListBox items={items} />);

      await user.click(screen.getByText("Banana"));
      const options = screen.getAllByRole("option");
      expect(options.at(1)).toHaveAttribute("aria-selected", "true");
      expect(options.at(0)).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Multiple selection", () => {
    it("allows selecting multiple items", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<ListBox items={items} multiple onValueChange={onValueChange} />);

      await user.click(screen.getByText("Apple"));
      expect(onValueChange).toHaveBeenCalledWith(["apple"]);

      await user.click(screen.getByText("Cherry"));
      expect(onValueChange).toHaveBeenCalledWith(["apple", "cherry"]);
    });

    it("deselects an already selected item in multiple mode", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <ListBox
          items={items}
          multiple
          defaultValue={["apple"]}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByText("Apple"));
      expect(onValueChange).toHaveBeenCalledWith([]);
    });

    it("sets aria-multiselectable on the listbox", () => {
      render(<ListBox items={items} multiple />);
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-multiselectable",
        "true",
      );
    });
  });

  describe("Keyboard navigation", () => {
    it("navigates with ArrowDown and ArrowUp", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<ListBox items={items} onValueChange={onValueChange} />);

      const listbox = screen.getByRole("listbox");
      listbox.focus();

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
      expect(onValueChange).toHaveBeenCalledWith(["apple"]);

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard(" ");
      expect(onValueChange).toHaveBeenCalledWith(["cherry"]);
    });

    it("does not go beyond bounds", async () => {
      const user = userEvent.setup();
      render(<ListBox items={items} />);

      const listbox = screen.getByRole("listbox");
      listbox.focus();

      await user.keyboard("{ArrowUp}");
      await user.keyboard("{ArrowUp}");
      // Should stay at -1, no crash
    });
  });

  describe("Disabled items", () => {
    it("does not select disabled items on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const disabledItems = [
        { value: "apple", label: "Apple", disabled: true },
        { value: "banana", label: "Banana" },
      ];
      render(<ListBox items={disabledItems} onValueChange={onValueChange} />);

      await user.click(screen.getByText("Apple"));
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("marks disabled items with aria-disabled", () => {
      const disabledItems = [
        { value: "apple", label: "Apple", disabled: true },
      ];
      render(<ListBox items={disabledItems} />);
      expect(screen.getByRole("option")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });
  });
});
