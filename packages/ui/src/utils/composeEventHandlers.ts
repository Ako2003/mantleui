/**
 * Composes two event handlers so that the external (consumer) handler
 * runs first. If it calls `event.preventDefault()`, the internal handler
 * is skipped. This lets consumers override default component behavior.
 */
export function composeEventHandlers<E>(
  externalHandler: ((event: E) => void) | undefined,
  internalHandler: (event: E) => void,
): (event: E) => void {
  return (event: E) => {
    externalHandler?.(event);

    if (!(event as unknown as { defaultPrevented: boolean }).defaultPrevented) {
      internalHandler(event);
    }
  };
}
