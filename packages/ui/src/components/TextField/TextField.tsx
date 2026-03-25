import { forwardRef } from "react";
import { useId } from "../../hooks";
import type { TextFieldProps } from "./TextField.types";
import "./TextField.css";

const sizeMap: Record<string, string> = {
  sm: "mantle-textFieldSm",
  md: "mantle-textFieldMd",
  lg: "mantle-textFieldLg",
};

/**
 * A text field combining a label, input, description, and error message.
 *
 * @example
 * ```tsx
 * <TextField label="Email" description="We'll never share it." />
 * <TextField label="Name" error="Required" required />
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      description,
      error,
      required,
      color = "blue",
      size = "md",
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId("textfield");
    const id = idProp ?? generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;

    const describedBy = error
      ? errorId
      : description
        ? descriptionId
        : undefined;

    return (
      <div className="mantle-textFieldWrapper" data-color={color}>
        {label && (
          <label
            htmlFor={id}
            className={[
              "mantle-textFieldLabel",
              error && "mantle-textFieldLabelError",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
            {required && (
              <span className="mantle-textFieldRequired" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={[
            "mantle-textFieldInput",
            sizeMap[size],
            error && "mantle-textFieldInputError",
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
          <span id={errorId} className="mantle-textFieldError" role="alert">
            {error}
          </span>
        )}
        {!error && description && (
          <span id={descriptionId} className="mantle-textFieldDescription">
            {description}
          </span>
        )}
      </div>
    );
  },
);
