"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string; // "¥12,800" みたいな表示用
  image?: { src: string; alt?: string };
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  subtotalYen: number;
};

const CartContext = createContext<CartState | null>(null);

function parseYen(price: string): number {
  // "¥12,800" -> 12800
  const n = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const STORAGE_KEY = "rudesalud_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore
    }
  }, []);

  // save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem: CartState["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + qty } : x));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem: CartState["removeItem"] = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const setQty: CartState["setQty"] = (id, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty } : x));
    });
  };

  const clear: CartState["clear"] = () => setItems([]);

  const totalQty = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  const subtotalYen = useMemo(
    () => items.reduce((sum, it) => sum + parseYen(it.price) * it.qty, 0),
    [items]
  );

  const value: CartState = {
    items,
    addItem,
    removeItem,
    setQty,
    clear,
    totalQty,
    subtotalYen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatYen(n: number): string {
  return `¥${n.toLocaleString("ja-JP")}`;
}