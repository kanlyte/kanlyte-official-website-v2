import "dotenv/config";
import { prisma } from "../lib/prisma";
import { seedAdmin } from "./seeds/seed-admin";
import { seedHeroSlides } from "./seeds/seed-hero-slides";
import { seedStats } from "./seeds/seed-stats";
import { seedServices } from "./seeds/seed-services";
import { seedProducts } from "./seeds/seed-products";
import { seedPageContent } from "./seeds/seed-page-content";
import { seedPageCapabilities } from "./seeds/seed-page-capabilities";
import { seedPricingPlans } from "./seeds/seed-pricing-plans";
import { seedMonthlyPrices } from "./seeds/seed-monthly-prices";
import { seedProjects } from "./seeds/seed-projects";
import { seedProcessSteps } from "./seeds/seed-process-steps";
import { seedFAQs } from "./seeds/seed-faqs";
import { seedPartners } from "./seeds/seed-partners";
import { seedTeamMembers } from "./seeds/seed-team-members";
import { seedTestimonials } from "./seeds/seed-testimonials";
import { seedMilestones } from "./seeds/seed-milestones";
import { seedContactInfo } from "./seeds/seed-contact-info";
import { seedSocialLinks } from "./seeds/seed-social-links";
import { seedSectorsWeServe } from "./seeds/seed-sectors-we-serve";
import { seedGalleryImages } from "./seeds/seed-gallery-images";

async function main() {
  await seedAdmin();
  await seedHeroSlides();
  await seedStats();

  // Services & products first — they also seed pricing plan categories and page content
  await seedServices();
  await seedProducts();

  // Page content for home sections (showcase, about) — products/services already handled above
  await seedPageContent();

  // Capabilities and pricing plans depend on page content + pricing categories existing
  await seedPageCapabilities();
  await seedPricingPlans();
  await seedMonthlyPrices();

  await seedProjects();
  await seedProcessSteps();
  await seedFAQs();
  await seedPartners();
  await seedTeamMembers();
  await seedTestimonials();
  await seedMilestones();
  await seedContactInfo();
  await seedSocialLinks();
  await seedSectorsWeServe();
  await seedGalleryImages();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
