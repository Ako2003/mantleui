import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("renders trigger with placeholder", () => {
    render(<DateRangePicker />);
    expect(screen.getByText("Select range")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<DateRangePicker label="Date range" />);
    expect(screen.getByText("Date range")).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("selects a range by clicking start then end", async () => {
    const user = userEvent.setup();
    const onRangeChange = vi.fn();
    render(<DateRangePicker onRangeChange={onRangeChange} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("10"));
    await user.click(screen.getByText("20"));

    expect(onRangeChange).toHaveBeenCalledTimes(1);
    const range = onRangeChange.mock.calls.at(0)?.at(0) as {
      start: Date;
      end: Date;
    };
    expect(range.start.getDate()).toBe(10);
    expect(range.end.getDate()).toBe(20);
  });

  it("shows both dates when range is provided", () => {
    render(
      <DateRangePicker
        startDate={new Date(2025, 0, 5)}
        endDate={new Date(2025, 0, 25)}
      />,
    );
    expect(screen.getByText("Jan 05, 2025")).toBeInTheDocument();
    expect(screen.getByText("Jan 25, 2025")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<DateRangePicker error="Invalid range" />);
    expect(screen.getByText("Invalid range")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker disabled />);

    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
