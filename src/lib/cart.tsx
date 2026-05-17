import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  vat: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const VAT_RATE = 0.05;
const STORAGE_KEY = "tonercart_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const vat = subtotal * VAT_RATE;
    return {
      items,
      add: (product, qty = 1) =>
        setItems((cur) => {
          const ex = cur.find((i) => i.product.slug === product.slug);
          if (ex) return cur.map((i) => (i.product.slug === product.slug ? { ...i, qty: i.qty + qty } : i));
          return [...cur, { product, qty }];
        }),
      remove: (slug) => setItems((cur) => cur.filter((i) => i.product.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((cur) =>
          qty <= 0
            ? cur.filter((i) => i.product.slug !== slug)
            : cur.map((i) => (i.product.slug === slug ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      vat,
      total: subtotal + vat,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const formatAED = (n: number) =>
  new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 2 }).format(n);
