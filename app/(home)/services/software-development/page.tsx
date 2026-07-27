"use client";
import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceOfferings } from "@/components/services-pages/service-offerings";
import { EntityPricingSection } from "@/components/pricing/entity-pricing-section";
import { Code, Smartphone, Database, Settings, RefreshCw, CheckCircle, Layers, Globe, Cpu, Shield, Zap, HeadphonesIcon } from "lucide-react";

const capabilities = [
  { name: "Custom Software", icon: Code },
  { name: "Mobile Apps", icon: Smartphone },
  { name: "ERP Systems", icon: Database },
  { name: "API Development", icon: Layers },
  { name: "System Integration", icon: Settings },
  { name: "Web Apps", icon: Globe },
  { name: "AI Integration", icon: Cpu },
  { name: "Legacy Migration", icon: RefreshCw },
  { name: "QA & Testing", icon: CheckCircle },
  { name: "DevOps", icon: Zap },
  { name: "Security Audits", icon: Shield },
  { name: "Maintenance", icon: HeadphonesIcon },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/image1.jpg"
        backgroundAlt="Software Development"
        title="Software & Systems"
        highlightedTitle="Development"
        tagline="Custom Solutions Built to Scale"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/software-development" },
          { label: "Software Development", isActive: true },
        ]}
      />
      <ServiceHero
        slug="software-development"
        badge="Software Development — Kanlyte Uganda"
        title="We build software"
        highlight="that works."
        subtitle="Scalable, reliable, *beautifully built!"
        description="From mobile apps and ERP systems to custom web platforms — Kanlyte delivers software that solves real business problems, on time and within budget."
        primaryBtn={{ label: "Start Your Project", href: "/contact-us" }}
        secondaryBtn={{ label: "View Our Work", href: "/contact-us" }}
        annotation={{ line1: "Built to", line2: "scale with you" }}
      />
      <ServiceCapabilities
        slug="software-development"
        title="Our Software Development Capabilities"
        subtitle="Full-stack development across mobile, web, and enterprise systems."
        capabilities={capabilities}
        tagline="Imagine your business still running on spreadsheets"
        ctaLabel="Let's Build Together"
        ctaHref="/contact-us"
      />
      <ServiceOfferings slug="software-development" />
      <EntityPricingSection ownerType="service" ownerSlug="software-development" ownerTitle="Software Development" includeChildServices />
      {/* <ServiceWhyUs
        benefits={benefits}
        ctaTitle="Have a Project in Mind?"
        ctaDescription="Tell us what you need and we'll build it. Let's create something great together."
        ctaLabel="Start Your Project"
      /> */}
    </>
  );
}
