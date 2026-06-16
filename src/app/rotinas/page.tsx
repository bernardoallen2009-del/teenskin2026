import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { routines } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Rotinas",
  description: "Rotinas de manhã e noite para adolescentes, com passos simples e seguros."
};

export default function RoutinesPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Rotinas" }]} />
          <span className={styles.eyebrow}>Manhã e noite</span>
          <h1 className={styles.pageTitle}>Rotinas simples que cabem no teu dia.</h1>
          <p className={styles.lead}>Começa com poucos passos. Consistência costuma ajudar mais do que usar muitos produtos ao mesmo tempo.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.splitGrid}`}>
          <article className={styles.detailPanel}>
            <h2>De manhã</h2>
            <ul className={styles.cleanList}>
              {routines.morning.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
          <article className={styles.detailPanel}>
            <h2>À noite</h2>
            <ul className={styles.cleanList}>
              {routines.evening.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

