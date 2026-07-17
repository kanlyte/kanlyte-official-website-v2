"use client";
import { Hero } from "@/components/about-us/hero";
import { LyteHero } from "@/components/lyte/hero";
import { LyteFeatures } from "@/components/lyte/features";
import { LytePricing } from "@/components/lyte/pricing";

export default function LytePage() {
  return (
    <>
      <Hero
        backgroundImage="/images/image2.jpg"
        backgroundAlt="Lyte App"
        title="Find Your Perfect"
        highlightedTitle="Place to Stay"
        tagline="Lyte App — Hostel & House Booking"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/lyte" },
          { label: "Lyte App", isActive: true },
        ]}
      />
      <LyteHero />
      <LyteFeatures />
      <LytePricing />
      {/* <ServiceWhyUs
        benefits={benefits}
        ctaTitle="Ready to Find Your Next Home?"
        ctaDescription="Join the Lyte community and discover affordable, verified accommodation across Uganda."
        ctaLabel="Get Early Access"
        ctaHref="/contact-us"
      /> */}
    </>
  );
}
