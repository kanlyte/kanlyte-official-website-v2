"use client";
import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceWhyUs } from "@/components/services-pages/service-why-us";
import { ICTTrainingPricing } from "@/components/services/ICTTrainingPricing";
import { GraduationCap, Users, BookOpen, Briefcase, Award, TrendingUp, Code, Database, Shield, Cloud, Smartphone, HeadphonesIcon } from "lucide-react";

const capabilities = [
  { name: "Web Development", icon: Code },
  { name: "Mobile Dev", icon: Smartphone },
  { name: "Database Admin", icon: Database },
  { name: "Cloud Computing", icon: Cloud },
  { name: "Cybersecurity", icon: Shield },
  { name: "Odoo ERP", icon: Award },
  { name: "IT Consulting", icon: Briefcase },
  { name: "Corporate Training", icon: Users },
  { name: "Digital Skills", icon: GraduationCap },
  { name: "Curriculum Dev", icon: BookOpen },
  { name: "Certification Prep", icon: TrendingUp },
  { name: "Mentorship", icon: HeadphonesIcon },
];

const benefits = [
  { icon: GraduationCap, title: "Industry-Expert Trainers", description: "Learn from practitioners with real-world experience." },
  { icon: Users, title: "Small Class Sizes", description: "Personalised attention for every learner." },
  { icon: Award, title: "Recognised Certificates", description: "Certificates valued by employers across East Africa." },
];

export default function ICTTrainingPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/coding-instructor.jpg"
        backgroundAlt="ICT Training and Consultancy"
        title="ICT Training &"
        highlightedTitle="Consultancy"
        tagline="Building Uganda's Digital Workforce"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/ict-training" },
          { label: "ICT Training & Consultancy", isActive: true },
        ]}
      />
      <ServiceHero
        slug="ict-training"
        badge="ICT Training & Consultancy — Kanlyte Uganda"
        title="Skills that build"
        highlight="careers."
        subtitle="Practical, hands-on, *job-ready!"
        description="Kanlyte trains the next generation of Ugandan tech professionals and helps organisations make smarter technology decisions through expert ICT consultancy."
        primaryBtn={{ label: "Enquire Now", href: "/contact-us" }}
        secondaryBtn={{ label: "Corporate Training", href: "/contact-us" }}
        annotation={{ line1: "500+", line2: "learners trained" }}
      />
      <ServiceCapabilities
        slug="ict-training"
        title="Our Training & Consultancy Areas"
        subtitle="Practical programmes covering the full spectrum of modern ICT skills."
        capabilities={capabilities}
        tagline="Imagine your team without the right digital skills"
        ctaLabel="View All Programmes"
        ctaHref="/contact-us"
      />
      <ICTTrainingPricing />
      {/* <ServiceWhyUs
        benefits={benefits}
        ctaTitle="Ready to Upskill Your Team?"
        ctaDescription="Enquire about upcoming training programmes or request a custom corporate package."
        ctaLabel="Get in Touch"
      /> */}
    </>
  );
}
