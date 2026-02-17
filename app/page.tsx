// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const BRAND = "RUDESALUD";

export default function Page() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full bg-white border-b border-black/10 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* LEFT NAV */}
          <nav className="hidden md:flex gap-8 text-sm tracking-wide">
            <button
              onMouseEnter={() => setActiveMenu("women")}
              onMouseLeave={() => setActiveMenu(null)}
              className="hover:opacity-70"
            >
              WOMEN
            </button>
            <button
              onMouseEnter={() => setActiveMenu("men")}
              onMouseLeave={() => setActiveMenu(null)}
              className="hover:opacity-70"
            >
              MEN
            </button>
            <button
              onMouseEnter={() => setActiveMenu("collection")}
              onMouseLeave={() => setActiveMenu(null)}
              className="hover:opacity-70"
            >
              COLLECTION
            </button>
          </nav>

          {/* LOGO CENTER */}
          <div className="text-2xl font-serif tracking-[0.25em]">{BRAND}</div>

          {/* RIGHT NAV */}
          <nav className="hidden md:flex gap-8 text-sm tracking-wide">
            <a href="#" className="hover:opacity-70">STORE</a>
            <a href="#" className="hover:opacity-70">CLIENT SERVICE</a>
            <Link href="/legal" className="hover:opacity-70">LEGAL</Link>
          </nav>
        </div>

        {/* ================= MEGA MENU ================= */}
        {activeMenu && (
          <div
            className="absolute left-0 w-full bg-white border-t border-black/10 shadow-md"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-4 gap-16 text-sm">
              <div>
                <h3 className="mb-4 font-semibold">SHOP</h3>
                <ul className="space-y-3 text-black/70">
                  <li>New Arrival</li>
                  <li>Ready to Wear</li>
                  <li>Bags</li>
                  <li>Shoes</li>
                  <li>Accessories</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold">FEATURED</h3>
                <ul className="space-y-3 text-black/70">
                  <li>Spring 2026</li>
                  <li>Limited Drop</li>
                  <li>Runway</li>
                  <li>Lookbook</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold">ABOUT</h3>
                <ul className="space-y-3 text-black/70">
                  <li>Brand Story</li>
                  <li>Philosophy</li>
                  <li>Press</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold">SUPPORT</h3>
                <ul className="space-y-3 text-black/70">
                  <li>Contact</li>
                  <li>Shipping</li>
                  <li>Returns</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-[0.2em]">
            RUDE
          </h1>
          <h1 className="text-6xl md:text-8xl font-serif tracking-[0.2em] text-black/60">
            SALUD
          </h1>
          <p className="mt-6 text-sm tracking-[0.4em] text-black/50">
            RUDE BUT BEAUTIFUL
          </p>

          {/* ✅ ここに入れる（確認用） */}
          <div className="mt-4 text-xs text-black/40">
            DEPLOY TEST: 2026-02-16 15:xx
          </div>
        </div>
      </section>

      {/* ================= FEATURE GRID ================= */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16">
        {/* 画像を置くならここ：public/products/tee-front.jpg など */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          {/* ✅ 画像入れたらコメント外す */}
          {/* <Image src="/products/tee-front.jpg" alt="Tee front" fill className="object-contain" /> */}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-serif tracking-wide">Checker Heart Tee</h2>
          <p className="mt-6 text-black/60 leading-relaxed">
            反骨と上品さが同居するRUDESALUDの象徴的グラフィック。
            荒さの中に、美しさを。
          </p>
          <p className="mt-6 text-lg">¥12,800</p>
          <button className="mt-8 border border-black px-8 py-3 hover:bg-black hover:text-white transition">
            SHOP NOW
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-black/10 py-16 text-center text-sm text-black/60">
        <div className="mb-6 tracking-[0.3em]">{BRAND}</div>
        <div className="flex justify-center gap-10">
          <Link href="/legal" className="hover:opacity-70">
            特定商取引法に基づく表記
          </Link>
          <Link href="/legal" className="hover:opacity-70">
            Privacy Policy
          </Link>
        </div>
        <div className="mt-6">© {new Date().getFullYear()} {BRAND}</div>
      </footer>
    </main>
  );
}
