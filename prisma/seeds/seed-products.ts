import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";
import { PRODUCTS, PRICING_CATEGORIES, PAGE_CONTENTS } from "./seed-data";

export async function seedProducts() {
  console.log("Seeding products...");
  let created = 0, skipped = 0;

  for (const cat of PRICING_CATEGORIES.filter((c) => ["odoo", "school-sync", "lyte"].includes(c.slug))) {
    const exists = await prisma.pricingPlanCategory.findUnique({ where: { slug: cat.slug } });
    if (!exists) {
      await prisma.pricingPlanCategory.create({ data: cat });
      console.log(`  ✓  Pricing category: ${cat.name}`);
    }
  }

  for (const product of PRODUCTS) {
    const exists = await prisma.product.findFirst({ where: { slug: product.slug } });
    if (exists) { console.log(`  ⏭  Skipped: ${product.title}`); skipped++; }
    else { await prisma.product.create({ data: product }); console.log(`  ✓  Created: ${product.title}`); created++; }

    const hasContent = await prisma.pageContent.findFirst({ where: { slug: product.slug } });
    if (!hasContent) {
      const content = PAGE_CONTENTS.find((p) => p.slug === product.slug);
      if (content) { await prisma.pageContent.create({ data: content }); console.log(`  ✓  PageContent: ${product.slug}`); }
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
