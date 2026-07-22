import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const heroSlides = [
  {
    order: 0,
    image: "/uploads/85d3e570-524c-440d-89b2-b81c872ba077.jpg",
    title: "Empowering",
    subtitle: "Technology in Healthcare",
    description: "To Love and Serve",
    buttonText: "For more info",
    buttonLink: "/contact-us",
    isActive: true,
  },
  {
    order: 0,
    image: "/uploads/28e497b8-87aa-4528-83b0-9d4401b6ce24.jpg",
    title: "Tech Education",
    subtitle: "For Future Innovators",
    description: "Building Africa's Next Tech Leaders",
    buttonText: "View Our School System",
    buttonLink: "/school-systems",
    isActive: true,
  },
  {
    order: 1,
    image: "/uploads/ce59ba05-b81a-448d-a325-657f64d9b8f4.jpg",
    title: "Digital Transformation",
    subtitle: "Technology in Healthcare",
    description: "To Love and Serve",
    buttonText: "For more info",
    buttonLink: "/contact-us",
    isActive: true,
  },
  {
    order: 3,
    image: "/uploads/a77e81d7-e3ba-4d58-bceb-686911960d5b.png",
    title: "Software & systems Developments",
    subtitle: "Tailored to Your Needs",
    description: "Perfectly Digital",
    buttonText: "Explore Our Services",
    buttonLink: "/odoo",
    isActive: true,
  },
];

export async function seedHeroSlides() {
  console.log("Seeding hero slides...");
  let created = 0;
  let skipped = 0;

  for (const slide of heroSlides) {
    const existing = await prisma.heroSlide.findFirst({ where: { title: slide.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${slide.title}`);
      skipped++;
    } else {
      await prisma.heroSlide.create({ data: slide });
      console.log(`  ✓  Created: ${slide.title}`);
      created++;
    }
  }

  console.log(`\nHero slides done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedHeroSlides()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
