"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, formatYen } from "@/app/cart/CartContext";

function CartIcon({ className = "" }: { className?: string }) {
  // lucide-react無くても動くようにSVGで用意
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6l-1-3H2" />
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
    </svg>
  );
}

export default function CartButtonClient() {
  const { items, totalQty, subtotalYen, removeItem, setQty, clear } = useCart();
  const [open, setOpen] = useState(false);

  const hasItems = totalQty > 0;

  const lines = useMemo(() => items, [items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition"
        aria-label="Open cart"
      >
        <CartIcon className="w-5 h-5" />
        {hasItems && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[11px] leading-[18px] text-center">
            {totalQty}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <button
          aria-label="Close cart"
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={[
          "fixed top-0 right-0 z-50 h-full w-[92vw] max-w-md bg-white border-l border-black/10",
          "transform transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
            <div className="text-sm tracking-[0.25em]">CART</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm hover:underline"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-auto px-5 py-4">
            {lines.length === 0 ? (
              <div className="py-10 text-center text-black/60">
                カートは空です。
              </div>
            ) : (
              <div className="space-y-5">
                {lines.map((it) => (
                  <div key={it.id} className="flex gap-4 border border-black/10 p-3">
                    <div className="w-20 h-20 bg-black/5 overflow-hidden shrink-0">
                      {/* 画像はある場合のみ */}
                      {it.image?.src ? (
                        // next/imageでもOKだが最小で動くようにimg
                        <img
                          src={it.image.src}
                          alt={it.image.alt ?? it.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-sm text-black/70 mt-1">{it.price}</div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 border border-black/20 hover:bg-black hover:text-white transition"
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="decrease"
                        >
                          −
                        </button>
                        <div className="w-10 text-center text-sm">{it.qty}</div>
                        <button
                          type="button"
                          className="w-8 h-8 border border-black/20 hover:bg-black hover:text-white transition"
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="increase"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          className="ml-auto text-sm text-black/60 hover:underline"
                          onClick={() => removeItem(it.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-black/60 hover:underline"
                >
                  カートを空にする
                </button>
              </div>
            )}
          </div>

          <div className="px-5 py-4 border-t border-black/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60">Subtotal</span>
              <span className="font-medium">{formatYen(subtotalYen)}</span>
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className={[
                  "inline-flex justify-center items-center px-4 py-3 border border-black transition",
                  hasItems ? "hover:bg-black hover:text-white" : "opacity-40 pointer-events-none",
                ].join(" ")}
              >
                決済に進む
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center items-center px-4 py-3 border border-black/20 hover:bg-black/5 transition"
              >
                買い物を続ける
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}