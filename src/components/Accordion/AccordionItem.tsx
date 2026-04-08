import { useLayoutEffect, useRef, useState } from "react";
import type { AccordionItemProps } from "./types";

function AccordionItem(props: AccordionItemProps) {
  const { item, isOpen, onToggle } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [item]);

  return (
    <div key={item.id} className="accordion-item">
      <div className="accordion-title">
        <h3>{item.title}</h3>
        <button onClick={onToggle}>{isOpen ? "△" : "▽"}</button>
      </div>

      <div
        className="accordion-content"
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={ref}>{item.content}</div>
      </div>
    </div>
  );
}

export default AccordionItem;
