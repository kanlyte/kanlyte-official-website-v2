import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const stats = [
  { label: "Happy Customers", value: "10+", order: 1 },
  { label: "Projects Completed", value: "6+", order: 2 },
  { label: "Years of Experience", value: "2+", order: 3 },
  { label: "Team Members", value: "8+", order: 4 },
];

export async function seedStats() {
  console.log("Seeding stats...");
  let created = 0;
  let skipped = 0;

  for (const stat of stats) {
    const existing = await prisma.stat.findFirst({ where: { label: stat.label } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${stat.label}`);
      skipped++;
    } else {
      await prisma.stat.create({ data: stat });
      console.log(`  ✓  Created: ${stat.label}`);
      created++;
    }
  }

  console.log(`\nStats done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedStats()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
