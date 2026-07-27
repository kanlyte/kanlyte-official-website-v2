"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceOfferings } from "@/components/services-pages/service-offerings";
import { EntityPricingSection } from "@/components/pricing/entity-pricing-section";
import { useServiceBySlug } from "@/content-manager/hooks/useServices";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: service, isLoading } = useServiceBySlug(slug);

  if (!isLoading && !service) notFound();
  if (!service) return null;

  return (
    <>
      <ServiceHero
        slug={slug}
        badge={`${service.title} — Kanlyte Uganda`}
        title={service.title}
        highlight="by Kanlyte Uganda"
        subtitle="Practical, reliable, *affordable!"
        description={service.description}
        primaryBtn={{ label: "Enquire Now", href: "/contact-us" }}
        secondaryBtn={{ label: "Learn More", href: "/contact-us" }}
        annotation={{ line1: "Trusted by", line2: "Ugandan businesses" }}
      />
      <ServiceCapabilities
        slug={slug}
        title={`${service.title} Capabilities`}
        subtitle="What this service covers."
        capabilities={[]}
        tagline="Imagine your business without it"
        ctaLabel="Talk to Us"
        ctaHref="/contact-us"
      />
      <ServiceOfferings slug={slug} />
      <EntityPricingSection
        ownerType="service"
        ownerId={service.id}
        ownerTitle={service.title}
        includeChildServices={service.kind === "main"}
      />
    </>
  );
}
