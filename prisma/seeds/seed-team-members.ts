import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const teamMembers = [
  {
    name: "Nahurira Gaston",
    role: "Managing Director",
    image: "/uploads/79ba6008-d4cf-4c9e-8512-365deaf4049d.jpg",
    featured: false,
    order: 1,
    isActive: true,
    social: {
      instagram: "https://www.facebook.com/nahurira.gaston.7",
      twitter: "https://twitter.com/gaston_lyte",
      linkedin: "https://www.linkedin.com/in/nahurira-gaston-b99210280",
      github: "https://github.com/gastoncodes",
      tiktok: "https://tiktok.com/@gaston",
    },
  },
  {
    name: "Aggi Peter",
    role: "Director of Operations",
    image: "/uploads/491763eb-9197-4154-b682-d9e7cc385a45.jpg",
    featured: false,
    order: 1,
    isActive: true,
    social: {
      instagram: "https://instagram.com/apwebdeveloper",
      twitter: "https://twitter.com/aggipeters",
      linkedin: "https://www.linkedin.com/in/aggi-peter-817921219/",
      github: "https://github.com/peteraggi",
      tiktok: "https://tiktok.com/@apwebdeveloper",
    },
  },
  {
    name: "Obua Jonathan",
    role: "Head of Marketing",
    image: "/uploads/a2cd81a5-3a0a-43b0-a02b-04f85d154a86.jpg",
    featured: false,
    order: 3,
    isActive: true,
    social: null,
  },
  {
    name: "Nakimuli Devine",
    role: "Odoo Sales Lead",
    image: "/uploads/2066ead0-2264-4099-8cf7-8799c7e4a7d7.jpg",
    featured: true,
    order: 4,
    isActive: true,
    social: null,
  },
  {
    name: "Osuku James",
    role: "Sales Person",
    image: "/uploads/bb385666-6f3c-49c0-9c58-23c03c6fd901.jpeg",
    featured: false,
    order: 5,
    isActive: true,
    social: null,
  },
];

export async function seedTeamMembers() {
  console.log("Seeding team members...");
  let created = 0;
  let skipped = 0;

  for (const { social, ...member } of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${member.name}`);
      skipped++;
    } else {
      await prisma.teamMember.create({
        data: {
          ...member,
          social: social ? { create: social } : undefined,
        },
      });
      console.log(`  ✓  Created: ${member.name}`);
      created++;
    }
  }

  console.log(`\nTeam members done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedTeamMembers()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
