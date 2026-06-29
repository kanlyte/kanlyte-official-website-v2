"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "free", title: "Tenant Free", description: "Find your space at no cost — forever.", priceUGX: "Free", priceUSD: "Free", buttonText: "Download App", features: ["Browse all listings", "Save favourites", "Direct messaging", "Map view", "Push notifications"] },
  { tier: "basic", title: "Landlord Basic", description: "List and manage your properties.", priceUGX: "500,000 UGX", priceUSD: "$135", isPopular: true, buttonText: "Get Started", features: ["Up to 5 listings", "Photo galleries", "Booking management", "Tenant messaging", "Basic analytics"] },
  { tier: "pro", title: "Landlord Pro", description: "For agents & property managers.", priceUGX: "1,200,000 UGX", priceUSD: "$324", buttonText: "Contact Sales", features: ["Unlimited listings", "Priority placement", "Advanced analytics", "Verified badge", "Dedicated support"] },
];

export function LytePricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple Lyte Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Tenants browse free. Landlords choose a plan that fits.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200"><SelectValue placeholder="Billing Period" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save 17%)</SelectItem>
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
        <PricingCards category="lyte" billing={billing} currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a branded property portal for a large agency or developer? Let's build it together." enterpriseFeatures={["Branded property portal", "Custom integrations", "Bulk listing management", "Dedicated account manager"]} />
      </div>
    </section>
  );
}
