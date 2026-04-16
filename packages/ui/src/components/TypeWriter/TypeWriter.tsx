import { forwardRef, useEffect, useMemo, useState } from "react";
import type { TypeWriterProps } from "./TypeWriter.types";
import "./TypeWriter.css";

type Phase = "typing" | "pausing" | "deleting";

/**
 * Animated text typing effect that cycles through one or more strings.
 *
 * @example
 * ```tsx
 * <TypeWriter text={["Hello", "World"]} speed={60} />
 * ```
 */
export const TypeWriter = forwardRef<HTMLDivElement, TypeWriterProps>(
  function TypeWriter(
    {
      text,
      speed = 50,
      pauseDuration = 2000,
      loop = true,
      cursor = true,
      cursorChar = "|",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState("");
    const [phase, setPhase] = useState<Phase>("typing");

    useEffect(() => {
      const current = texts[index] ?? "";
      let timeout: ReturnType<typeof setTimeout>;

      if (phase === "typing") {
        if (display.length < current.length) {
          timeout = setTimeout(() => {
            setDisplay(current.slice(0, display.length + 1));
          }, speed);
        } else {
          timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
        }
      } else if (phase === "pausing") {
        const isLast = index === texts.length - 1;
        if (texts.length === 1 && !loop) {
          return;
        }
        if (isLast && !loop) {
          return;
        }
        timeout = setTimeout(() => setPhase("deleting"), 0);
      } else {
        if (display.length > 0) {
          timeout = setTimeout(() => {
            setDisplay(current.slice(0, display.length - 1));
          }, speed);
        } else {
          timeout = setTimeout(() => {
            setPhase("typing");
            setIndex((prev) => (prev + 1) % texts.length);
          }, 0);
        }
      }

      return () => clearTimeout(timeout);
    }, [display, phase, index, texts, speed, pauseDuration, loop]);

    return (
      <div
        ref={ref}
        className={["mantle-typewriter", className].filter(Boolean).join(" ")}
        style={style}
        {...rest}
      >
        <span>{display}</span>
        {cursor && (
          <span className="mantle-typewriter-cursor" aria-hidden="true">
            {cursorChar}
          </span>
        )}
      </div>
    );
  },
);

TypeWriter.displayName = "TypeWriter";
