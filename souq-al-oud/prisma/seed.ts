import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "عطور شرقية", slug: "oriental" },
    { name: "بخور فاخر", slug: "incense" },
    { name: "مسابيح واكسسوارات", slug: "accessories" },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  const brand = await prisma.brand.upsert({
    where: { slug: "souq-al-oud" },
    update: {},
    create: { name: "سوق العود", slug: "souq-al-oud" },
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@souq-al-oud.test" },
    update: {},
    create: { email: "vendor@souq-al-oud.test", name: "بائع سوق العود", role: "VENDOR" },
  });

  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: { userId: vendorUser.id, displayName: "متجر سوق العود" },
  });

  const cat = await prisma.category.findFirst({ where: { slug: "oriental" } });
  if (cat) {
    for (let i = 1; i <= 6; i += 1) {
      await prisma.product.upsert({
        where: { slug: `oud-${i}` },
        update: {},
        create: {
          slug: `oud-${i}`,
          title: `عود فاخر ${i}`,
          description: "عود فاخر بجودة عالية وثبات مميز",
          priceCents: 29900,
          stock: 25,
          categoryId: cat.id,
          brandId: brand.id,
          vendorId: vendor.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
