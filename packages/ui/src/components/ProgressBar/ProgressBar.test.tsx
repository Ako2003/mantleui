import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders with role=progressbar", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow", () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  });

  it("sets aria-valuemax", () => {
    render(<ProgressBar value={50} max={200} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "200",
    );
  });

  it("sets aria-label", () => {
    render(<ProgressBar value={50} label="Upload progress" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Upload progress",
    );
  });

  it("shows percentage when showValue is true", () => {
    render(<ProgressBar value={65} showValue />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("does not show percentage by default", () => {
    render(<ProgressBar value={65} />);
    expect(screen.queryByText("65%")).not.toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<ProgressBar value={50} size="lg" />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mantle-progress-bar-lg",
    );
  });

  it("applies md size class by default", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mantle-progress-bar-md",
    );
  });

  it("sets data-color attribute", () => {
    render(<ProgressBar value={50} color="green" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "data-color",
      "green",
    );
  });

  it("applies indeterminate class", () => {
    render(<ProgressBar indeterminate />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mantle-progress-bar-indeterminate",
    );
  });

  it("does not set aria-valuenow when indeterminate", () => {
    render(<ProgressBar indeterminate />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
    );
  });

  it("applies custom className", () => {
    render(<ProgressBar value={50} className="custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "mantle-progress-bar",
      "custom",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProgressBar ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
