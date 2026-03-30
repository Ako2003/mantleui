import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface PopoverProps {
  children: ReactNode;
  /** Whether the popover is open (controlled). */
  open?: boolean;
  /** The initial open state (uncontrolled). Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Preferred placement relative to the trigger. Defaults to `"bottom"`. */
  placement?: PopoverPlacement;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}

export type PopoverTriggerProps = HTMLAttributes<HTMLButtonElement>;

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Alignment along the placement axis. Defaults to `"center"`. */
  align?: "start" | "center" | "end";
}

export interface UsePopoverOptions {
  /** Whether the popover is open (controlled). */
  open?: boolean;
  /** The initial open state (uncontrolled). Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Preferred placement. Defaults to `"bottom"`. */
  placement?: PopoverPlacement;
  /** Render content via portal with fixed positioning. Defaults to `false`. */
  portal?: boolean;
}

export interface UsePopoverReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerProps: {
    ref: React.RefCallback<HTMLElement>;
    "aria-expanded": boolean;
    "aria-haspopup": "dialog";
    onClick: () => void;
  };
  contentProps: {
    ref: React.RefCallback<HTMLElement>;
    role: "dialog";
    style: React.CSSProperties;
  };
}
