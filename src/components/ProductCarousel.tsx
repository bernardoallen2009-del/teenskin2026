import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import styles from "@/styles/site.module.css";
import type { Product } from "@/types/product";

export function ProductCarousel({ products, title, eyebrow }: { products: Product[]; title: string; eyebrow: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderText}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <Link className={styles.secondaryButton} href="/produtos">
            Ver tudo
          </Link>
        </div>
        <div className={styles.productRail}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
