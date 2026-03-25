import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimeField } from "./TimeField";

describe("TimeField", () => {
  it("renders a time input", () => {
    render(<TimeField />);
    const input = screen.queryByRole("textbox") as HTMLInputElement | null;
    // type="time" may not have textbox role in all envs, fallback to querySelector
    const el = input ?? document.querySelector("input[type='time']");
    expect(el).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<TimeField label="Start time" />);
    expect(screen.getByText("Start time")).toBeInTheDocument();
  });

  it("shows controlled value", () => {
    render(<TimeField value="14:30" />);
    const input = document.querySelector(
      "input[type='time']",
    ) as HTMLInputElement;
    expect(input.value).toBe("14:30");
  });

  it("calls onValueChange when value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TimeField defaultValue="" onValueChange={onValueChange} />);

    const input = document.querySelector(
      "input[type='time']",
    ) as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "09:15");

    expect(onValueChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<TimeField error="Invalid time" />);
    expect(screen.getByText("Invalid time")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<TimeField disabled />);
    const input = document.querySelector(
      "input[type='time']",
    ) as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("sets step attribute in seconds", () => {
    render(<TimeField step={15} />);
    const input = document.querySelector(
      "input[type='time']",
    ) as HTMLInputElement;
    expect(input.step).toBe("900");
  });
});
