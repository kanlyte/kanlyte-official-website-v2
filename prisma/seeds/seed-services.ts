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
  { title: "App Development", slug: "app-development", description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.", icon: "Smartphone", featured: true, category: "software-development", order: 3, isActive: true },
  { title: "School Management Systems", slug: "school-management-systems", description: "Comprehensive school management solutions for student records, fees, academics, and administration.", icon: "School", featured: false, category: "software-development", order: 4, isActive: true },
  // Web & Cloud Services
  { title: "Website Development", slug: "website-development", description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.", icon: "Globe", featured: false, category: "web-cloud", order: 5, isActive: true },
  { title: "Web Hosting", slug: "web-hosting", description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.", icon: "Server", featured: false, category: "web-cloud", order: 6, isActive: true },
  { title: "Email Hosting", slug: "email-hosting", description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.", icon: "Mail", featured: false, category: "web-cloud", order: 7, isActive: true },
  { title: "Cloud Infrastructure", slug: "cloud-infrastructure", description: "Scalable cloud server setup, management, and monitoring for businesses of all sizes.", icon: "Cloud", featured: false, category: "web-cloud", order: 8, isActive: true },
  { title: "Web & Cloud Services", slug: "web-cloud", description: "From building your website to hosting it on the cloud — everything you need for a powerful, secure online presence.", icon: "Globe", featured: true, category: "web-cloud", order: 9, isActive: true },
  // ICT Training & Consultancy
  { title: "ICT Training", slug: "ict-training", description: "Hands-on technology training programmes covering web dev, mobile, databases, and more.", icon: "GraduationCap", featured: true, category: "ict-training", order: 10, isActive: true },
  { title: "IT Consultancy", slug: "it-consultancy", description: "Strategic IT consultancy to help your organisation make smarter technology decisions.", icon: "Briefcase", featured: false, category: "ict-training", order: 11, isActive: true },
  { title: "Corporate Training", slug: "corporate-training", description: "Customised technology training packages designed for teams and organisations.", icon: "Users", featured: false, category: "ict-training", order: 12, isActive: true },
  // Research & Innovation
  { title: "Research & Innovation", slug: "research-innovation", description: "We combine deep technical research with practical innovation to help organisations stay ahead — from AI and IoT to digital transformation.", icon: "FlaskConical", featured: true, category: "research-innovation", order: 13, isActive: true },
  { title: "AI & Machine Learning", slug: "ai-machine-learning", description: "Applied AI and ML solutions that turn your data into actionable business intelligence.", icon: "Cpu", featured: false, category: "research-innovation", order: 14, isActive: true },
  { title: "IoT Solutions", slug: "iot-solutions", description: "Internet of Things integrations that connect your physical assets to smart digital systems.", icon: "Wifi", featured: false, category: "research-innovation", order: 15, isActive: true },
  { title: "Digital Transformation", slug: "digital-transformation", description: "End-to-end digital transformation strategies that modernise your business operations.", icon: "TrendingUp", featured: false, category: "research-innovation", order: 16, isActive: true },
  // Software Development (featured parent)
  { title: "Software Development", slug: "software-development", description: "From mobile apps and ERP systems to custom web platforms — software that solves real business problems, on time and within budget.", icon: "Code", featured: true, category: "software-development", order: 17, isActive: true },
];

const pricingCategories = [
  { name: "Web & Cloud Services", slug: "web-cloud", ownerType: "service", ownerSlug: "web-cloud" },
  { name: "ICT Training & Consultancy", slug: "ict-training", ownerType: "service", ownerSlug: "ict-training" },
  { name: "Research & Innovation", slug: "research-innovation", ownerType: "service", ownerSlug: "research-innovation" },
  { name: "Software Development", slug: "software-development", ownerType: "service", ownerSlug: "software-development" },
  { name: "App Development", slug: "app-development", ownerType: "service", ownerSlug: "app-development" },
  { name: "Email Hosting", slug: "email-hosting", ownerType: "service", ownerSlug: "email-hosting" },
  { name: "Web Hosting", slug: "web-hosting", ownerType: "standalone", ownerSlug: null },
  { name: "Go-Digital Packages", slug: "go-digital", ownerType: "standalone", ownerSlug: null },
  { name: "cPanel Hosting", slug: "cpanel", ownerType: "standalone", ownerSlug: null },
];

const pageContents = [
  {
    slug: "web-cloud",
    pageType: "service",
    badge: "Web & Cloud Services — Kanlyte Uganda",
    title: "Your business,",
    highlight: "always online.",
    subtitle: "Fast, secure, *reliable!",
    description: "From building your website to hosting it on the cloud — Kanlyte delivers everything you need for a powerful, secure, and professional online presence.",
    primaryBtnLabel: "Get Started",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "View Pricing",
    secondaryBtnHref: "/pricing",
    annotationLine1: "99.9%",
    annotationLine2: "uptime guaranteed",
    isActive: true,
  },
  {
    slug: "ict-training",
    pageType: "service",
    badge: "ICT Training & Consultancy — Kanlyte Uganda",
    title: "Skills that build",
    highlight: "careers.",
    subtitle: "Practical, hands-on, *job-ready!",
    description: "Kanlyte trains the next generation of Ugandan tech professionals and helps organisations make smarter technology decisions through expert ICT consultancy.",
    primaryBtnLabel: "Enquire Now",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "Corporate Training",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "500+",
    annotationLine2: "learners trained",
    isActive: true,
  },
  {
    slug: "software-development",
    pageType: "service",
    badge: "Software Development — Kanlyte Uganda",
    title: "We build software",
    highlight: "that works.",
    subtitle: "Scalable, reliable, *beautifully built!",
    description: "From mobile apps and ERP systems to custom web platforms — Kanlyte delivers software that solves real business problems, on time and within budget.",
    primaryBtnLabel: "Start Your Project",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "View Our Work",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "Built to",
    annotationLine2: "scale with you",
    isActive: true,
  },
  {
    slug: "research-innovation",
    pageType: "service",
    badge: "Research & Innovation — Kanlyte Uganda",
    title: "Technology that",
    highlight: "solves problems.",
    subtitle: "Data-driven, *results-focused!",
    description: "We combine deep technical research with practical innovation to help organisations stay ahead — from AI and IoT to digital transformation strategies built for East Africa.",
    primaryBtnLabel: "Start a Project",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "Learn More",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "Real-world",
    annotationLine2: "impact",
    isActive: true,
  },
  {
    slug: "email-hosting",
    pageType: "service",
    badge: "Email Hosting — Kanlyte Uganda",
    title: "Professional email,",
    highlight: "your domain.",
    subtitle: "Secure, reliable, *always delivered!",
    description: "Get a professional business email address with your own domain. Kanlyte's email hosting comes with enterprise-grade security, spam protection, and 99.9% uptime.",
    primaryBtnLabel: "Get Started",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "View Pricing",
    secondaryBtnHref: "/pricing",
    annotationLine1: "99.9%",
    annotationLine2: "uptime guaranteed",
    isActive: true,
  },
  {
    slug: "app-development",
    pageType: "service",
    badge: "App Development — Kanlyte Uganda",
    title: "Apps that users",
    highlight: "love to use.",
    subtitle: "Native, cross-platform, *beautifully built!",
    description: "From MVP to full-scale mobile products — Kanlyte designs and builds iOS and Android apps that are fast, secure, and built to grow with your business.",
    primaryBtnLabel: "Start Your Project",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "View Pricing",
    secondaryBtnHref: "/pricing",
    annotationLine1: "iOS +",
    annotationLine2: "Android",
    isActive: true,
  },
];

export async function seedServices() {
  console.log("Seeding service categories...");
  for (const cat of categories) {
    const existing = await prisma.serviceCategory.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      await prisma.serviceCategory.create({ data: cat });
      console.log(`  ✓  Service category: ${cat.name}`);
    } else {
      console.log(`  ⏭  Service category exists: ${cat.name}`);
    }
  }

  console.log("Seeding pricing plan categories...");
  for (const cat of pricingCategories) {
    const existing = await prisma.pricingPlanCategory.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      await prisma.pricingPlanCategory.create({ data: cat });
      console.log(`  ✓  Pricing category: ${cat.name}`);
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

    // Auto-create PageContent if missing
    const hasContent = await prisma.pageContent.findFirst({ where: { slug: service.slug } });
    if (!hasContent) {
      const content = pageContents.find((p) => p.slug === service.slug);
      {
        await prisma.pageContent.create({
          data: content ?? {
            slug: service.slug,
            pageType: "service",
            badge: `${service.title} — Kanlyte Uganda`,
            title: service.title,
            highlight: "built around you.",
            subtitle: "Practical, scalable, *reliable!",
            description: service.description,
            primaryBtnLabel: "Request a Consultation",
            primaryBtnHref: "/contact-us",
            secondaryBtnLabel: "View Pricing",
            secondaryBtnHref: "/pricing",
            annotationLine1: "Local expertise",
            annotationLine2: "long-term support",
            isActive: true,
          },
        });
        console.log(`  ✓  PageContent: ${service.slug}`);
      }
    }
  }

  console.log(`\nServices done — ${created} created, ${skipped} skipped.`);
  // Build the stable hierarchy after all records exist. `category` remains
  // available during the transition, but parentId now drives the website.
  for (const category of categories) {
    const parent = await prisma.service.findUnique({ where: { slug: category.slug } });
    if (!parent) continue;
    await prisma.service.update({
      where: { id: parent.id },
      data: { kind: "main", parentId: null },
    });
    await prisma.service.updateMany({
      where: { category: category.slug, id: { not: parent.id } },
      data: { kind: "offering", parentId: parent.id },
    });
  }

  const seededServices = await prisma.service.findMany({
    where: { slug: { not: null } },
    select: { id: true, slug: true },
  });
  for (const service of seededServices) {
    if (!service.slug) continue;
    const serviceRecord = services.find((item) => item.slug === service.slug);
    await prisma.pricingPlanCategory.upsert({
      where: { slug: service.slug },
      create: {
        name: serviceRecord?.title ?? service.slug,
        slug: service.slug,
        ownerType: "service",
        ownerSlug: service.slug,
        serviceId: service.id,
      },
      update: {
        name: serviceRecord?.title,
        ownerType: "service",
        ownerSlug: service.slug,
        serviceId: service.id,
      },
    });
  }
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedServices()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
