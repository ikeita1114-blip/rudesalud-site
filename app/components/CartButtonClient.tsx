"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, formatYen } from "@/app/cart/CartContext";

function CartIcon({ className = "" }: { className?: string }) {
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
      {/* Cart icon */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-black/5 transition"
        aria-label="Open cart"
      >
        <CartIcon className="w-5 h-5" />
        {hasItems && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-black text-white text-[12px] leading-[20px] text-center">
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
          "fixed top-0 right-0 z-50 h-dvh bg-white border-l border-black/10",
          // ✅ ここが重要：幅を太く
          "w-[96vw] max-w-xl",
          "transform transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
            <div className="text-sm tracking-[0.25em]">CART</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm px-3 py-2 rounded-lg hover:bg-black/5 transition"
            >
              Close
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {lines.length === 0 ? (
              <div className="py-16 text-center text-black/60 text-base">カートは空です。</div>
            ) : (
              <div className="space-y-6">
                {lines.map((it) => (
                  <div
                    key={it.id}
                    className="flex gap-5 border border-black/10 rounded-2xl p-5"
                  >
                    {/* ✅ 画像を大きく・潰れない */}
                    <div className="w-28 h-28 bg-black/5 overflow-hidden rounded-xl shrink-0">
                      {it.image?.src ? (
                        <img
                          src={it.image.src}
                          alt={it.image.alt ?? it.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* ✅ 右側を広く使う */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base truncate">{it.name}</div>
                      <div className="text-sm text-black/70 mt-1">{it.price}</div>

                      {/* Controls */}
                      <div className="mt-4 flex items-center gap-3">
                        {/* Qty */}
                        <div className="inline-flex items-stretch border border-black/20 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            className="w-11 h-11 grid place-items-center text-xl hover:bg-black hover:text-white transition"
                            onClick={() => setQty(it.id, it.qty - 1)}
                            aria-label="decrease"
                          >
                            −
                          </button>
                          <div className="w-12 h-11 grid place-items-center text-base">
                            {it.qty}
                          </div>
                          <button
                            type="button"
                            className="w-11 h-11 grid place-items-center text-xl hover:bg-black hover:text-white transition"
                            onClick={() => setQty(it.id, it.qty + 1)}
                            aria-label="increase"
                          >
                            +
                          </button>
                        </div>

                        {/* ✅ Removeを大きく */}
                        <button
                          type="button"
                          className="ml-auto inline-flex items-center justify-center h-11 px-5 border border-black/20 rounded-xl hover:bg-black hover:text-white transition text-sm"
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
                  className="h-11 px-5 border border-black/20 rounded-xl hover:bg-black hover:text-white transition text-sm"
                >
                  カートを空にする
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-black/10">
            <div className="flex items-center justify-between text-base">
              <span className="text-black/60">Subtotal</span>
              <span className="font-medium">{formatYen(subtotalYen)}</span>
            </div>

            <div className="mt-5 grid gap-3">
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className={[
                  "inline-flex justify-center items-center h-12 px-5 border border-black rounded-xl transition text-base",
                  hasItems ? "hover:bg-black hover:text-white" : "opacity-40 pointer-events-none",
                ].join(" ")}
              >
                決済に進む
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center items-center h-12 px-5 border border-black/20 rounded-xl hover:bg-black/5 transition text-base"
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