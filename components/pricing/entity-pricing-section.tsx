"use client";

import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResourceCategories } from "@/content-manager/hooks/useResourceCategories";
import { PricingCards } from "@/components/pricing/pricing-cards";

type PricingCategory = {
  id: string;
  name: string;
  slug: string;
  ownerType: "service" | "product" | "standalone";
  pricingEnabled: boolean;
  serviceId?: string | null;
  productId?: string | null;
  service?: { id: string; parent?: { id: string } | null } | null;
  _count?: { plans: number };
};

type EntityPricingSectionProps = {
  ownerType: "service" | "product";
  ownerId?: string;
  ownerSlug?: string;
  ownerTitle: string;
  includeChildServices?: boolean;
};

export function EntityPricingSection({
  ownerType,
  ownerId,
  ownerSlug,
  ownerTitle,
  includeChildServices = false,
}: EntityPricingSectionProps) {
  const { data: rawCategories = [], isLoading } = useResourceCategories("pricing-plan");
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const allCategories = rawCategories as PricingCategory[];
  const resolvedOwnerId = ownerId ?? (
    ownerType === "service"
      ? allCategories.find((category) => category.ownerType === "service" && category.slug === ownerSlug)?.serviceId
      : allCategories.find((category) => category.ownerType === "product" && category.slug === ownerSlug)?.productId
  );

  const categories = useMemo(() => allCategories.filter((category) => {
    if (!category.pricingEnabled || (category._count?.plans ?? 0) === 0) return false;
    if (ownerType === "product") return category.productId === resolvedOwnerId;
    if (category.serviceId === resolvedOwnerId) return true;
    return includeChildServices && category.service?.parent?.id === resolvedOwnerId;
  }), [allCategories, includeChildServices, ownerType, resolvedOwnerId]);

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!categories.some((item) => item.slug === category)) {
      setCategory(categories[0]?.slug ?? "");
    }
  }, [categories, category]);

  if (isLoading || !categories.length || !category) return null;

  const selected = categories.find((item) => item.slug === category);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#6EBE45]/10 px-6 py-2 font-semibold text-[#6EBE45]">Transparent Pricing</span>
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            {categories.length > 1 ? `${ownerTitle} Pricing` : `${selected?.name ?? ownerTitle} Pricing`}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">Choose a plan that fits your current needs and scales with you.</p>
        </div>

        <div className="mb-12 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
          {categories.length > 1 && (
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[240px] border-slate-200 bg-slate-50"><SelectValue placeholder="Choose an offering" /></SelectTrigger>
              <SelectContent>
                {categories.map((item) => <SelectItem key={item.id} value={item.slug}>{item.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] border-slate-200 bg-slate-50"><SelectValue placeholder="Billing period" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] border-slate-200 bg-slate-50"><SelectValue placeholder="Currency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="UGX">UGX</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <PricingCards category={category} billing={billing} currency={currency} fallbackPlans={[]} />
      </div>
    </section>
  );
}
