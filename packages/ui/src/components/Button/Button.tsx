import { type ElementType, type Ref, forwardRef } from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

function ButtonInner(
  {
    as,
    variant = "solid",
    size = "md",
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    children,
    className,
    ...rest
  }: ButtonProps<ElementType>,
  ref: Ref<HTMLElement>,
) {
  const Component = as ?? "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        loading && styles.loading,
        className as string | undefined,
      )}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && startIcon}
      {children}
      {!loading && endIcon}
    </Component>
  );
}

/**
 * A polymorphic button component that can render as any element type.
 *
 * @example
 * ```tsx
 * <Button variant="solid" size="md">Click me</Button>
 * <Button as="a" href="/about">About</Button>
 * ```
 */
export const Button = forwardRef(ButtonInner) as <
  C extends ElementType = "button",
>(
  props: ButtonProps<C>,
) => React.ReactElement | null;

(Button as { displayName?: string }).displayName = "Button";
