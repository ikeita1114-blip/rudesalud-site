"use client";

import Link from "next/link";
import { useState } from "react";

const BRAND = "RUDESALUD";

type DesktopMenu = "women" | "men" | "collection" | null;

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<DesktopMenu>(null);

  // ===== Mobile drawer =====
  const [mobileOpen, setMobileOpen] = useState(false);

  // ===== Categories (mobile menu items) =====
  const categories = [
    { slug: "tshirt", label: "Tシャツ" },
    { slug: "bag", label: "バッグ" },
    { slug: "jacket", label: "ジャケット" },
    { slug: "accessory", label: "アクセサリー" },
  ];

  return (
    <header
      className="fixed top-0 w-full bg-white border-b border-black/10 z-50"
      // ✅ PC: ヘッダー領域から出た時だけ閉じる（これで消えなくなる）
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
        {/* ===== Left: Mobile hamburger / Desktop nav ===== */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-black/10 hover:bg-black hover:text-white transition"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span className="text-xl leading-none">≡</span>
          </button>

          {/* Desktop left nav */}
          <nav className="hidden md:flex gap-8 text-sm tracking-wide">
            <button
              onMouseEnter={() => setActiveMenu("women")}
              className="hover:opacity-70"
              type="button"
            >
              WOMEN
            </button>
            <button
              onMouseEnter={() => setActiveMenu("men")}
              className="hover:opacity-70"
              type="button"
            >
              MEN
            </button>
            <button
              onMouseEnter={() => setActiveMenu("collection")}
              className="hover:opacity-70"
              type="button"
            >
              COLLECTION
            </button>
          </nav>
        </div>

        {/* ===== Logo ===== */}
        <Link href="/" className="text-xl md:text-2xl font-serif tracking-[0.25em]">
          {BRAND}
        </Link>

        {/* ===== Right nav (desktop) ===== */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide">
          <a href="#" className="hover:opacity-70">STORE</a>
          <a href="#" className="hover:opacity-70">CLIENT SERVICE</a>
          <Link href="/legal" className="hover:opacity-70">LEGAL</Link>
        </nav>

        {/* mobile spacing */}
        <div className="md:hidden w-10" />
      </div>

      {/* ================= DESKTOP MEGA MENU ================= */}
      {activeMenu && (
        <div
          className="absolute left-0 w-full bg-white border-t border-black/10 shadow-md"
          // ✅ メニュー上に乗ってる間は開き続ける
          onMouseEnter={() => setActiveMenu(activeMenu)}
        >
          <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-4 gap-16 text-sm">
            <div>
              <h3 className="mb-4 font-semibold">SHOP</h3>
              <ul className="space-y-3 text-black/70">
                <li><Link className="hover:text-black" href="/category/tshirt">Tシャツ</Link></li>
                <li><Link className="hover:text-black" href="/category/bag">バッグ</Link></li>
                <li><Link className="hover:text-black" href="/category/jacket">ジャケット</Link></li>
                <li><Link className="hover:text-black" href="/category/accessory">アクセサリー</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">FEATURED</h3>
              <ul className="space-y-3 text-black/70">
                <li><a className="hover:text-black" href="#">Spring 2026</a></li>
                <li><a className="hover:text-black" href="#">Limited Drop</a></li>
                <li><a className="hover:text-black" href="#">Runway</a></li>
                <li><a className="hover:text-black" href="#">Lookbook</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">ABOUT</h3>
              <ul className="space-y-3 text-black/70">
                <li><a className="hover:text-black" href="#">Brand Story</a></li>
                <li><a className="hover:text-black" href="#">Philosophy</a></li>
                <li><a className="hover:text-black" href="#">Press</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">SUPPORT</h3>
              <ul className="space-y-3 text-black/70">
                <li><a className="hover:text-black" href="#">Contact</a></li>
                <li><a className="hover:text-black" href="#">Shipping</a></li>
                <li><a className="hover:text-black" href="#">Returns</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          {/* panel */}
          <div className="absolute left-0 top-0 h-full w-[84%] max-w-[360px] bg-white shadow-xl border-r border-black/10">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div className="font-serif tracking-[0.25em]">{BRAND}</div>
              <button
                className="h-10 w-10 border border-black/10 hover:bg-black hover:text-white transition"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="px-5 py-6">
              <div className="text-xs tracking-[0.35em] text-black/50">CATEGORIES</div>
              <ul className="mt-4 space-y-4 text-base">
                {categories.map((c) => (
                  <li key={c.slug}>
                    {/* ✅ クリックで /category/[slug] に遷移 → あなたの「Tシャツ並ぶページ」が出る */}
                    <Link
                      href={`/category/${c.slug}`}
                      className="block py-2 border-b border-black/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 text-sm text-black/70">
                <a href="#" className="block">STORE</a>
                <a href="#" className="block">CLIENT SERVICE</a>
                <Link href="/legal" className="block" onClick={() => setMobileOpen(false)}>
                  LEGAL
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
