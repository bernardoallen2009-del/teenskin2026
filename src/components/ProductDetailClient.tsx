"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ShieldCheck, ShoppingBag, Zap } from "lucide-react";
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
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });
  const [added, setAdded] = useState(false);
  const selectedMl = Number(size.match(/(\d+)\s*ml/i)?.[1]);
  const computedPricePerMl = selectedMl ? `${formatPrice(product.price / selectedMl)}/ml` : "Varia por tamanho";
  const skinLabel = product.skinTypes.join(", ");
  const fullIngredients = product.fullIngredients ?? product.ingredients;
  const benefits = product.benefits ?? product.concerns.map((concern) => `Ajuda em ${concern}`);
  const whenToUse =
    product.whenToUse ??
    (product.category === "protecao-solar"
      ? "Manhã, como último passo da rotina."
      : product.category === "limpeza"
        ? "Manhã e/ou noite, antes dos restantes cuidados."
        : "Depois da limpeza, quando a pele precisar deste passo.");
  const texture =
    product.texture ??
    (product.category === "limpeza"
      ? "Gel ou espuma suave"
      : product.category === "hidratacao"
        ? "Creme confortável"
        : product.category === "corpo"
          ? "Loção rápida"
          : "Textura leve");
  const pairsWith = product.pairsWith ?? related.slice(0, 3).map((item) => item.name);
  const avoidWith = product.avoidWith ?? ["Não juntes demasiados ativos novos na mesma semana.", product.safetyNote];

  function addToCart() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  }

  function buyNow() {
    addItem(product);
    window.location.assign("/carrinho");
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
              alt={`Imagem do produto ${product.name}`}
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 80vw, 48vw"
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
            {product.gallery.map((image, index) => (
              <button
                className={`${styles.thumbButton} ${activeImage === image ? styles.selected : ""}`}
                type="button"
                key={image}
                aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                onClick={() => setActiveImage(image)}
              >
                <Image src={image} width={70} height={70} sizes="76px" alt="" />
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
          <div className={styles.productFacts}>
            <div>
              <span>Stock</span>
              <strong>{product.stockStatus ?? "Disponível"}</strong>
            </div>
            <div>
              <span>Textura</span>
              <strong>{texture}</strong>
            </div>
            <div>
              <span>Duração</span>
              <strong>{product.duration ?? "6 a 10 semanas"}</strong>
            </div>
            <div>
              <span>Preço/ml</span>
              <strong>{product.pricePerMl ?? computedPricePerMl}</strong>
            </div>
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
            <h2>Para que pele</h2>
            <p>{skinLabel}</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Quando usar</h2>
            <p>{whenToUse}</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Benefícios</h2>
            <ul className={styles.cleanList}>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className={styles.detailPanel}>
            <h2>Como usar</h2>
            <p>{product.usage}</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Ingredientes principais</h2>
            <p>{product.ingredients.join(" · ")}</p>
            <p className={styles.microText}>Lista completa: {fullIngredients.join(", ")}.</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Combina bem com</h2>
            <p>{pairsWith.join(" · ")}</p>
          </div>
          <div className={styles.detailPanel}>
            <h2>Evita combinar com</h2>
            <ul className={styles.cleanList}>
              {avoidWith.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.notice}>
            <strong>
              <ShieldCheck size={17} aria-hidden="true" />
              Nota de segurança
            </strong>
            <p>{product.safetyNote}</p>
          </div>
          <div className={styles.buttonRow}>
            <button className={styles.primaryButton} type="button" onClick={addToCart} aria-live="polite">
              <ShoppingBag size={18} aria-hidden="true" />
              {added ? "Adicionado" : `${formatPrice(product.price)} · Adicionar`}
            </button>
            <button className={styles.secondaryButton} type="button" onClick={buyNow}>
              <Zap size={18} aria-hidden="true" />
              Comprar agora
            </button>
            <Link className={styles.secondaryButton} href="/envios">
              Envios e devoluções
            </Link>
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
