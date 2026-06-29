"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "mvp", title: "MVP", description: "Validate your idea fast — one-time project fee.", priceUGX: "From 3,000,000 UGX", priceUSD: "From $810", buttonText: "Get a Quote", features: ["1 platform (iOS or Android)", "Up to 6 screens", "UI/UX design included", "Basic backend/API", "App Store submission", "2 months support"] },
  { tier: "full", title: "Full App", description: "Production-ready mobile app — one-time project fee.", priceUGX: "From 10,000,000 UGX", priceUSD: "From $2,700", isPopular: true, buttonText: "Start Your Project", features: ["iOS + Android", "Custom UI/UX design", "Full backend & API", "Push notifications", "Payment integration", "6 months support"] },
  { tier: "enterprise", title: "Enterprise App", description: "Complex, scalable systems — scoped to your needs.", priceUGX: "Custom", priceUSD: "Custom", buttonText: "Contact Sales", features: ["Multi-platform", "Offline functionality", "Enterprise integrations", "Advanced security", "SLA support", "Dedicated team"] },
];

export function AppDevelopmentPricing() {
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">App Development Packages</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">From MVP to full-scale mobile product — transparent packages built around your goals.</p>
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
        <PricingCards category="app-development" currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a tailored solution for your business? Let's create a custom app together." enterpriseFeatures={["Customised features and functionality", "Scalable architecture for future growth", "Dedicated support and maintenance", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
