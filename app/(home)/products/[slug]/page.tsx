"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { useProductBySlug } from "@/content-manager/hooks/useProducts";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: product, isLoading } = useProductBySlug(slug);
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  if (!isLoading && !product) notFound();
  if (!product) return null;

  return (
    <>
      <ServiceHero
        slug={slug}
        badge={`${product.title} — Kanlyte Uganda`}
        title={product.title}
        highlight="by Kanlyte Uganda"
        subtitle="Powerful, reliable, *affordable!"
        description={product.description}
        primaryBtn={{ label: "Get Started", href: "/contact-us" }}
        secondaryBtn={{ label: "Learn More", href: "/contact-us" }}
        annotation={{ line1: "Built for", line2: "your business" }}
      />
      <ServiceCapabilities
        slug={slug}
        title={`${product.title} Capabilities`}
        subtitle="Everything you need, built in."
        capabilities={[]}
        tagline="Imagine your business without it"
        ctaLabel="Talk to Us"
        ctaHref="/contact-us"
      />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{product.title} Pricing</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Simple plans that scale with your business.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
            <Select value={billing} onValueChange={setBilling}>
              <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200"><SelectValue placeholder="Billing Period" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-[120px] bg-slate-50 border-slate-200"><SelectValue placeholder="Currency" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="UGX">UGX</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PricingCards category={slug} billing={billing} currency={currency} fallbackPlans={[]} />
        </div>
      </section>
    </>
  );
}
