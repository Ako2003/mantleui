import type { HTMLAttributes } from "react";

export interface ThumbnailImage {
  /** Image source URL. */
  src: string;
  /** Accessible alt text. */
  alt?: string;
}

export interface ThumbnailCarouselProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onDrag"
> {
  /** Images to display. */
  images: ThumbnailImage[];
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
}
