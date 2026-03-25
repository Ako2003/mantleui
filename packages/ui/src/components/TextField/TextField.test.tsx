import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("renders a label", () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows error with role=alert", () => {
    render(<TextField error="This field is required" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required",
    );
  });

  it("shows description", () => {
    render(<TextField description="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeInTheDocument();
  });

  it("hides description when error is present", () => {
    render(<TextField description="Help text" error="Error text" />);
    expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    expect(screen.getByText("Error text")).toBeInTheDocument();
  });

  it("shows required asterisk", () => {
    render(<TextField label="Name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<TextField label="Name" error="Required" />);
    expect(screen.getByLabelText("Name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("links description via aria-describedby", () => {
    render(<TextField label="Name" description="Your full name" />);
    const input = screen.getByLabelText("Name");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(document.getElementById(describedBy)).toHaveTextContent(
      "Your full name",
    );
  });
});
