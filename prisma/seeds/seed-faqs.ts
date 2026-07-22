import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const faqs = [
  {
    question: "How Feasible is my Idea?",
    answer: "One of the most common app development questions is whether or not the app that is soon going to be designed, devised, and developed even feasible. Well, the only way to get an answer to this question is to test the idea in the field of real prospects. You will have to take your idea, create a working prototype and then make it open in the public to then see if it is something they would be interested in.",
    order: 0,
    isActive: true,
  },
  {
    question: "Who are my Target Customers?",
    answer: "Identifying your target audience is crucial for the success of your application.",
    order: 1,
    isActive: true,
  },
  {
    question: "What is the Mobile App category?",
    answer: "Choosing the right category helps in better visibility and user reach.",
    order: 2,
    isActive: true,
  },
  {
    question: "How Would I protect my App Idea?",
    answer: "There are several legal ways to protect your intellectual property, including NDAs and patents.",
    order: 3,
    isActive: true,
  },
];

export async function seedFAQs() {
  console.log("Seeding FAQs...");
  let created = 0;
  let skipped = 0;

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: faq.question } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${faq.question}`);
      skipped++;
    } else {
      await prisma.fAQ.create({ data: faq });
      console.log(`  ✓  Created: ${faq.question}`);
      created++;
    }
  }

  console.log(`\nFAQs done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedFAQs()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
