"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceWhyUsProps {
  benefits: Benefit[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref?: string;
}

export function ServiceWhyUs({ benefits, ctaTitle, ctaDescription, ctaLabel, ctaHref = "/contact-us" }: ServiceWhyUsProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-[#6EBE45]/5 to-[#6EBE45]/10 rounded-2xl border border-[#6EBE45]/20 mb-16">
          <h3 className="text-xl font-bold text-[#212529] mb-6 text-center">🌟 Why Choose Kanlyte?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="bg-[#6EBE45] text-white p-2 rounded-lg shrink-0">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#212529]">{b.title}</p>
                  <p className="text-sm text-gray-600">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#212529] rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ctaTitle}</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">{ctaDescription}</p>
          <Link href={ctaHref}>
            <Button className="bg-[#6EBE45] hover:bg-[#5a9e3a] text-white px-8 py-6 text-lg font-semibold rounded-md">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
