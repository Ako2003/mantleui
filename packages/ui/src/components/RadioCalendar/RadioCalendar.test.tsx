import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioCalendar } from "./RadioCalendar";

const testDates = [
  new Date(2025, 0, 1),
  new Date(2025, 0, 2),
  new Date(2025, 0, 3),
];

describe("RadioCalendar", () => {
  it("renders available dates", () => {
    render(<RadioCalendar dates={testDates} />);
    expect(screen.getByText("Jan 1")).toBeInTheDocument();
    expect(screen.getByText("Jan 2")).toBeInTheDocument();
    expect(screen.getByText("Jan 3")).toBeInTheDocument();
  });

  it("has radiogroup role on container", () => {
    render(<RadioCalendar dates={testDates} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("has radio role on items", () => {
    render(<RadioCalendar dates={testDates} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("selects a date on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioCalendar dates={testDates} onValueChange={onValueChange} />);

    await user.click(screen.getByText("Jan 2"));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const selected = onValueChange.mock.calls.at(0)?.at(0) as Date;
    expect(selected.getDate()).toBe(2);
  });

  it("marks selected date with aria-checked", () => {
    render(<RadioCalendar dates={testDates} value={new Date(2025, 0, 2)} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.at(0)).toHaveAttribute("aria-checked", "false");
    expect(radios.at(1)).toHaveAttribute("aria-checked", "true");
    expect(radios.at(2)).toHaveAttribute("aria-checked", "false");
  });

  it("works in controlled mode", () => {
    const { rerender } = render(
      <RadioCalendar dates={testDates} value={new Date(2025, 0, 1)} />,
    );
    expect(screen.getAllByRole("radio").at(0)).toHaveAttribute(
      "aria-checked",
      "true",
    );

    rerender(<RadioCalendar dates={testDates} value={new Date(2025, 0, 3)} />);
    expect(screen.getAllByRole("radio").at(0)).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getAllByRole("radio").at(2)).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <RadioCalendar dates={testDates} className="custom-grid" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom-grid");
  });
});
