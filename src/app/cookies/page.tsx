import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies e armazenamento local da TeensSkin."
};

export default function CookiesPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Política de cookies" }]} />
          <span className={styles.eyebrow}>Privacidade</span>
          <h1 className={styles.pageTitle}>Cookies e dados guardados no navegador.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.splitGrid}`}>
          <article className={styles.detailPanel}>
            <h2>O que guardamos</h2>
            <p>Carrinho, favoritos, resultado do quiz, sessão local e aceitação do banner de cookies.</p>
          </article>
          <article className={styles.detailPanel}>
            <h2>Como apagar</h2>
            <p>Podes apagar dados locais na página de perfil ou limpar dados do site nas definições do navegador.</p>
          </article>
        </div>
      </section>
    </>
  );
}

