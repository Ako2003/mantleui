import { forwardRef } from "react";
import { useId } from "../../hooks";
import { resolveColor } from "../../utils";
import type { TextAreaProps } from "./TextArea.types";
import "./TextArea.css";

const resizeMap: Record<string, string> = {
  none: "mantle-textAreaResizeNone",
  vertical: "mantle-textAreaResizeVertical",
  horizontal: "mantle-textAreaResizeHorizontal",
  both: "mantle-textAreaResizeBoth",
};

/**
 * A multi-line text area with label, description, and error support.
 *
 * @example
 * ```tsx
 * <TextArea label="Bio" description="Tell us about yourself." />
 * <TextArea label="Notes" error="Too long" resize="none" />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      description,
      error,
      required,
      color = "blue",
      resize = "vertical",
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) {
    const { dataColor, colorStyle } = resolveColor(color);
    const generatedId = useId("textarea");
    const id = idProp ?? generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;

    const describedBy = error
      ? errorId
      : description
        ? descriptionId
        : undefined;

    return (
      <div className="mantle-textAreaWrapper" data-color={dataColor} style={colorStyle}>
        {label && (
          <label
            htmlFor={id}
            className={[
              "mantle-textAreaLabel",
              error && "mantle-textAreaLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
            {required && (
              <span className="mantle-textAreaRequired" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={[
            "mantle-textAreaInput",
            resizeMap[resize],
            error && "mantle-textAreaInputError",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          {...rest}
        />
        {error && (
          <span id={errorId} className="mantle-textAreaError" role="alert">
            {error}
          </span>
        )}
        {!error && description && (
          <span id={descriptionId} className="mantle-textAreaDescription">
            {description}
          </span>
        )}
      </div>
    );
  },
);
