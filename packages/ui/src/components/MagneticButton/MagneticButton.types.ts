import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface MagneticButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
> {
  /** Button content. */
  children: ReactNode;
  /** Magnetic strength factor (0-1). Defaults to 0.3. */
  strength?: number;
}
