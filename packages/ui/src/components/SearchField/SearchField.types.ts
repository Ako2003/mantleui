import type { ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type SearchFieldSize = "sm" | "md" | "lg";

export interface SearchFieldProps {
  /** Controlled value. */
  value?: string;
  /** Default value for uncontrolled mode. */
  defaultValue?: string;
  /** Called when the value changes. */
  onValueChange?: (value: string) => void;
  /** Called when the clear button is clicked. */
  onClear?: () => void;
  /** Placeholder text. Defaults to `"Search..."`. */
  placeholder?: string;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Size preset. Defaults to `"md"`. */
  size?: SearchFieldSize;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Additional CSS class name. */
  className?: string;
  /** Custom icon to replace the default magnifying glass. */
  startIcon?: ReactNode;
}
