import { createContext, useContext } from "react";
import type { UsePopoverReturn } from "./Popover.types";

export const PopoverContext = createContext<UsePopoverReturn | null>(null);

export function usePopoverContext(): UsePopoverReturn {
  const context = useContext(PopoverContext);
  if (context === null) {
    throw new Error(
      "Popover compound components must be used within <Popover>",
    );
  }
  return context;
}
