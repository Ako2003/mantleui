import type { HTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export interface TagGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Label for the tag group. */
  label: string;
  /** TagGroup.Tag children. */
  children: ReactNode;
}

export interface TagGroupTagProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Unique value for this tag. */
  value: string;
  /** Called when the tag is removed. When provided, a remove button is shown. */
  onRemove?: (value: string) => void;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Tag content. */
  children: ReactNode;
}
