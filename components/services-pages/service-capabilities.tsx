"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { usePageCapabilities } from "@/content-manager/hooks/usePageCapabilities";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

interface Capability {
  name: string;
  icon: LucideIcon;
}

interface ServiceCapabilitiesProps {
  slug: string;
  title: string;
  subtitle: string;
  capabilities: Capability[];
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
}

export function ServiceCapabilities({ slug, title, subtitle, capabilities, tagline, ctaLabel, ctaHref }: ServiceCapabilitiesProps) {
  const { data: dbCaps } = usePageCapabilities(slug);

  const items = dbCaps?.length
    ? dbCaps.map((c: { id: string; name: string; icon: string }) => ({ id: c.id, name: c.name, icon: c.icon, fromDB: true as const }))
    : capabilities.map((c, i) => ({ id: String(i), name: c.name, icon: "", fromDB: false as const, iconComponent: c.icon }));

  type Item = typeof items[number];

  return (
    <section className="bg-[#F8F9FA] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212529] mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 mb-20">
          {items.map((c: Item) => (
            <div key={c.id} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200 group-hover:bg-[#6EBE45]">
                {c.fromDB ? (
                  <DynamicIcon name={c.icon} className="w-9 h-9 text-[#6EBE45] group-hover:text-white transition-colors" />
                ) : (
                  <c.iconComponent className="w-9 h-9 text-[#6EBE45] group-hover:text-white transition-colors" />
                )}
              </div>
              <span className="text-[#212529] font-semibold text-sm text-center">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-200">
          <span className="text-[#714B67] font-semibold text-lg italic mb-6 md:mb-0">{tagline}</span>
          <Link href={ctaHref} className="flex items-center text-[#007A7E] font-bold text-xl hover:underline group">
            {ctaLabel} <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
