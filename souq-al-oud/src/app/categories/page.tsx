import { db } from "@/lib/prisma";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
      <h1 className="brand-title text-3xl mb-6">الأقسام</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className="rounded-lg border border-white/10 p-4 hover:border-[var(--accent)]/50"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
