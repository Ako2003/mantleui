import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders with title and description", () => {
    render(<Alert title="Heads up">This is a description.</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("This is a description.")).toBeInTheDocument();
  });

  it("has role=alert", () => {
    render(<Alert title="Info">Details here.</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("shows dismiss button when onDismiss is provided", () => {
    render(
      <Alert title="Dismissible" onDismiss={() => {}}>
        Can be dismissed.
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not show dismiss button when onDismiss is not provided", () => {
    render(<Alert title="Static">Cannot be dismissed.</Alert>);
    expect(
      screen.queryByRole("button", { name: "Dismiss" }),
    ).not.toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert title="Dismiss me" onDismiss={onDismiss}>
        Click the X.
      </Alert>,
    );

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("maps variant to correct color", () => {
    const { rerender } = render(<Alert variant="success" title="OK" />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-color", "green");

    rerender(<Alert variant="error" title="Fail" />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-color", "red");

    rerender(<Alert variant="warning" title="Warn" />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-color", "yellow");

    rerender(<Alert variant="info" title="Info" />);
    expect(screen.getByRole("alert")).toHaveAttribute("data-color", "blue");
  });
});
