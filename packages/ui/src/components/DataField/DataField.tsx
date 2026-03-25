import { forwardRef } from "react";
import type { DataFieldProps } from "./DataField.types";
import "./DataField.css";

/**
 * A read-only label + value display pair.
 *
 * @example
 * ```tsx
 * <DataField label="Name" value="John Doe" />
 * <DataField label="Status" value={<Badge>Active</Badge>} orientation="horizontal" />
 * ```
 */
export const DataField = forwardRef<HTMLDivElement, DataFieldProps>(
  function DataField(
    { label, value, orientation = "vertical", className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={[
          "mantle-dataField",
          orientation === "horizontal"
            ? "mantle-dataFieldHorizontal"
            : "mantle-dataFieldVertical",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className="mantle-dataFieldLabel">{label}</span>
        <span className="mantle-dataFieldValue">{value}</span>
      </div>
    );
  },
);
