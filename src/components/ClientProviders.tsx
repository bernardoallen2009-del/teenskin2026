"use client";

import { CartProvider } from "@/components/CartContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
