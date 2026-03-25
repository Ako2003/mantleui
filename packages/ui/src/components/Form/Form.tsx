import { forwardRef, useCallback } from "react";
import type { FormProps } from "./Form.types";
import "./Form.css";

/**
 * Styled form wrapper that prevents default submit and uses custom validation.
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <TextField label="Name" />
 *   <Button type="submit">Save</Button>
 * </Form>
 * ```
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { onSubmit, className, children, ...rest },
  ref,
) {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    },
    [onSubmit],
  );

  return (
    <form
      ref={ref}
      noValidate
      onSubmit={handleSubmit}
      className={["mantle-form", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </form>
  );
});

Form.displayName = "Form";
