"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BRAND = "RUDESALUD";

type DesktopMenu = "women" | "men" | "collection" | null;

const mobileCategories = [
  { slug: "bag", label: "バッグ" },
  { slug: "tshirt", label: "Tシャツ" },
  { slug: "jacket", label: "ジャケット" },
  { slug: "accessory", label: "アクセサリー" },
];

export default function Header() {
  // ===== Desktop mega menu =====
  const [activeMenu, setActiveMenu] = useState<DesktopMenu>(null);

  // ===== Mobile drawer =====
  const [mobileOpen, setMobileOpen] = useState(false);

  // mobile drawer open中は背景スクロールを止める
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 w-full bg-white border-b border-black/10 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
          {/* ================= LEFT ================= */}
          <div className="flex items-center gap-3">
            {/* Mobile: hamburger */}
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-black/10 hover:bg-black hover:text-white transition"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span className="text-xl leading-none">≡</span>
            </button>

            {/* Desktop: top nav */}
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
          </div>

          {/* ================= CENTER LOGO ================= */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif tracking-[0.25em] hover:opacity-80"
          >
            {BRAND}
          </Link>

          {/* ================= RIGHT ================= */}
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

          {/* Mobile: right placeholder (balance) */}
          <div className="md:hidden w-10" />
        </div>

        {/* ================= DESKTOP MEGA MENU ================= */}
        {activeMenu && (
          <div
            className="hidden md:block absolute left-0 w-full bg-white border-t border-black/10 shadow-md"
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

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* backdrop */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* panel */}
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white border-r border-black/10">
            <div className="px-5 py-5 border-b border-black/10 flex items-center justify-between">
              <div className="text-lg font-serif tracking-[0.22em]">{BRAND}</div>
              <button
                className="h-10 px-4 border border-black/10 hover:bg-black hover:text-white transition"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="text-xs tracking-[0.35em] text-black/50">
                CATEGORIES
              </div>

              <div className="mt-4 grid gap-2">
                {mobileCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border border-black/10 px-4 py-4 hover:bg-black hover:text-white transition"
                  >
                    <span className="text-sm tracking-wide">{c.label}</span>
                    <span className="text-black/40 group-hover:text-white">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-black/10 pt-6">
                <div className="text-xs tracking-[0.35em] text-black/50">
                  LINKS
                </div>
                <div className="mt-3 grid gap-2">
                  <Link
                    href="/legal"
                    onClick={() => setMobileOpen(false)}
                    className="border border-black/10 px-4 py-4 hover:bg-black hover:text-white transition"
                  >
                    LEGAL
                  </Link>
                  <a
                    href="#"
                    className="border border-black/10 px-4 py-4 hover:bg-black hover:text-white transition"
                  >
                    STORE
                  </a>
                  <a
                    href="#"
                    className="border border-black/10 px-4 py-4 hover:bg-black hover:text-white transition"
                  >
                    CLIENT SERVICE
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
