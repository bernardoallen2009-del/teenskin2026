import { Star } from "lucide-react";
import styles from "@/styles/site.module.css";
import { clampRating } from "@/lib/format";

type StarRatingProps = {
  rating: number;
  count?: number;
};

export function StarRating({ rating, count }: StarRatingProps) {
  const value = clampRating(rating);

  return (
    <span className={styles.ratingRow} aria-label={`${value.toFixed(1)} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(value);
        return (
          <Star
            key={index}
            aria-hidden="true"
            size={16}
            fill={filled ? "currentColor" : "none"}
            strokeWidth={1.8}
          />
        );
      })}
      <span>{value.toFixed(1)}</span>
      {typeof count === "number" ? <span className={styles.muted}>({count})</span> : null}
    </span>
  );
}
