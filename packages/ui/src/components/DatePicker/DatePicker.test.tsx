import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders trigger with placeholder", () => {
    render(<DatePicker />);
    expect(screen.getByText("Select date")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<DatePicker label="Start date" />);
    expect(screen.getByText("Start date")).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("selects date and closes calendar", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        defaultValue={new Date(2025, 0, 1)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("15"));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const selected = onValueChange.mock.calls.at(0)?.at(0) as Date;
    expect(selected.getDate()).toBe(15);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows formatted date when value is provided", () => {
    render(<DatePicker value={new Date(2025, 5, 15)} />);
    expect(screen.getByText("Jun 15, 2025")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<DatePicker error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
