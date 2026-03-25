import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { MantleColor } from "../../theme/colors";

export type LinkUnderline = "always" | "hover" | "none";

export interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  /** Accent color. Defaults to `"blue"`. */
  color?: MantleColor;
  /** Opens link in a new tab with secure rel attributes. */
  external?: boolean;
  /** Underline behavior. Defaults to `"hover"`. */
  underline?: LinkUnderline;
  /** Link content. */
  children?: ReactNode;
}
