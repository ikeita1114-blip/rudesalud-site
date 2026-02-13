// app/legal/page.tsx
export default function LegalPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          特定商取引法に基づく表記
        </h1>

        <div className="mt-10 space-y-6 text-white/80">
          <Section title="販売事業者名">
            RUDE SALUD
          </Section>

          <Section title="運営責任者">
            （請求があった場合、電子メールにて遅滞なく開示します）
          </Section>

          <Section title="所在地">
            千葉県松戸市（請求があった場合、電子メールにて遅滞なく開示します）
          </Section>

          <Section title="メールアドレス">
            （請求があった場合、電子メールにて遅滞なく開示します）
          </Section>

          <Section title="販売価格">
            各商品ページに表示する価格（税込）
          </Section>

          <Section title="商品代金以外の必要料金（送料）">
            送料が発生する場合は、購入手続き時に表示します。
          </Section>

          <Section title="支払方法">
            クレジットカード決済（Stripe）
          </Section>

          <Section title="支払時期">
            ご注文確定時にお支払いが確定します。
          </Section>

          <Section title="商品の引渡時期">
            ご注文確定後、準備が整い次第発送します。
          </Section>

          <Section title="返品・交換">
            商品に欠陥がある場合を除き、返品・交換には応じません。
          </Section>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold tracking-tight">
            プライバシーポリシー
          </h2>

          <p>
            当ショップでは、商品の販売および発送のため、
            氏名・住所・メールアドレス等の個人情報を取得します。
          </p>

          <p>
            決済にはStripe, Inc.の決済サービスを利用しており、
            クレジットカード情報は当ショップを経由せず、
            Stripe社にて安全に管理されます。
          </p>

          <p>
            取得した個人情報は、商品の発送および必要な連絡以外の目的では使用しません。
          </p>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold tracking-tight">免責事項</h2>

          <p>
            当ショップは、予告なく商品の仕様・価格を変更する場合があります。
          </p>

          <p>
            本サービスの利用により生じた損害について、
            当ショップは一切の責任を負いません。
          </p>

          <a
            href="/"
            className="mt-10 inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            ← Homeに戻る
          </a>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs tracking-[0.25em] text-white/60">{title}</div>
      <div className="mt-2 text-base text-white/85">{children}</div>
    </div>
  );
}

