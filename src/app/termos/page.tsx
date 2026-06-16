import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Termos e condições",
  description: "Termos e condições de utilização da loja TeensSkin."
};

export default function TermsPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Termos e condições" }]} />
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.pageTitle}>Termos e condições.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.storySteps}>
            <article className={styles.detailPanel}>
              <h2>Uso do site</h2>
              <p>O conteúdo é informativo e não substitui aconselhamento médico ou dermatológico.</p>
            </article>
            <article className={styles.detailPanel}>
              <h2>Compras</h2>
              <p>Preços, stock e disponibilidade podem mudar. O checkout real deve ser ligado a um fornecedor de pagamentos seguro.</p>
            </article>
            <article className={styles.detailPanel}>
              <h2>Responsabilidade</h2>
              <p>Se tiveres reação persistente, suspende o produto e fala com um adulto ou profissional de saúde.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

