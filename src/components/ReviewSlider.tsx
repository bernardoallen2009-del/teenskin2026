import { reviews } from "@/data/catalog";
import { StarRating } from "@/components/StarRating";
import styles from "@/styles/site.module.css";

export function ReviewSlider() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <span className={styles.eyebrow}>Reviews</span>
            <h2 className={styles.title}>Rotinas que cabem no dia a dia.</h2>
          </div>
        </div>
        <div className={styles.reviewSlider}>
          {reviews.map((review) => (
            <article className={styles.reviewCard} key={review.id}>
              <StarRating rating={review.rating} />
              <p className={styles.quote}>“{review.quote}”</p>
              <p>
                <strong>{review.name}</strong>
                <br />
                <span className={styles.muted}>{review.product}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
