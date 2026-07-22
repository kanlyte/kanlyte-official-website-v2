import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const services = [
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs, built with modern technologies and best practices.",
    icon: "Code2",
    order: 1,
    isActive: true,
  },
  {
    title: "Odoo ERP Customizations",
    description: "Extend and customize Odoo ERP to perfectly match your business workflows and requirements",
    icon: "Monitor",
    order: 2,
    isActive: true,
  },
  {
    title: "Web Hosting",
    description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.",
    icon: "Cloud",
    order: 3,
    isActive: true,
  },
  {
    title: "Email Hosting",
    description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.",
    icon: "Mail",
    order: 4,
    isActive: true,
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    icon: "Smartphone",
    order: 5,
    isActive: true,
  },
  {
    title: "School Management Systems",
    description: "Comprehensive school management solutions for student records, fees, academics, and administration.",
    icon: "School",
    order: 6,
    isActive: true,
  },
  {
    title: "Website Development",
    description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.",
    icon: "Globe",
    order: 7,
    isActive: true,
  },
];

export async function seedServices() {
  console.log("Seeding services...");
  let created = 0;
  let skipped = 0;

  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) {
      console.log(`  ⏭  Skipped: ${service.title}`);
      skipped++;
    } else {
      await prisma.service.create({ data: service });
      console.log(`  ✓  Created: ${service.title}`);
      created++;
    }
  }

  console.log(`\nServices done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedServices()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
