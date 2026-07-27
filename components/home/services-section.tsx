"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useServices } from "@/content-manager/hooks/useServices";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

type ServiceSummary = {
  id: string;
  title: string;
  slug?: string | null;
  description: string;
  icon: string;
  kind: "main" | "offering";
  children?: ServiceSummary[];
};

export function FeaturesGrid() {
  const { data = [], isLoading } = useServices(true);
  const services = data as ServiceSummary[];
  const mainServices = services.filter((service) => service.kind === "main");

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6EBE45]">What we do</p>
          <h2 className="mb-4 text-[2.5rem] font-bold text-[#0F172A]">Our Main Services</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
            Explore our core service areas and the specialist offerings available within each one.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-xl bg-white" />)}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {mainServices.map((service) => (
              <Card key={service.id} className="group h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#6EBE45]/40 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#6EBE45]">
                      <DynamicIcon name={service.icon} className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-[#6EBE45]/10 px-3 py-1 text-xs font-semibold text-[#5a9e3a]">
                      {service.children?.length ?? 0} offerings
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mb-6 leading-relaxed text-slate-500">{service.description}</p>

                  {!!service.children?.length && (
                    <div className="mb-7 flex flex-wrap gap-2">
                      {service.children.slice(0, 4).map((child) => (
                        <Link
                          key={child.id}
                          href={`/services/${child.slug}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-[#6EBE45] hover:text-[#5a9e3a]"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  <Link href={`/services/${service.slug}`} className="mt-auto inline-flex items-center gap-2 font-semibold text-[#6EBE45]">
                    Explore {service.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
