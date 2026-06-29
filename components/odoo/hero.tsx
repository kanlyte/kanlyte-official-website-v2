"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePageContent } from "@/content-manager/hooks/usePageContent";

const FALLBACK = {
  primaryBtnLabel: "Start now - It's free",
  primaryBtnHref: "/contact-us",
  secondaryBtnLabel: "Meet an advisor",
  secondaryBtnHref: "/contact-us",
  annotationLine1: "US$ 7.25 / month",
  annotationLine2: "for ALL apps",
};

interface OdooHeroProps {
  onMeetAdvisor: () => void;
}

export function OdooHero({ onMeetAdvisor }: OdooHeroProps) {
  const { data: db } = usePageContent("odoo");

  const primaryBtnLabel = db?.primaryBtnLabel ?? FALLBACK.primaryBtnLabel;
  const primaryBtnHref = db?.primaryBtnHref ?? FALLBACK.primaryBtnHref;
  const annotationLine1 = db?.annotationLine1 ?? FALLBACK.annotationLine1;
  const annotationLine2 = db?.annotationLine2 ?? FALLBACK.annotationLine2;

  return (
    <section className="pt-20 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <h1 className="text-5xl md:text-7xl font-bold text-[#212529] tracking-tight leading-tight mb-4">
          {db?.title ?? "All your business on"}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{db?.highlight ?? "one platform."}</span>
            <span className="absolute inset-0 bg-[#FFB133] -rotate-1 rounded-sm scale-110 translate-y-2 -z-10" />
          </span>
        </h1>

        <h2 className="text-4xl md:text-6xl font-bold text-[#212529] italic mb-12">
          {db?.subtitle
            ? db.subtitle.split("*")[0]
            : "Simple, efficient, yet "}
          <span className="relative inline-block">
            <span className="relative z-10">
              {db?.subtitle?.includes("*") ? db.subtitle.split("*")[1] : "affordable!"}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-[#6EBE45] rounded-full translate-y-2" />
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Link href={primaryBtnHref}>
            <Button className="bg-[#6EBE45] hover:bg-[#5a9e3a] text-white px-8 py-6 text-lg font-semibold rounded-md">
              {primaryBtnLabel}
            </Button>
          </Link>
          <Button
            onClick={onMeetAdvisor}
            variant="outline"
            className="bg-[#F8F9FA] border-none text-[#6EBE45] px-8 py-6 text-lg font-semibold rounded-md group hover:bg-[#F0F0F0]"
          >
            {db?.secondaryBtnLabel ?? FALLBACK.secondaryBtnLabel}{" "}
            <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" />
          </Button>
        </div>

        <div className="absolute right-0 bottom-[-20px] md:right-[10%] md:bottom-[-40px] rotate-[-15deg] hidden md:block">
          <div className="flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-[#6EBE45] mb-2">
              <path d="M10 10C30 15 50 35 55 55M55 55L45 53M55 55L53 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#6EBE45] font-bold text-xl leading-none">
              {annotationLine1} <br />
              <span className="text-lg opacity-80 font-medium tracking-tight">{annotationLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
