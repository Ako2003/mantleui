import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("renders a textarea element", () => {
    render(<TextArea label="Bio" />);
    const textarea = screen.getByLabelText("Bio");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("applies resize class", () => {
    render(<TextArea label="Notes" resize="none" />);
    const textarea = screen.getByLabelText("Notes");
    expect(textarea.className).toContain("mantle-textAreaResizeNone");
  });

  it("applies default vertical resize class", () => {
    render(<TextArea label="Notes" />);
    const textarea = screen.getByLabelText("Notes");
    expect(textarea.className).toContain("mantle-textAreaResizeVertical");
  });

  it("shows error with role=alert", () => {
    render(<TextArea error="Too long" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Too long");
  });

  it("sets aria-invalid when error is present", () => {
    render(<TextArea label="Bio" error="Required" />);
    expect(screen.getByLabelText("Bio")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders label", () => {
    render(<TextArea label="Description" />);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("shows description", () => {
    render(<TextArea description="Max 500 chars" />);
    expect(screen.getByText("Max 500 chars")).toBeInTheDocument();
  });

  it("hides description when error is present", () => {
    render(<TextArea description="Help" error="Error" />);
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
