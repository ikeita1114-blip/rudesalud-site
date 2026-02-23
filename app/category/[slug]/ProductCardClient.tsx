"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  images: { src: string; alt: string }[];
  description?: string;
};

export default function ProductCardClient({ p }: { p: Product }) {
  const images = p.images ?? [];
  const [idx, setIdx] = useState(0);

  const current = useMemo(() => images[idx] ?? images[0], [images, idx]);

  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;

  const prev = () => setIdx((v) => Math.max(0, v - 1));
  const next = () => setIdx((v) => Math.min(images.length - 1, v + 1));

  return (
    <div className="border border-black/10 p-5">
      <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
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
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white/80 backdrop-blur px-3 py-2 text-sm disabled:opacity-40"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white/80 backdrop-blur px-3 py-2 text-sm disabled:opacity-40"
          aria-label="Next image"
        >
          →
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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
      </div>

      <div className="mt-5">
        <div className="text-lg font-serif">{p.name}</div>
        <div className="mt-1 text-black/70">{p.price}</div>
        {p.description && (
          <p className="mt-3 text-sm leading-relaxed text-black/70">{p.description}</p>
        )}

        <button
          className="mt-5 w-full border border-black px-6 py-3 hover:bg-black hover:text-white transition"
          disabled
        >
          COMING SOON (SHOP)
        </button>
      </div>
    </div>
  );
}