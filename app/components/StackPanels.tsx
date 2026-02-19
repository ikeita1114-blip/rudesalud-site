"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Panel = {
  slug: string;
  title: string;
  subtitle: string;
  image?: string; // public/categories/xxx.jpg
};

export default function StackPanels() {
  const panels: Panel[] = useMemo(
    () => [
      { slug: "tshirt", title: "Tシャツ", subtitle: "さらに見る", image: "/categories/tshirt.jpg" },
      { slug: "bag", title: "バッグ", subtitle: "さらに見る", image: "/categories/bag.jpg" },
      { slug: "jacket", title: "ジャケット", subtitle: "さらに見る", image: "/categories/jacket.jpg" },
      { slug: "accessory", title: "アクセサリー", subtitle: "さらに見る", image: "/categories/accessory.jpg" },
    ],
    []
  );

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
      { threshold: [0.4, 0.6, 0.8] }
    );

    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="relative">
        {panels.map((p, i) => {
          const isActive = i === active;

          // 前のパネルほど少し奥へ（めくり感）
          const scale = i < active ? "scale-[0.985]" : "scale-100";
          const shadow = i === active ? "shadow-[0_16px_60px_rgba(0,0,0,0.12)]" : "shadow-none";

          return (
            <section
              key={p.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="sticky top-[72px] md:top-[80px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] bg-white"
              style={{ zIndex: 10 + i }}
            >
              {/* ここが「板」本体：画像も文字もこの中に入れる */}
              <div
                className={`relative h-full w-full overflow-hidden border-b border-black/10 bg-white transition-transform duration-500 ease-out ${scale} ${shadow}`}
              >
                {/* 背景画像（板の中に固定） */}
                <div className="absolute inset-0">
                  {/* 画像がない時の保険 */}
                  <div className="absolute inset-0 bg-black/5" />

                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.35em] text-black/40">
                      {p.slug.toUpperCase()}
                    </div>
                  )}

                  {/* うっすら暗くして文字が読みやすいように */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                </div>

                {/* 文字（板の上に重ねる = これが動く） */}
                <div className="relative z-10 flex h-full items-end">
                  <div className="w-full px-6 pb-10 md:px-12 md:pb-14">
                    <div className="mx-auto max-w-6xl">
                      <div className="text-3xl md:text-5xl font-serif tracking-wide text-white">
                        {p.title}
                      </div>

                      <div className="mt-3">
                        <Link
                          href={`/category/${p.slug}`}
                          className="inline-flex items-center gap-2 text-sm md:text-base text-white/85 hover:text-white"
                        >
                          {p.subtitle}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>

                      <div className="mt-6 text-[10px] tracking-[0.35em] text-white/60">
                        {isActive ? "SCROLL" : "\u00A0"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* 最後の余白（最後のパネルがすぐ終わらないように） */}
        <div className="h-[120vh]" />
      </div>
    </div>
  );
}
