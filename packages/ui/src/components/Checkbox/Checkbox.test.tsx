import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders a checkbox", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders a label", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("Uncontrolled behavior", () => {
    it("starts unchecked by default", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("starts checked when defaultChecked is true", () => {
      render(<Checkbox defaultChecked />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Toggle me" />);

      await user.click(screen.getByText("Toggle me"));
      expect(screen.getByRole("checkbox")).toBeChecked();

      await user.click(screen.getByText("Toggle me"));
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("calls onCheckedChange", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();
      render(<Checkbox label="Check" onCheckedChange={onCheckedChange} />);

      await user.click(screen.getByText("Check"));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Controlled behavior", () => {
    it("reflects controlled checked state", () => {
      render(<Checkbox checked label="Controlled" />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("calls onCheckedChange in controlled mode", async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();
      render(
        <Checkbox
          checked={false}
          onCheckedChange={onCheckedChange}
          label="Controlled"
        />,
      );

      await user.click(screen.getByText("Controlled"));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Indeterminate", () => {
    it("sets indeterminate property on the input", () => {
      render(<Checkbox indeterminate />);
      const input = screen.getByRole("checkbox") as HTMLInputElement;
      expect(input.indeterminate).toBe(true);
    });

    it("has data-indeterminate attribute", () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "data-indeterminate",
        "true",
      );
    });
  });

  describe("Accessibility", () => {
    it("is disabled when disabled prop is set", () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("label clicks toggle the checkbox", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);

      await user.click(screen.getByText("Click me"));
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });
});
