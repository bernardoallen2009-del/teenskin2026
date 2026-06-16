import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Envios e devoluções",
  description: "Informação de envios, portes, devoluções e apoio ao cliente TeensSkin."
};

export default function ShippingPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Envios e devoluções" }]} />
          <span className={styles.eyebrow}>Loja</span>
          <h1 className={styles.pageTitle}>Envios claros, devoluções simples.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.splitGrid}`}>
          <article className={styles.detailPanel}>
            <h2>Envios</h2>
            <p>Portes grátis a partir de 35 EUR. Abaixo desse valor, o carrinho calcula portes de 3,95 EUR.</p>
          </article>
          <article className={styles.detailPanel}>
            <h2>Devoluções</h2>
            <p>Produtos fechados podem ser devolvidos dentro de 14 dias. Produtos abertos só devem ser devolvidos em caso de problema.</p>
          </article>
        </div>
      </section>
    </>
  );
}

