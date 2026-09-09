"use client";
import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceOfferings } from "@/components/services-pages/service-offerings";
import { EntityPricingSection } from "@/components/pricing/entity-pricing-section";
import { Globe, Cloud, Mail, Server, Shield, Zap, Database, Lock, RefreshCw, BarChart2, HeadphonesIcon, TrendingUp } from "lucide-react";

const capabilities = [
  { name: "Website Design", icon: Globe },
  { name: "Web Development", icon: TrendingUp },
  { name: "Web Hosting", icon: Server },
  { name: "Cloud Servers", icon: Cloud },
  { name: "Email Hosting", icon: Mail },
  { name: "SSL & Security", icon: Shield },
  { name: "Domain Registry", icon: Database },
  { name: "Backups", icon: RefreshCw },
  { name: "Performance", icon: Zap },
  { name: "Analytics", icon: BarChart2 },
  { name: "Firewalls", icon: Lock },
  { name: "24/7 Monitoring", icon: HeadphonesIcon },
];

export default function WebCloudPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/website-image.webp"
        backgroundAlt="Web and Cloud Services"
        title="Web & Cloud"
        highlightedTitle="Services"
        tagline="Your Digital Presence, Powered by Kanlyte"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/web-cloud" },
          { label: "Web & Cloud Services", isActive: true },
        ]}
      />
      <ServiceHero
        slug="web-cloud"
        badge="Web & Cloud Services — Kanlyte Uganda"
        title="Your business,"
        highlight="always online."
        subtitle="Fast, secure, *reliable!"
        description="From building your website to hosting it on the cloud — Kanlyte delivers everything you need for a powerful, secure, and professional online presence."
        primaryBtn={{ label: "Get Started", href: "/contact-us" }}
        secondaryBtn={{ label: "View Pricing", href: "/pricing" }}
        annotation={{ line1: "99.9%", line2: "uptime guaranteed" }}
      />
      <ServiceCapabilities
        slug="web-cloud"
        title="Our Web & Cloud Capabilities"
        subtitle="End-to-end web and cloud services for businesses of all sizes."
        capabilities={capabilities}
        tagline="Imagine your business without a reliable online presence"
        ctaLabel="Start Your Project"
        ctaHref="/contact-us"
      />
      <ServiceOfferings slug="web-cloud" />
      <EntityPricingSection ownerType="service" ownerSlug="web-cloud" ownerTitle="Web & Cloud Services" includeChildServices />
      {/* <ServiceWhyUs
        benefits={benefits}
        ctaTitle="Ready to Build Your Online Presence?"
        ctaDescription="Get a professional website, reliable hosting, and business email — all from one trusted provider."
        ctaLabel="Get in Touch"
      /> */}
    </>
  );
}
