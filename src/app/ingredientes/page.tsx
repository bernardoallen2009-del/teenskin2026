import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ingredientHighlights } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Ingredientes",
  description: "Ingredientes de skincare explicados de forma simples para adolescentes."
};

export default function IngredientsPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Ingredientes" }]} />
          <span className={styles.eyebrow}>Sem confusão</span>
          <h1 className={styles.pageTitle}>Ingredientes explicados em linguagem simples.</h1>
          <p className={styles.lead}>A regra base: poucos produtos, introduzidos devagar, e atenção ao que a pele sente.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.ingredientGrid}`}>
          {ingredientHighlights.map((ingredient) => (
            <article className={styles.ingredientCard} key={ingredient.name}>
              <span className={styles.eyebrow}>{ingredient.benefit}</span>
              <h2>{ingredient.name}</h2>
              <p>{ingredient.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

