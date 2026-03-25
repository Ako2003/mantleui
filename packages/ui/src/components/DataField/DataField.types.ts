import type { HTMLAttributes, ReactNode } from "react";

export type DataFieldOrientation = "horizontal" | "vertical";

export interface DataFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** The label text. */
  label: string;
  /** The value to display. */
  value: ReactNode;
  /** Layout orientation. Defaults to `"vertical"`. */
  orientation?: DataFieldOrientation;
  /** Additional class name. */
  className?: string;
}
