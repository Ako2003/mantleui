import { forwardRef, useCallback, useMemo, useState } from "react";
import { DisclosureGroupContext } from "./DisclosureGroup.context";
import type { DisclosureGroupProps } from "./DisclosureGroup.types";
import "./DisclosureGroup.css";

/**
 * Manages multiple Disclosure items, optionally restricting to one open at a time.
 *
 * @example
 * ```tsx
 * <DisclosureGroup>
 *   <Disclosure value="a">
 *     <Disclosure.Trigger>Section A</Disclosure.Trigger>
 *     <Disclosure.Content>Content A</Disclosure.Content>
 *   </Disclosure>
 *   <Disclosure value="b">
 *     <Disclosure.Trigger>Section B</Disclosure.Trigger>
 *     <Disclosure.Content>Content B</Disclosure.Content>
 *   </Disclosure>
 * </DisclosureGroup>
 * ```
 */
export const DisclosureGroup = forwardRef<HTMLDivElement, DisclosureGroupProps>(
  function DisclosureGroup(
    { allowMultiple = false, className, children, ...rest },
    ref,
  ) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggle = useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const isOpen = prev.includes(value);
          if (isOpen) {
            return prev.filter((v) => v !== value);
          }
          return allowMultiple ? [...prev, value] : [value];
        });
      },
      [allowMultiple],
    );

    const contextValue = useMemo(
      () => ({ openItems, toggle }),
      [openItems, toggle],
    );

    return (
      <DisclosureGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={["mantle-disclosure-group", className]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {children}
        </div>
      </DisclosureGroupContext.Provider>
    );
  },
);
