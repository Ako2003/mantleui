import type { ElementType, HTMLAttributes, ReactNode } from "react";

type DivAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "onDrag" | "onAnimationStart"
>;

export interface GradientTextProps extends DivAttributes {
  /** Text content. */
  children: ReactNode;
  /** Gradient stops. The first color is appended automatically for a seamless loop. */
  colors?: string[];
  /** Duration of one full animation cycle in seconds. Defaults to 3. */
  duration?: number;
  /** The element to render. Defaults to `"span"`. */
  as?: ElementType;
}
