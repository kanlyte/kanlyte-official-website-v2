import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const categories = [
  { name: "Software Development", slug: "software-development" },
  { name: "Web & Cloud Services", slug: "web-cloud" },
  { name: "ICT Training & Consultancy", slug: "ict-training" },
  { name: "Research & Innovation", slug: "research-innovation" },
];

const services = [
  // Software Development
  { title: "Custom Software", slug: "custom-software", description: "Bespoke software solutions built from scratch to solve your unique business challenges.", icon: "Code2", featured: false, category: "software-development", order: 1, isActive: true },
  { title: "Odoo ERP Customizations", slug: "odoo-erp-customizations", description: "Extend and customize Odoo ERP to perfectly match your business workflows and requirements.", icon: "Monitor", featured: false, category: "software-development", order: 2, isActive: true },
  { title: "App Development", slug: "app-development", description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.", icon: "Smartphone", featured: false, category: "software-development", order: 3, isActive: true },
  { title: "School Management Systems", slug: "school-management-systems", description: "Comprehensive school management solutions for student records, fees, academics, and administration.", icon: "School", featured: false, category: "software-development", order: 4, isActive: true },
  // Web & Cloud Services
  { title: "Website Development", slug: "website-development", description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.", icon: "Globe", featured: false, category: "web-cloud", order: 5, isActive: true },
  { title: "Web Hosting", slug: "web-hosting", description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.", icon: "Server", featured: false, category: "web-cloud", order: 6, isActive: true },
  { title: "Email Hosting", slug: "email-hosting", description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.", icon: "Mail", featured: false, category: "web-cloud", order: 7, isActive: true },
  { title: "Cloud Infrastructure", slug: "cloud-infrastructure", description: "Scalable cloud server setup, management, and monitoring for businesses of all sizes.", icon: "Cloud", featured: false, category: "web-cloud", order: 8, isActive: true },
  // ICT Training & Consultancy
  { title: "ICT Training", slug: "ict-training", description: "Hands-on technology training programmes covering web dev, mobile, databases, and more.", icon: "GraduationCap", featured: false, category: "ict-training", order: 9, isActive: true },
  { title: "IT Consultancy", slug: "it-consultancy", description: "Strategic IT consultancy to help your organisation make smarter technology decisions.", icon: "Briefcase", featured: false, category: "ict-training", order: 10, isActive: true },
  { title: "Corporate Training", slug: "corporate-training", description: "Customised technology training packages designed for teams and organisations.", icon: "Users", featured: false, category: "ict-training", order: 11, isActive: true },
  // Research & Innovation
  { title: "AI & Machine Learning", slug: "ai-machine-learning", description: "Applied AI and ML solutions that turn your data into actionable business intelligence.", icon: "Cpu", featured: false, category: "research-innovation", order: 12, isActive: true },
  { title: "IoT Solutions", slug: "iot-solutions", description: "Internet of Things integrations that connect your physical assets to smart digital systems.", icon: "Wifi", featured: false, category: "research-innovation", order: 13, isActive: true },
  { title: "Digital Transformation", slug: "digital-transformation", description: "End-to-end digital transformation strategies that modernise your business operations.", icon: "TrendingUp", featured: false, category: "research-innovation", order: 14, isActive: true },
];

export async function seedServices() {
  console.log("Seeding service categories...");
  for (const cat of categories) {
    const existing = await prisma.serviceCategory.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      await prisma.serviceCategory.create({ data: cat });
      console.log(`  ✓  Category: ${cat.name}`);
    } else {
      console.log(`  ⏭  Category exists: ${cat.name}`);
    }
  }

  console.log("Seeding services...");
  let created = 0;
  let skipped = 0;

  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { slug: service.slug } });
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
