import type { ElementType, ReactNode } from "react";
import type { PolymorphicComponentPropsWithRef } from "../../utils";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonOwnProps {
  /** Visual style variant. */
  variant?: ButtonVariant;
  /** Size preset. */
  size?: ButtonSize;
  /** Shows a loading spinner and disables interaction. */
  loading?: boolean;
  /** Element placed before the label. */
  startIcon?: ReactNode;
  /** Element placed after the label. */
  endIcon?: ReactNode;
}

export type ButtonProps<C extends ElementType = "button"> =
  PolymorphicComponentPropsWithRef<C, ButtonOwnProps>;
