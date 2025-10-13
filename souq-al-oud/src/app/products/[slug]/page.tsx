import { db } from "@/lib/prisma";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

function formatPrice(cents: number): string {
  const amount = (cents / 100).toFixed(2);
  return `${amount} ر.س`;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { brand: true, category: true, vendor: true, images: true },
  });

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
        <p>المنتج غير موجود.</p>
        <Link href="/products" className="text-[var(--accent)]">عودة للمنتجات</Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg bg-white/5" />
        <div>
          <h1 className="brand-title text-3xl mb-2">{product.title}</h1>
          <div className="text-sm text-foreground/70 mb-4">
            {product.category?.name} {product.brand ? `• ${product.brand.name}` : ""}
          </div>
          <div className="text-2xl text-[var(--accent)] font-semibold mb-6">
            {formatPrice(product.priceCents)}
          </div>
          <p className="mb-6 text-foreground/85">{product.description}</p>
          <button disabled className="rounded-md bg-[var(--accent)]/60 text-black px-5 py-3 font-medium cursor-not-allowed">
            إضافة إلى السلة (قريباً)
          </button>
          <div className="mt-6">
            <Link href="/products" className="text-[var(--accent)]">عودة للمنتجات</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
