"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePageContent } from "@/content-manager/hooks/usePageContent";

interface ServiceHeroProps {
  slug: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  annotation: { line1: string; line2: string };
}

export function ServiceHero({ slug, badge, title, highlight, subtitle, description, primaryBtn, secondaryBtn, annotation }: ServiceHeroProps) {
  const { data: db } = usePageContent(slug);

  const content = {
    badge: db?.badge ?? badge,
    title: db?.title ?? title,
    highlight: db?.highlight ?? highlight,
    subtitle: db?.subtitle ?? subtitle,
    description: db?.description ?? description,
    primaryBtnLabel: db?.primaryBtnLabel ?? primaryBtn.label,
    primaryBtnHref: db?.primaryBtnHref ?? primaryBtn.href,
    secondaryBtnLabel: db?.secondaryBtnLabel ?? secondaryBtn.label,
    secondaryBtnHref: db?.secondaryBtnHref ?? secondaryBtn.href,
    annotationLine1: db?.annotationLine1 ?? annotation.line1,
    annotationLine2: db?.annotationLine2 ?? annotation.line2,
  };

  return (
    <section className="pt-20 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-6 text-sm">
          {content.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[#212529] tracking-tight leading-tight mb-4">
          {content.title}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{content.highlight}</span>
            <span className="absolute inset-0 bg-[#FFB133] -rotate-1 rounded-sm scale-110 translate-y-2 -z-10" />
          </span>
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold text-[#212529] italic mb-12">
          {content.subtitle.split("*")[0]}
          {content.subtitle.includes("*") && (
            <span className="relative inline-block not-italic">
              <span className="relative z-10">{content.subtitle.split("*")[1]}</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#6EBE45] rounded-full translate-y-2" />
            </span>
          )}
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">{content.description}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Link href={content.primaryBtnHref}>
            <Button className="bg-[#6EBE45] hover:bg-[#5a9e3a] text-white px-8 py-6 text-lg font-semibold rounded-md">
              {content.primaryBtnLabel}
            </Button>
          </Link>
          <Link href={content.secondaryBtnHref}>
            <Button variant="outline" className="bg-[#F8F9FA] border-none text-[#6EBE45] px-8 py-6 text-lg font-semibold rounded-md group hover:bg-[#F0F0F0]">
              {content.secondaryBtnLabel} <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="absolute right-0 bottom-[-20px] md:right-[10%] md:bottom-[-40px] rotate-[-15deg] hidden md:block">
          <div className="flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-[#6EBE45] mb-2">
              <path d="M10 10C30 15 50 35 55 55M55 55L45 53M55 55L53 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#6EBE45] font-bold text-xl leading-none">
              {content.annotationLine1} <br />
              <span className="text-lg opacity-80 font-medium tracking-tight">{content.annotationLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
