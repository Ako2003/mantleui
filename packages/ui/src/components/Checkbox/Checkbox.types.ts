import type { InputHTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "color"
> {
  /** Whether the checkbox is checked (controlled). */
  checked?: boolean;
  /** The initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Called when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the checkbox is in an indeterminate state. */
  indeterminate?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Label content displayed next to the checkbox. */
  label?: ReactNode;
}
