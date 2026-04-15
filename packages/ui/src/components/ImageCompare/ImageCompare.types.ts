import type { HTMLAttributes } from "react";

type DivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

export interface ImageCompareProps extends DivAttributes {
  /** URL of the "before" image (shown fully underneath). */
  beforeImage: string;
  /** URL of the "after" image (clipped by the slider). */
  afterImage: string;
  /** Alt text for the before image. */
  beforeAlt?: string;
  /** Alt text for the after image. */
  afterAlt?: string;
  /** Initial slider position in percent (0-100). Defaults to 50. */
  defaultPosition?: number;
  /** Height of the compare area. Defaults to 400. */
  height?: number | string;
  /** Color of the draggable handle. Defaults to white. */
  handleColor?: string;
}
