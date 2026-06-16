import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductBySlug, getRelatedProducts, products } from "@/data/catalog";
import { siteUrl } from "@/lib/site";
import styles from "@/styles/site.module.css";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produto" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((image) => `${siteUrl}${image}`),
    brand: {
      "@type": "Brand",
      name: "TeensSkin"
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/produtos/${product.slug}`
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ href: "/produtos", label: "Produtos" }, { label: product.name }]} />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <ProductDetailClient product={product} related={related} />
        </div>
      </section>
    </>
  );
}
