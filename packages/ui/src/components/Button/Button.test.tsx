import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
    });

    it("applies variant class", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("outline");
    });

    it("applies size class", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("lg");
    });

    it("renders start and end icons", () => {
      render(
        <Button
          startIcon={<span data-testid="start">←</span>}
          endIcon={<span data-testid="end">→</span>}
        >
          Label
        </Button>,
      );
      expect(screen.getByTestId("start")).toBeInTheDocument();
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });

    it("hides icons and shows spinner when loading", () => {
      render(
        <Button loading startIcon={<span data-testid="start">←</span>}>
          Loading
        </Button>,
      );
      expect(screen.queryByTestId("start")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button").querySelector("[aria-hidden='true']"),
      ).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Polymorphic rendering", () => {
    it("renders as an anchor when as='a'", () => {
      render(
        <Button as="a" href="/about">
          Link
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Link" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/about");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);

      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not fire onClick when loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Loading
        </Button>,
      );

      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("sets aria-disabled when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("sets aria-busy when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("sets native disabled on button elements", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not set native disabled on non-button elements", () => {
      render(
        <Button as="a" href="/" disabled>
          Link
        </Button>,
      );
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("disabled");
      expect(link).toHaveAttribute("aria-disabled", "true");
    });
  });
});
