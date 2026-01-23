import { Hero } from "@/components/about-us/hero";
import { PricingSection } from "@/components/pricing/custom-pricing";
import React from "react";

export default function page() {
  return (
    <>
      <Hero
        backgroundImage="/images/pricing.webp"
        backgroundAlt="Pricing Background"
        title="Simple Transparent"
        highlightedTitle="Pricing"
        tagline="Choose Your Plan"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing", isActive: true },
        ]}
      />
      <PricingSection />
    </>
  );
}
