import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders an input element", () => {
      render(<Input placeholder="Type here" />);
      expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
    });

    it("renders a label when provided", () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders helper text", () => {
      render(<Input helperText="We'll never share your email." />);
      expect(
        screen.getByText("We'll never share your email."),
      ).toBeInTheDocument();
    });

    it("renders error message", () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("hides helper text when error is shown", () => {
      render(<Input helperText="Help" error="Error" />);
      expect(screen.queryByText("Help")).not.toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("renders start and end icons", () => {
      render(
        <Input
          startIcon={<span data-testid="start">@</span>}
          endIcon={<span data-testid="end">✓</span>}
        />,
      );
      expect(screen.getByTestId("start")).toBeInTheDocument();
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("accepts user input", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type" />);
      const input = screen.getByPlaceholderText("Type");

      await user.type(input, "hello");
      expect(input).toHaveValue("hello");
    });

    it("calls onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Input onChange={onChange} />);

      await user.type(screen.getByRole("textbox"), "a");
      expect(onChange).toHaveBeenCalled();
    });

    it("respects disabled state", () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("sets aria-invalid when error is present", () => {
      render(<Input error="Required" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("links error message via aria-describedby", () => {
      render(<Input error="Required" />);
      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(document.getElementById(describedBy)).toHaveTextContent(
        "Required",
      );
    });

    it("links helper text via aria-describedby", () => {
      render(<Input helperText="Some help" />);
      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(document.getElementById(describedBy)).toHaveTextContent(
        "Some help",
      );
    });

    it("error has role=alert", () => {
      render(<Input error="Required" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Required");
    });
  });
});
