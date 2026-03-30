import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ToastData, ToastVariant } from "./Toast.types";

let toasts: ToastData[] = [];
let idCounter = 0;
const listeners = new Set<() => void>();

/** Reset all toasts. Useful for testing. */
export function resetToasts() {
  toasts = [];
  idCounter = 0;
  emitChange();
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return toasts;
}

function getServerSnapshot() {
  return [];
}

function addToast(
  variant: ToastVariant,
  options: { title?: string; description?: string; duration?: number },
): string {
  const id = `toast-${++idCounter}`;
  const toast: ToastData = {
    id,
    variant,
    title: options.title,
    description: options.description,
    duration: options.duration ?? 5000,
  };
  toasts = [...toasts, toast];
  emitChange();

  if (toast.duration && toast.duration > 0) {
    setTimeout(() => dismissToast(id), toast.duration);
  }

  return id;
}

function dismissToast(id: string) {
  // Mark as dismissing for exit animation
  const toast = toasts.find((t) => t.id === id);
  if (!toast || toast.dismissing) return;

  toasts = toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t));
  emitChange();

  // Remove after animation
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  }, 200);
}

/**
 * Hook for managing toast notifications. Returns the current toasts
 * and functions to create/dismiss them.
 *
 * @example
 * ```tsx
 * const { toasts, toast, dismiss } = useToast();
 * toast.success({ title: "Saved!" });
 * ```
 */
export function useToast() {
  const currentToasts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const dismiss = useCallback((id: string) => {
    dismissToast(id);
  }, []);

  const toast = useMemo(
    () => ({
      info: (opts: {
        title?: string;
        description?: string;
        duration?: number;
      }) => addToast("info", opts),
      success: (opts: {
        title?: string;
        description?: string;
        duration?: number;
      }) => addToast("success", opts),
      warning: (opts: {
        title?: string;
        description?: string;
        duration?: number;
      }) => addToast("warning", opts),
      error: (opts: {
        title?: string;
        description?: string;
        duration?: number;
      }) => addToast("error", opts),
    }),
    [],
  );

  return { toasts: currentToasts, toast, dismiss };
}
