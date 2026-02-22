// app/category/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const BRAND = "RUDESALUD";

// ★ build反映確認用（画面に表示される）
// デプロイが反映されていないと、この値が更新されないのでチェックしやすい
const BUILD_ID = "2026-02-21-v1";

type Props = { params: { slug: string } };

type Product = {
  id: string;
  name: string;
  price: string;
  images: { front: string; back: string };
  description?: string;
};

// ★ Tシャツ商品を増やしたい場合はここに追加していく
const tshirtProducts: Product[] = [
  {
    id: "checker-heart-tee",
    name: "Checker Heart Tee",
    price: "¥12,800",
    images: {
      front: "/products/tshirt/checker-heart/front.jpg",
      back: "/products/tshirt/checker-heart/back.jpg",
    },
    description: "RUDE BUT BEAUTIFUL.",
  },
  // 例：追加したいとき
  // {
  //   id: "another-tee",
  //   name: "Another Tee",
  //   price: "¥13,800",
  //   images: {
  //     front: "/products/tshirt/another/front.jpg",
  //     back: "/products/tshirt/another/back.jpg",
  //   },
  // },
];

function ProductCard({ p }: { p: Product }) {
  const [side, setSide] = useState<"front" | "back">("front");

  const currentSrc = side === "front" ? p.images.front : p.images.back;

  return (
    <div className="border border-black/10 p-5">
      {/* 画像（1つの場所で切り替え） */}
      <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
        <Image
          src={currentSrc}
          alt={`${p.name} ${side}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 320px"
          priority={false}
        />
      </div>

      {/* 切り替えボタン */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setSide("front")}
          className={`flex-1 border px-4 py-2 text-sm transition ${
            side === "front"
              ? "bg-black text-white border-black"
              : "border-black/30 hover:border-black"
          }`}
        >
          FRONT
        </button>
        <button
          type="button"
          onClick={() => setSide("back")}
          className={`flex-1 border px-4 py-2 text-sm transition ${
            side === "back"
              ? "bg-black text-white border-black"
              : "border-black/30 hover:border-black"
          }`}
        >
          BACK
        </button>
      </div>

      {/* 情報 */}
      <div className="mt-5">
        <div className="text-lg font-serif">{p.name}</div>
        <div className="mt-1 text-black/70">{p.price}</div>

        {p.description ? (
          <p className="mt-3 text-sm text-black/60 leading-relaxed">{p.description}</p>
        ) : null}

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
  // slug 正規化（空白・大文字対策）
  const rawSlug = params.slug ?? "";
  const slug = useMemo(() => rawSlug.toLowerCase().trim(), [rawSlug]);

  const titleMap: Record<string, string> = {
    bag: "バッグ",
    tshirt: "Tシャツ",
    jacket: "ジャケット",
    accessory: "アクセサリー",
  };

  const title = titleMap[slug] ?? "Category";
  const isTshirt = slug === "tshirt";

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

        {/* ★ 反映確認用（本番で消したければこのブロックをコメントアウト） */}
        <p className="mt-2 text-xs text-black/45">
          debug: rawSlug={JSON.stringify(rawSlug)} / normalized={JSON.stringify(slug)} / build={BUILD_ID}
        </p>

        {isTshirt ? (
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {tshirtProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
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