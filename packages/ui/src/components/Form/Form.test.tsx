import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Form } from "./Form";

describe("Form", () => {
  it("renders a form element", () => {
    render(<Form data-testid="form" />);
    expect(screen.getByTestId("form").tagName).toBe("FORM");
  });

  it("renders children", () => {
    render(
      <Form>
        <input type="text" aria-label="Name" />
      </Form>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });

  it("sets noValidate by default", () => {
    render(<Form data-testid="form" />);
    expect(screen.getByTestId("form")).toHaveAttribute("novalidate");
  });

  it("calls onSubmit and prevents default", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);

    const event = onSubmit.mock.calls.at(0)?.at(0) as React.FormEvent;
    expect(event.defaultPrevented).toBe(true);
  });

  it("applies className", () => {
    render(<Form data-testid="form" className="custom" />);
    expect(screen.getByTestId("form")).toHaveClass("mantle-form", "custom");
  });

  it("forwards additional HTML attributes", () => {
    render(<Form data-testid="form" id="my-form" aria-label="Settings" />);
    const form = screen.getByTestId("form");
    expect(form).toHaveAttribute("id", "my-form");
    expect(form).toHaveAttribute("aria-label", "Settings");
  });
});
