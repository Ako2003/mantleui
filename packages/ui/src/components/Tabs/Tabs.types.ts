import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type TabsVariant = "underline" | "pill";
export type TabsOrientation = "horizontal" | "vertical";

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
  /** Visual variant. Defaults to `"underline"`. */
  variant?: TabsVariant;
  /** Layout orientation. Defaults to `"horizontal"`. */
  orientation?: TabsOrientation;
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
