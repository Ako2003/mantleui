import type { TextareaHTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "color"
> {
  /** Label text displayed above the textarea. */
  label?: string;
  /** Description text displayed below the textarea. */
  description?: string;
  /** Error message. When set, replaces the description and shows an error state. */
  error?: string;
  /** Whether the field is required. Shows an asterisk next to the label. */
  required?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Resize behavior. Defaults to `"vertical"`. */
  resize?: TextAreaResize;
}
