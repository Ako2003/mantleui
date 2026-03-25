import { forwardRef } from "react";
import { Autocomplete } from "../Autocomplete/Autocomplete";
import type { ComboBoxProps } from "./ComboBox.types";

/**
 * A searchable combobox input with dropdown suggestions.
 * This is a thin wrapper around `Autocomplete` with the same API.
 *
 * @example
 * ```tsx
 * <ComboBox
 *   label="Fruit"
 *   placeholder="Search fruits..."
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *   ]}
 * />
 * ```
 */
export const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(
  function ComboBox(props, ref) {
    return <Autocomplete ref={ref} {...props} />;
  },
);

ComboBox.displayName = "ComboBox";
