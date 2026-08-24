"use client";

import { useState, useEffect, useCallback } from "react";
import { BriefcaseBusiness, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { useResourceCategories, type ResourceCategory } from "@/content-manager/hooks/useResourceCategories";

const TABS = [
  { key: "product", label: "Products", icon: Package },
  { key: "service", label: "Services", icon: BriefcaseBusiness },
] as const;

type PricingView = (typeof TABS)[number]["key"];

function belongsToView(category: ResourceCategory, view: PricingView) {
  if (view === "product") return category.ownerType === "product";
  return category.ownerType === "service";
}

function hasVisiblePricing(category: ResourceCategory) {
  return category.pricingEnabled === true && (category._count?.plans ?? 0) > 0;
}

export function PricingSection() {
  const { data: categories = [], isLoading } = useResourceCategories("pricing-plan");

  const [pricingView, setPricingView] = useState<PricingView>("product");
  const [category, setCategory] = useState("");
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");
  const [hasMonthly, setHasMonthly] = useState(false);
  const [hasUSD, setHasUSD] = useState(false);

  const handleCapabilities = useCallback(({ hasMonthly, hasUSD }: { hasMonthly: boolean; hasUSD: boolean }) => {
    setHasMonthly(hasMonthly);
    setHasUSD(hasUSD);
  }, []);

  useEffect(() => {
    const filtered = categories
      .filter(hasVisiblePricing)
      .filter((c) => belongsToView(c, pricingView));
    if (
      filtered.length === 0 &&
      pricingView === "product" &&
      categories.some((c) => hasVisiblePricing(c) && belongsToView(c, "service"))
    ) {
      setPricingView("service");
      return;
    }
    if (filtered.length > 0) setCategory(filtered[0].slug);
    else setCategory("");
    setHasMonthly(false);
    setHasUSD(false);
  }, [categories, pricingView]);

  const filtered = categories
    .filter(hasVisiblePricing)
    .filter((c) => belongsToView(c, pricingView));

  if (isLoading) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Separate product and service pricing at the top level. */}
        <div className="mx-auto mb-10 grid max-w-xl grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-sm">
            {TABS.map((tab) => {
              const count = categories.filter((c) => hasVisiblePricing(c) && belongsToView(c, tab.key)).length;
              if (count === 0) return null;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setPricingView(tab.key)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    pricingView === tab.key
                      ? "bg-[#6EBE45] text-white shadow-md"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                  aria-pressed={pricingView === tab.key}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{tab.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${pricingView === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
        </div>

        {/* Category + billing + currency filters */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[220px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {filtered.map((c: ResourceCategory) => {
                const label = pricingView === "product"
                  ? (c.product?.title ?? c.name)
                  : (c.service?.title ?? c.name);
                return <SelectItem key={c.slug} value={c.slug}>{label}</SelectItem>;
              })}
            </SelectContent>
          </Select>

          {hasMonthly && (
          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Billing Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save 20%)</SelectItem>
            </SelectContent>
          </Select>
          )}

          {hasUSD && (
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UGX">UGX</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
          )}
        </div>

        {category && (
          <PricingCards
            category={category}
            billing={billing}
            currency={currency}
            fallbackPlans={[]}
            onCapabilities={handleCapabilities}
          />
        )}

      </div>
    </section>
  );
}
