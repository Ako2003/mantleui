import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { resolveColor } from "../../utils";
import type {
  DropdownItemProps,
  DropdownMenuProps,
  DropdownProps,
  DropdownTriggerProps,
} from "./Dropdown.types";
import "./Dropdown.css";

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setTriggerNode: (node: HTMLButtonElement | null) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  itemCount: number;
  setItemCount: (count: number) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(
      "Dropdown compound components must be used within <Dropdown>.",
    );
  }
  return ctx;
}

/**
 * A dropdown menu with a trigger button.
 *
 * @example
 * ```tsx
 * <Dropdown>
 *   <Dropdown.Trigger>Actions</Dropdown.Trigger>
 *   <Dropdown.Menu>
 *     <Dropdown.Item onSelect={() => console.log("edit")}>Edit</Dropdown.Item>
 *     <Dropdown.Item onSelect={() => console.log("delete")}>Delete</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 * ```
 */
function DropdownRoot({ children, color = "blue" }: DropdownProps) {
  const { dataColor, colorStyle } = resolveColor(color);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [itemCount, setItemCount] = useState(0);
  const triggerNodeRef = useRef<HTMLButtonElement | null>(null);
  const setTriggerNode = useCallback((node: HTMLButtonElement | null) => {
    triggerNodeRef.current = node;
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      setIsOpen(false);
      setFocusedIndex(-1);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        setTriggerNode,
        focusedIndex,
        setFocusedIndex,
        itemCount,
        setItemCount,
      }}
    >
      <div
        ref={containerRef}
        className="mantle-dropdown"
        data-color={dataColor}
        style={colorStyle}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  function DropdownTrigger({ children, onClick, ...rest }, ref) {
    const { isOpen, setIsOpen, setTriggerNode, setFocusedIndex } =
      useDropdownContext();

    const handleRef = (node: HTMLButtonElement | null) => {
      setTriggerNode(node);
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          node;
    };

    return (
      <button
        ref={handleRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={(e) => {
          onClick?.(e);
          setIsOpen(!isOpen);
          setFocusedIndex(-1);
        }}
        className="mantle-dropdown-trigger"
        {...rest}
      >
        {children}
      </button>
    );
  },
);

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu({ children, ...rest }, ref) {
    const { isOpen, setIsOpen, focusedIndex, setFocusedIndex, setItemCount } =
      useDropdownContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const count = Children.count(children);

    useEffect(() => {
      setItemCount(count);
    }, [count, setItemCount]);

    // Auto-focus menu when opened
    useEffect(() => {
      if (isOpen) {
        menuRef.current?.focus();
      }
    }, [isOpen]);

    // Close on Escape (document level)
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen, setIsOpen, setFocusedIndex]);

    if (!isOpen) return null;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setFocusedIndex(
            focusedIndex + 1 < count ? focusedIndex + 1 : focusedIndex,
          );
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setFocusedIndex(
            focusedIndex - 1 >= 0 ? focusedIndex - 1 : focusedIndex,
          );
          break;
        }
        case "Enter": {
          e.preventDefault();
          const items = (e.currentTarget as HTMLElement).querySelectorAll(
            '[role="menuitem"]:not([aria-disabled="true"])',
          );
          const focused = items.item(focusedIndex) as HTMLElement | null;
          focused?.click();
          break;
        }
        case "Escape": {
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        }
      }
    };

    return (
      <div
        ref={(node) => {
          (menuRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        role="menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="mantle-dropdown-menu"
        {...rest}
      >
        {Children.map(children, (child, index) => {
          if (!child || typeof child !== "object" || !("props" in child))
            return child;
          return (
            <DropdownItemContext.Provider value={{ index }}>
              {child}
            </DropdownItemContext.Provider>
          );
        })}
      </div>
    );
  },
);

const DropdownItemContext = createContext<{ index: number }>({ index: -1 });

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  function DropdownItem(
    { onSelect, disabled = false, children, ...rest },
    ref,
  ) {
    const { setIsOpen, focusedIndex, setFocusedIndex } = useDropdownContext();
    const { index } = useContext(DropdownItemContext);
    const isFocused = index === focusedIndex;

    const handleSelect = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      setIsOpen(false);
      setFocusedIndex(-1);
    }, [disabled, onSelect, setIsOpen, setFocusedIndex]);

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled || undefined}
        tabIndex={-1}
        onClick={handleSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            e.preventDefault();
            handleSelect();
          }
        }}
        className={[
          "mantle-dropdown-item",
          isFocused && "mantle-dropdown-item-focused",
          disabled && "mantle-dropdown-item-disabled",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
});
