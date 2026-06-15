import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroSlider } from "@/components/HeroSlider";
import { IngredientSection } from "@/components/IngredientSection";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductHighlight } from "@/components/ProductHighlight";
import { ReviewSlider } from "@/components/ReviewSlider";
import { Storytelling } from "@/components/Storytelling";
import { products } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured);
  const newProducts = products.filter((product) => product.isNew);

  return (
    <>
      <HeroSlider />
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderText}>
              <span className={styles.eyebrow}>Categorias</span>
              <h2 className={styles.title}>Encontra o passo que a tua pele precisa.</h2>
            </div>
            <Link className={styles.secondaryButton} href="/produtos">
              Explorar produtos
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>
      <ProductCarousel products={featuredProducts} title="Mais vendidos e essenciais" eyebrow="Rotina base" />
      <ProductHighlight products={featuredProducts} />
      <IngredientSection />
      <Storytelling />
      <ProductCarousel products={newProducts} title="Novidades suaves" eyebrow="Acabou de chegar" />
      <ReviewSlider />
      <NewsletterBanner />
    </>
  );
}
