"use client";

import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useStats } from "@/content-manager/hooks/useStats";
import { useServices } from "@/content-manager/hooks/useServices";
import { usePageContent } from "@/content-manager/hooks/usePageContent";

const FALLBACK = {
  badge: "About Kanlyte Uganda",
  title: "Purposefully Built for",
  highlight: "Africa's Digital Future",
  description:
    "Kanlyte Uganda Limited is a technology company delivering custom software, web and cloud solutions, ICT training, and research-driven innovation to organisations across Uganda and beyond. We turn technology into practical, lasting impact.",
  annotationLine1: "Serving Uganda & beyond since 2018",
  annotationLine2: "Trusted by schools, NGOs & enterprises",
  subtitle: "End-to-end digital transformation",
  annotationLines: JSON.stringify([
    "Serving Uganda & beyond since 2018",
    "Trusted by schools, NGOs & enterprises",
    "End-to-end digital transformation",
  ]),
  primaryBtnLabel: "Discover Our Story",
  primaryBtnHref: "/about-us",
  secondaryBtnHref: "/images/about-04.jpg",
  secondaryBtnLabel: "Kanlyte team at work",
};

const FALLBACK_YEARS = { value: "6+", label: "Years of Impact" };

const FALLBACK_OFFERINGS = [
  { id: "1", title: "Software & App Development", icon: "Code2" },
  { id: "2", title: "Web & Cloud Services", icon: "Cloud" },
  { id: "3", title: "ICT Training & Consultancy", icon: "GraduationCap" },
  { id: "4", title: "Research & Innovation", icon: "Lightbulb" },
];

export function AboutKanlyteSection() {
  const { data: stats = [] } = useStats();
  const { data: pageContent } = usePageContent("about-home");
  const { data: allServices = [] } = useServices(true);

  const content = pageContent ?? FALLBACK;

  const yearsStat =
    stats.find((s: { label: string; value: string }) =>
      s.label.toLowerCase().includes("year")
    ) ?? FALLBACK_YEARS;

  const featuredServices = allServices.filter(
    (s: { featured: boolean; isActive: boolean }) => s.featured && s.isActive
  ).slice(0, 4);
  const offerings = featuredServices.length ? featuredServices : FALLBACK_OFFERINGS;

  const highlights = (() => {
    if (content.annotationLines) {
      try {
        const parsed = JSON.parse(content.annotationLines);
        if (Array.isArray(parsed) && parsed.length) return parsed as string[];
      } catch { /* fall through */ }
    }
    return [content.annotationLine1, content.annotationLine2, content.subtitle].filter(Boolean) as string[];
  })();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full shadow-2xl">
              <Image
                src={content.secondaryBtnHref || "/images/about-04.jpg"}
                alt={content.secondaryBtnLabel || "Kanlyte team at work"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#6EBE45]/10" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
              <p className="text-3xl font-extrabold text-[#6EBE45]">{yearsStat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{yearsStat.label}</p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-[#6EBE45] text-white rounded-2xl shadow-lg px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider">Perfectly Digital</p>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 opacity-20"
              style={{
                backgroundImage: "radial-gradient(#6EBE45 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          {/* Right — Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#6EBE45] animate-pulse" />
              <span className="text-sm font-semibold text-[#6EBE45]">{content.badge}</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {content.title}{" "}
              <span className="text-[#6EBE45]">{content.highlight}</span>
            </h2>

            <p className="text-gray-500 leading-relaxed text-base">{content.description}</p>

            {/* Highlights */}
            <ul className="flex flex-col gap-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#6EBE45] shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Offerings grid */}
            <div className="grid grid-cols-2 gap-3">
              {offerings.map((item: { id: string; title: string; icon: string }) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon];
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 hover:border-[#6EBE45]/40 hover:bg-green-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#6EBE45] rounded-lg flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-4 h-4 text-white" />}
                    </div>
                    <p className="font-medium text-gray-800 text-xs leading-snug">{item.title}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                href={content.primaryBtnHref || "/about-us"}
                className="inline-flex items-center gap-2 bg-[#6EBE45] hover:bg-[#5AB22E] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#6EBE45]/30 group"
              >
                {content.primaryBtnLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
