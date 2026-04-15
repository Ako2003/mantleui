import { forwardRef, type ForwardedRef, type ReactElement } from "react";
import { Reorder } from "framer-motion";
import type { DragDropListProps } from "./DragDropList.types";
import "./DragDropList.css";

function DragHandleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="6" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="6" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="18" r="1" />
    </svg>
  );
}

/**
 * A reorderable list built on framer-motion's `Reorder` primitives.
 *
 * @example
 * ```tsx
 * <DragDropList
 *   items={items}
 *   onReorder={setItems}
 *   keyAccessor={(item) => item.id}
 *   renderItem={(item) => <span>{item.label}</span>}
 * />
 * ```
 */
function DragDropListInner<T>(
  {
    items,
    onReorder,
    renderItem,
    keyAccessor,
    className,
    ...rest
  }: DragDropListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) {
  const getKey = (item: T, index: number): string | number => {
    if (keyAccessor) return keyAccessor(item);
    if (typeof item === "string" || typeof item === "number") return item;
    return index;
  };

  return (
    <Reorder.Group
      ref={ref}
      as="ul"
      axis="y"
      values={items}
      onReorder={onReorder}
      className={["mantle-dragdroplist", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={getKey(item, index)}
          value={item}
          className="mantle-dragdroplist-item"
        >
          <span
            className="mantle-dragdroplist-handle"
            aria-label="Drag to reorder"
            role="button"
          >
            <DragHandleIcon />
          </span>
          <div className="mantle-dragdroplist-content">
            {renderItem(item, index)}
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

const DragDropListForwarded = forwardRef(DragDropListInner) as <T>(
  props: DragDropListProps<T> & { ref?: ForwardedRef<HTMLUListElement> },
) => ReactElement | null;

// forwardRef with generics loses the displayName typing — re-attach via cast.
(DragDropListForwarded as unknown as { displayName: string }).displayName =
  "DragDropList";

export const DragDropList = DragDropListForwarded;
