import { Hero } from "@/components/about-us/hero";
import { ContactUsPage } from "@/components/home/ContactUsForm";
import React from "react";

export default function page() {
  return (
    <>
      <Hero
        backgroundImage="/images/pricing.webp"
        backgroundAlt="Pricing Background"
        title="Get In Touch"
        highlightedTitle="Contact Us"
        tagline="We'd Love to Hear From You"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact-us", isActive: true },
        ]}
      />
      <ContactUsPage />
    </>
  );
}
