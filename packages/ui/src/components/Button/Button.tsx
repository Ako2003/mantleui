import { type ElementType, type Ref, forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { ButtonProps } from "./Button.types";
import "./Button.css";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const variantMap: Record<string, string> = {
  solid: "mantle-solid",
  outline: "mantle-outline",
  ghost: "mantle-ghost",
};

const sizeMap: Record<string, string> = {
  sm: "mantle-sm",
  md: "mantle-md",
  lg: "mantle-lg",
};

function ButtonInner(
  {
    as,
    variant = "solid",
    size = "md",
    color = "blue",
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
  const { dataColor, colorStyle } = resolveColor(color);
  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={classNames(
        "mantle-button",
        variantMap[variant],
        sizeMap[size],
        isDisabled && "mantle-disabled",
        loading && "mantle-loading",
        className as string | undefined,
      )}
      {...rest}
    >
      {loading && <span className="mantle-spinner" aria-hidden="true" />}
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
