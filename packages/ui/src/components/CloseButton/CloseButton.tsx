import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { CloseButtonProps } from "./CloseButton.types";
import "./CloseButton.css";

/**
 * A standardized close/dismiss button with an X icon.
 *
 * @example
 * ```tsx
 * <CloseButton onClick={handleClose} />
 * <CloseButton size="lg" color="red" />
 * ```
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(
    { size = "md", color = "blue", className, ...rest },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Close"
        data-color={dataColor}
        style={colorStyle}
        className={[
          "mantle-closebutton",
          `mantle-closebutton-${size}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <svg
          width={size === "sm" ? 12 : size === "md" ? 14 : 16}
          height={size === "sm" ? 12 : size === "md" ? 14 : 16}
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
      </button>
    );
  },
);

CloseButton.displayName = "CloseButton";
