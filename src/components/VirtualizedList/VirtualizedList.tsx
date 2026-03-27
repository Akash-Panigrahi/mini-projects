import { useRef, useState } from "react";

const list = Array.from({ length: 1000 }, (_, i) => i);
const ITEM_HEIGHT = 40;
const MAX_CONTAINER_HEIGHT = 400;
const TOTAL_HEIGHT = ITEM_HEIGHT * list.length;
const BUFFER = 5;

function VirtualizedList() {
  const [scrollTop, setScrollTop] = useState(0);
  const rAFTicking = useRef(false);
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleCount = Math.ceil(MAX_CONTAINER_HEIGHT / ITEM_HEIGHT);
  const endIndex = startIndex + visibleCount;

  const from = Math.max(0, startIndex - BUFFER);
  const to = Math.min(endIndex + BUFFER, list.length);

  const visibleItems = list.slice(from, to);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;

    if (!rAFTicking.current) {
      requestAnimationFrame(() => {
        setScrollTop(scrollTop);
        rAFTicking.current = false;
      });
    }

    rAFTicking.current = true;
  };

  return (
    <div
      style={{ height: MAX_CONTAINER_HEIGHT, overflowY: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: TOTAL_HEIGHT }}>
        <div style={{ translate: `0 ${from * ITEM_HEIGHT}px` }}>
          {visibleItems.map((item) => (
            <div
              key={item}
              style={{
                height: ITEM_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                borderBottom: "1px solid #eee",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;
