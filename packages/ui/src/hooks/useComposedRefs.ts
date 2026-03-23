import { useCallback } from "react";
import type { Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * Composes multiple refs into a single callback ref.
 * Useful when a component needs to forward its ref while also
 * keeping an internal ref.
 */
export function useComposedRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T | null) => void {
  return useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        setRef(ref, node as T);
      }
    },
    // refs is a rest param spread — we want to re-create when any ref changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
