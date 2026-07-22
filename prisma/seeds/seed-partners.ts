import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const partners = [
  {
    name: "Lira University",
    logo: "/uploads/258c784b-5779-40f8-b97a-9ce81c63daef.png",
    url: "https://lirauni.ac.ug/",
    order: 0,
    isActive: true,
  },
  {
    name: "Thermosnoop",
    logo: "/uploads/88e23615-515b-466f-b0ee-b4410187c18a.jfif",
    url: null,
    order: 0,
    isActive: true,
  },
  {
    name: "Oyster Productions",
    logo: "/uploads/db5590b8-4656-4155-a3c1-b2c4a6a6e9d4.png",
    url: "https://oysterproductions.com/",
    order: 2,
    isActive: true,
  },
  {
    name: "Base Volt and Wak Innovations",
    logo: "/uploads/51a7c28f-19f4-4ce5-a896-1c8282c6088a.jpeg",
    url: "https://basevoltug.com/",
    order: 3,
    isActive: true,
  },
  {
    name: "Buggade Sacco",
    logo: "/uploads/59b61c78-5d86-4bbc-ab2c-941d5dcd7e51.jpeg",
    url: null,
    order: 6,
    isActive: true,
  },
];

export async function seedPartners() {
  console.log("Seeding partners...");
  let created = 0;
  let skipped = 0;

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({ where: { name: partner.name } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${partner.name}`);
      skipped++;
    } else {
      await prisma.partner.create({ data: partner });
      console.log(`  ✓  Created: ${partner.name}`);
      created++;
    }
  }

  console.log(`\nPartners done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedPartners()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
