import { useState } from "react";
import "./styles.css";

function StarRatingHalf({ count = 5 }) {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);

  const getStarValue = (e: any, index: number) => {
    const isHalf = e.nativeEvent.offsetX < e.nativeEvent.target.offsetWidth / 2;
    return isHalf ? index - 0.5 : index;
  };

  const handleClick = (e: any, index: number) => {
    setRating(getStarValue(e, index));
  };

  const handleMouseMove = (e: any, index: number) => {
    setHover(getStarValue(e, index));
  };

  const renderStars = () =>
    Array.from({ length: count }, (_, i) => {
      const index = i + 1;
      const isFull = hover >= index || rating >= index;
      const isHalf = hover === index - 0.5 || rating === index - 0.5;

      return (
        <div
          className={`star ${isFull ? "full" : isHalf ? "half" : ""}`}
          onClick={(e) => handleClick(e, index)}
          onMouseMove={(e) => handleMouseMove(e, index)}
        >
          ★
        </div>
      );
    });

  return (
    <div className="star-rating" onMouseLeave={() => setHover(0)}>
      {renderStars()}
    </div>
  );
}

export default StarRatingHalf;
