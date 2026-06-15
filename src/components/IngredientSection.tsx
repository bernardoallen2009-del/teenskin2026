import { Droplets, ShieldCheck, SunMedium } from "lucide-react";
import { ingredientHighlights } from "@/data/catalog";
import styles from "@/styles/site.module.css";

function IngredientIcon({ icon }: { icon: string }) {
  if (icon === "shield") {
    return <ShieldCheck size={24} aria-hidden="true" />;
  }

  if (icon === "sun") {
    return <SunMedium size={24} aria-hidden="true" />;
  }

  return <Droplets size={24} aria-hidden="true" />;
}

export function IngredientSection() {
  return (
    <section className={styles.ingredientBand}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <span className={styles.eyebrow}>Ingredientes sem drama</span>
            <h2 className={styles.title}>O que entra na tua rotina deve fazer sentido.</h2>
          </div>
        </div>
        <div className={styles.ingredientGrid}>
          {ingredientHighlights.map((ingredient) => (
            <article className={styles.ingredientCard} key={ingredient.name}>
              <div className={styles.ingredientIcon}>
                <IngredientIcon icon={ingredient.icon} />
              </div>
              <h3>
                {ingredient.name} · {ingredient.benefit}
              </h3>
              <p>{ingredient.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
