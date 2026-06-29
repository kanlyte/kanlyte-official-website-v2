import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pricingPlans = [
  // ── odoo ──────────────────────────────────────────────────────────────────
  {
    category: "odoo", tier: "community", title: "Odoo Community", order: 0,
    description: "Open source, self-hosted version.",
    priceUGX: "900,000 UGX", priceUSD: "$243", period: "/ year",
    isPopular: false, buttonText: "Get Started Now", isActive: true,
    features: [
      "Full Odoo Community Edition", "Self-hosted (On-premise)", "Unlimited users",
      "All community apps included", "Community support", "Customization at agreed cost",
    ],
  },
  {
    category: "odoo", tier: "standard", title: "Standard", order: 1,
    description: "Basic Odoo Online plan — per user.",
    priceUGX: "1,200,000 UGX", priceUSD: "$324", period: "/ user / year",
    isPopular: true, buttonText: "Buy Now", isActive: true,
    features: [
      "Access to all standard apps", "Odoo Online hosting", "Standard support",
      "One Company per database", "No Integrations", "Basic customization",
    ],
  },
  {
    category: "odoo", tier: "custom", title: "Custom", order: 2,
    description: "Enterprise-grade solution — per user.",
    priceUGX: "1,700,000 UGX", priceUSD: "$459", period: "/ user / year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "All apps + Odoo Studio", "Odoo Online/On-premise", "Multi-company ready",
      "External API access", "One-time implementation fee", "Priority support",
    ],
  },

  // ── school-sync ───────────────────────────────────────────────────────────
  {
    category: "school-sync", tier: "starter", title: "Starter", order: 0,
    description: "Perfect for small schools getting started.",
    priceUGX: "1,500,000 UGX", priceUSD: "$417", period: "/ year",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "Up to 200 students", "Student & fee management", "Basic attendance tracking",
      "Parent SMS notifications", "Email support", "1 campus",
    ],
  },
  {
    category: "school-sync", tier: "standard", title: "Standard", order: 1,
    description: "For growing schools with more needs.",
    priceUGX: "3,000,000 UGX", priceUSD: "$833", period: "/ year",
    isPopular: true, buttonText: "Buy Now", isActive: true,
    features: [
      "Up to 1,000 students", "Full academic management", "Timetabling & exams",
      "Parent portal", "Priority support", "2 campuses",
    ],
  },
  {
    category: "school-sync", tier: "pro", title: "Pro", order: 2,
    description: "Enterprise-grade for large institutions.",
    priceUGX: "5,000,000 UGX", priceUSD: "$1,389", period: "/ year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Unlimited students", "Multi-campus support", "Advanced analytics",
      "Custom report cards", "API access & integrations", "Dedicated support",
    ],
  },

  // ── lyte ──────────────────────────────────────────────────────────────────
  {
    category: "lyte", tier: "free", title: "Tenant Free", order: 0,
    description: "Find your space at no cost — forever.",
    priceUGX: "Free", priceUSD: "Free", period: "forever",
    isPopular: false, buttonText: "Download App", isActive: true,
    features: [
      "Browse all listings", "Save favourites", "Direct messaging",
      "Map view", "Push notifications",
    ],
  },
  {
    category: "lyte", tier: "basic", title: "Landlord Basic", order: 1,
    description: "List and manage your properties.",
    priceUGX: "500,000 UGX", priceUSD: "$135", period: "/ year",
    isPopular: true, buttonText: "Get Started", isActive: true,
    features: [
      "Up to 5 listings", "Photo galleries", "Booking management",
      "Tenant messaging", "Basic analytics",
    ],
  },
  {
    category: "lyte", tier: "pro", title: "Landlord Pro", order: 2,
    description: "For agents & property managers.",
    priceUGX: "1,200,000 UGX", priceUSD: "$324", period: "/ year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Unlimited listings", "Priority placement", "Advanced analytics",
      "Verified badge", "Dedicated support",
    ],
  },

  // ── web-hosting (for /pricing page) ───────────────────────────────────────
  {
    category: "web-hosting", tier: "core", title: "Core Package", order: 0,
    description: "For individuals & small blogs.",
    priceUGX: "800,000 UGX", priceUSD: "$225", period: "/ year",
    isPopular: false, buttonText: "Select Package", isActive: true,
    features: [
      "Domain name", "3 Professional emails", "WordPress website",
      "3 GB SSD hosting space", "Standard SSL", "Support & Maintenance",
    ],
  },
  {
    category: "web-hosting", tier: "advanced", title: "Advanced Package", order: 1,
    description: "Advanced features for growing businesses.",
    priceUGX: "1,200,000 UGX", priceUSD: "$335", period: "/ year",
    isPopular: true, buttonText: "Select Package", isActive: true,
    features: [
      "Domain name", "10 Professional emails", "Custom developed website",
      "10 GB SSD hosting space", "Premium SSL", "Support & Maintenance",
      "Monthly backup", "Basic SEO Setup",
    ],
  },
  {
    category: "web-hosting", tier: "premium", title: "Premium Package", order: 2,
    description: "Enterprise-grade solutions for complex requirements.",
    priceUGX: "3,000,000 UGX", priceUSD: "$835", period: "/ year",
    isPopular: false, buttonText: "Select Package", isActive: true,
    features: [
      "Domain name", "Unlimited professional emails", "Custom developed website",
      "E-Commerce website (if needed)", "30 GB SSD hosting space", "Premium SSL",
      "Monthly backup", "Support & maintenance", "Advanced SEO setup", "User training",
    ],
  },

  // ── web-cloud ─────────────────────────────────────────────────────────────
  {
    category: "web-cloud", tier: "starter", title: "Starter", order: 0,
    description: "For small businesses & blogs.",
    priceUGX: "800,000 UGX", priceUSD: "$216", period: "/ year",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "1 website", "5 GB storage", "Free SSL certificate",
      "Business email (2 accounts)", "99.9% uptime", "Email support",
    ],
  },
  {
    category: "web-cloud", tier: "business", title: "Business", order: 1,
    description: "For growing businesses.",
    priceUGX: "2,000,000 UGX", priceUSD: "$540", period: "/ year",
    isPopular: true, buttonText: "Buy Now", isActive: true,
    features: [
      "Up to 5 websites", "50 GB SSD storage", "Free SSL + CDN",
      "Business email (20 accounts)", "Daily backups", "Priority support",
    ],
  },
  {
    category: "web-cloud", tier: "enterprise", title: "Enterprise", order: 2,
    description: "High-traffic & mission-critical.",
    priceUGX: "5,000,000 UGX", priceUSD: "$1,350", period: "/ year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Unlimited websites", "500 GB SSD storage", "Dedicated IP & CDN",
      "Unlimited email accounts", "24/7 monitoring", "Dedicated support",
    ],
  },

  // ── email-hosting ─────────────────────────────────────────────────────────
  {
    category: "email-hosting", tier: "basic", title: "Basic", order: 0,
    description: "For solo professionals.",
    priceUGX: "300,000 UGX", priceUSD: "$81", period: "/ year",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "5 email accounts", "5 GB storage per account", "Webmail access",
      "Spam & virus protection", "SSL security", "Email support",
    ],
  },
  {
    category: "email-hosting", tier: "business", title: "Business", order: 1,
    description: "For teams & small businesses.",
    priceUGX: "800,000 UGX", priceUSD: "$216", period: "/ year",
    isPopular: true, buttonText: "Buy Now", isActive: true,
    features: [
      "25 email accounts", "25 GB storage per account", "Mobile sync (iOS/Android)",
      "Shared calendar & contacts", "Daily backups", "Priority support",
    ],
  },
  {
    category: "email-hosting", tier: "enterprise", title: "Enterprise", order: 2,
    description: "For large organisations.",
    priceUGX: "2,000,000 UGX", priceUSD: "$540", period: "/ year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Unlimited email accounts", "100 GB storage per account", "Advanced admin controls",
      "Compliance & archiving", "Dedicated IP", "24/7 support",
    ],
  },

  // ── ict-training ──────────────────────────────────────────────────────────
  {
    category: "ict-training", tier: "individual", title: "Individual", order: 0,
    description: "For self-paced learners.",
    priceUGX: "1,500,000 UGX", priceUSD: "$405", period: "/ year",
    isPopular: false, buttonText: "Enroll Now", isActive: true,
    features: [
      "Access to 1 course track", "Hands-on lab exercises", "Certificate of completion",
      "Community forum access", "Email support",
    ],
  },
  {
    category: "ict-training", tier: "team", title: "Team", order: 1,
    description: "For small teams (up to 10).",
    priceUGX: "5,000,000 UGX", priceUSD: "$1,350", period: "/ year",
    isPopular: true, buttonText: "Get Started", isActive: true,
    features: [
      "Access to all course tracks", "Instructor-led sessions", "Team progress dashboard",
      "Recognised certificates", "Priority support", "Custom schedule",
    ],
  },
  {
    category: "ict-training", tier: "corporate", title: "Corporate", order: 2,
    description: "Tailored programmes for organisations.",
    priceUGX: "Custom", priceUSD: "Custom", period: "",
    isPopular: false, buttonText: "Request a Quote", isActive: true,
    features: [
      "Unlimited staff", "On-site or remote delivery", "Custom curriculum",
      "Mentorship & coaching", "Progress reporting", "Dedicated trainer",
    ],
  },

  // ── software-development ──────────────────────────────────────────────────
  {
    category: "software-development", tier: "starter", title: "Starter", order: 0,
    description: "Small apps & MVPs — one-time project fee.",
    priceUGX: "From 2,000,000 UGX", priceUSD: "From $540", period: "one-time",
    isPopular: false, buttonText: "Get a Quote", isActive: true,
    features: [
      "Up to 5 core features", "Mobile or web app", "UI/UX design included",
      "3 months support", "Source code handover",
    ],
  },
  {
    category: "software-development", tier: "business", title: "Business", order: 1,
    description: "Full-featured business systems — one-time project fee.",
    priceUGX: "From 8,000,000 UGX", priceUSD: "From $2,160", period: "one-time",
    isPopular: true, buttonText: "Start Your Project", isActive: true,
    features: [
      "Custom feature set", "Web + Mobile", "API integrations",
      "Admin dashboard", "6 months support", "Staff training",
    ],
  },
  {
    category: "software-development", tier: "enterprise", title: "Enterprise", order: 2,
    description: "Large-scale systems & ERP — scoped to your needs.",
    priceUGX: "Custom", priceUSD: "Custom", period: "",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Unlimited complexity", "Multi-platform", "Legacy migration",
      "DevOps & CI/CD", "SLA support contract", "Dedicated team",
    ],
  },

  // ── app-development ───────────────────────────────────────────────────────
  {
    category: "app-development", tier: "mvp", title: "MVP", order: 0,
    description: "Validate your idea fast — one-time project fee.",
    priceUGX: "From 3,000,000 UGX", priceUSD: "From $810", period: "one-time",
    isPopular: false, buttonText: "Get a Quote", isActive: true,
    features: [
      "1 platform (iOS or Android)", "Up to 6 screens", "UI/UX design included",
      "Basic backend/API", "App Store submission", "2 months support",
    ],
  },
  {
    category: "app-development", tier: "full", title: "Full App", order: 1,
    description: "Production-ready mobile app — one-time project fee.",
    priceUGX: "From 10,000,000 UGX", priceUSD: "From $2,700", period: "one-time",
    isPopular: true, buttonText: "Start Your Project", isActive: true,
    features: [
      "iOS + Android", "Custom UI/UX design", "Full backend & API",
      "Push notifications", "Payment integration", "6 months support",
    ],
  },
  {
    category: "app-development", tier: "enterprise", title: "Enterprise App", order: 2,
    description: "Complex, scalable systems — scoped to your needs.",
    priceUGX: "Custom", priceUSD: "Custom", period: "",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "Multi-platform", "Offline functionality", "Enterprise integrations",
      "Advanced security", "SLA support", "Dedicated team",
    ],
  },

  // ── research-innovation ───────────────────────────────────────────────────
  {
    category: "research-innovation", tier: "feasibility", title: "Feasibility Study", order: 0,
    description: "Assess viability before you build — per engagement.",
    priceUGX: "From 3,000,000 UGX", priceUSD: "From $810", period: "per engagement",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "Market & tech research", "Requirements analysis", "Risk assessment",
      "Executive report", "Presentation to stakeholders",
    ],
  },
  {
    category: "research-innovation", tier: "sprint", title: "Innovation Sprint", order: 1,
    description: "Rapid prototyping & proof of concept — per project.",
    priceUGX: "From 8,000,000 UGX", priceUSD: "From $2,160", period: "per project",
    isPopular: true, buttonText: "Start a Project", isActive: true,
    features: [
      "AI/ML or IoT prototype", "Data pipeline setup", "Sprint-based delivery",
      "Workshop sessions", "Full documentation", "3 months support",
    ],
  },
  {
    category: "research-innovation", tier: "transformation", title: "Digital Transformation", order: 2,
    description: "Organisation-wide transformation — scoped to your needs.",
    priceUGX: "Custom", priceUSD: "Custom", period: "",
    isPopular: false, buttonText: "Talk to Our Team", isActive: true,
    features: [
      "Full tech audit", "Strategy roadmap", "Process automation",
      "Change management", "Staff enablement", "Ongoing partnership",
    ],
  },
];

async function main() {
  console.log("Seeding pricing plans...");
  let created = 0;
  let skipped = 0;

  for (const plan of pricingPlans) {
    const { features, ...planData } = plan;
    const existing = await prisma.pricingPlan.findFirst({
      where: { category: planData.category, tier: planData.tier },
    });
    if (existing) {
      console.log(`  ⏭  Skipped: ${planData.category} / ${planData.tier}`);
      skipped++;
    } else {
      await prisma.pricingPlan.create({
        data: {
          ...planData,
          features: { create: features.map((text, i) => ({ text, order: i })) },
        },
      });
      console.log(`  ✓  Created: ${planData.category} / ${planData.tier}`);
      created++;
    }
  }

  console.log(`\nPricing plans done — ${created} created, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
