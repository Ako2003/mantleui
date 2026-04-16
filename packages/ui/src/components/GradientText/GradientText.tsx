import {
  forwardRef,
  useMemo,
  type ComponentType,
  type CSSProperties,
} from "react";
import type { GradientTextProps } from "./GradientText.types";
import "./GradientText.css";

const DEFAULT_COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"];

interface GradientCSSProperties extends CSSProperties {
  "--mantle-gradienttext-gradient"?: string;
  "--mantle-gradienttext-duration"?: string;
}

/**
 * Text with an animated gradient flowing across it.
 *
 * @example
 * ```tsx
 * <GradientText colors={["#f97316", "#ec4899", "#8b5cf6"]}>
 *   Hello world
 * </GradientText>
 * ```
 */
export const GradientText = forwardRef<HTMLElement, GradientTextProps>(
  function GradientText(
    {
      children,
      colors = DEFAULT_COLORS,
      duration = 3,
      as: Tag = "span",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const gradient = useMemo(() => {
      const source = colors.length === 0 ? DEFAULT_COLORS : colors;
      const first = source[0] ?? "#000";
      const last = source[source.length - 1] ?? first;
      const stops = first === last ? source : [...source, first];
      return `linear-gradient(90deg, ${stops.join(", ")})`;
    }, [colors]);

    const mergedStyle: GradientCSSProperties = {
      "--mantle-gradienttext-gradient": gradient,
      "--mantle-gradienttext-duration": `${duration}s`,
      ...style,
    };

    const Component = Tag as ComponentType<Record<string, unknown>>;
    return (
      <Component
        ref={ref}
        className={["mantle-gradienttext", className].filter(Boolean).join(" ")}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

GradientText.displayName = "GradientText";
