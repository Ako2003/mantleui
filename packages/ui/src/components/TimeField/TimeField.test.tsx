import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimeField } from "./TimeField";

describe("TimeField", () => {
  it("renders hour and minute segment inputs", () => {
    render(<TimeField />);
    expect(screen.getByLabelText("Hours")).toBeInTheDocument();
    expect(screen.getByLabelText("Minutes")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<TimeField label="Start time" />);
    expect(screen.getByText("Start time")).toBeInTheDocument();
  });

  it("shows controlled value in segments", () => {
    render(<TimeField value="14:30" />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;
    expect(hours.value).toBe("14");
    expect(minutes.value).toBe("30");
  });

  it("shows placeholder dashes when no value", () => {
    render(<TimeField />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;
    expect(hours.value).toBe("--");
    expect(minutes.value).toBe("--");
  });

  it("shows error message", () => {
    render(<TimeField error="Invalid time" />);
    expect(screen.getByText("Invalid time")).toBeInTheDocument();
  });

  it("shows description", () => {
    render(<TimeField description="Select a meeting time" />);
    expect(screen.getByText("Select a meeting time")).toBeInTheDocument();
  });

  it("disables inputs when disabled", () => {
    render(<TimeField disabled />);
    expect(screen.getByLabelText("Hours")).toBeDisabled();
    expect(screen.getByLabelText("Minutes")).toBeDisabled();
  });

  it("increments hour on ArrowUp", () => {
    const onChange = vi.fn();
    render(<TimeField defaultValue="14:30" onValueChange={onChange} />);
    const hours = screen.getByLabelText("Hours");
    fireEvent.keyDown(hours, { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith("15:30");
  });

  it("decrements minute on ArrowDown", () => {
    const onChange = vi.fn();
    render(<TimeField defaultValue="14:30" onValueChange={onChange} />);
    const minutes = screen.getByLabelText("Minutes");
    fireEvent.keyDown(minutes, { key: "ArrowDown" });
    expect(onChange).toHaveBeenCalledWith("14:29");
  });

  it("wraps hour from 23 to 0 on ArrowUp", () => {
    const onChange = vi.fn();
    render(<TimeField defaultValue="23:00" onValueChange={onChange} />);
    const hours = screen.getByLabelText("Hours");
    fireEvent.keyDown(hours, { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith("00:00");
  });

  it("opens dropdown when clock button is clicked", () => {
    render(<TimeField defaultValue="10:00" />);
    const clockBtn = screen.getByLabelText("Open time picker");
    fireEvent.click(clockBtn);
    expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Minutes" })).toBeInTheDocument();
  });

  it("selects hour from dropdown", () => {
    const onChange = vi.fn();
    render(<TimeField defaultValue="10:30" onValueChange={onChange} />);
    const clockBtn = screen.getByLabelText("Open time picker");
    fireEvent.click(clockBtn);

    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const option18 = hoursListbox.querySelector(
      "button:nth-child(19)",
    ) as HTMLElement; // 0-indexed: 19th = "18"
    fireEvent.click(option18);
    expect(onChange).toHaveBeenCalledWith("18:30");
  });
});
