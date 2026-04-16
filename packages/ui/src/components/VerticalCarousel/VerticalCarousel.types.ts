import type { HTMLAttributes, ReactNode } from "react";

export interface VerticalCarouselProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onDrag"
> {
  /** The slides to render. */
  slides: ReactNode[];
  /** Controlled current slide index. */
  value?: number;
  /** Default current slide index (uncontrolled). Defaults to 0. */
  defaultValue?: number;
  /** Called when the current slide changes. */
  onValueChange?: (index: number) => void;
  /** Whether the carousel auto-advances. Defaults to false. */
  autoplay?: boolean;
  /** Autoplay interval in ms. Defaults to 3000. */
  interval?: number;
  /** Whether to wrap around at edges. Defaults to true. */
  loop?: boolean;
  /** Whether to show prev/next arrow buttons. Defaults to true. */
  showArrows?: boolean;
  /** Whether to show dot indicators. Defaults to true. */
  showDots?: boolean;
  /** Custom icon for the previous (up) button. Defaults to chevron-up. */
  prevIcon?: ReactNode;
  /** Custom icon for the next (down) button. Defaults to chevron-down. */
  nextIcon?: ReactNode;
  /** Viewport height in pixels. Defaults to 400. */
  height?: number;
}
