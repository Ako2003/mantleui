import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte", disabled: true },
];

describe("MultiSelect", () => {
  it("renders combobox trigger", () => {
    render(<MultiSelect options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder when empty", () => {
    render(<MultiSelect options={options} placeholder="Pick frameworks" />);
    expect(screen.getByText("Pick frameworks")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} onValueChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("React"));
    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("shows chips for selected values", () => {
    render(<MultiSelect options={options} value={["react", "vue"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("removes chip on X click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["react", "vue"]}
        onValueChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Remove React"));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("clears all on clear button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["react", "vue"]}
        onValueChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Clear all"));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("does not select disabled options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} onValueChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Svelte"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects maxItems", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        defaultValue={["react"]}
        maxItems={1}
        onValueChange={onChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Vue"));
    // Should not add Vue since maxItems=1 and React is already selected
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders label", () => {
    render(<MultiSelect options={options} label="Frameworks" />);
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
  });

  it("renders error", () => {
    render(<MultiSelect options={options} error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("renders description", () => {
    render(<MultiSelect options={options} description="Pick at least one" />);
    expect(screen.getByText("Pick at least one")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
