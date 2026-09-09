import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const pageContents = [
  // ── HOME SHOWCASE SECTION ──────────────────────────────────────────────────
  {
    slug: "showcase-home",
    pageType: "section",
    badge: "Innovation Showcase",
    title: "Discover A Wider World Of",
    highlight: "Innovation",
    subtitle: "Digital solutions",
    description:
      "Kanlyte Uganda Limited provides you with innovative solutions to all your needs and challenges. We've streamlined our plans to give you the most reliable innovative I.T solutions at affordable prices.",
    primaryBtnLabel: "Our Hands-on Trainings",
    primaryBtnHref: "/services/ict-training",
    secondaryBtnLabel: "/images/about-04.jpg",
    secondaryBtnHref: "/images/about-05.jpg",
    annotationLine1: "Affordable Prices",
    annotationLine2: "",
    isActive: true,
  },

  // ── HOME ABOUT SECTION ────────────────────────────────────────────────────
  {
    slug: "about-home",
    pageType: "section",
    badge: "About Kanlyte Uganda",
    title: "Purposefully Built for",
    highlight: "Africa's Digital Future",
    subtitle: "End-to-end digital transformation",
    description:
      "Kanlyte Uganda Limited is a technology company delivering custom software, web and cloud solutions, ICT training, and research-driven innovation to organisations across Uganda and beyond. We turn technology into practical, lasting impact.",
    primaryBtnLabel: "Discover Our Story",
    primaryBtnHref: "/about-us",
    secondaryBtnLabel: "Kanlyte team at work",
    secondaryBtnHref: "/images/about-04.jpg",
    annotationLine1: "Serving Uganda & beyond since 2018",
    annotationLine2: "Trusted by schools, NGOs & enterprises",
    isActive: true,
  },

  // ── PRODUCTS ──────────────────────────────────────────────────────────────
  {
    slug: "odoo",
    pageType: "product",
    badge: "Odoo ERP — by Kanlyte Uganda",
    title: "All your business on",
    highlight: "one platform.",
    subtitle: "Simple, efficient, yet *affordable!",
    description: "Kanlyte delivers expert Odoo ERP implementation for businesses across East Africa — from accounting and inventory to CRM and e-commerce, all in one unified system.",
    primaryBtnLabel: "Start now - It's free",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "Meet an advisor",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "US$ 7.25 / month",
    annotationLine2: "for ALL apps",
    isActive: true,
  },
  {
    slug: "school-sync",
    pageType: "product",
    badge: "School Sync — by Kanlyte Uganda",
    title: "Your entire school on",
    highlight: "one platform.",
    subtitle: "Simple, powerful, yet *affordable!",
    description: "School Sync streamlines student management, fee collection, academics, and parent communication — all in one cloud-based system built for East African schools.",
    primaryBtnLabel: "Visit School Sync",
    primaryBtnHref: "https://schoolsync.ac",
    secondaryBtnLabel: "Request a Demo",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "Free to start",
    annotationLine2: "for small schools",
    isActive: true,
  },
  {
    slug: "lyte",
    pageType: "product",
    badge: "Lyte App — by Kanlyte Uganda",
    title: "Find your perfect home",
    highlight: "in minutes.",
    subtitle: "Hostels & houses, *verified!",
    description: "Lyte connects students and professionals with verified, affordable hostels and rental houses across Uganda — search, book, and pay securely from your phone.",
    primaryBtnLabel: "Get Early Access",
    primaryBtnHref: "/contact-us",
    secondaryBtnLabel: "List Your Property",
    secondaryBtnHref: "/contact-us",
    annotationLine1: "100% verified",
    annotationLine2: "properties",
    isActive: true,
  },

  // ── SERVICES ──────────────────────────────────────────────────────────────
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
    description: "Get a professional business email address with your own domain. Kanlyte's email hosting comes with enterprise-grade security, spam protection, and 99.9% uptime — at competitive rates.",
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

// Slugs handled by seed-services.ts and seed-products.ts — skip here to avoid duplicates
const HANDLED_BY_OTHER_SEEDS = new Set([
  "odoo", "school-sync", "lyte",
  "web-cloud", "ict-training", "software-development",
  "research-innovation", "email-hosting", "app-development",
]);

export async function seedPageContent() {
  console.log("Seeding page content...");
  let created = 0;
  let skipped = 0;

  for (const item of pageContents) {
    if (HANDLED_BY_OTHER_SEEDS.has(item.slug)) {
      console.log(`  ⏭  Skipped (handled by services/products seed): ${item.slug}`);
      skipped++;
      continue;
    }
    const existing = await prisma.pageContent.findUnique({ where: { slug: item.slug } });
    if (existing) {
      console.log(`  ⏭  Skipped (already exists): ${item.slug}`);
      skipped++;
    } else {
      await prisma.pageContent.create({ data: item });
      console.log(`  ✓  Created: ${item.slug}`);
      created++;
    }
  }

  console.log(`\nPage content done — ${created} created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedPageContent()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
