import type { FormHTMLAttributes } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Called on form submission. `preventDefault` is called automatically. */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
