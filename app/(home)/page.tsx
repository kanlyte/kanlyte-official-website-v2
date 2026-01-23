"use client";

import { ProcessSection } from "@/components/home/process-section";
import { StatsSection } from "@/components/home/stats-section";
import { ProjectsSection } from "@/components/home/projects-section";
import HeroSlider from "@/components/home/hero-section";
import { Pricing } from "@/components/home/pricing-section";
import { ExperienceShowcase } from "@/components/home/show-case";
import { FAQContactSection } from "@/components/home/faq-section";
import { PartnersSlider } from "@/components/home/partners-slider";
import { FeaturesGrid } from "@/components/home/services-section";
import BookDemoButton from "@/components/odoo/book-demo-button";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <StatsSection />
      <FeaturesGrid />
      <ExperienceShowcase />
      <ProcessSection />
      <ProjectsSection />
      <FAQContactSection />
      <Pricing />
      <PartnersSlider />
      <BookDemoButton />
    </main>
  );
}
