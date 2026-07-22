import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const socialLinks = [
  {
    platform: "Facebook",
    icon: "Facebook",
    url: "https://www.facebook.com/kanlyte/",
    color: "#1877F2",
    order: 0,
    isActive: true,
  },
  {
    platform: "WhatsApp",
    icon: "MessageCircle",
    url: "https://wa.me/256703625299",
    color: "#25D366",
    order: 0,
    isActive: true,
  },
  {
    platform: "YouTube",
    icon: "Youtube",
    url: "https://www.youtube.com/@kanlyteug",
    color: "#FF0000",
    order: 0,
    isActive: true,
  },
  {
    platform: "LinkedIn",
    icon: "Linkedin",
    url: "https://www.linkedin.com/company/kanlyte/",
    color: "#0A66C2",
    order: 0,
    isActive: true,
  },
  {
    platform: "Twitter / X",
    icon: "X",
    url: "https://x.com/KanlyteUganda",
    color: "#000000",
    order: 0,
    isActive: true,
  },
];

export async function seedSocialLinks() {
  console.log("Seeding social links...");
  let created = 0;
  let skipped = 0;

  for (const link of socialLinks) {
    const existing = await prisma.socialLink.findFirst({ where: { platform: link.platform } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${link.platform}`);
      skipped++;
    } else {
      await prisma.socialLink.create({ data: link });
      console.log(`  ✓  Created: ${link.platform}`);
      created++;
    }
  }

  console.log(`\nSocial links done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedSocialLinks()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
