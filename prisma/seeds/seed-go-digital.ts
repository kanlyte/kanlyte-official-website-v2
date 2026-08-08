import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

const PRODUCT = {
  title: "Go Digital Package",
  slug: "go-digital",
  description:
    "Everything your business needs to get online — domain name, professional email, website, and hosting in one affordable bundle built for Ugandan businesses.",
  image: "/website-development.png",
  icon: "Globe",
  order: 5,
  isActive: true,
};

const PAGE_CONTENT = {
  slug: "go-digital",
  pageType: "product",
  badge: "Go Digital — by Kanlyte Uganda",
  title: "Get your business",
  highlight: "online today.",
  subtitle: "Domain, email, website, *all-in-one!",
  description:
    "The Go Digital Package bundles everything a Ugandan business needs to establish a professional online presence — domain, email, website, and hosting at one affordable price.",
  primaryBtnLabel: "Get Started",
  primaryBtnHref: "/contact-us",
  secondaryBtnLabel: "Talk to Us",
  secondaryBtnHref: "/contact-us",
  annotationLine1: "All-in-one",
  annotationLine2: "digital bundle",
  isActive: true,
};

const PRICING_PLANS = [
  {
    tier: "core", title: "Core", order: 0,
    description: "Get your business online with a professional website and email.",
    priceUGX: "1,000,000 UGX", tagline: "Renewal: 300,000 UGX / yr", period: "one-time",
    isPopular: false, buttonText: "Get Started", isActive: true,
    features: [
      "1 domain name (.com, .org, .ug, …)",
      "3 professional email accounts",
      "Basic static website",
      "2 GB hosting space",
      "Standard SSL Certificate",
      "Support & maintenance",
    ],
  },
  {
    tier: "advanced", title: "Advanced", order: 1,
    description: "A dynamic website with more emails and storage for growing businesses.",
    priceUGX: "1,500,000 UGX", tagline: "Renewal: 500,000 UGX / yr", period: "one-time",
    isPopular: true, buttonText: "Get Started", isActive: true,
    features: [
      "1 domain name (.com, .org, .ug, …)",
      "10 professional email accounts",
      "Dynamic website",
      "5 GB hosting space",
      "Standard SSL Certificate",
      "Support & maintenance",
    ],
  },
  {
    tier: "premium", title: "Premium", order: 2,
    description: "A fully custom dynamic website with large storage for established businesses.",
    priceUGX: "3,000,000 UGX", tagline: "Renewal: 800,000 UGX / yr", period: "one-time",
    isPopular: false, buttonText: "Contact Sales", isActive: true,
    features: [
      "1 domain name (.com, .org, .ug, …)",
      "50 professional email accounts",
      "Custom dynamic website",
      "50 GB hosting space",
      "Standard SSL Certificate",
      "Support & maintenance",
    ],
  },
];

export async function seedGoDigital() {
  console.log("Seeding Go Digital Package product...");

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

  console.log(`\nGo Digital Package done — ${created} plans created, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedGoDigital()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
