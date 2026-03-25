import { createContext, useContext } from "react";

export interface DisclosureGroupContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

export const DisclosureGroupContext =
  createContext<DisclosureGroupContextValue | null>(null);

export function useDisclosureGroupContext(): DisclosureGroupContextValue | null {
  return useContext(DisclosureGroupContext);
}
