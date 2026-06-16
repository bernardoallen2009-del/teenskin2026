"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/lib/format";
import styles from "@/styles/site.module.css";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem, isFavourite, toggleFavourite } = useCart();
  const [added, setAdded] = useState(false);
  const favourite = isFavourite(product.slug);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className={styles.productCard}>
      <div className={styles.floatingBadges}>
        {product.badges.slice(0, 2).map((badge) => (
          <span className={styles.badge} key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <button
        className={`${styles.favoriteButton} ${favourite ? styles.favoriteActive : ""}`}
        type="button"
        aria-label={favourite ? `Remover ${product.name} dos favoritos` : `Guardar ${product.name} nos favoritos`}
        onClick={() => toggleFavourite(product)}
      >
        <Heart size={18} fill={favourite ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <Link href={`/produtos/${product.slug}`} className={styles.productImageWrap}>
        <Image
          className={styles.productImage}
          src={product.image}
          width={520}
          height={520}
          sizes="(max-width: 768px) 92vw, (max-width: 1180px) 31vw, 24vw"
          alt={`Embalagem do produto ${product.name}`}
        />
      </Link>
      <div className={styles.productBody}>
        <div>
          <h3>
            <Link href={`/produtos/${product.slug}`}>{product.name}</Link>
          </h3>
          {!compact ? <p className={styles.muted}>{product.description}</p> : null}
        </div>
        <div className={styles.productMetaRow}>
          <span>{product.texture ?? "Textura leve"}</span>
          <span>{product.stockStatus ?? "Disponível"}</span>
        </div>
        <StarRating rating={product.rating} count={product.reviews} />
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <button className={styles.cardAction} type="button" onClick={handleAdd} aria-live="polite">
            <ShoppingBag size={16} aria-hidden="true" />
            {added ? "Adicionado" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
