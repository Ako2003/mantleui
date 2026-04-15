import type { HTMLAttributes, ReactNode } from "react";

export interface CardCarouselProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onDrag"
> {
  /** The slides/cards to render. */
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
  /** Scale factor applied to the previous/next peek cards. Defaults to 0.85. */
  peekScale?: number;
  /** Opacity applied to the previous/next peek cards. Defaults to 0.6. */
  peekOpacity?: number;
  /**
   * Horizontal distance (as percent of slide width) from center where the
   * peek cards are positioned. Higher values push side cards further out.
   * Defaults to 60.
   */
  peekDistance?: number;
  /** Whether to show prev/next arrow buttons. Defaults to false. */
  showArrows?: boolean;
  /** Whether to show dot indicators below the cards. Defaults to false. */
  showDots?: boolean;
  /** Custom icon for the previous button. Defaults to a chevron-left. */
  prevIcon?: ReactNode;
  /** Custom icon for the next button. Defaults to a chevron-right. */
  nextIcon?: ReactNode;
}
