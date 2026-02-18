// app/page.tsx
"use client";

import Header from "./components/Header";
import StackPanels from "./components/StackPanels";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {/* Headerの高さ分の余白（好みで調整） */}
      <div className="pt-[72px] md:pt-[80px]">
        <StackPanels />
      </div>
    </main>
  );
}
