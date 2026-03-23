import { createContext, useContext } from "react";

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
  multiple: boolean;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
);

export const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error(
      "Accordion compound components must be used within <Accordion>",
    );
  }
  return context;
}

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (context === null) {
    throw new Error(
      "Accordion.Trigger and Accordion.Content must be used within <Accordion.Item>",
    );
  }
  return context;
}
