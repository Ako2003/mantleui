import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "disabled", label: "Disabled", disabled: true },
];

describe("Select", () => {
  describe("Rendering", () => {
    it("renders a combobox trigger", () => {
      render(<Select options={options} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("shows placeholder when no value", () => {
      render(<Select options={options} placeholder="Pick a fruit" />);
      expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
    });

    it("shows selected value", () => {
      render(<Select options={options} value="banana" />);
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("renders a label", () => {
      render(<Select options={options} label="Fruit" />);
      expect(screen.getByText("Fruit")).toBeInTheDocument();
    });

    it("renders error message", () => {
      render(<Select options={options} error="Required" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Required");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Select ref={ref} options={options} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Interactions", () => {
    it("opens dropdown on click", async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("selects an option on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Select options={options} onValueChange={onValueChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Cherry"));
      expect(onValueChange).toHaveBeenCalledWith("cherry");
    });

    it("closes after selecting an option", async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Apple"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("does not select a disabled option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Select options={options} onValueChange={onValueChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Disabled"));
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes on click outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={options} />
          <button>Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("does not open when disabled", async () => {
      const user = userEvent.setup();
      render(<Select options={options} disabled />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("trigger has aria-expanded", async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);
      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("trigger has aria-haspopup=listbox", () => {
      render(<Select options={options} />);
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-haspopup",
        "listbox",
      );
    });

    it("options have aria-selected", async () => {
      const user = userEvent.setup();
      render(<Select options={options} value="banana" />);

      await user.click(screen.getByRole("combobox"));
      const bananaOption = screen.getByRole("option", { name: "Banana" });
      expect(bananaOption).toHaveAttribute("aria-selected", "true");
    });

    it("disabled options have aria-disabled", async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      await user.click(screen.getByRole("combobox"));
      const disabledOption = screen.getByRole("option", { name: "Disabled" });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    });
  });
});
