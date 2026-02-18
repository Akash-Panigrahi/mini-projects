import { useState } from "react";

type StarProps = {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function Star({
  filled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: StarProps) {
  return (
    <button
      style={{
        color: filled ? "yellow" : "#d1d5db",
        fontSize: "28px",
        lineHeight: "1",
        padding: 4,
        background: "none",
        border: "none",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </button>
  );
}

function StarRating({ count = 5 }) {
  const [value, setValue] = useState(3);
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return Array.from({ length: count }, (_, i) => {
    const starValue = i + 1;

    return (
      <Star
        key={i}
        filled={starValue <= displayValue}
        onClick={() => setValue(value === starValue ? 0 : starValue)}
        onMouseEnter={() => setHovered(starValue)}
        onMouseLeave={() => setHovered(null)}
      />
    );
  });
}

export default StarRating;
