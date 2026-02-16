import Image from "next/image";
import Link from "next/link";

const BRAND = "RUDESALUD";

type Props = { params: { slug: string } };

const tshirtProducts = [
  {
    name: "Checker Heart Tee",
    price: "¥12,800",
    images: ["/products/tee-front.jpg", "/products/tee-back.jpg"],
  },
];

export default function CategoryPage({ params }: Props) {
  const slug = params.slug;

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
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm hover:underline">← Home</Link>
          <div className="text-xl font-serif tracking-[0.25em]">{BRAND}</div>
          <Link href="/legal" className="text-sm hover:underline">LEGAL</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide">{title}</h1>

        {isTshirt ? (
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {tshirtProducts.map((p) => (
              <div key={p.name} className="border border-black/10 p-6">
                <div className="grid grid-cols-2 gap-3">
                  {p.images.map((src) => (
                    <div key={src} className="relative aspect-[3/4] bg-black/5">
                      <Image
                        src={src}
                        alt={p.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 45vw, 320px"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-xl font-serif">{p.name}</div>
                  <div className="mt-2 text-black/70">{p.price}</div>
                  <button
                    className="mt-6 w-full border border-black px-6 py-3 hover:bg-black hover:text-white transition"
                    disabled
                    title="決済は後でStripe導入"
                  >
                    COMING SOON (SHOP)
                  </button>
                </div>
              </div>
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
