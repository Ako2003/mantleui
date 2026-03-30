import type { HTMLAttributes, ReactNode } from "react";

export type DrawerSide = "left" | "right" | "bottom" | "top";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open. */
  open: boolean;
  /** Called when the drawer should open or close. */
  onOpenChange: (open: boolean) => void;
  /** The side from which the drawer slides in. Defaults to `"right"`. */
  side?: DrawerSide;
  children: ReactNode;
}
