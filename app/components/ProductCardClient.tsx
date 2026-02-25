New-Item -ItemType Directory -Force "app\components" | Out-Null

@'
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: string;
  images: { src: string; alt: string }[];
  description?: string;
  colors: string[];
  sizes: string[];
  sizeChart?: { size: string; body: number; length: number; sleeve: number }[];
};

function classNames(...v: Array<string | false | undefined | null>) {
  return v.filter(Boolean).join(" ");
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-full border px-4 py-2 text-sm transition",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-black border-black/30 hover:border-black"
      )}
    >
      {children}
    </button>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-black/10">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-lg leading-none">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="pb-5 text-sm text-black/70 leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductCardClient({ p }: { p: Product }) {
  const images = p.images ?? [];
  const [imgIdx, setImgIdx] = useState(0);

  const [color, setColor] = useState(p.colors?.[0] ?? "");
  const [size, setSize] = useState(p.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);

  const [openKey, setOpenKey] = useState<string | null>("about");

  const current = useMemo(() => images[imgIdx] ?? images[0], [images, imgIdx]);
  const canPrev = imgIdx > 0;
  const canNext = imgIdx < images.length - 1;

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(99, v + 1));

  return (
    <div className="border border-black/10 bg-white">
      {/* 画像 */}
      <div className="p-6">
        <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
          {current && (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 92vw, 520px"
              priority
            />
          )}

          {/* 左右ボタン */}
          <button
            type="button"
            onClick={() => setImgIdx((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-black/25 bg-white/80 backdrop-blur grid place-items-center disabled:opacity-40"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setImgIdx((v) => Math.min(images.length - 1, v + 1))}
            disabled={!canNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-black/25 bg-white/80 backdrop-blur grid place-items-center disabled:opacity-40"
            aria-label="Next image"
          >
            →
          </button>

          {/* ドット */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImgIdx(i)}
                className={classNames(
                  "h-2.5 w-2.5 rounded-full border",
                  i === imgIdx ? "bg-black border-black" : "bg-white border-black/40"
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 情報 */}
      <div className="px-6 pb-6">
        <div className="text-2xl font-serif">{p.name}</div>
        <div className="mt-2 text-lg">{p.price}</div>
        <div className="mt-1 text-xs text-black/50">税込。</div>

        {/* Color */}
        <div className="mt-8">
          <div className="text-sm text-black/60 mb-3">Color</div>
          <div className="flex flex-wrap gap-3">
            {p.colors.map((c) => (
              <Pill key={c} active={c === color} onClick={() => setColor(c)}>
                {c}
              </Pill>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-7">
          <div className="text-sm text-black/60 mb-3">Size</div>
          <div className="flex flex-wrap gap-3">
            {p.sizes.map((s) => (
              <Pill key={s} active={s === size} onClick={() => setSize(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-7">
          <div className="text-sm text-black/60 mb-3">数量</div>
          <div className="inline-flex items-stretch border border-black/30">
            <button
              type="button"
              onClick={dec}
              className="w-14 grid place-items-center text-xl hover:bg-black hover:text-white transition"
              aria-label="Decrease quantity"
            >
              –
            </button>
            <div className="w-20 grid place-items-center text-base">{qty}</div>
            <button
              type="button"
              onClick={inc}
              className="w-14 grid place-items-center text-xl hover:bg-black hover:text-white transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 grid gap-3">
          <button
            type="button"
            className="w-full border border-black px-6 py-4 hover:bg-black hover:text-white transition"
            onClick={() => {
              // 今はダミー。将来Stripe/Cartを入れる場所
              alert(`Added (mock): ${p.name} / ${color} / ${size} x${qty}`);
            }}
          >
            カートに追加する
          </button>

          <button
            type="button"
            className="w-full bg-black text-white px-6 py-4 hover:opacity-90 transition"
            onClick={() => {
              // 今はダミー。将来Stripe Checkoutへ
              alert(`Buy now (mock): ${p.name} / ${color} / ${size} x${qty}`);
            }}
          >
            今すぐ購入
          </button>
        </div>

        {/* Accordions */}
        <div className="mt-10 border-b border-black/10">
          <Accordion
            title="商品について"
            open={openKey === "about"}
            onToggle={() => setOpenKey((k) => (k === "about" ? null : "about"))}
          >
            {p.description ?? "詳細は準備中です。"}
          </Accordion>

          <Accordion
            title="お届け予定日について"
            open={openKey === "delivery"}
            onToggle={() => setOpenKey((k) => (k === "delivery" ? null : "delivery"))}
          >
            現在は準備中です。販売開始後に発送予定をご案内します。
          </Accordion>

          <Accordion
            title="送料について"
            open={openKey === "shipping"}
            onToggle={() => setOpenKey((k) => (k === "shipping" ? null : "shipping"))}
          >
            現在は準備中です。販売開始後に地域別の送料を表示します。
          </Accordion>
        </div>

        {/* Size chart */}
        {p.sizeChart && p.sizeChart.length > 0 && (
          <div className="mt-10">
            <div className="text-center text-sm tracking-wide mb-4">サイズ表（cm）</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-black/20">
                <thead>
                  <tr className="border-b border-black/20">
                    <th className="py-3 px-4 font-medium">サイズ</th>
                    <th className="py-3 px-4 font-medium">身幅</th>
                    <th className="py-3 px-4 font-medium">着丈</th>
                    <th className="py-3 px-4 font-medium">裄丈</th>
                  </tr>
                </thead>
                <tbody>
                  {p.sizeChart.map((r) => (
                    <tr key={r.size} className="border-t border-black/10 text-center">
                      <td className="py-3 px-4">{r.size}</td>
                      <td className="py-3 px-4">{r.body}</td>
                      <td className="py-3 px-4">{r.length}</td>
                      <td className="py-3 px-4">{r.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-black/50 text-center">
              ※1〜2cmの個体差が生じる可能性があります。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "app\components\ProductCardClient.tsx"