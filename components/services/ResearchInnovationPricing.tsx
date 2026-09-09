"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "feasibility", title: "Feasibility Study", description: "Assess viability before you build — per engagement.", priceUGX: "From 3,000,000 UGX", priceUSD: "From $810", buttonText: "Get Started", features: ["Market & tech research", "Requirements analysis", "Risk assessment", "Executive report", "Presentation to stakeholders"] },
  { tier: "sprint", title: "Innovation Sprint", description: "Rapid prototyping & proof of concept — per project.", priceUGX: "From 8,000,000 UGX", priceUSD: "From $2,160", isPopular: true, buttonText: "Start a Project", features: ["AI/ML or IoT prototype", "Data pipeline setup", "Sprint-based delivery", "Workshop sessions", "Full documentation", "3 months support"] },
  { tier: "transformation", title: "Digital Transformation", description: "Organisation-wide transformation — scoped to your needs.", priceUGX: "Custom", priceUSD: "Custom", buttonText: "Talk to Our Team", features: ["Full tech audit", "Strategy roadmap", "Process automation", "Change management", "Staff enablement", "Ongoing partnership"] },
];

export function ResearchInnovationPricing() {
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Research & Innovation Packages</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">From proof-of-concept to full digital transformation — we price by outcome, not hours.</p>
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
        <PricingCards category="research-innovation" billing="yearly" currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a long-term innovation partner? Let's co-create a tailored research and development engagement." enterpriseFeatures={["Long-term R&D partnership", "AI, IoT & data strategy", "Dedicated innovation team", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
