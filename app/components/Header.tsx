"use client";

import Link from "next/link";
import { useState } from "react";

const BRAND = "RUDESALUD";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 w-full bg-white border-b border-black/10 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* LEFT NAV */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide">
          <button onMouseEnter={() => setActiveMenu("women")} onMouseLeave={() => setActiveMenu(null)} className="hover:opacity-70">
            WOMEN
          </button>
          <button onMouseEnter={() => setActiveMenu("men")} onMouseLeave={() => setActiveMenu(null)} className="hover:opacity-70">
            MEN
          </button>
          <button onMouseEnter={() => setActiveMenu("collection")} onMouseLeave={() => setActiveMenu(null)} className="hover:opacity-70">
            COLLECTION
          </button>
        </nav>

        {/* LOGO */}
        <div className="text-2xl font-serif tracking-[0.25em]">{BRAND}</div>

        {/* RIGHT NAV */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide">
          <a href="#" className="hover:opacity-70">STORE</a>
          <a href="#" className="hover:opacity-70">CLIENT SERVICE</a>
          <Link href="/legal" className="hover:opacity-70">LEGAL</Link>
        </nav>
      </div>

      {/* MEGA MENU */}
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
                <li>New Arrival</li><li>Ready to Wear</li><li>Bags</li><li>Shoes</li><li>Accessories</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">FEATURED</h3>
              <ul className="space-y-3 text-black/70">
                <li>Spring 2026</li><li>Limited Drop</li><li>Runway</li><li>Lookbook</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">ABOUT</h3>
              <ul className="space-y-3 text-black/70">
                <li>Brand Story</li><li>Philosophy</li><li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">SUPPORT</h3>
              <ul className="space-y-3 text-black/70">
                <li>Contact</li><li>Shipping</li><li>Returns</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
