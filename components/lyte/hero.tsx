"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePageContent } from "@/content-manager/hooks/usePageContent";

const FALLBACK = {
  badge: "Lyte App — by Kanlyte Uganda",
  title: "Find your perfect home",
  highlight: "in minutes.",
  subtitle: "Hostels & houses, *verified!",
  description: "Lyte connects students and professionals with verified, affordable hostels and rental houses across Uganda — search, book, and pay securely from your phone.",
  primaryBtnLabel: "Get Early Access",
  primaryBtnHref: "/contact-us",
  secondaryBtnLabel: "List Your Property",
  secondaryBtnHref: "/contact-us",
  annotationLine1: "100% verified",
  annotationLine2: "properties",
};

export function LyteHero() {
  const { data: db } = usePageContent("lyte");
  const c = {
    badge: db?.badge ?? FALLBACK.badge,
    title: db?.title ?? FALLBACK.title,
    highlight: db?.highlight ?? FALLBACK.highlight,
    subtitle: db?.subtitle ?? FALLBACK.subtitle,
    description: db?.description ?? FALLBACK.description,
    primaryBtnLabel: db?.primaryBtnLabel ?? FALLBACK.primaryBtnLabel,
    primaryBtnHref: db?.primaryBtnHref ?? FALLBACK.primaryBtnHref,
    secondaryBtnLabel: db?.secondaryBtnLabel ?? FALLBACK.secondaryBtnLabel,
    secondaryBtnHref: db?.secondaryBtnHref ?? FALLBACK.secondaryBtnHref,
    annotationLine1: db?.annotationLine1 ?? FALLBACK.annotationLine1,
    annotationLine2: db?.annotationLine2 ?? FALLBACK.annotationLine2,
  };

  return (
    <section className="pt-20 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-6 text-sm">
          {c.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[#212529] tracking-tight leading-tight mb-4">
          {c.title}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{c.highlight}</span>
            <span className="absolute inset-0 bg-[#FFB133] -rotate-1 rounded-sm scale-110 translate-y-2 -z-10" />
          </span>
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold text-[#212529] italic mb-12">
          {c.subtitle.split("*")[0]}
          <span className="relative inline-block">
            <span className="relative z-10">{c.subtitle.split("*")[1]}</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-[#6EBE45] rounded-full translate-y-2" />
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">{c.description}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Link href={c.primaryBtnHref}>
            <Button className="bg-[#6EBE45] hover:bg-[#5a9e3a] text-white px-8 py-6 text-lg font-semibold rounded-md">
              {c.primaryBtnLabel}
            </Button>
          </Link>
          <Link href={c.secondaryBtnHref}>
            <Button variant="outline" className="bg-[#F8F9FA] border-none text-[#6EBE45] px-8 py-6 text-lg font-semibold rounded-md group hover:bg-[#F0F0F0]">
              {c.secondaryBtnLabel} <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="absolute right-0 bottom-[-20px] md:right-[10%] md:bottom-[-40px] rotate-[-15deg] hidden md:block">
          <div className="flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-[#6EBE45] mb-2">
              <path d="M10 10C30 15 50 35 55 55M55 55L45 53M55 55L53 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#6EBE45] font-bold text-xl leading-none">
              {c.annotationLine1} <br />
              <span className="text-lg opacity-80 font-medium tracking-tight">{c.annotationLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
