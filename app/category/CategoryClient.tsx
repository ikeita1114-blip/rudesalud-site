"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const BRAND = "RUDESALUD";

type Product = {
  name: string;
  price: string;
  images: { src: string; alt: string }[]; // front/backなど
};

const tshirtProducts: Product[] = [
  {
    name: "Checker Heart Tee",
    price: "¥12,800",
    images: [
      { src: "/products/tee-front.jpg", alt: "Checker Heart Tee - Front" },
      { src: "/products/tee-back.jpg", alt: "Checker Heart Tee - Back" },
    ],
  },
  // 追加したい時はここにどんどん足してOK
];

export default function CategoryClient({ initialSlug }: { initialSlug?: string }) {
  const params = useParams(); // 保険：propsが死んでてもURLから拾う
  const slugFromUrl = typeof params?.slug === "string" ? params.slug : "";
  const slug = (initialSlug ?? slugFromUrl ?? "").toString();

  const titleMap: Record<string, string> = {
    bag: "バッグ",
    tshirt: "Tシャツ",
    jacket: "ジャケット",
    accessory: "アクセサリー",
  };
  const title = titleMap[slug] ?? "Category";

  const products = useMemo(() => {
    if (slug === "tshirt") return tshirtProducts;
    return [];
  }, [slug]);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* debug（後で消してOK） */}
      <div className="text-xs px-4 py-2 bg-black text-white">
        debug: initialSlug={String(initialSlug ?? "")} / urlSlug={String(slugFromUrl ?? "")} / final={String(slug ?? "")}
      </div>

      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">
            ← Home
          </Link>
          <div className="text-xl font-serif tracking-[0.25em]">{BRAND}</div>
          <Link href="/legal" className="text-sm hover:underline">
            LEGAL
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide">{title}</h1>

        {slug === "tshirt" ? (
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-black/10 p-10 text-center">
            <div className="text-xs tracking-[0.35em] text-black/60">COMING SOON</div>
            <div className="mt-4 text-2xl font-serif">{title}</div>
            <p className="mt-3 text-black/60">
              このカテゴリは現在準備中です。次のドロップをお待ちください。
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex border border-black px-8 py-3 hover:bg-black hover:text-white transition"
            >
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [idx, setIdx] = useState(0);
  const total = p.images.length;

  const prev = () => setIdx((v) => (v - 1 + total) % total);
  const next = () => setIdx((v) => (v + 1) % total);

  const current = p.images[idx];

  return (
    <div className="border border-black/10 p-5">
      {/* 1つの場所で切り替えるスライド */}
      <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 360px"
          priority={false}
        />

        {/* 左右ボタン */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white/80 px-3 py-2 text-sm hover:bg-white"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white/80 px-3 py-2 text-sm hover:bg-white"
          aria-label="Next image"
        >
          →
        </button>

        {/* インジケータ */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {p.images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-black" : "bg-black/20"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-lg font-serif">{p.name}</div>
        <div className="mt-1 text-black/70">{p.price}</div>

        <button className="mt-4 w-full border border-black px-6 py-3 hover:bg-black hover:text-white transition" disabled>
          COMING SOON (SHOP)
        </button>
      </div>
    </div>
  );
}