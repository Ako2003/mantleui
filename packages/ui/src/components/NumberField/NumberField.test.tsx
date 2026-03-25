import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberField } from "./NumberField";

describe("NumberField", () => {
  it("renders a spinbutton", () => {
    render(<NumberField />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("increments on + button click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField defaultValue={5} onValueChange={onChange} />);

    await user.click(screen.getByLabelText("Increment"));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("decrements on - button click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField defaultValue={5} onValueChange={onChange} />);

    await user.click(screen.getByLabelText("Decrement"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("respects max", () => {
    const onChange = vi.fn();
    render(<NumberField defaultValue={10} max={10} onValueChange={onChange} />);

    const incrementBtn = screen.getByLabelText("Increment");
    expect(incrementBtn).toBeDisabled();
  });

  it("respects min", () => {
    render(<NumberField defaultValue={0} min={0} />);
    const decrementBtn = screen.getByLabelText("Decrement");
    expect(decrementBtn).toBeDisabled();
  });

  it("handles keyboard ArrowUp", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField defaultValue={3} onValueChange={onChange} />);

    const input = screen.getByRole("spinbutton");
    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("handles keyboard ArrowDown", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField defaultValue={3} onValueChange={onChange} />);

    const input = screen.getByRole("spinbutton");
    await user.click(input);
    await user.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("sets aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(<NumberField defaultValue={5} min={0} max={10} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("aria-valuenow", "5");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
  });
});
