import { useState, useTransition } from "react";
import type { AccordionItemType, AccordionProps } from "./types";
import "./style.css";
import AccordionItem from "./AccordionItem";

function Accordion(props: AccordionProps) {
  const { items, allowMultiple = false } = props;

  const [openItems, setOpenItems] = useState(new Set());
  const [isPending, startTransition] = useTransition();

  const handleItemToggle = (id: AccordionItemType["id"]) => {
    startTransition(() => {
      setOpenItems((prev) => {
        if (allowMultiple) {
          const next = new Set(prev);

          if (next.has(id)) next.delete(id);
          else next.add(id);

          return next;
        }

        if (prev.has(id)) {
          return new Set();
        }

        return new Set([id]);
      });
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          isOpen={isPending || openItems.has(item.id)}
          item={item}
          onToggle={() => handleItemToggle(item.id)}
        />
      ))}
    </div>
  );
}

export default Accordion;
