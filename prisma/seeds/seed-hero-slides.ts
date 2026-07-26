import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const heroSlides = [
  {
    order: 1,
    image: "/uploads/a77e81d7-e3ba-4d58-bceb-686911960d5b.png",
    title: "Odoo ERP",
    subtitle: "All-in-One Business Management",
    description: "Streamline your operations with a fully integrated ERP solution",
    buttonText: "Explore Odoo",
    buttonLink: "/products/odoo",
    isActive: true,
  },
  {
    order: 2,
    image: "/uploads/28e497b8-87aa-4528-83b0-9d4401b6ce24.jpg",
    title: "School Sync",
    subtitle: "Smart School Management",
    description: "Manage students, fees, academics and administration in one place",
    buttonText: "Discover School Sync",
    buttonLink: "/products/school-sync",
    isActive: true,
  },
  {
    order: 3,
    image: "/uploads/85d3e570-524c-440d-89b2-b81c872ba077.jpg",
    title: "Lyte App",
    subtitle: "Hostel & House Booking",
    description: "Find and book accommodation with ease — built for Africa",
    buttonText: "Explore Lyte",
    buttonLink: "/products/lyte",
    isActive: true,
  },
  {
    order: 4,
    image: "/uploads/ce59ba05-b81a-448d-a325-657f64d9b8f4.jpg",
    title: "Software Development",
    subtitle: "Custom Solutions for Your Business",
    description: "From web apps to enterprise systems — built with modern technologies",
    buttonText: "View Our Services",
    buttonLink: "/services/software-development",
    isActive: true,
  },
  {
    order: 5,
    image: "/uploads/2066ead0-2264-4099-8cf7-8799c7e4a7d7.jpg",
    title: "ICT Training & Consultancy",
    subtitle: "Build Your Team's Digital Capacity",
    description: "Hands-on technology training and strategic IT consultancy",
    buttonText: "Learn More",
    buttonLink: "/services/ict-training",
    isActive: true,
  },
  {
    order: 6,
    image: "/uploads/338fd0d5-cb51-4394-95e9-2551cb4df68a.jpg",
    title: "Web & Cloud Services",
    subtitle: "Reliable Infrastructure for Your Business",
    description: "Hosting, websites and email — all under one roof",
    buttonText: "Get Started",
    buttonLink: "/services/web-cloud",
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
