import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "./Popover";
import { usePopover } from "./usePopover";

describe("Popover (compound)", () => {
  describe("Rendering", () => {
    it("renders the trigger", () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    });

    it("does not render content when closed", () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders content when defaultOpen is true", () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("opens on trigger click", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("closes on second trigger click", async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on Escape key", async () => {
      const user = userEvent.setup();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("returns focus to trigger after Escape", async () => {
      const user = userEvent.setup();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      await user.keyboard("{Escape}");
      expect(screen.getByRole("button", { name: "Open" })).toHaveFocus();
    });

    it("closes on click outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Popover defaultOpen>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Content>Content</Popover.Content>
          </Popover>
          <button>Outside</button>
        </div>,
      );

      await user.click(screen.getByText("Outside"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Controlled behavior", () => {
    it("reflects controlled open state", () => {
      render(
        <Popover open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calls onOpenChange when toggled", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Popover open={false} onOpenChange={onOpenChange}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      await user.click(screen.getByRole("button"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Accessibility", () => {
    it("trigger has aria-expanded", () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("trigger has aria-haspopup=dialog", () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-haspopup",
        "dialog",
      );
    });

    it("content has role=dialog", () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});

describe("usePopover (headless)", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.isOpen).toBe(false);
  });

  it("starts open when defaultOpen is true", () => {
    const { result } = renderHook(() => usePopover({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("toggle changes open state", () => {
    const { result } = renderHook(() => usePopover());

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("open and close work", () => {
    const { result } = renderHook(() => usePopover());

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("triggerProps has correct ARIA attributes", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.triggerProps["aria-expanded"]).toBe(false);
    expect(result.current.triggerProps["aria-haspopup"]).toBe("dialog");
  });

  it("contentProps has role=dialog", () => {
    const { result } = renderHook(() => usePopover());
    expect(result.current.contentProps.role).toBe("dialog");
  });

  it("contentProps has placement styles", () => {
    const { result } = renderHook(() => usePopover({ placement: "bottom" }));
    expect(result.current.contentProps.style).toEqual(
      expect.objectContaining({ position: "absolute", top: "100%" }),
    );
  });

  it("calls onOpenChange", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => usePopover({ onOpenChange }));

    act(() => result.current.open());
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
