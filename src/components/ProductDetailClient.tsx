"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/format";
import styles from "@/styles/site.module.css";
import type { Product } from "@/types/product";

type LocalReview = {
  name: string;
  rating: number;
  comment: string;
};

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  }

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviews((current) => [
      {
        name: form.name,
        rating: Number(form.rating),
        comment: form.comment
      },
      ...current
    ]);
    setForm({ name: "", rating: "5", comment: "" });
  }

  return (
    <>
      <div className={styles.detailGrid}>
        <div className={styles.gallery}>
          <div className={styles.galleryStage}>
            <Image
              src={activeImage}
              width={760}
              height={760}
              alt={`Vista 360 do produto ${product.name}`}
              style={{ transform: `rotateY(${rotation}deg)` }}
            />
          </div>
          <div className={styles.galleryControl}>
            <label htmlFor="rotation">Rodar galeria 360</label>
            <input
              id="rotation"
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(event) => setRotation(Number(event.target.value))}
            />
          </div>
          <div className={styles.thumbRow}>
            {product.gallery.map((image) => (
              <button
                className={`${styles.thumbButton} ${activeImage === image ? styles.selected : ""}`}
                type="button"
                key={image}
                aria-label={`Ver imagem ${image}`}
                onClick={() => setActiveImage(image)}
              >
                <Image src={image} width={70} height={70} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.detailInfo}>
          <span className={styles.eyebrow}>{product.category.replace("-", " ")}</span>
          <h1 className={styles.pageTitle}>{product.name}</h1>
          <p className={styles.lead}>{product.description}</p>
          <StarRating rating={product.rating} count={product.reviews + reviews.length} />
          <div className={styles.tagRow}>
            {product.badges.map((badge) => (
              <span className={styles.badge} key={badge}>
                {badge}
              </span>
            ))}
          </div>
          <div>
            <strong>Tamanho</strong>
            <div className={styles.variantGroup}>
              {product.sizes.map((variant) => (
                <button
                  className={`${styles.variantButton} ${variant === size ? styles.selected : ""}`}
                  type="button"
                  aria-pressed={variant === size}
                  key={variant}
                  onClick={() => setSize(variant)}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.detailPanel}>
            <h2>Ingredientes principais</h2>
            <p>{product.ingredients.join(" · ")}</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Como usar</h2>
            <p>{product.usage}</p>
          </div>
          <div className={styles.notice}>
            <strong>Nota de segurança</strong>
            <p>{product.safetyNote}</p>
          </div>
          <div className={styles.buttonRow}>
            <button className={styles.primaryButton} type="button" onClick={addToCart} aria-live="polite">
              <ShoppingBag size={18} aria-hidden="true" />
              {added ? "Adicionado" : `${formatPrice(product.price)} · Adicionar`}
            </button>
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.splitGrid}>
          <div className={styles.detailPanel}>
            <h2>Avaliações</h2>
            <div className={styles.reviewList}>
              {reviews.length === 0 ? <p className={styles.muted}>Ainda sem avaliações locais nesta sessão.</p> : null}
              {reviews.map((review, index) => (
                <article className={styles.reviewItem} key={`${review.name}-${index}`}>
                  <StarRating rating={review.rating} />
                  <strong>{review.name}</strong>
                  <p>{review.comment}</p>
                </article>
              ))}
            </div>
          </div>
          <form className={`${styles.detailPanel} ${styles.reviewForm}`} onSubmit={submitReview}>
            <h2>Escrever review</h2>
            <label className={styles.filterGroup}>
              <span>Nome</span>
              <input
                className={styles.input}
                value={form.name}
                required
                maxLength={80}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            </label>
            <label className={styles.filterGroup}>
              <span>Rating</span>
              <select
                className={styles.select}
                value={form.rating}
                onChange={(event) => setForm((current) => ({ ...current, rating: event.target.value }))}
              >
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
              </select>
            </label>
            <label className={styles.filterGroup}>
              <span>Comentário</span>
              <textarea
                className={styles.textarea}
                value={form.comment}
                required
                minLength={10}
                maxLength={500}
                onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
              />
            </label>
            <button className={styles.smallButton} type="submit">
              Publicar review
            </button>
          </form>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>Também combina com</span>
            <h2 className={styles.title}>Produtos relacionados</h2>
          </div>
        </div>
        <div className={styles.productGrid}>
          {related.map((item) => (
            <ProductCard product={item} key={item.id} compact />
          ))}
        </div>
      </section>
    </>
  );
}
