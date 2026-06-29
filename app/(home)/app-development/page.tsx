import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceSidebar } from "@/components/home/service-sidebar";
import { AppDevelopmentContent } from "@/components/services/AppDevelopment";
import { AppDevelopmentPricing } from "@/components/services/AppDevelopmentPricing";
import { Smartphone, Code, Shield, Zap, Palette, Users, Headphones, Wrench, Globe, RefreshCw, Database, CheckCircle } from "lucide-react";
import React from "react";

const capabilities = [
  { name: "iOS Development", icon: Smartphone },
  { name: "Android Dev", icon: Code },
  { name: "React Native", icon: RefreshCw },
  { name: "Flutter", icon: Zap },
  { name: "UI/UX Design", icon: Palette },
  { name: "Backend & API", icon: Database },
  { name: "App Security", icon: Shield },
  { name: "Push Notifications", icon: Globe },
  { name: "Team Augmentation", icon: Users },
  { name: "QA & Testing", icon: CheckCircle },
  { name: "API Integration", icon: Wrench },
  { name: "Maintenance", icon: Headphones },
];

export default function AppDevelopmentPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/appdev-bg.avif"
        backgroundAlt="App Development"
        title="Mobile App"
        highlightedTitle="Development"
        tagline="iOS & Android — Built by Kanlyte"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "App Development", isActive: true },
        ]}
      />
      <ServiceHero
        slug="app-development"
        badge="App Development — Kanlyte Uganda"
        title="Apps that users"
        highlight="love to use."
        subtitle="Native, cross-platform, *beautifully built!"
        description="From MVP to full-scale mobile products — Kanlyte designs and builds iOS and Android apps that are fast, secure, and built to grow with your business."
        primaryBtn={{ label: "Start Your Project", href: "/contact-us" }}
        secondaryBtn={{ label: "View Pricing", href: "/pricing" }}
        annotation={{ line1: "iOS +", line2: "Android" }}
      />
      <ServiceCapabilities
        slug="app-development"
        title="Our App Development Capabilities"
        subtitle="Full-stack mobile development across iOS, Android, and cross-platform frameworks."
        capabilities={capabilities}
        tagline="Imagine your business without a mobile app"
        ctaLabel="Build Your App"
        ctaHref="/contact-us"
      />
      <div className="bg-white py-16">
        <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr]">
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <ServiceSidebar />
            </div>
            <AppDevelopmentContent />
          </div>
        </div>
      </div>
      <AppDevelopmentPricing />
    </>
  );
}
