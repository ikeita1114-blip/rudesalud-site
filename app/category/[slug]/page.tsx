// app/category/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 反映・デバッグを確実に

const BRAND = "RUDESALUD";

type Props = {
  params: { slug: string };
};

type Product = {
  id: string;
  name: string;
  price: string;
  images: { src: string; alt: string }[]; // 1つの枠で切替するため配列
  description?: string;
};

const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  tshirt: [
    {
      id: "checker-heart-tee",
      name: "Checker Heart Tee",
      price: "¥12,800",
      images: [
        { src: "/products/tee-front.jpg", alt: "Checker Heart Tee - Front" },
        { src: "/products/tee-back.jpg", alt: "Checker Heart Tee - Back" },
      ],
      description:
        "反骨と上品さが同居する、RUDESALUDの象徴的グラフィック。荒さの中に、美しさを。",
    },
  ],
};

const TITLE_MAP: Record<string, string> = {
  bag: "バッグ",
  tshirt: "Tシャツ",
  jacket: "ジャケット",
  accessory: "アクセサリー",
};

function ProductCard({ p }: { p: Product }) {
  // クライアントコンポーネント化せずに “切替” をやりたい場合は
  // ここを別ファイルにして "use client" にするのが正攻法。
  // ただ、あなたの環境で確実に動く形として、このファイル内に Client を埋めます。
  return <ProductCardClient p={p} />;
}

/**
 * ✅ ここからクライアント（スライド切替）
 */
function ProductCardClient({ p }: { p: Product }) {
  "use client";

  const React = require("react");
  const { useMemo, useState } = React;

  const images = p.images ?? [];
  const [idx, setIdx] = useState(0);

  const current = useMemo(() => images[idx] ?? images[0], [images, idx]);

  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;

  const prev = () => setIdx((v: number) => Math.max(0, v - 1));
  const next = () => setIdx((v: number) => Math.min(images.length - 1, v + 1));

  return (
    <div className="border border-black/10 p-5">
      {/* 画像1枠：前後を横ボタンで切替 */}
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

        {/* 左右ボタン */}
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

        {/* インジケータ */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full border ${
                i === idx ? "bg-black" : "bg-white"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* テキスト */}
      <div className="mt-5">
        <div className="text-lg font-serif">{p.name}</div>
        <div className="mt-1 text-black/70">{p.price}</div>
        {p.description && (
          <p className="mt-3 text-sm leading-relaxed text-black/70">
            {p.description}
          </p>
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

export default function CategoryPage({ params }: Props) {
  const slug = (params?.slug ?? "").toLowerCase().trim();
  const title = TITLE_MAP[slug] ?? "Category";

  const products = PRODUCTS_BY_CATEGORY[slug] ?? [];
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ✅ まず slug が取れてるか確実に見えるデバッグ（直ったら消してOK） */}
      <div className="bg-black text-white px-4 py-2 text-xs">
        debug: params.slug = <b>{slug || "(empty)"}</b>
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

        {hasProducts ? (
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
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