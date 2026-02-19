// app/components/Footer.tsx
import Link from "next/link";

const BRAND = "RUDESALUD";

type FooterLink = { label: string; href: string; external?: boolean };

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-[180px]">
      <div className="text-xs tracking-[0.22em] text-black/70">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-black/70">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="hover:text-black">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Icon({ children, label, href }: { children: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14">
        {/* upper columns */}
        <div className="grid gap-10 md:grid-cols-4">
          <FooterCol
            title="お届け先"
            links={[
              { label: "日本 (JPY / JA)", href: "/legal" }, // いずれ /locale などに分離してもOK
            ]}
          />

          <FooterCol
            title="クライアントサービス"
            links={[
              { label: "配送・返品", href: "/legal#shipping" },
              { label: "ご注文の追跡", href: "/legal#tracking" },
              { label: "お問い合わせ", href: "/legal#contact" }, // Stripe審査で重要
            ]}
          />

          <FooterCol
            title="法的情報"
            links={[
              { label: "特定商取引法に基づく表記", href: "/legal" },
              { label: "利用規約", href: "/legal#terms" },
              { label: "プライバシーポリシー", href: "/legal#privacy" },
              { label: "返品・返金ポリシー", href: "/legal#refund" }, // Stripe審査で重要
            ]}
          />

          <div className="min-w-[180px]">
            <div className="text-xs tracking-[0.22em] text-black/70">ニュースレター配信登録</div>
            <p className="mt-4 text-sm text-black/60 leading-relaxed">
              新作ドロップ・先行販売などをお知らせします。
            </p>
            {/* フォームは後でStripe/メール基盤と繋ぐ想定：今は見た目だけ */}
            <div className="mt-4 flex gap-2">
              <input
                className="h-11 w-full border border-black/20 px-3 text-sm outline-none focus:border-black"
                placeholder="email@example.com"
              />
              <button className="h-11 whitespace-nowrap border border-black px-5 text-sm hover:bg-black hover:text-white transition">
                登録
              </button>
            </div>
          </div>
        </div>

        {/* social */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <Icon label="Facebook" href="https://facebook.com/">
            <span className="text-sm font-semibold">f</span>
          </Icon>
          <Icon label="X" href="https://x.com/">
            <span className="text-sm font-semibold">X</span>
          </Icon>
          <Icon label="Instagram" href="https://instagram.com/">
            <span className="text-sm font-semibold">⌁</span>
          </Icon>
          <Icon label="YouTube" href="https://youtube.com/">
            <span className="text-sm font-semibold">▶</span>
          </Icon>
          <Icon label="TikTok" href="https://tiktok.com/">
            <span className="text-sm font-semibold">♪</span>
          </Icon>
        </div>

        {/* bottom line */}
        <div className="mt-10 text-center text-xs tracking-[0.25em] text-black/40">
          © {new Date().getFullYear()} {BRAND}
        </div>
      </div>
    </footer>
  );
}
