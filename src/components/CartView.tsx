"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartContext";
import { requestCheckout } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { products } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export function CartView() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((entry) => entry.slug === item.slug);
        return product ? { product, quantity: item.quantity, subtotal: product.price * item.quantity } : null;
      })
      .filter(Boolean) as { product: (typeof products)[number]; quantity: number; subtotal: number }[];
  }, [items]);

  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const discount = discountCode.trim().toUpperCase() === "GLOW10" ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= 35 || subtotal === 0 ? 0 : 3.95;
  const total = subtotal - discount + shipping;

  async function checkout() {
    setStatus(null);

    try {
      const payload = await requestCheckout(items);
      if (payload?.url) {
        window.location.assign(payload.url);
        return;
      }
      setStatus("Checkout preparado. Ativa Stripe nas variáveis de ambiente para pagamento real.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Checkout indisponível.");
    }
  }

  if (lines.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h1>O carrinho está vazio</h1>
        <p className={styles.muted}>Adiciona os teus essenciais e volta aqui para finalizar.</p>
        <div className={styles.buttonRow}>
          <Link className={styles.primaryButton} href="/produtos">
            Ver produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartGrid}>
      <div className={styles.cartList}>
        {lines.map(({ product, quantity, subtotal }) => (
          <article className={styles.cartLine} key={product.slug}>
            <div className={styles.cartThumb}>
              <Image src={product.image} width={90} height={90} alt="" />
            </div>
            <div>
              <h2>{product.name}</h2>
              <p className={styles.muted}>{formatPrice(product.price)} cada</p>
              <div className={styles.quantityControl} aria-label={`Quantidade de ${product.name}`}>
                <button
                  className={styles.quantityButton}
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => updateQuantity(product.slug, quantity - 1)}
                >
                  <Minus size={15} aria-hidden="true" />
                </button>
                <strong>{quantity}</strong>
                <button
                  className={styles.quantityButton}
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => updateQuantity(product.slug, quantity + 1)}
                >
                  <Plus size={15} aria-hidden="true" />
                </button>
                <button
                  className={styles.quantityButton}
                  type="button"
                  aria-label={`Remover ${product.name}`}
                  onClick={() => removeItem(product.slug)}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
            <strong>{formatPrice(subtotal)}</strong>
          </article>
        ))}
      </div>
      <aside className={styles.cartSummary} aria-label="Resumo do carrinho">
        <h2>Resumo</h2>
        <label className={styles.filterGroup}>
          <span>Código de desconto</span>
          <input
            className={styles.input}
            value={discountCode}
            placeholder="Experimenta GLOW10"
            onChange={(event) => setDiscountCode(event.target.value)}
          />
        </label>
        <div className={styles.summaryLine}>
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className={styles.summaryLine}>
          <span>Desconto</span>
          <strong>-{formatPrice(discount)}</strong>
        </div>
        <div className={styles.summaryLine}>
          <span>Portes</span>
          <strong>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</strong>
        </div>
        <div className={`${styles.summaryLine} ${styles.summaryTotal}`}>
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <div className={styles.checkoutActions}>
          <button className={styles.primaryButton} type="button" onClick={checkout}>
            Checkout
          </button>
          <button className={styles.dangerButton} type="button" onClick={clearCart}>
            Limpar
          </button>
        </div>
        {status ? (
          <p className={styles.status} role="status">
            {status}
          </p>
        ) : null}
      </aside>
    </div>
  );
}
