// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const BRAND = "RUDESALUD";
const TAGLINE = "RUDE BUT BEAUTIFUL.  CONTRADICTION AS IDENTITY.";

const product = {
  name: "Checker Heart Tee",
  price: "¥12,800",
  sizes: ["M", "L"],
  sizeRatio: "M : L",
  material: "Polyester 50% / Urethane 50%",
  description:
    "反骨と上品さが同居する、RUDESALUDの象徴的グラフィック。荒さの中に、美しさを。",
  images: [
    { src: "/products/tee-front.jpg", alt: "T-shirt front" },
    { src: "/products/tee-back.jpg", alt: "T-shirt back" },
  ],
};

const links = [
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "Contact", href: "#contact" },
];

type Category = "tshirt" | "jacket" | "pants" | "accessory";

const categories: { key: Category; label: string }[] = [
  { key: "tshirt", label: "T-Shirt" },
  { key: "jacket", label: "Jacket" },
  { key: "pants", label: "Pants" },
  { key: "accessory", label: "Accessory" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

type SplashPhase = "in" | "hold" | "out";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("tshirt");

  // ===== Splash timing (ms) =====
  const FADE_IN_MS = 900;
  const HOLD_MS = 700;
  const FADE_OUT_MS = 900;

  const [phase, setPhase] = useState<SplashPhase>("in");
  const [splashMounted, setSplashMounted] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), FADE_IN_MS);
    const t2 = setTimeout(() => setPhase("out"), FADE_IN_MS + HOLD_MS);
    const t3 = setTimeout(
      () => setSplashMounted(false),
      FADE_IN_MS + HOLD_MS + FADE_OUT_MS
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryLabel = useMemo(
    () => categories.find((c) => c.key === category)?.label ?? "Category",
    [category]
  );

  const splashOpacity = phase === "out" ? "opacity-0" : "opacity-100";

  return (
    <>
      {/* ===== Splash (fade in -> hold -> fade out) ===== */}
      {splashMounted && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
          <div
            className={`transition-opacity ${splashOpacity}`}
            style={{
              transitionDuration: `${
                phase === "out" ? FADE_OUT_MS : FADE_IN_MS
              }ms`,
            }}
          >
            <div className="text-center">
              <div className="text-xs tracking-[0.5em] text-white/60">
                OFFICIAL
              </div>
              <div className="mt-3 text-5xl font-semibold tracking-[0.22em] text-white">
                RUDE<span className="text-white/60">SALUD</span>
              </div>
              <div className="mt-4 text-xs tracking-[0.22em] text-white/40">
                {TAGLINE}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Main site ===== */}
      <main className="min-h-screen bg-black text-white">
        {/* ====== Top gradient / grain ====== */}
        <div className="pointer-events-none fixed inset-0 opacity-40">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-200px] right-[-200px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        </div>

        {/* ====== Header (Hamburger) ====== */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/65 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            {/* Left: hamburger + brand */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
              >
                <span className="text-xl leading-none">≡</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md border border-white/15 bg-white/5" />
                <div className="leading-none">
                  <div className="text-sm tracking-[0.35em] text-white/80">
                    OFFICIAL
                  </div>
                  <div className="text-lg font-semibold tracking-[0.18em]">
                    {BRAND}
                  </div>
                </div>
              </div>
            </div>

            {/* Center (desktop nav) */}
            <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
              <a className="hover:text-white" href="#concept">
                Concept
              </a>
              <a className="hover:text-white" href="#product">
                Product
              </a>
              <a className="hover:text-white" href="#story">
                Story
              </a>
              <a className="hover:text-white" href="#contact">
                Contact
              </a>
            </nav>

            {/* Right: current category */}
            <a
              href="#product"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              {categoryLabel}
            </a>
          </div>
        </header>

        {/* ====== Slide-over Menu ====== */}
        {menuOpen && (
          <div className="fixed inset-0 z-40">
            {/* backdrop */}
            <button
              aria-label="Close menu"
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
            />
            {/* panel */}
            <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-white/10 bg-black/90 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.3em] text-white/60">
                  MENU
                </div>
                <button
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="mt-6">
                <div className="text-xs tracking-[0.25em] text-white/60">
                  CATEGORIES
                </div>
                <div className="mt-3 grid gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => {
                        setCategory(c.key);
                        setMenuOpen(false);
                        document
                          .getElementById("product")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                        category === c.key
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="text-white/40">→</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="text-xs tracking-[0.25em] text-white/60">
                  LINKS
                </div>
                <div className="mt-3 grid gap-2">
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                    href="#concept"
                    onClick={() => setMenuOpen(false)}
                  >
                    Concept
                  </a>
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                    href="#story"
                    onClick={() => setMenuOpen(false)}
                  >
                    Story
                  </a>
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ====== Hero ====== */}
        <section className="relative">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>Street × Elegance</Pill>
                <Pill>Contradiction</Pill>
                <Pill>First Drop</Pill>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                RUDE <span className="text-white/60">IS</span> BEAUTIFUL.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                「不良っぽいけど美しく」。相反する要素を1つに束ね、視線を奪う。
                RUDESALUDは、矛盾を“個性”として成立させるブランド。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#product"
                  className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black hover:bg-white/90"
                >
                  Explore Product
                </a>
                <a
                  href="#concept"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Read Concept
                </a>
              </div>

              <p className="mt-6 text-xs tracking-[0.2em] text-white/50">
                {TAGLINE}
              </p>
            </div>

            {/* right visual */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="text-xs tracking-[0.25em] text-white/60">
                      GOAL
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                      High brand → Outlet store
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      未来は“店舗で体験できる世界観”へ。
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="text-xs tracking-[0.25em] text-white/60">
                      DROP
                    </div>
                    <div className="mt-2 text-lg font-semibold">M / L only</div>
                    <div className="mt-2 text-sm text-white/70">
                      {product.sizeRatio}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60">
                        MATERIAL
                      </div>
                      <div className="mt-2 text-base font-semibold">
                        {product.material}
                      </div>
                    </div>
                    <div className="text-sm text-white/70">Stretch / Comfort</div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">
                    NOTE
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    左上の≡からカテゴリを選べます。今はT-Shirtのみ表示、他はComing Soon。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== Concept ====== */}
        <section id="concept" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Concept
            </h2>
            <p className="mt-4 max-w-3xl text-white/70">
              RUDESALUDは「矛盾」をテーマに、ストリートの荒さと、上質さの余韻を同居させます。
              反骨があるのに、品がある。強いのに、繊細。相反する要素がぶつかる瞬間に、美しさが立ち上がる。
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { t: "RUDE", d: "荒さ・反骨・ストリート感" },
                { t: "SALUD", d: "上品さ・静けさ・余韻" },
                { t: "CONTRADICTION", d: "矛盾をアイデンティティにする" },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-xs tracking-[0.3em] text-white/60">{c.t}</div>
                  <div className="mt-3 text-lg font-semibold">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== Product ====== */}
        <section id="product" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {category === "tshirt" ? "First Drop" : "Category"}
                </h2>
                <p className="mt-3 max-w-2xl text-white/70">
                  {category === "tshirt"
                    ? "まずはTシャツから。ブランドの核になるグラフィックを、黒に落とし込む。"
                    : "選択中のカテゴリは準備中です。"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Pill>{categoryLabel}</Pill>
                <Pill>{product.material}</Pill>
              </div>
            </div>

            <div className="mt-10">
              {category === "tshirt" ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Images */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {product.images.map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          priority={false}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <div className="text-xs tracking-[0.25em] text-white/60">
                      PRODUCT
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
                    <div className="mt-2 text-white/70">{product.price}</div>

                    <p className="mt-6 text-white/70">{product.description}</p>

                    <div className="mt-8 grid gap-3">
                      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                        <div className="text-xs tracking-[0.25em] text-white/60">
                          SIZES
                        </div>
                        <div className="mt-2 text-sm text-white/80">
                          {product.sizes.join(" / ")}{" "}
                          <span className="text-white/50">({product.sizeRatio})</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                        <div className="text-xs tracking-[0.25em] text-white/60">
                          MATERIAL
                        </div>
                        <div className="mt-2 text-sm text-white/80">
                          {product.material}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <button
                        className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black opacity-60"
                        title="決済は後でStripe導入で実装します"
                        disabled
                      >
                        Coming Soon (Checkout)
                      </button>
                      <a
                        href="#contact"
                        className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
                      >
                        Restock / Inquiry
                      </a>
                    </div>

                    <p className="mt-3 text-xs text-white/50">
                      ※ いまはデザイン優先の仮サイト。Stripe決済は後で追加できます。
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                  <div className="text-xs tracking-[0.3em] text-white/60">
                    COMING SOON
                  </div>
                  <div className="mt-3 text-2xl font-semibold">{categoryLabel}</div>
                  <p className="mx-auto mt-3 max-w-xl text-white/70">
                    このカテゴリは現在準備中です。次のドロップをお待ちください。
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2">
                    <a
                      href="#contact"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                    >
                      Get notified
                    </a>
                    <button
                      onClick={() => setCategory("tshirt")}
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                    >
                      Back to T-Shirt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ====== Story ====== */}
        <section id="story" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Story
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs tracking-[0.25em] text-white/60">WORLD</div>
                <p className="mt-3 text-white/70">
                  黒、ざらつき、紙の質感、証明書のようなタイポ。<br />
                  “本物っぽい”演出と、少し危うい余韻を残す。
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>Black</Pill>
                  <Pill>Vintage</Pill>
                  <Pill>Certificate</Pill>
                  <Pill>Minimal</Pill>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs tracking-[0.25em] text-white/60">NEXT</div>
                <ul className="mt-3 space-y-2 text-white/70">
                  <li>・カテゴリ増やす（ジャケット等）</li>
                  <li>・商品一覧ページ（複数アイテム化）</li>
                  <li>・問い合わせフォーム or Instagram導線</li>
                  <li>・Stripe決済（後で導入）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== Contact ====== */}
        <section id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Contact
                </h2>
                <p className="mt-3 max-w-xl text-white/70">
                  いまは仮導線です。SNSやメールが決まったらリンクを差し替えます。
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 md:max-w-md">
                <div className="text-xs tracking-[0.25em] text-white/60">INFO</div>
                <div className="mt-3 text-sm text-white/80">ブランド名：{BRAND}</div>
                <div className="mt-2 text-sm text-white/80">
                  コンセプト：不良っぽいけど美しく（矛盾）
                </div>
                <div className="mt-2 text-sm text-white/80">
                  目標：ハイブランド化 / アウトレット店舗確保
                </div>

                <div className="mt-6 text-xs text-white/50">
                  © {new Date().getFullYear()} {BRAND}. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== Footer ====== */}
        <footer className="border-t border-white/10 py-10">
  <div className="mx-auto max-w-6xl px-5 text-xs text-white/50 space-y-3">
    <div>
      Built with Next.js + Vercel. Updates are deployed automatically on push.
    </div>

    <div className="flex gap-6">
      <a href="/legal" className="hover:text-white">
        特定商取引法に基づく表記
      </a>
      <a href="/legal" className="hover:text-white">
        プライバシーポリシー
      </a>
    </div>
  </div>
</footer>

      </main>
    </>
  );
}
