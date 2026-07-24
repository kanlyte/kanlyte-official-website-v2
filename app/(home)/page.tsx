"use client";

import { StatsSection } from "@/components/home/stats-section";
import { AboutKanlyteSection } from "@/components/home/about-kanlyte-section";
import { ProjectsSection } from "@/components/home/projects-section";
import HeroSlider from "@/components/home/hero-section";
import { ExperienceShowcase } from "@/components/home/show-case";
import { NewsSection } from "@/components/home/news-section";
import { FAQContactSection } from "@/components/home/faq-section";
import { PartnersSlider } from "@/components/home/partners-slider";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FeaturesGrid } from "@/components/home/services-section";
import { ProductsSection } from "@/components/home/products-section";
import BookDemoButton from "@/components/odoo/book-demo-button";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <StatsSection />
      <AboutKanlyteSection />
      <ProductsSection />
      <FeaturesGrid />
      <ExperienceShowcase />
      <ProjectsSection />
      <NewsSection />
      <FAQContactSection />
      <PartnersSlider />
      <NewsletterSection />
      <BookDemoButton />
    </main>
  );
}
