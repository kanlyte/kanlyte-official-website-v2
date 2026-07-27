"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { useResourceCategories, type ResourceCategory } from "@/content-manager/hooks/useResourceCategories";

const TABS = [
  { key: "product", label: "Products" },
  { key: "service", label: "Services" },
  { key: "standalone", label: "Packages" },
] as const;

export function PricingSection() {
  const { data: categories = [], isLoading } = useResourceCategories("pricing-plan");

  const [ownerType, setOwnerType] = useState<"product" | "service" | "standalone">("product");
  const [category, setCategory] = useState("");
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const filtered = categories.filter(
    (c) => c.ownerType === ownerType || (!c.ownerType && ownerType === "standalone")
  );

  // Reset category when tab changes
  useEffect(() => {
    if (filtered.length > 0) setCategory(filtered[0].slug);
    else setCategory("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerType, isLoading]);

  if (isLoading) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Owner type tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 gap-1">
            {TABS.map((tab) => {
              const count = categories.filter(
                (c) => c.ownerType === tab.key || (!c.ownerType && tab.key === "standalone")
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={tab.key}
                  onClick={() => setOwnerType(tab.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    ownerType === tab.key
                      ? "bg-[#6EBE45] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category + billing + currency filters */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[220px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {filtered.map((c: ResourceCategory) => (
                <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Billing Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save 20%)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UGX">UGX</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>

        </div>

        {category && (
          <PricingCards
            category={category}
            billing={billing}
            currency={currency}
            fallbackPlans={[]}
          />
        )}

      </div>
    </section>
  );
}
