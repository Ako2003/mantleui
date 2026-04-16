import type { HTMLAttributes, ReactNode } from "react";

export interface ParallaxSlide {
  /** URL of the background image for the slide. */
  image: string;
  /** Foreground content rendered over the image. */
  content: ReactNode;
}

export interface ParallaxCarouselProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onDrag"
> {
  /** The slides to render. */
  slides: ParallaxSlide[];
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
  /** Custom icon for the previous button. Defaults to a chevron-left. */
  prevIcon?: ReactNode;
  /** Custom icon for the next button. Defaults to a chevron-right. */
  nextIcon?: ReactNode;
}
