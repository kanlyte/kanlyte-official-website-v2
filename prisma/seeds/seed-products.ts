import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const products = [
  {
    title: "Odoo ERP",
    slug: "odoo",
    description: "All-in-one business management",
    image: "/images/odoo.png",
    icon: "Cpu",
    order: 1,
    isActive: true,
  },
  {
    title: "School Sync",
    slug: "school-sync",
    description: "School management system",
    image: "/images/image3.jpg",
    icon: "School",
    order: 2,
    isActive: true,
  },
  {
    title: "Lyte App",
    slug: "lyte",
    description: "Hostel & house booking",
    image: "/images/lyteapp1.jpeg",
    icon: "Building2",
    order: 3,
    isActive: true,
  },
];

export async function seedProducts() {
  console.log("Seeding products...");
  let created = 0;
  let skipped = 0;

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { slug: product.slug } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${product.title}`);
      skipped++;
    } else {
      await prisma.product.create({ data: product });
      console.log(`  ✓  Created: ${product.title}`);
      created++;
    }
  }

  console.log(`\nProducts done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedProducts()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
