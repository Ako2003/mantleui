import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  it("renders a radiogroup", () => {
    render(
      <RadioGroup label="Size">
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders radio items", () => {
    render(
      <RadioGroup label="Size">
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
  });

  it("selects an item on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup label="Size" onValueChange={onChange}>
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    await user.click(screen.getByText("Medium"));
    expect(onChange).toHaveBeenCalledWith("md");
  });

  it("supports controlled mode", () => {
    const onChange = vi.fn();

    const { rerender } = render(
      <RadioGroup label="Size" value="sm" onValueChange={onChange}>
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).toBeChecked();
    expect(radios.at(1)).not.toBeChecked();

    rerender(
      <RadioGroup label="Size" value="md" onValueChange={onChange}>
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    expect(radios.at(0)).not.toBeChecked();
    expect(radios.at(1)).toBeChecked();
  });

  it("supports uncontrolled mode with defaultValue", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup label="Size" defaultValue="sm">
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).toBeChecked();

    await user.click(screen.getByText("Medium"));
    expect(radios.at(1)).toBeChecked();
  });

  it("disables all items when group is disabled", () => {
    render(
      <RadioGroup label="Size" disabled>
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("disables individual item", () => {
    render(
      <RadioGroup label="Size">
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" disabled />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).not.toBeDisabled();
    expect(radios.at(1)).toBeDisabled();
  });

  it("sets aria-checked on selected item", () => {
    render(
      <RadioGroup label="Size" defaultValue="sm">
        <RadioGroup.Item value="sm" label="Small" />
        <RadioGroup.Item value="md" label="Medium" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).toHaveAttribute("aria-checked", "true");
    expect(radios.at(1)).toHaveAttribute("aria-checked", "false");
  });

  it("applies className to root", () => {
    render(
      <RadioGroup label="Size" className="custom">
        <RadioGroup.Item value="sm" label="Small" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass(
      "mantle-radiogroup",
      "custom",
    );
  });

  it("applies orientation class", () => {
    render(
      <RadioGroup label="Size" orientation="horizontal">
        <RadioGroup.Item value="sm" label="Small" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass(
      "mantle-radiogroup-horizontal",
    );
  });
});
