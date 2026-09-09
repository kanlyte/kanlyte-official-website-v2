"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "community", title: "Odoo Community", description: "Open source, self-hosted version.", priceUGX: "900,000 UGX", priceUSD: "$243", priceUGXMonthly: "100,000 UGX", priceUSDMonthly: "$27", buttonText: "Get Started Now", features: ["Full Odoo Community Edition", "Self-hosted (On-premise)", "Unlimited users", "All community apps included", "Community support", "Customization at agreed cost"] },
  { tier: "standard", title: "Standard", description: "Basic Odoo Online plan — per user.", priceUGX: "1,200,000 UGX", priceUSD: "$324", priceUGXMonthly: "130,000 UGX", priceUSDMonthly: "$35", isPopular: true, buttonText: "Buy Now", features: ["Access to all standard apps", "Odoo Online hosting", "Standard support", "One Company per database", "No Integrations", "Basic customization"] },
  { tier: "custom", title: "Custom", description: "Enterprise-grade solution — per user.", priceUGX: "1,700,000 UGX", priceUSD: "$459", priceUGXMonthly: "185,000 UGX", priceUSDMonthly: "$50", buttonText: "Contact Sales", features: ["All apps + Odoo Studio", "Odoo Online/On-premise", "Multi-company ready", "External API access", "One-time implementation fee", "Priority support"] },
];

export function Pricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple & Flexible Odoo Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose the perfect plan for your business. All plans include our expert implementation support.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200"><SelectValue placeholder="Billing Period" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save 20%)</SelectItem>
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
        <PricingCards category="odoo" billing={billing} currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a fully tailored Odoo implementation? Let's design the perfect ERP solution for your business." enterpriseFeatures={["Custom module development", "Multi-company & multi-currency", "Dedicated Odoo consultant", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
