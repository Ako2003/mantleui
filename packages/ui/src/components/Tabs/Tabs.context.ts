import { createContext, useContext } from "react";
import type { TabsOrientation, TabsVariant } from "./Tabs.types";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
  variant: TabsVariant;
  orientation: TabsOrientation;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return context;
}
