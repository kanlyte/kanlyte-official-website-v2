import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const services = [
  {
    title: "Software Development",
    slug: "software-development",
    description: "Custom software solutions tailored to your business needs, built with modern technologies and best practices.",
    icon: "Code2",
    featured: true,
    order: 1,
    isActive: true,
  },
  {
    title: "Odoo ERP Customizations",
    slug: "odoo-erp-customizations",
    description: "Extend and customize Odoo ERP to perfectly match your business workflows and requirements",
    icon: "Monitor",
    featured: false,
    order: 2,
    isActive: true,
  },
  {
    title: "Web Hosting",
    slug: "web-hosting",
    description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.",
    icon: "Cloud",
    featured: false,
    order: 3,
    isActive: true,
  },
  {
    title: "Email Hosting",
    slug: "email-hosting",
    description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.",
    icon: "Mail",
    featured: false,
    order: 4,
    isActive: true,
  },
  {
    title: "App Development",
    slug: "app-development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    icon: "Smartphone",
    featured: false,
    order: 5,
    isActive: true,
  },
  {
    title: "School Management Systems",
    slug: "school-management-systems",
    description: "Comprehensive school management solutions for student records, fees, academics, and administration.",
    icon: "School",
    featured: false,
    order: 6,
    isActive: true,
  },
  {
    title: "Website Development",
    slug: "website-development",
    description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.",
    icon: "Globe",
    featured: false,
    order: 7,
    isActive: true,
  },
  {
    title: "Research & Innovation",
    slug: "research-innovation",
    description: "AI, IoT, and digital transformation research that turns emerging technology into practical solutions for your business.",
    icon: "Lightbulb",
    featured: true,
    order: 8,
    isActive: true,
  },
  {
    title: "Web & Cloud Services",
    slug: "web-cloud",
    description: "Hosting, websites & email — reliable web and cloud infrastructure for your business.",
    icon: "Cloud",
    featured: true,
    order: 9,
    isActive: true,
  },
  {
    title: "ICT Training & Consultancy",
    slug: "ict-training",
    description: "Hands-on technology training and strategic IT consultancy to build your team's skills and digital capacity.",
    icon: "GraduationCap",
    featured: true,
    order: 10,
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
