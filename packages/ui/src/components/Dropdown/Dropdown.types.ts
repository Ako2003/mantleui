import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface DropdownProps {
  /** Dropdown content (Trigger, Menu, etc.). */
  children: ReactNode;
  /** Accent color for hover effects. Defaults to `"blue"`. */
  color?: MantleColor;
}

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Trigger content. */
  children: ReactNode;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu items. */
  children: ReactNode;
}

export interface DropdownItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** Called when the item is selected. */
  onSelect?: () => void;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Item content. */
  children: ReactNode;
}
