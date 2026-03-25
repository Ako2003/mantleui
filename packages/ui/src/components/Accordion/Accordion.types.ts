import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** The currently open item values (controlled). */
  value?: string[];
  /** The initially open item values (uncontrolled). */
  defaultValue?: string[];
  /** Called when open items change. */
  onValueChange?: (value: string[]) => void;
  /** Whether multiple items can be open at once. Defaults to `false`. */
  multiple?: boolean;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item. */
  value: string;
  /** Whether this item is disabled. */
  disabled?: boolean;
}

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;
