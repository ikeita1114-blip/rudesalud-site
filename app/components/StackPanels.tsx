"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Panel = {
  slug: string;
  title: string;
  subtitle: string;
  image?: string; // /categories/xxx.jpg
};

export default function StackPanels() {
  const BRAND = "RUDESALUD";

  const panels: Panel[] = useMemo(
    () => [
      { slug: "tshirt", title: "Tシャツ", subtitle: "さらに見る", image: "/categories/tshirt.jpg" },
      { slug: "bag", title: "バッグ", subtitle: "さらに見る", image: "/categories/bag.jpg" },
      { slug: "jacket", title: "ジャケット", subtitle: "さらに見る", image: "/categories/jacket.jpg" },
      { slug: "accessory", title: "アクセサリー", subtitle: "さらに見る", image: "/categories/accessory.jpg" },
    ],
    []
  );

  // ヘッダー高さ（stickyのtopに合わせる）
  const HEADER_H = 80;

  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index ?? "0");
        setActive(idx);
      },
      { threshold: [0.35, 0.5, 0.65] }
    );

    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ===== 固定ヘッダー（サンローラン風）===== */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4 text-sm tracking-wide">
            <span className="hidden md:inline text-black/70">MENU</span>
          </div>

          {/* Center Logo */}
          <div className="text-2xl font-serif tracking-[0.25em]">{BRAND}</div>

          {/* Right */}
          <nav className="flex items-center gap-6 text-sm tracking-wide">
            <Link href="/legal" className="hover:opacity-70">LEGAL</Link>
          </nav>
        </div>
      </header>

      {/* ===== スタックパネル（上にかぶさる）===== */}
      <div className="relative" style={{ paddingTop: HEADER_H }}>
        {panels.map((p, i) => {
          // 前のパネルほど奥に引っ込む（めくり感）
          const past = i < active;
          const scale = past ? "scale-[0.985]" : "scale-100";
          const shadow =
            i === active ? "shadow-[0_12px_40px_rgba(0,0,0,0.14)]" : "shadow-none";

          return (
            <section
              key={p.slug}
              ref={(el) => { refs.current[i] = el; }}
              data-index={i}
              className="sticky bg-white"
              style={{
                top: HEADER_H,
                height: `calc(100vh - ${HEADER_H}px)`,
                zIndex: 10 + i,
              }}
            >
              <div className={`h-full w-full border-b border-black/10 transition-transform duration-500 ease-out ${scale} ${shadow}`}>
                <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5">
                  {/* image box */}
                  <div className="w-full max-w-[640px]">
                    <div className="relative mx-auto aspect-[4/5] w-full bg-black/5 overflow-hidden">
                      {/* 画像がない時の文字（保険） */}
                      <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.35em] text-black/35">
                        {p.slug.toUpperCase()}
                      </div>

                      {/* public/categories に画像があれば表示 */}
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 92vw, 640px"
                          priority={i === 0}
                        />
                      )}
                    </div>

                    <div className="mt-6 text-center">
                      <div className="text-base font-medium">{p.title}</div>
                      <Link
                        href={`/category/${p.slug}`}
                        className="mt-2 inline-flex items-center justify-center text-sm text-black/70 hover:text-black"
                      >
                        {p.subtitle}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-10 text-xs tracking-[0.25em] text-black/30">
                    {i === active ? "SCROLL" : ""}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* 最後のパネルを“めくり切る”ための余白 */}
        <div style={{ height: "120vh" }} />
      </div>
    </main>
  );
}
