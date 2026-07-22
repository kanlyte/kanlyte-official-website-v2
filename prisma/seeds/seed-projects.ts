import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const projects = [
  {
    title: "Shop Dashboard Pro: Google Sheets",
    description: "You will get a complete, ready-to-deploy inventory management solution with secure data handling via Google Sheets",
    image: "/uploads/98af31a4-acac-43ee-9ccc-4aa1c273de1a.webp",
    tags: ["Next JS", "Typescript", "Postgres"],
    order: 0,
    isActive: true,
  },
  {
    title: "Tours and Travel Agency Template",
    description: "The Tours and Travel Agency Template is a full-stack, production-ready solution with user dashboards and resend integration",
    image: "/uploads/bafb6c28-caea-4025-9cb3-32aed2ff6ea4.webp",
    tags: ["Next Js", "Typescript", "Postgres"],
    order: 1,
    isActive: true,
  },
  {
    title: "Personal Portfolio Template",
    description: "The Personal Portfolio Template is a sleek, frontend-only solution designed for developers to showcase their work.",
    image: "/uploads/1cf8bb16-949c-4525-99cd-d05320d71bf3.webp",
    tags: ["Nextjs", "Typescript", "Postgres"],
    order: 2,
    isActive: true,
  },
];

export async function seedProjects() {
  console.log("Seeding projects...");
  let created = 0;
  let skipped = 0;

  for (const project of projects) {
    const existing = await prisma.project.findFirst({ where: { title: project.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${project.title}`);
      skipped++;
    } else {
      await prisma.project.create({ data: { ...project, tags: JSON.stringify(project.tags) } });
      console.log(`  ✓  Created: ${project.title}`);
      created++;
    }
  }

  console.log(`\nProjects done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedProjects()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
