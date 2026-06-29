"use client";
import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceWhyUs } from "@/components/services-pages/service-why-us";
import { ResearchInnovationPricing } from "@/components/services/ResearchInnovationPricing";
import { FlaskConical, Lightbulb, TrendingUp, Cpu, Globe, Users, BarChart2, Layers, RefreshCw, Zap, Shield, HeadphonesIcon } from "lucide-react";

const capabilities = [
  { name: "Applied Research", icon: FlaskConical },
  { name: "Innovation Strategy", icon: Lightbulb },
  { name: "AI & ML", icon: Cpu },
  { name: "Data Analytics", icon: BarChart2 },
  { name: "Digital Transformation", icon: TrendingUp },
  { name: "IoT Solutions", icon: Globe },
  { name: "Tech Transfer", icon: Users },
  { name: "Process Automation", icon: RefreshCw },
  { name: "Cloud Intelligence", icon: Layers },
  { name: "Rapid Prototyping", icon: Zap },
];

const benefits = [
  { icon: Lightbulb, title: "Innovation-Led Approach", description: "We combine research depth with practical business application." },
  { icon: Shield, title: "Proven Methodologies", description: "Industry-standard frameworks adapted for the East African market." },
  { icon: HeadphonesIcon, title: "End-to-End Support", description: "From ideation through deployment and continuous improvement." },
];

export default function ResearchInnovationPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/coding-instructor.jpg"
        backgroundAlt="Research and Innovation"
        title="Research &"
        highlightedTitle="Innovation"
        tagline="Driving the Future Through Technology"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/research-innovation" },
          { label: "Research & Innovation", isActive: true },
        ]}
      />
      <ServiceHero
        badge="Research & Innovation — Kanlyte Uganda"
        title="Technology that"
        highlight="solves problems."
        subtitle="Data-driven, *results-focused!"
        description="We combine deep technical research with practical innovation to help organisations stay ahead — from AI and IoT to digital transformation strategies built for East Africa."
        primaryBtn={{ label: "Start a Project", href: "/contact-us" }}
        secondaryBtn={{ label: "Learn More", href: "/contact-us" }}
        annotation={{ line1: "Real-world", line2: "impact" }}
      />
      <ServiceCapabilities
        title="Our Research & Innovation Capabilities"
        subtitle="A full spectrum of innovation services — from lab to launch."
        capabilities={capabilities}
        tagline="Imagine your business without data-driven innovation"
        ctaLabel="Explore Our Work"
        ctaHref="/contact-us"
      />
      <ResearchInnovationPricing />
      <ServiceWhyUs
        benefits={benefits}
        ctaTitle="Have a Research Challenge?"
        ctaDescription="Let's explore how technology and innovation can solve it. Talk to our team today."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
