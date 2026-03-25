import { forwardRef } from "react";
import type { KbdProps } from "./Kbd.types";
import "./Kbd.css";

/**
 * Keyboard key visual indicator.
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd>Shift</Kbd>
 * <Kbd>Enter</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, children, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={["mantle-kbd", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";
