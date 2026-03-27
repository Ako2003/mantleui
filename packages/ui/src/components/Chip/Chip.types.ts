import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface ChipProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Visual style variant. Defaults to `"solid"`. */
  variant?: "solid" | "outline";
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
  /** When provided, a dismiss (X) button is shown. Called when dismissed. */
  onDismiss?: () => void;
  /** Whether the chip is selected. */
  selected?: boolean;
  /** Called when the selected state changes. */
  onSelectedChange?: (selected: boolean) => void;
  /** Whether the chip is disabled. */
  disabled?: boolean;
  /** Optional icon rendered before children. */
  startIcon?: ReactNode;
  /** Chip content. */
  children?: ReactNode;
}
