import type { HTMLAttributes } from "react";

export interface TypeWriterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Text or list of texts to cycle through. */
  text: string | string[];
  /** Milliseconds per character while typing or deleting. Defaults to 50. */
  speed?: number;
  /** Pause in milliseconds after a word finishes typing. Defaults to 2000. */
  pauseDuration?: number;
  /** Whether to loop through the text list. Defaults to true. */
  loop?: boolean;
  /** Whether to render the blinking cursor. Defaults to true. */
  cursor?: boolean;
  /** Cursor character. Defaults to "|". */
  cursorChar?: string;
}
