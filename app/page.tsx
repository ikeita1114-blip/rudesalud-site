// app/page.tsx
"use client";

import Header from "./components/Header";
import StackPanels from "./components/StackPanels";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      {/* Headerがfixedなので、下のコンテンツを少し下げる */}
      <div className="pt-[72px] md:pt-[80px]">
        <StackPanels />
      </div>
    </main>
  );
}
