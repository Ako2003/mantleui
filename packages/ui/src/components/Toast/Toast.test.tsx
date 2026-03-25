import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Toaster } from "./Toast";
import { useToast, resetToasts } from "./useToast";

describe("Toast", () => {
  beforeEach(() => {
    resetToasts();
  });

  describe("useToast", () => {
    it("starts with no toasts", () => {
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts).toHaveLength(0);
    });

    it("adds a toast", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.info({ title: "Hello" });
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts.at(0)?.title).toBe("Hello");
      expect(result.current.toasts.at(0)?.variant).toBe("info");
    });

    it("dismisses a toast", () => {
      const { result } = renderHook(() => useToast());

      let id: string;
      act(() => {
        id = result.current.toast.success({ title: "Done" });
      });

      expect(result.current.toasts).toHaveLength(1);

      act(() => {
        result.current.dismiss(id);
      });

      expect(result.current.toasts).toHaveLength(0);
    });

    it("supports all variants", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.info({ title: "Info" });
        result.current.toast.success({ title: "Success" });
        result.current.toast.warning({ title: "Warning" });
        result.current.toast.error({ title: "Error" });
      });

      expect(result.current.toasts).toHaveLength(4);
    });

    it("auto-dismisses after duration", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.info({ title: "Temp", duration: 1000 });
      });

      expect(result.current.toasts).toHaveLength(1);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.toasts).toHaveLength(0);
      vi.useRealTimers();
    });
  });

  describe("Toaster", () => {
    it("renders nothing when no toasts", () => {
      const { container } = render(<Toaster />);
      expect(
        container.querySelector(".mantle-toaster"),
      ).not.toBeInTheDocument();
    });

    it("renders toasts with role=alert", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.success({ title: "Saved" });
      });

      render(<Toaster />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Saved")).toBeInTheDocument();
    });

    it("renders title and description", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.error({
          title: "Error",
          description: "Something went wrong",
        });
      });

      render(<Toaster />);
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("dismisses on close button click", async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast.info({ title: "Dismissible" });
      });

      render(<Toaster />);
      await user.click(screen.getByRole("button", { name: "Dismiss" }));
      expect(screen.queryByText("Dismissible")).not.toBeInTheDocument();
    });
  });
});
