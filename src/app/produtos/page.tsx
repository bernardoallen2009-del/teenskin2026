import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductExplorer } from "@/components/ProductExplorer";
import { products } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Produtos TeensSkin filtráveis por tipo de pele, categoria, preço, rating e ingredientes."
};

export default function ProductsPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Produtos" }]} />
          <span className={styles.eyebrow}>Loja</span>
          <h1 className={styles.pageTitle}>Produtos para montar uma rotina simples.</h1>
          <p className={styles.lead}>
            Filtra por tipo de pele, ingrediente, categoria, preço e classificação. A grelha adapta-se ao teu ecrã.
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <Suspense fallback={<p>A carregar produtos...</p>}>
            <ProductExplorer products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
