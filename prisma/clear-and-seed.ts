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

async function clearAll() {
  console.log("Clearing all data...");
  await prisma.pricingPlanFeature.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.pricingPlanCategory.deleteMany();
  await prisma.pageCapability.deleteMany();
  await prisma.pageContent.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.project.deleteMany();
  await prisma.processStep.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.teamMemberSocial.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.sectorWeServe.deleteMany();
  await prisma.odooApp.deleteMany();
  await prisma.newsPost.deleteMany();
  await prisma.career.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.galleryCategory.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactSubmission.deleteMany();
  console.log("All data cleared.\n");
}

async function main() {
  await clearAll();
  await seedAdmin();
  await seedHeroSlides();
  await seedStats();
  await seedServices();
  await seedProducts();
  await seedPageContent();
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
  console.log("\nAll done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
