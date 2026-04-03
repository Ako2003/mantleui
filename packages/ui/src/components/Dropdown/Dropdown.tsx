import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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
  triggerNodeRef: React.RefObject<HTMLButtonElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
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

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        setTriggerNode,
        triggerNodeRef,
        containerRef,
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
  function DropdownTrigger({ children, onClick, asChild, ...rest }, ref) {
    const { isOpen, setIsOpen, setTriggerNode, setFocusedIndex } =
      useDropdownContext();

    const handleRef = (node: HTMLElement | null) => {
      setTriggerNode(node as HTMLButtonElement | null);
      if (typeof ref === "function") ref(node as HTMLButtonElement | null);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          node as HTMLButtonElement | null;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
      setIsOpen(!isOpen);
      setFocusedIndex(-1);
    };

    if (asChild) {
      return (
        <div
          ref={handleRef}
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(e as unknown as React.MouseEvent<HTMLElement>);
            }
          }}
          className="mantle-dropdown-trigger-wrapper"
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    return (
      <button
        ref={handleRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen ? "true" : "false"}
        onClick={handleClick}
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
    const {
      isOpen,
      setIsOpen,
      focusedIndex,
      setFocusedIndex,
      setItemCount,
      triggerNodeRef,
      containerRef,
    } = useDropdownContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<NodeListOf<HTMLElement> | null>(null);
    const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({});
    const count = Children.count(children);

    // Position the menu below the trigger
    useLayoutEffect(() => {
      if (!isOpen || !triggerNodeRef.current) return;
      const rect = triggerNodeRef.current.getBoundingClientRect();
      setPortalStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        minWidth: rect.width,
      });
    }, [isOpen, triggerNodeRef]);

    // Update position on scroll/resize
    useEffect(() => {
      if (!isOpen || !triggerNodeRef.current) return;
      const update = () => {
        const rect = triggerNodeRef.current?.getBoundingClientRect();
        if (rect) {
          setPortalStyle({
            position: "fixed",
            top: rect.bottom + 4,
            left: rect.left,
            minWidth: rect.width,
          });
        }
      };
      window.addEventListener("scroll", update, true);
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", update, true);
        window.removeEventListener("resize", update);
      };
    }, [isOpen, triggerNodeRef]);

    // Close on click outside (must check both container and portaled menu)
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (containerRef.current?.contains(target)) return;
        if (menuRef.current?.contains(target)) return;
        setIsOpen(false);
        setFocusedIndex(-1);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, setIsOpen, setFocusedIndex, containerRef]);

    useEffect(() => {
      setItemCount(count);
    }, [count, setItemCount]);

    // Cache menu items when menu opens or children change
    useEffect(() => {
      if (isOpen && menuRef.current) {
        menuItemsRef.current = menuRef.current.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])',
        );
      } else {
        menuItemsRef.current = null;
      }
    }, [isOpen, count]);

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
          const focused = menuItemsRef.current?.item(focusedIndex) as
            | HTMLElement
            | null
            | undefined;
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

    if (typeof document === "undefined") return null;

    return createPortal(
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-children
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
        style={portalStyle}
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
      </div>,
      document.body,
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
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-children
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled ? "true" : undefined}
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
