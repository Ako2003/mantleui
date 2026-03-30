import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useControllable } from "../../hooks";
import { useId } from "../../hooks";
import type {
  DisclosureContentProps,
  DisclosureProps,
  DisclosureTriggerProps,
} from "./Disclosure.types";
import { useDisclosureGroupContext } from "../DisclosureGroup/DisclosureGroup.context";
import "./Disclosure.css";

interface DisclosureContextValue {
  isOpen: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
}

const DisclosureContext = createContext<DisclosureContextValue | null>(null);

function useDisclosureContext() {
  const ctx = useContext(DisclosureContext);
  if (!ctx) {
    throw new Error(
      "Disclosure compound components must be used within <Disclosure>",
    );
  }
  return ctx;
}

/* ─── Root ─── */

const DisclosureRoot = forwardRef<HTMLDivElement, DisclosureProps>(
  function DisclosureRoot(
    {
      open,
      defaultOpen = false,
      onOpenChange,
      value,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const group = useDisclosureGroupContext();

    // When inside a group, the group controls open state
    const isGroupControlled = group !== null && value !== undefined;
    const groupOpen = isGroupControlled
      ? group.openItems.includes(value as string)
      : undefined;

    const [isOpen, setIsOpen] = useControllable({
      value: isGroupControlled ? groupOpen : open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const id = useId("disclosure");
    const triggerId = `${id}-trigger`;
    const contentId = `${id}-content`;

    const toggle = useCallback(() => {
      if (isGroupControlled && value !== undefined) {
        group.toggle(value);
      } else {
        setIsOpen((prev: boolean) => !prev);
      }
    }, [isGroupControlled, value, group, setIsOpen]);

    const contextValue = useMemo(
      () => ({ isOpen, toggle, triggerId, contentId }),
      [isOpen, toggle, triggerId, contentId],
    );

    return (
      <DisclosureContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={["mantle-disclosure", className].filter(Boolean).join(" ")}
          {...rest}
        >
          {children}
        </div>
      </DisclosureContext.Provider>
    );
  },
);

/* ─── Trigger ─── */

const DisclosureTrigger = forwardRef<HTMLButtonElement, DisclosureTriggerProps>(
  function DisclosureTrigger({ className, children, onClick, ...rest }, ref) {
    const { isOpen, toggle, triggerId, contentId } = useDisclosureContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        toggle();
      }
    };

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={handleClick}
        className={["mantle-disclosure-trigger", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
        <ChevronIcon isOpen={isOpen} />
      </button>
    );
  },
);

/* ─── Content ─── */

const DisclosureContent = forwardRef<HTMLDivElement, DisclosureContentProps>(
  function DisclosureContent({ className, children, ...rest }, ref) {
    const { isOpen, triggerId, contentId } = useDisclosureContext();

    return (
      <div
        className={[
          "mantle-disclosure-contentWrapper",
          isOpen && "mantle-disclosure-contentWrapper--open",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={ref}
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={["mantle-disclosure-content", className]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {children}
        </div>
      </div>
    );
  },
);

/* ─── Chevron Icon ─── */

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={[
        "mantle-disclosure-chevron",
        isOpen && "mantle-disclosure-chevron--open",
      ]
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
 * An expand/collapse disclosure component.
 *
 * @example
 * ```tsx
 * <Disclosure defaultOpen={false}>
 *   <Disclosure.Trigger>Show more</Disclosure.Trigger>
 *   <Disclosure.Content>Hidden content</Disclosure.Content>
 * </Disclosure>
 * ```
 */
export const Disclosure = Object.assign(DisclosureRoot, {
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
});
