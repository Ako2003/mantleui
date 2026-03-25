import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./Autocomplete";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

describe("Autocomplete", () => {
  describe("Rendering", () => {
    it("renders an input", () => {
      render(<Autocomplete options={options} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders a label", () => {
      render(<Autocomplete options={options} label="Fruit" />);
      expect(screen.getByText("Fruit")).toBeInTheDocument();
    });

    it("renders error message", () => {
      render(<Autocomplete options={options} error="Required" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Required");
    });

    it("renders placeholder", () => {
      render(<Autocomplete options={options} placeholder="Pick a fruit" />);
      expect(screen.getByPlaceholderText("Pick a fruit")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("shows options on focus", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(4);
    });

    it("filters options when typing", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} />);

      await user.click(screen.getByRole("combobox"));
      await user.type(screen.getByRole("combobox"), "ban");

      const visibleOptions = screen.getAllByRole("option");
      expect(visibleOptions).toHaveLength(1);
      expect(visibleOptions.at(0)).toHaveTextContent("Banana");
    });

    it("selects an option on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Autocomplete options={options} onValueChange={onValueChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Cherry"));

      expect(onValueChange).toHaveBeenCalledWith("cherry");
    });

    it("closes dropdown after selecting", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Apple"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("navigates options with keyboard", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<Autocomplete options={options} onValueChange={onValueChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(onValueChange).toHaveBeenCalledWith("banana");
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes on click outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Autocomplete options={options} />
          <button>Outside</button>
        </div>,
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("shows empty message when no results", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} emptyMessage="Nothing found" />);

      await user.click(screen.getByRole("combobox"));
      await user.type(screen.getByRole("combobox"), "xyz");

      expect(screen.getByText("Nothing found")).toBeInTheDocument();
    });

    it("works in controlled mode", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Autocomplete
          options={options}
          value="banana"
          onValueChange={onValueChange}
        />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("Banana");

      await user.clear(input);
      await user.click(screen.getByText("Cherry"));
      expect(onValueChange).toHaveBeenCalledWith("cherry");
    });

    it("does not open when disabled", async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={options} disabled />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
