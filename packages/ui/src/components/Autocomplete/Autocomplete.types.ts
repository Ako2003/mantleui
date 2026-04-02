import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface AutocompleteOption {
  /** Unique value for this option. */
  value: string;
  /** Display label. Defaults to `value` if not provided. */
  label?: string;
}

export interface AutocompleteProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "color"
> {
  /** Available options. */
  options: AutocompleteOption[];
  /** The selected value (controlled). */
  value?: string;
  /** The initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Whether the autocomplete is disabled. */
  disabled?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Label text displayed above the input. */
  label?: string;
  /** Helper text displayed below the label. */
  description?: string;
  /** Error message. */
  error?: string;
  /** Message shown when no options match the search. */
  emptyMessage?: string;
}
