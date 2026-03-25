import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders current month header", () => {
    render(<Calendar month={0} year={2025} />);
    expect(screen.getByText("January 2025")).toBeInTheDocument();
  });

  it("shows day headers", () => {
    render(<Calendar month={0} year={2025} />);
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("We")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("renders days of the month", () => {
    render(<Calendar month={0} year={2025} />);
    // January 2025 has 31 days
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />);

    expect(screen.getByText("January 2025")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 1, 15)} />);

    expect(screen.getByText("February 2025")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByText("January 2025")).toBeInTheDocument();
  });

  it("selects a date on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Calendar month={0} year={2025} onValueChange={onValueChange} />);

    await user.click(screen.getByText("15"));
    expect(onValueChange).toHaveBeenCalledTimes(1);

    const selectedDate = onValueChange.mock.calls.at(0)?.at(0) as Date;
    expect(selectedDate.getFullYear()).toBe(2025);
    expect(selectedDate.getMonth()).toBe(0);
    expect(selectedDate.getDate()).toBe(15);
  });

  it("highlights selected date", () => {
    render(<Calendar value={new Date(2025, 0, 20)} month={0} year={2025} />);

    const day20 = screen.getByText("20");
    expect(day20).toHaveAttribute("aria-pressed", "true");
    expect(day20).toHaveClass("mantle-calendarDaySelected");
  });

  it("wraps from December to January when navigating next", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 11, 1)} />);

    expect(screen.getByText("December 2025")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("wraps from January to December when navigating previous", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 0, 1)} />);

    expect(screen.getByText("January 2025")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByText("December 2024")).toBeInTheDocument();
  });
});
