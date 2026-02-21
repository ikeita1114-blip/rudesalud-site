"use client";

// app/category/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const BRAND = "RUDESALUD";

type Props = { params: { slug: string } };

type Product = {
  slug: string;
  name: string;
  price: string;
  images: { src: string; alt?: string }[]; // front/backなど複数
  note?: string;
  available?: boolean;
};

const titleMap: Record<string, string> = {
  bag: "バッグ",
  tshirt: "Tシャツ",
  jacket: "ジャケット",
  accessory: "アクセサリー",
};

const productsByCategory: Record<string, Product[]> = {
  tshirt: [
    {
      slug: "checker-heart-tee",
      name: "Checker Heart Tee",
      price: "¥12,800",
      images: [
        { src: "/products/tee-front.jpg", alt: "Checker Heart Tee front" },
        { src: "/products/tee-back.jpg", alt: "Checker Heart Tee back" },
      ],
      note: "（税込）",
      available: false,
    },
  ],
  bag: [],
  jacket: [],
  accessory: [],
};

function ImageSwitcher({
  images,
  productName,
}: {
  images: { src: string; alt?: string }[];
  productName: string;
}) {
  const [idx, setIdx] = useState(0);
  const count = images.length;

  const canSwitch = count > 1;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((v) => (v - 1 + count) % count);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((v) => (v + 1) % count);
  };

  const current = images[idx];

  return (
    <div className="relative w-full aspect-[4/5] bg-black/5 overflow-hidden">
      <Image
        key={current.src} // 画像切替の反映を確実に
        src={current.src}
        alt={current.alt ?? productName}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
      />

      {/* 左右ボタン（画像が2枚以上の時だけ表示） */}
      {canSwitch && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur border border-black/10 hover:bg-white transition flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur border border-black/10 hover:bg-white transition flex items-center justify-center"
          >
            →
          </button>

          {/* 画像インジケータ（例: 1/2） */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs tracking-[0.2em] bg-white/85 backdrop-blur border border-black/10 rounded-full">
            {idx + 1}/{count}
          </div>
        </>
      )}
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="mt-10">
      <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.slug} className="group">
            {/* 1つの枠でfront/back切替 */}
            <ImageSwitcher images={p.images} productName={p.name} />

            <div className="mt-6 text-center">
              <div className="text-sm md:text-base font-serif tracking-wide">
                {p.name}
              </div>

              <div className="mt-2 text-sm text-black/80">
                {p.price}
                {p.note ? (
                  <span className="ml-1 text-black/60">{p.note}</span>
                ) : null}
              </div>

              <div className="mt-4">
                <button
                  className="px-6 py-2 border border-black/20 text-xs tracking-[0.25em] hover:border-black transition disabled:opacity-40 disabled:hover:border-black/20"
                  disabled={!p.available}
                >
                  {p.available ? "VIEW" : "COMING SOON"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: Props) {
  const slug = params.slug;
  const title = titleMap[slug] ?? "Category";

  const products = useMemo(() => productsByCategory[slug] ?? [], [slug]);
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-white text-black">
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

        {hasProducts ? (
          <ProductGrid products={products} />
        ) : (
          <div className="mt-10 border border-black/10 p-10 text-center">
            <div className="text-xs tracking-[0.35em] text-black/60">
              COMING SOON
            </div>
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