import { db } from "@/lib/prisma";
import Link from "next/link";

type ProductsPageProps = {
  searchParams?: Record<string, string | string[]>;
};

function formatPrice(cents: number): string {
  const amount = (cents / 100).toFixed(2);
  return `${amount} ر.س`;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categorySlug = (searchParams?.category as string) || undefined;
  const brandSlug = (searchParams?.brand as string) || undefined;
  const q = (searchParams?.q as string) || undefined;

  const products = await db.product.findMany({
    where: {
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : {}),
      ...(brandSlug ? { brand: { slug: brandSlug } } : {}),
      ...(q
        ? { OR: [{ title: { contains: q } }, { description: { contains: q } }] }
        : {}),
    },
    include: { brand: true, category: true },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
      <h1 className="brand-title text-3xl mb-6">جميع المنتجات</h1>
      {products.length === 0 ? (
        <p className="text-foreground/70">لا توجد منتجات مطابقة حالياً.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="rounded-lg border border-white/10 p-4 hover:border-[var(--accent)]/50 transition block"
            >
              <div className="aspect-square rounded-md bg-white/5 mb-3" />
              <div className="text-sm mb-1">{p.title}</div>
              <div className="text-xs text-foreground/70 mb-1">
                {p.category?.name} {p.brand ? `• ${p.brand.name}` : ""}
              </div>
              <div className="text-[var(--accent)] font-medium">{formatPrice(p.priceCents)}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
