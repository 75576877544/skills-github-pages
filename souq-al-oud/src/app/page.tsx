import Link from "next/link";

export default function Home() {
  return (
    <main className="font-sans min-h-screen">
      <section className="px-6 sm:px-10 py-16 bg-[url('/pattern.svg')] bg-cover bg-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="brand-title text-4xl sm:text-6xl mb-4">
            مرحبًا بك في <span className="brand-accent">سوق العود</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8">
            أفخم العطور، أجود البخور، وأرقى الاكسسوارات في مكان واحد.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/categories"
              className="rounded-md bg-[var(--accent)] text-black px-5 py-3 font-medium hover:opacity-90"
            >
              تصفح الأقسام
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-[var(--accent)] text-[var(--accent)] px-5 py-3 font-medium hover:bg-[var(--accent)]/10"
            >
              جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
        <h2 className="brand-title text-2xl mb-6">مختارات فاخرة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 p-4 hover:border-[var(--accent)]/50 transition"
            >
              <div className="aspect-square rounded-md bg-white/5 mb-3" />
              <div className="text-sm mb-1">عود فاخر رقم {i}</div>
              <div className="text-[var(--accent)] font-medium">299 ر.س</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
