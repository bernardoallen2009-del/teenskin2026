"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  favourites: string[];
  cartCount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isFavourite: (slug: string) => boolean;
  toggleFavourite: (product: Product) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const cartKey = "teensskin.cart.v1";
const favouritesKey = "teensskin.favourites.v1";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(readStorage<CartItem[]>(cartKey, []));
      setFavourites(readStorage<string[]>(favouritesKey, []));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    // Persist only after the initial read, otherwise a direct reload can overwrite saved cart data with [].
    if (hydrated) {
      window.localStorage.setItem(cartKey, JSON.stringify(items));
    }
  }, [hydrated, items]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(favouritesKey, JSON.stringify(favourites));
    }
  }, [favourites, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);

      if (!existing) {
        return [...current, { slug: product.slug, quantity }];
      }

      return current.map((item) =>
        item.slug === product.slug ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item
      );
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.slug !== slug));
      return;
    }

    setItems((current) =>
      current.map((item) => (item.slug === slug ? { ...item, quantity: Math.min(20, quantity) } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isFavourite = useCallback(
    (slug: string) => {
      return favourites.includes(slug);
    },
    [favourites]
  );

  const toggleFavourite = useCallback((product: Product) => {
    setFavourites((current) =>
      current.includes(product.slug)
        ? current.filter((slug) => slug !== product.slug)
        : [...current, product.slug]
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      favourites,
      cartCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isFavourite,
      toggleFavourite
    }),
    [addItem, clearCart, favourites, isFavourite, items, removeItem, toggleFavourite, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
