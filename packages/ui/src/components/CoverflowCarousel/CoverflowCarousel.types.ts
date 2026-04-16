import type { HTMLAttributes, ReactNode } from "react";

export interface CoverflowCarouselProps extends Omit<
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
  /** rotateY angle (degrees) applied to side slides. Defaults to 30. */
  rotateAngle?: number;
  /** Horizontal distance (px) between adjacent slides. Defaults to 150. */
  slideDistance?: number;
}
