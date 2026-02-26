// app/category/[slug]/page.tsx
import Link from "next/link";
import ProductCardClient, { type Product } from "@/app/components/ProductCardClient";

export const dynamic = "force-dynamic";

const BRAND = "RUDESALUD";

// Next.js 16系で params が Promise になる場合があるため Promise で受ける
type Props = {
  params: Promise<{ slug: string }>;
};

const TITLE_MAP: Record<string, string> = {
  bag: "バッグ",
  tshirt: "Tシャツ",
  jacket: "ジャケット",
  accessory: "アクセサリー",
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
      colors: ["Black", "Red", "Light Blue", "Sport Grey", "White"],
      sizes: ["S", "M", "L", "XL"],
      sizeChart: [
        { size: "S", body: 51, length: 67, sleeve: 85 },
        { size: "M", body: 56, length: 70, sleeve: 88 },
        { size: "L", body: 61, length: 73, sleeve: 90 },
        { size: "XL", body: 66, length: 76, sleeve: 93 },
        { size: "2XL", body: 71, length: 79, sleeve: 95 },
      ],
    },
  ],
};

export default async function CategoryPage({ params }: Props) {
  // ✅ Promise を unwrap
  const { slug: rawSlug } = await params;
  const slug = (rawSlug ?? "").toLowerCase().trim();

  const title = TITLE_MAP[slug] ?? "Category";
  const products = PRODUCTS_BY_CATEGORY[slug] ?? [];

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

        {products.length > 0 ? (
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {products.map((p) => (
              <ProductCardClient key={p.id} p={p} />
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