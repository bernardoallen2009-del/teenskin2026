"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/lib/format";
import styles from "@/styles/site.module.css";
import type { Product } from "@/types/product";

export function ProductHighlight({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const { addItem } = useCart();
  const product = products[active];

  function next() {
    setActive((current) => (current + 1) % products.length);
  }

  function previous() {
    setActive((current) => (current - 1 + products.length) % products.length);
  }

  return (
    <section className={`${styles.section} ${styles.softSection}`}>
      <div className={styles.sectionInner}>
        <div className={styles.highlight}>
          <div className={styles.highlightMedia}>
            <Image src={product.image} width={720} height={720} alt={`Produto em destaque: ${product.name}`} />
          </div>
          <div className={styles.highlightContent}>
            <span className={styles.eyebrow}>Destaque Rhode-inspired</span>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.lead}>{product.description}</p>
            <ul className={styles.bulletList}>
              {product.ingredients.slice(0, 3).map((ingredient) => (
                <li key={ingredient}>
                  <Check size={17} aria-hidden="true" />
                  {ingredient}
                </li>
              ))}
            </ul>
            <StarRating rating={product.rating} count={product.reviews} />
            <div className={styles.buttonRow}>
              <button className={styles.primaryButton} type="button" onClick={() => addItem(product)}>
                <ShoppingBag size={18} aria-hidden="true" />
                {formatPrice(product.price)} · Comprar
              </button>
              <Link className={styles.secondaryButton} href={`/produtos/${product.slug}`}>
                Ver detalhe
              </Link>
              <button className={styles.sliderButton} type="button" aria-label="Produto anterior" onClick={previous}>
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button className={styles.sliderButton} type="button" aria-label="Produto seguinte" onClick={next}>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
