import type { ReactNode } from "react";

export type AccordionItemType = {
  id: string;
  title: string;
  content: ReactNode;
};

export type AccordionProps = {
  items: AccordionItemType[];
  allowMultiple?: boolean;
};

export type AccordionItemProps = {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
};
