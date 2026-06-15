import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CartView } from "@/components/CartView";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Carrinho TeensSkin com quantidades, desconto, portes e checkout preparado para Stripe."
};

export default function CartPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Carrinho" }]} />
          <span className={styles.eyebrow}>Checkout</span>
          <h1 className={styles.pageTitle}>Revê os teus produtos antes de finalizar.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <CartView />
        </div>
      </section>
    </>
  );
}
