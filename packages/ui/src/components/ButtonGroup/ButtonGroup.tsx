import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { ButtonGroupProps } from "./ButtonGroup.types";
import "./ButtonGroup.css";

/**
 * Groups buttons together visually with connected borders and border-radius.
 *
 * @example
 * ```tsx
 * <ButtonGroup orientation="horizontal" variant="outline">
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      children,
      orientation = "horizontal",
      size,
      variant,
      color = "blue",
      pill = false,
      divider = false,
      className,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    const orientationClass =
      orientation === "vertical"
        ? "mantle-buttongroupVertical"
        : "mantle-buttongroupHorizontal";

    return (
      <div
        ref={ref}
        role="group"
        data-color={dataColor}
        style={colorStyle}
        data-orientation={orientation}
        data-size={size}
        data-variant={variant}
        className={[
          "mantle-buttongroup",
          orientationClass,
          pill && "mantle-buttongroupPill",
          divider && "mantle-buttongroupDivider",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
