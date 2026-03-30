import { forwardRef } from "react";
import type { MantleColor } from "../../theme/colors";
import { resolveColor } from "../../utils";
import type { AlertProps, AlertVariant } from "./Alert.types";
import "./Alert.css";

const variantColorMap: Record<AlertVariant, MantleColor> = {
  info: "blue",
  success: "green",
  warning: "yellow",
  error: "red",
};

const variantIconMap: Record<AlertVariant, string> = {
  info: "\u2139\uFE0F",
  success: "\u2705",
  warning: "\u26A0\uFE0F",
  error: "\u274C",
};

/**
 * An alert banner for info, success, warning, or error messages.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Saved!">Your changes have been saved.</Alert>
 * <Alert variant="error" title="Error" onDismiss={() => {}}>Something went wrong.</Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "info", title, children, onDismiss, className, ...rest },
  ref,
) {
  const color = variantColorMap[variant];
  const { dataColor, colorStyle } = resolveColor(color);

  return (
    <div
      ref={ref}
      role="alert"
      data-color={dataColor}
      style={colorStyle}
      className={["mantle-alert", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className="mantle-alert-icon" aria-hidden="true">
        {variantIconMap[variant]}
      </span>
      <div className="mantle-alert-content">
        {title && <p className="mantle-alert-title">{title}</p>}
        {children && <div className="mantle-alert-description">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="mantle-alert-dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          {"\u2715"}
        </button>
      )}
    </div>
  );
});

Alert.displayName = "Alert";
