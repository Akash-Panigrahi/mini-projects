import { useRef, useState, type UIEvent } from "react";

const heights: number[] = [];
const heightsPrefix: number[] = [];

const list = Array.from({ length: 1000 }, (_, i) => {
  heights.push(Math.floor(Math.random() * (60 - 30 + 1)) + 30);
  heightsPrefix.push(heights[i] + (heightsPrefix[i - 1] || 0));

  return i + 1;
});

const MAX_CONTAINER_HEIGHT = 400;
const TOTAL_HEIGHT = heightsPrefix.at(-1) || 500;
const BUFFER = 5;

function getStartIndex(scrollTop: number) {
  let l = 0,
    r = heightsPrefix.length - 1;

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    if (heightsPrefix[mid] < scrollTop) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return l;
}

function getEndIndex(startIndex: number) {
  let height = 0;
  let endIndex = startIndex;

  while (endIndex < list.length && height < MAX_CONTAINER_HEIGHT) {
    height += heights[endIndex];
    endIndex++;
  }

  return endIndex;
}

function VirtualizedListVariableHeights() {
  const [scrollTop, setScrollTop] = useState(0);
  const rAFTicking = useRef(false);
  const startIndex = getStartIndex(scrollTop);
  const endIndex = getEndIndex(startIndex);

  const from = Math.max(0, startIndex - BUFFER);
  const to = Math.min(endIndex + BUFFER, list.length);

  const visibleItems = list.slice(from, to);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
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
        <div
          style={{
            translate: `0 ${from === 0 ? 0 : heightsPrefix[from - 1]}px`,
          }}
        >
          {visibleItems.map((item, i) => (
            <div
              key={item}
              style={{
                height: heights[i],
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

export default VirtualizedListVariableHeights;
