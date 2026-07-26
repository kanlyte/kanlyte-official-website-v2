import "dotenv/config";
import { prisma } from "../lib/prisma";
import { seedPageContent } from "./seeds/seed-page-content";
import { seedPageCapabilities } from "./seeds/seed-page-capabilities";
import { seedPricingPlans } from "./seeds/seed-pricing-plans";
import { seedMonthlyPrices } from "./seeds/seed-monthly-prices";
import { seedAdmin } from "./seeds/seed-admin";
import { seedHeroSlides } from "./seeds/seed-hero-slides";
import { seedStats } from "./seeds/seed-stats";
import { seedServices } from "./seeds/seed-services";
import { seedProducts } from "./seeds/seed-products";
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

async function main() {
  // await seedPageContent();
  // await seedPageCapabilities();
  // await seedPricingPlans();
  // await seedMonthlyPrices();
  await seedAdmin();
  await seedHeroSlides();
  await seedStats();
  await seedServices();
  await seedProducts();
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
