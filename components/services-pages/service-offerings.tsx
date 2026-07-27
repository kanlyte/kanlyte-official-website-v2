"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";
import { useServiceBySlug } from "@/content-manager/hooks/useServices";

type Offering = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
};

export function ServiceOfferings({ slug }: { slug: string }) {
  const { data: service } = useServiceBySlug(slug);
  const offerings = (service?.children ?? []) as Offering[];

  if (!offerings.length) return null;

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6EBE45]">Service offerings</p>
          <h2 className="mb-4 text-4xl font-bold text-slate-900">How we can help</h2>
          <p className="text-slate-500">Choose a specialist offering within {service.title}.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering) => (
            <Link
              key={offering.id}
              href={`/services/${offering.slug}`}
              className="group rounded-xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-[#6EBE45]/50 hover:shadow-lg"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#6EBE45]/10">
                <DynamicIcon name={offering.icon} className="h-5 w-5 text-[#6EBE45]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{offering.title}</h3>
              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-500">{offering.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6EBE45]">
                View offering <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
