"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "starter", title: "Starter", description: "Small apps & MVPs — one-time project fee.", priceUGX: "From 2,000,000 UGX", priceUSD: "From $540", buttonText: "Get a Quote", features: ["Up to 5 core features", "Mobile or web app", "UI/UX design included", "3 months support", "Source code handover"] },
  { tier: "business", title: "Business", description: "Full-featured business systems — one-time project fee.", priceUGX: "From 8,000,000 UGX", priceUSD: "From $2,160", isPopular: true, buttonText: "Start Your Project", features: ["Custom feature set", "Web + Mobile", "API integrations", "Admin dashboard", "6 months support", "Staff training"] },
  { tier: "enterprise", title: "Enterprise", description: "Large-scale systems & ERP — scoped to your needs.", priceUGX: "Custom", priceUSD: "Custom", buttonText: "Contact Sales", features: ["Unlimited complexity", "Multi-platform", "Legacy migration", "DevOps & CI/CD", "SLA support contract", "Dedicated team"] },
];

export function SoftwareDevelopmentPricing() {
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Software Development Packages</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Every project is unique. These packages give you a starting point — we&apos;ll tailor the scope to your needs.</p>
        </div>
        <div className="flex justify-center gap-4 mb-12">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] bg-slate-50 border-slate-200"><SelectValue placeholder="Currency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="UGX">UGX</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PricingCards category="software-development" currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a tailored solution for your business? Let's create a custom plan together." enterpriseFeatures={["Customised features and functionality", "Scalable architecture for future growth", "Dedicated support and maintenance", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
