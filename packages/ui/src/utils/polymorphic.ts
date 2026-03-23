import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from "react";

/**
 * Extracts props that are specific to a component, excluding those
 * that come from the underlying element type.
 */
type PropsOf<C extends ElementType> = ComponentPropsWithoutRef<C>;

/**
 * Props added by the polymorphic `as` pattern.
 */
interface AsProp<C extends ElementType> {
  /** The element type to render as. */
  as?: C;
}

/**
 * Combines own component props with the polymorphic `as` prop,
 * omitting any own props from the element's native props to avoid conflicts.
 */
export type PolymorphicComponentProps<
  C extends ElementType,
  OwnProps = object,
> = PropsWithChildren<OwnProps & AsProp<C>> &
  Omit<PropsOf<C>, keyof OwnProps | "as">;

/**
 * Same as PolymorphicComponentProps but includes the `ref` prop,
 * correctly typed for the polymorphic element.
 */
export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  OwnProps = object,
> = PolymorphicComponentProps<C, OwnProps> & {
  ref?: PolymorphicRef<C>;
};

/**
 * Extracts the correct ref type for a given element type.
 */
export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>["ref"];
