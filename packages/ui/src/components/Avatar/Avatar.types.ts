import type { HTMLAttributes } from "react";
import type { MantleColor } from "../../theme/colors";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** User name for generating initials fallback. */
  name?: string;
  /** Size preset. */
  size?: AvatarSize;
  /** Accent color for the fallback background. Defaults to `"blue"`. */
  color?: MantleColor;
}
