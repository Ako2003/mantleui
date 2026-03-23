import { useId as useReactId } from "react";

/**
 * Generates a deterministic, unique ID. Uses React's built-in useId
 * for SSR-safe ID generation, with an optional prefix for readability.
 */
export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
