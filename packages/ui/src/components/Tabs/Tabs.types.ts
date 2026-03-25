import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** The currently active tab value (controlled). */
  value?: string;
  /** The initially active tab value (uncontrolled). */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying this tab. */
  value: string;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** The tab value this content is associated with. */
  value: string;
}
