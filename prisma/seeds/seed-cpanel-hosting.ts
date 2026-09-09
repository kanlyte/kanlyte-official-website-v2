import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const PRODUCT = {
  title: "cPanel Hosting",
  slug: "cpanel-hosting",
  description:
    "Reliable, affordable cPanel web hosting with SSD storage, unlimited bandwidth, professional email accounts, and full database support — perfect for businesses of all sizes.",
  image: "/cloud-infrastructure.png",
  icon: "Server",
  order: 4,
  isActive: true,
};

const PAGE_CONTENT = {
  slug: "cpanel-hosting",
  pageType: "product",
  badge: "cPanel Hosting — by Kanlyte Uganda",
  title: "Reliable hosting,",
  highlight: "your way.",
  subtitle: "Fast, secure, *always online!",
  description:
    "Kanlyte's cPanel hosting gives you SSD-powered speed, professional email, and full database support — all managed through the world's most popular hosting control panel.",
  primaryBtnLabel: "Get Started",
  primaryBtnHref: "/contact-us",
  secondaryBtnLabel: "View Plans",
  secondaryBtnHref: "/contact-us",
  annotationLine1: "99.9%",
  annotationLine2: "uptime guaranteed",
  isActive: true,
};

const PRICING_PLANS = [
  {
    tier: "core", title: "Core", order: 0,
    description: "Entry-level cPanel hosting for personal sites and small projects.",
    priceUGX: "100,000 UGX", period: "/ year",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "3 mailboxes",
      "2 GB SSD disk space",
      "1 domain allowed",
      "Standard SSL Certificate",
      "1 Gbit/s unmetered bandwidth",
      "MySQL & PostgreSQL databases",
    ],
  },
  {
    tier: "advanced", title: "Advanced", order: 1,
    description: "More mailboxes and storage for small businesses with multiple domains.",
    priceUGX: "200,000 UGX", period: "/ year",
    isPopular: true, buttonText: "Get Started", isActive: true,
    features: [
      "10 mailboxes",
      "5 GB SSD disk space",
      "Up to 2 domains",
      "Standard SSL Certificate",
      "1 Gbit/s unmetered bandwidth",
      "MySQL & PostgreSQL databases",
    ],
  },
  {
    tier: "business", title: "Business", order: 2,
    description: "Generous storage and mailboxes for growing businesses.",
    priceUGX: "500,000 UGX", period: "/ year",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "50 mailboxes",
      "50 GB SSD disk space",
      "Up to 5 domains",
      "Standard SSL Certificate",
      "1 Gbit/s unmetered bandwidth",
      "MySQL & PostgreSQL databases",
    ],
  },
  {
    tier: "ultimate", title: "Ultimate", order: 3,
    description: "High-capacity hosting for agencies and large organisations.",
    priceUGX: "1,000,000 UGX", period: "/ year",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "100 mailboxes",
      "100 GB SSD disk space",
      "Up to 10 domains",
      "Standard SSL Certificate",
      "1 Gbit/s unmetered bandwidth",
      "MySQL & PostgreSQL databases",
    ],
  },
];

export async function seedCpanelHosting() {
  console.log("Seeding cPanel Hosting product...");

  // 1. Product
  let product = await prisma.product.findFirst({ where: { slug: PRODUCT.slug } });
  if (!product) {
    product = await prisma.product.create({ data: PRODUCT });
    console.log(`  ✓  Product created: ${PRODUCT.title}`);
  } else {
    console.log(`  ⏭  Product exists: ${PRODUCT.title}`);
  }

  // 2. Page content
  const hasContent = await prisma.pageContent.findFirst({ where: { slug: PRODUCT.slug } });
  if (!hasContent) {
    await prisma.pageContent.create({ data: PAGE_CONTENT });
    console.log(`  ✓  PageContent created: ${PRODUCT.slug}`);
  } else {
    console.log(`  ⏭  PageContent exists: ${PRODUCT.slug}`);
  }

  // 3. Pricing category linked to product
  await prisma.pricingPlanCategory.upsert({
    where: { slug: PRODUCT.slug },
    create: {
      name: PRODUCT.title,
      slug: PRODUCT.slug,
      ownerType: "product",
      ownerSlug: PRODUCT.slug,
      pricingEnabled: true,
      productId: product.id,
    },
    update: {
      name: PRODUCT.title,
      ownerType: "product",
      ownerSlug: PRODUCT.slug,
      pricingEnabled: true,
      productId: product.id,
    },
  });
  console.log(`  ✓  Pricing category upserted: ${PRODUCT.slug}`);

  // 4. Pricing plans
  let created = 0, skipped = 0;
  for (const plan of PRICING_PLANS) {
    const { features, ...planData } = plan;
    const exists = await prisma.pricingPlan.findFirst({
      where: { category: PRODUCT.slug, tier: planData.tier },
    });
    if (exists) { skipped++; console.log(`  ⏭  Plan exists: ${planData.tier}`); }
    else {
      await prisma.pricingPlan.create({
        data: {
          ...planData,
          category: PRODUCT.slug,
          features: { create: features.map((text, i) => ({ text, order: i })) },
        },
      });
      created++;
      console.log(`  ✓  Plan created: ${planData.tier}`);
    }
  }

  console.log(`\ncPanel Hosting done — ${created} plans created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedCpanelHosting()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
