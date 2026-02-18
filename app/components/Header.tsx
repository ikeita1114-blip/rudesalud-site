// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const BRAND = "RUDESALUD";

type DesktopMenu = "women" | "men" | "collection" | null;

type Category = {
  slug: string;
  label: string;
};

export default function Header() {
  // ===== Desktop mega menu =====
  const [activeMenu, setActiveMenu] = useState<DesktopMenu>(null);

  // ===== Mobile drawer =====
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories: Category[] = useMemo(
    () => [
      { slug: "tshirt", label: "Tシャツ" },
      { slug: "bag", label: "バッグ" },
      { slug: "jacket", label: "ジャケット" },
      { slug: "accessory", label: "アクセサリー" },
    ],
    []
  );

  // モバイルメニュー開いてる時は背景スクロール止める
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-black/10 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
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

        {/* ===== Center: Logo ===== */}
        <Link href="/" className="text-xl md:text-2xl font-serif tracking-[0.25em]">
          {BRAND}
        </Link>

        {/* ===== Right nav (desktop) ===== */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide">
          <a href="#" className="hover:opacity-70">
            STORE
          </a>
          <a href="#" className="hover:opacity-70">
            CLIENT SERVICE
          </a>
          <Link href="/legal" className="hover:opacity-70">
            LEGAL
          </Link>
        </nav>

        {/* mobile right spacer */}
        <div className="md:hidden w-10" />
      </div>

      {/* ================= DESKTOP MEGA MENU ================= */}
      {activeMenu && (
        <div
          // メニュー上にマウスがある限り閉じない
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
          className="hidden md:block absolute left-0 w-full bg-white border-t border-black/10 shadow-md"
        >
          <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-16 text-sm">
            <div>
              <h3 className="mb-4 font-semibold">SHOP</h3>
              <ul className="space-y-3 text-black/70">
                <li>
                  <Link className="hover:text-black" href="/category/tshirt">
                    Tシャツ
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-black" href="/category/bag">
                    バッグ
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-black" href="/category/jacket">
                    ジャケット
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-black" href="/category/accessory">
                    アクセサリー
                  </Link>
                </li>
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

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-[84%] max-w-[360px] bg-white shadow-xl border-r border-black/10">
            <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
              <div className="text-lg font-serif tracking-[0.25em]">{BRAND}</div>
              <button
                className="h-10 w-10 border border-black/10 hover:bg-black hover:text-white transition"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="text-xs tracking-[0.35em] text-black/60 mb-3">
                CATEGORIES
              </div>

              <nav className="flex flex-col">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 border-b border-black/10 text-base hover:bg-black hover:text-white transition px-2"
                  >
                    {c.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 text-xs tracking-[0.35em] text-black/60">
                SUPPORT
              </div>
              <div className="mt-3 flex flex-col">
                <Link
                  href="/legal"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-black/10 hover:bg-black hover:text-white transition px-2"
                >
                  LEGAL
                </Link>
                <a className="py-3 px-2 text-black/70" href="#">
                  STORE（準備中）
                </a>
                <a className="py-3 px-2 text-black/70" href="#">
                  CLIENT SERVICE（準備中）
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
