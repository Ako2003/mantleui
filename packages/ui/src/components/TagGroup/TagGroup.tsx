import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { TagGroupProps, TagGroupTagProps } from "./TagGroup.types";
import "./TagGroup.css";

/**
 * A group of removable tags with a label.
 *
 * @example
 * ```tsx
 * <TagGroup label="Skills">
 *   <TagGroup.Tag value="react" onRemove={handleRemove}>React</TagGroup.Tag>
 *   <TagGroup.Tag value="ts" onRemove={handleRemove}>TypeScript</TagGroup.Tag>
 * </TagGroup>
 * ```
 */
const TagGroupRoot = forwardRef<HTMLDivElement, TagGroupProps>(
  function TagGroup({ label, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={["mantle-taggroup", className].filter(Boolean).join(" ")}
        {...rest}
      >
        <span className="mantle-taggroup-label">{label}</span>
        <div className="mantle-taggroup-tags">{children}</div>
      </div>
    );
  },
);

const Tag = forwardRef<HTMLSpanElement, TagGroupTagProps>(function Tag(
  { value, onRemove, color = "blue", children, className, ...rest },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  return (
    <span
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
      data-value={value}
      className={["mantle-tag", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${typeof children === "string" ? children : value}`}
          className="mantle-tag-remove"
          onClick={() => onRemove(value)}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 2l6 6M8 2l-6 6" />
          </svg>
        </button>
      )}
    </span>
  );
});

export const TagGroup = Object.assign(TagGroupRoot, {
  Tag,
});
