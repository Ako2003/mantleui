import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InputOTP } from "./InputOTP";

describe("InputOTP", () => {
  it("renders the correct number of inputs", () => {
    render(<InputOTP length={4} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("renders 6 inputs by default", () => {
    render(<InputOTP />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  it("typing advances focus to the next input", async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} />);
    const inputs = screen.getAllByRole("textbox");

    await user.click(inputs.at(0) as HTMLElement);
    await user.keyboard("1");

    expect(inputs.at(0)).toHaveValue("1");
    expect(document.activeElement).toBe(inputs.at(1));
  });

  it("paste fills all boxes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputOTP length={4} onValueChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    await user.click(inputs.at(0) as HTMLElement);
    await user.paste("1234");

    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("calls onValueChange on typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputOTP length={4} onValueChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    await user.click(inputs.at(0) as HTMLElement);
    await user.keyboard("5");

    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("applies className", () => {
    const { container } = render(<InputOTP className="custom" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-inputotp", "custom");
  });

  it("disables all inputs when disabled", () => {
    render(<InputOTP length={3} disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("backspace moves focus to previous input", async () => {
    const user = userEvent.setup();
    render(<InputOTP length={4} defaultValue="12" />);
    const inputs = screen.getAllByRole("textbox");

    await user.click(inputs.at(1) as HTMLElement);
    await user.keyboard("{Backspace}");

    expect(inputs.at(1)).toHaveValue("");
  });
});
