"use client";

import Link from "next/link";
import { useState } from "react";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center">
      {children}
    </span>
  );
}

export default function Header({ brand }: { brand: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* left */}
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="rounded-md hover:bg-black/5"
          >
            <Icon>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Icon>
          </button>

          {/* center logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif tracking-[0.25em] select-none"
          >
            {brand}
          </Link>

          {/* right */}
          <div className="flex items-center gap-1">
            <button aria-label="Search" className="rounded-md hover:bg-black/5">
              <Icon>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16.5 16.5 21 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Icon>
            </button>

            <button aria-label="Bag" className="rounded-md hover:bg-black/5">
              <Icon>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8h12l-1 13H7L6 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8a3 3 0 0 1 6 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Icon>
            </button>
          </div>
        </div>
      </header>

      {/* drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/25"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl border-r border-black/10 p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.35em] text-black/60">MENU</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
              >
                Close
              </button>
            </div>

            <div className="mt-8 grid gap-3 text-sm">
              <Link onClick={() => setOpen(false)} href="/category/bag" className="hover:underline">
                BAG
              </Link>
              <Link onClick={() => setOpen(false)} href="/category/tshirt" className="hover:underline">
                T-SHIRT
              </Link>
              <Link onClick={() => setOpen(false)} href="/category/jacket" className="hover:underline">
                JACKET
              </Link>
              <Link onClick={() => setOpen(false)} href="/category/accessory" className="hover:underline">
                ACCESSORY
              </Link>
              <div className="mt-6 border-t border-black/10 pt-6">
                <Link onClick={() => setOpen(false)} href="/legal" className="hover:underline">
                  LEGAL
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
