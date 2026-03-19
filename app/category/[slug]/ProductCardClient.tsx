"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: string;
  images: { src: string; alt: string }[];
  description?: string;
  colors: string[];
  sizes: string[];
  stockBySize: Record<string, number>;
  sizeChart?: {
    size: string;
    body: number;
    length: number;
    sleeve: number;
  }[];
};

export default function ProductCardClient({ p }: { p: Product }) {
  const images = p.images ?? [];
  const [idx, setIdx] = useState(0);

  const current = useMemo(() => images[idx] ?? images[0], [images, idx]);

  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;

  const prev = () => setIdx((v) => Math.max(0, v - 1));
  const next = () => setIdx((v) => Math.min(images.length - 1, v + 1));

  const initialColor = p.colors?.[0] ?? "Black";

  const firstAvailableSize =
    p.sizes.find((size) => (p.stockBySize?.[size] ?? 0) > 0) ?? p.sizes?.[0] ?? "M";

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);

  const selectedStock = p.stockBySize?.[selectedSize] ?? 0;

  const isAllSoldOut = (p.sizes ?? []).every((size) => (p.stockBySize?.[size] ?? 0) <= 0);

  const decreaseQty = () => setQuantity((v) => Math.max(1, v - 1));
  const increaseQty = () => setQuantity((v) => Math.min(selectedStock, v + 1));

  const handleSelectSize = (size: string) => {
    const stock = p.stockBySize?.[size] ?? 0;
    if (stock <= 0) return;
    setSelectedSize(size);
    setQuantity(1);
  };

  return (
    <div className="border border-black/10 p-5">
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
        {current && (
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 360px"
            priority
          />
        )}

        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white/80 px-3 py-2 text-sm backdrop-blur disabled:opacity-40"
          aria-label="Previous image"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white/80 px-3 py-2 text-sm backdrop-blur disabled:opacity-40"
          aria-label="Next image"
        >
          →
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full border ${i === idx ? "bg-black" : "bg-white"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {isAllSoldOut && (
          <div className="absolute right-3 top-3 rounded-full bg-black px-4 py-2 text-xs tracking-[0.2em] text-white">
            SOLD OUT
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="text-lg font-serif">{p.name}</div>
        <div className="mt-1 text-black/70">{p.price}</div>

        {p.description && (
          <p className="mt-3 text-sm leading-relaxed text-black/70">{p.description}</p>
        )}

        <div className="mt-6">
          <div className="text-sm text-black/70">Color</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {(p.colors ?? []).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-5 py-2 text-base transition ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-black/20 bg-white text-black hover:border-black"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-black/70">Size</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {(p.sizes ?? []).map((size) => {
              const stock = p.stockBySize?.[size] ?? 0;
              const soldOut = stock <= 0;
              const active = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSelectSize(size)}
                  disabled={soldOut}
                  className={`rounded-full border px-5 py-2 text-base transition ${
                    soldOut
                      ? "cursor-not-allowed border-black/10 bg-black/5 text-black/30"
                      : active
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white text-black hover:border-black"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {!isAllSoldOut && (
            <div className="mt-3 text-sm text-black/60">
              在庫: {selectedSize} / {selectedStock}点
            </div>
          )}
        </div>

        {!isAllSoldOut && selectedStock > 0 && (
          <div className="mt-6">
            <div className="text-sm text-black/70">数量</div>
            <div className="mt-3 flex h-12 w-60 items-center justify-between border border-black/20 px-4">
              <button
                type="button"
                onClick={decreaseQty}
                className="text-3xl leading-none"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="text-xl">{quantity}</span>

              <button
                type="button"
                onClick={increaseQty}
                disabled={quantity >= selectedStock}
                className="text-3xl leading-none disabled:opacity-30"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full border border-black px-6 py-3 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/5 disabled:text-black/40"
          disabled={isAllSoldOut || selectedStock <= 0}
        >
          {isAllSoldOut ? "SOLD OUT" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}