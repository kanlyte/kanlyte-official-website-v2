import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const contactInfo = {
  phone: "(+256) 200 929 550",
  email: "info@kanlyte.com",
  address: "Robert Mugabe Rd, Kampala",
  schedule: "Mon to Sat - 08:00am to 06:00pm",
};

export async function seedContactInfo() {
  console.log("Seeding contact info...");

  const existing = await prisma.contactInfo.findFirst();
  if (existing) {
    console.log("  ⏭  Skipped: contact info already exists");
    return;
  }

  await prisma.contactInfo.create({ data: contactInfo });
  console.log("  ✓  Created contact info");
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedContactInfo()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
