import "dotenv/config";
import { fileURLToPath } from "node:url";
import { prisma } from "../../lib/prisma";

// Monthly prices to add to existing plans
const monthlyPrices: Record<string, Record<string, { priceUGXMonthly: string; priceUSDMonthly: string }>> = {
  odoo: {
    community:  { priceUGXMonthly: "100,000 UGX", priceUSDMonthly: "$27" },
    standard:   { priceUGXMonthly: "130,000 UGX", priceUSDMonthly: "$35" },
    custom:     { priceUGXMonthly: "185,000 UGX", priceUSDMonthly: "$50" },
  },
  "school-sync": {
    starter:    { priceUGXMonthly: "150,000 UGX", priceUSDMonthly: "$42" },
    standard:   { priceUGXMonthly: "300,000 UGX", priceUSDMonthly: "$83" },
    pro:        { priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$139" },
  },
  lyte: {
    free:       { priceUGXMonthly: "Free",         priceUSDMonthly: "Free" },
    basic:      { priceUGXMonthly: "50,000 UGX",  priceUSDMonthly: "$14" },
    pro:        { priceUGXMonthly: "120,000 UGX", priceUSDMonthly: "$32" },
  },
  "web-hosting": {
    core:       { priceUGXMonthly: "80,000 UGX",  priceUSDMonthly: "$23" },
    advanced:   { priceUGXMonthly: "120,000 UGX", priceUSDMonthly: "$33" },
    premium:    { priceUGXMonthly: "290,000 UGX", priceUSDMonthly: "$83" },
  },
  "web-cloud": {
    starter:    { priceUGXMonthly: "80,000 UGX",  priceUSDMonthly: "$22" },
    business:   { priceUGXMonthly: "200,000 UGX", priceUSDMonthly: "$54" },
    enterprise: { priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$135" },
  },
  "email-hosting": {
    basic:      { priceUGXMonthly: "30,000 UGX",  priceUSDMonthly: "$8" },
    business:   { priceUGXMonthly: "80,000 UGX",  priceUSDMonthly: "$22" },
    enterprise: { priceUGXMonthly: "200,000 UGX", priceUSDMonthly: "$54" },
  },
  "ict-training": {
    individual: { priceUGXMonthly: "150,000 UGX", priceUSDMonthly: "$41" },
    team:       { priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$135" },
    corporate:  { priceUGXMonthly: "Custom",       priceUSDMonthly: "Custom" },
  },
  "software-development": {
    starter:    { priceUGXMonthly: "200,000 UGX",   priceUSDMonthly: "$54" },
    business:   { priceUGXMonthly: "800,000 UGX",   priceUSDMonthly: "$216" },
    enterprise: { priceUGXMonthly: "Custom",         priceUSDMonthly: "Custom" },
  },
  "app-development": {
    mvp:        { priceUGXMonthly: "300,000 UGX",   priceUSDMonthly: "$81" },
    full:       { priceUGXMonthly: "1,000,000 UGX", priceUSDMonthly: "$270" },
    enterprise: { priceUGXMonthly: "Custom",         priceUSDMonthly: "Custom" },
  },
  "research-innovation": {
    feasibility:     { priceUGXMonthly: "300,000 UGX",   priceUSDMonthly: "$81" },
    sprint:          { priceUGXMonthly: "800,000 UGX",   priceUSDMonthly: "$216" },
    transformation:  { priceUGXMonthly: "Custom",         priceUSDMonthly: "Custom" },
  },
  "go-digital": {
    core:       { priceUGXMonthly: "100,000 UGX",  priceUSDMonthly: "$27" },
    advanced:   { priceUGXMonthly: "150,000 UGX",  priceUSDMonthly: "$41" },
    premium:    { priceUGXMonthly: "300,000 UGX",  priceUSDMonthly: "$81" },
  },
  cpanel: {
    core:       { priceUGXMonthly: "10,000 UGX",   priceUSDMonthly: "$3" },
    advanced:   { priceUGXMonthly: "20,000 UGX",   priceUSDMonthly: "$5" },
    business:   { priceUGXMonthly: "50,000 UGX",   priceUSDMonthly: "$14" },
    ultimate:   { priceUGXMonthly: "100,000 UGX",  priceUSDMonthly: "$27" },
  },
};

export async function seedMonthlyPrices() {
  console.log("Adding monthly prices to existing pricing plans...");
  let updated = 0;
  let skipped = 0;

  for (const [category, tiers] of Object.entries(monthlyPrices)) {
    for (const [tier, prices] of Object.entries(tiers)) {
      const plan = await prisma.pricingPlan.findFirst({ where: { category, tier } });
      if (!plan) {
        console.log(`  ⚠  Not found: ${category} / ${tier}`);
        skipped++;
        continue;
      }
      if (plan.priceUGXMonthly) {
        console.log(`  ⏭  Already has monthly price: ${category} / ${tier}`);
        skipped++;
        continue;
      }
      await prisma.pricingPlan.update({
        where: { id: plan.id },
        data: prices,
      });
      console.log(`  ✓  Updated: ${category} / ${tier} → ${prices.priceUGXMonthly} / ${prices.priceUSDMonthly}`);
      updated++;
    }
  }

  console.log(`\nMonthly prices done — ${updated} updated, ${skipped} skipped.`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedMonthlyPrices()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
