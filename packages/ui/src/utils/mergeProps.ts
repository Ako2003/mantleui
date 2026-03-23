type AnyProps = Record<string, unknown>;

/**
 * Merges multiple props objects. Event handlers (on*) are chained
 * so that all handlers fire. Class names are concatenated.
 * Later values override earlier ones for all other props.
 */
export function mergeProps(...propsList: AnyProps[]): AnyProps {
  const result: AnyProps = {};

  for (const props of propsList) {
    for (const key of Object.keys(props)) {
      const existing = result[key];
      const incoming = props[key];

      if (
        key === "className" &&
        typeof existing === "string" &&
        typeof incoming === "string"
      ) {
        result[key] = `${existing} ${incoming}`.trim();
      } else if (
        key === "style" &&
        typeof existing === "object" &&
        typeof incoming === "object"
      ) {
        result[key] = { ...(existing as object), ...(incoming as object) };
      } else if (
        isEventHandler(key) &&
        typeof existing === "function" &&
        typeof incoming === "function"
      ) {
        result[key] = chainHandlers(
          existing as (...args: unknown[]) => void,
          incoming as (...args: unknown[]) => void,
        );
      } else {
        result[key] = incoming;
      }
    }
  }

  return result;
}

function isEventHandler(key: string): boolean {
  return (
    key.length > 2 && key.startsWith("on") && key[2] === key[2]?.toUpperCase()
  );
}

function chainHandlers(
  ...handlers: ((...args: unknown[]) => void)[]
): (...args: unknown[]) => void {
  return (...args) => {
    for (const handler of handlers) {
      handler(...args);
    }
  };
}
