import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const processSteps = [
  {
    step: "Step 01",
    title: "Discovery & Planning",
    description: "Understanding your business needs, objectives, and target audience to define project scope and technical requirements.",
    icon: "Search",
    order: 0,
  },
  {
    step: "Step 02",
    title: "Design & Prototyping",
    description: "Creating initial design concepts and interactive prototypes based on insights gathered during the discovery phase.",
    icon: "Pencil",
    order: 1,
  },
  {
    step: "Step 03",
    title: "Development & Testing",
    description: "Building robust full-stack solutions, ensuring functionality and compatibility across web and mobile platforms.",
    icon: "Code",
    order: 2,
  },
  {
    step: "Step 04",
    title: "Launch & Support",
    description: "Deploying the finalized solution and providing ongoing support and maintenance to ensure long-term success.",
    icon: "TrendingUp",
    order: 3,
  },
  {
    step: "Step 05",
    title: "Iteration & Enhancement",
    description: "Continuously improving the solution based on user feedback and evolving business needs.",
    icon: "Network",
    order: 4,
  },
];

export async function seedProcessSteps() {
  console.log("Seeding process steps...");
  let created = 0;
  let skipped = 0;

  for (const step of processSteps) {
    const existing = await prisma.processStep.findFirst({ where: { title: step.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${step.title}`);
      skipped++;
    } else {
      await prisma.processStep.create({ data: step });
      console.log(`  ✓  Created: ${step.title}`);
      created++;
    }
  }

  console.log(`\nProcess steps done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedProcessSteps()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
