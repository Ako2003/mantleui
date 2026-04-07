import type { HTMLAttributes, ReactNode } from "react";

export interface FlipCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content for the front side of the card. */
  front: ReactNode;
  /** Content for the back side of the card. */
  back: ReactNode;
  /** Width of the card. Defaults to 300. */
  width?: number | string;
  /** Height of the card. Defaults to 200. */
  height?: number | string;
  /** Flip direction. Defaults to "horizontal". */
  direction?: "horizontal" | "vertical";
  /** Flip duration in ms. Defaults to 600. */
  duration?: number;
  /** Whether the card is flipped (controlled). */
  flipped?: boolean;
  /** Called when the flip state changes. */
  onFlippedChange?: (flipped: boolean) => void;
  /** Border radius. Defaults to 12. */
  borderRadius?: number | string;
  /** Front side background. */
  frontBackground?: string;
  /** Back side background. */
  backBackground?: string;
  /** Border color. */
  borderColor?: string;
}
