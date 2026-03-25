import { forwardRef, useCallback, useMemo } from "react";
import { useControllable } from "../../hooks";
import { useId } from "../../hooks";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./Accordion.context";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./Accordion.types";
import "./Accordion.css";

/* ─── Root ─── */

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  function AccordionRoot(
    {
      value,
      defaultValue = [],
      onValueChange,
      multiple = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const [openItems, setOpenItems] = useControllable({
      value,
      defaultValue,
      onChange: onValueChange,
    });

    const toggle = useCallback(
      (itemValue: string) => {
        setOpenItems((prev: string[]) => {
          const isOpen = prev.includes(itemValue);
          if (isOpen) {
            return prev.filter((v) => v !== itemValue);
          }
          return multiple ? [...prev, itemValue] : [itemValue];
        });
      },
      [multiple, setOpenItems],
    );

    const contextValue = useMemo(
      () => ({ openItems, toggle, multiple }),
      [openItems, toggle, multiple],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={["mantle-accordion", className].filter(Boolean).join(" ")}
          {...rest}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

/* ─── Item ─── */

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(
    { value, disabled = false, className, children, ...rest },
    ref,
  ) {
    const { openItems } = useAccordionContext();
    const isOpen = openItems.includes(value);
    const id = useId("accordion");
    const triggerId = `${id}-trigger`;
    const contentId = `${id}-content`;

    const itemContext = useMemo(
      () => ({ value, isOpen, disabled, triggerId, contentId }),
      [value, isOpen, disabled, triggerId, contentId],
    );

    return (
      <AccordionItemContext.Provider value={itemContext}>
        <div
          ref={ref}
          className={["mantle-item", className].filter(Boolean).join(" ")}
          {...rest}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

/* ─── Trigger ─── */

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, onClick, ...rest }, ref) {
    const { toggle } = useAccordionContext();
    const { value, isOpen, disabled, triggerId, contentId } =
      useAccordionItemContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        toggle(value);
      }
    };

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        onClick={handleClick}
        className={["mantle-trigger", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
        <ChevronIcon isOpen={isOpen} />
      </button>
    );
  },
);

/* ─── Content ─── */

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...rest }, ref) {
    const { isOpen, triggerId, contentId } = useAccordionItemContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={["mantle-contentBody", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* ─── Chevron Icon ─── */

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={["mantle-chevron", isOpen && "mantle-chevronOpen"]
        .filter(Boolean)
        .join(" ")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Compound Export ─── */

/**
 * An accordion component using the compound component pattern.
 *
 * @example
 * ```tsx
 * <Accordion defaultValue={["item-1"]}>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Section 1</Accordion.Trigger>
 *     <Accordion.Content>Content 1</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
