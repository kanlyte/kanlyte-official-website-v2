import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const testimonials = [
  {
    name: "Opolot Nelson",
    location: "Kampala, Uganda",
    text: "Working with this IT team was a game changer for our e-commerce business. The infrastructure they built is top-notch, and it looks even better under high traffic than we ever expected. Plus, the support team was incredibly helpful throughout the entire process. Highly recommend.",
    image: "/uploads/338fd0d5-cb51-4394-95e9-2551cb4df68a.jpg",
    order: 0,
    isActive: true,
  },
  {
    name: "Aggi John",
    location: "Soroti, Uganda",
    text: "Their cloud migration strategy saved us thousands in monthly overhead. The transition was seamless, and the performance gains were immediate. They truly understand modern digital needs.",
    image: "/uploads/fb5232a0-843e-4f57-bed3-6753fadadf63.jpg",
    order: 1,
    isActive: true,
  },
];

export async function seedTestimonials() {
  console.log("Seeding testimonials...");
  let created = 0;
  let skipped = 0;

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: testimonial.name } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${testimonial.name}`);
      skipped++;
    } else {
      await prisma.testimonial.create({ data: testimonial });
      console.log(`  ✓  Created: ${testimonial.name}`);
      created++;
    }
  }

  console.log(`\nTestimonials done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedTestimonials()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
