// app/components/StackPanels.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Panel = {
  slug: string;
  title: string;
  subtitle: string;
  image?: string;
};

export default function StackPanels() {
  const panels: Panel[] = useMemo(
    () => [
      { slug: "bag", title: "バッグ", subtitle: "さらに見る", image: "/categories/bag.jpg" },
      { slug: "tshirt", title: "Tシャツ", subtitle: "さらに見る", image: "/categories/tshirt.jpg" },
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
      { threshold: [0.35, 0.5, 0.65] }
    );

    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="relative">
        {panels.map((p, i) => {
          const scale = i < active ? "scale-[0.985]" : "scale-100";
          const shadow =
            i === active ? "shadow-[0_10px_40px_rgba(0,0,0,0.12)]" : "shadow-none";

          return (
            <section
              key={p.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="sticky top-[80px] h-[calc(100vh-80px)] bg-white"
              style={{ zIndex: 10 + i }}
            >
              <div className={`h-full w-full border-b border-black/10 transition-transform duration-500 ease-out ${scale} ${shadow}`}>
                <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5">
                  <div className="w-full max-w-[720px]">
                    <div className="relative mx-auto aspect-[4/5] w-full bg-black/5 overflow-hidden">
                      {!p.image && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.35em] text-black/40">
                          {p.slug.toUpperCase()}
                        </div>
                      )}
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 92vw, 720px"
                          priority={i === 0}
                        />
                      )}
                    </div>

                    <div className="mt-6 text-center">
                      <div className="text-base font-medium">{p.title}</div>
                      <Link
                        href={`/category/${p.slug}`}
                        className="mt-2 inline-flex items-center justify-center text-sm text-black/70 hover:text-black underline underline-offset-4"
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

        {/* 最後のパネル用の余白 */}
        <div className="h-[120vh]" />
      </div>
    </div>
  );
}
