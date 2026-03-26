import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders month and year selectors", () => {
    render(<Calendar month={0} year={2025} />);
    expect(screen.getByLabelText("Select month")).toHaveValue("0");
    expect(screen.getByLabelText("Select year")).toHaveValue("2025");
  });

  it("shows day headers", () => {
    render(<Calendar month={0} year={2025} />);
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("renders days of the month", () => {
    render(<Calendar month={0} year={2025} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("31")).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 0, 15)} />);

    expect(screen.getByLabelText("Select month")).toHaveValue("0");
    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByLabelText("Select month")).toHaveValue("1");
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 1, 15)} />);

    expect(screen.getByLabelText("Select month")).toHaveValue("1");
    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByLabelText("Select month")).toHaveValue("0");
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

    expect(screen.getByLabelText("Select month")).toHaveValue("11");
    expect(screen.getByLabelText("Select year")).toHaveValue("2025");

    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByLabelText("Select month")).toHaveValue("0");
    expect(screen.getByLabelText("Select year")).toHaveValue("2026");
  });

  it("wraps from January to December when navigating previous", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2025, 0, 1)} />);

    expect(screen.getByLabelText("Select month")).toHaveValue("0");
    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByLabelText("Select month")).toHaveValue("11");
    expect(screen.getByLabelText("Select year")).toHaveValue("2024");
  });
});
