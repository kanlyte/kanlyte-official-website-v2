import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const sectors = [
  { name: "Education Institutions", description: "Schools, universities and training centres leveraging technology for better learning outcomes.", icon: "GraduationCap", order: 1, isActive: true },
  { name: "NGOs", description: "Non-governmental organisations using digital tools to amplify their impact and reach.", icon: "Heart", order: 2, isActive: true },
  { name: "Private Companies", description: "Businesses of all sizes streamlining operations and driving growth through smart software.", icon: "Briefcase", order: 3, isActive: true },
  { name: "Public / Government", description: "Government agencies and public institutions modernising service delivery with technology.", icon: "Landmark", order: 4, isActive: true },
  { name: "Communities", description: "Local communities and grassroots organisations empowered through accessible digital solutions.", icon: "Users", order: 5, isActive: true },
  { name: "Financial Institutions", description: "Banks, SACCOs and microfinance organisations securing and automating their financial operations.", icon: "Banknote", order: 6, isActive: true },
];

export async function seedSectorsWeServe() {
  console.log("Seeding sectors we serve...");
  let created = 0;
  let skipped = 0;

  for (const sector of sectors) {
    const existing = await prisma.sectorWeServe.findFirst({ where: { name: sector.name } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${sector.name}`);
      skipped++;
    } else {
      await prisma.sectorWeServe.create({ data: sector });
      console.log(`  ✓  Created: ${sector.name}`);
      created++;
    }
  }

  console.log(`\nSectors we serve done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedSectorsWeServe()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
