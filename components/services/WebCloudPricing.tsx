"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "starter", title: "Starter", description: "For small businesses & blogs.", priceUGX: "800,000 UGX", priceUSD: "$216", priceUGXMonthly: "80,000 UGX", priceUSDMonthly: "$22", buttonText: "Get Started", features: ["1 website", "5 GB storage", "Free SSL certificate", "Business email (2 accounts)", "99.9% uptime", "Email support"] },
  { tier: "business", title: "Business", description: "For growing businesses.", priceUGX: "2,000,000 UGX", priceUSD: "$540", priceUGXMonthly: "200,000 UGX", priceUSDMonthly: "$54", isPopular: true, buttonText: "Buy Now", features: ["Up to 5 websites", "50 GB SSD storage", "Free SSL + CDN", "Business email (20 accounts)", "Daily backups", "Priority support"] },
  { tier: "enterprise", title: "Enterprise", description: "High-traffic & mission-critical.", priceUGX: "5,000,000 UGX", priceUSD: "$1,350", priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$135", buttonText: "Contact Sales", features: ["Unlimited websites", "500 GB SSD storage", "Dedicated IP & CDN", "Unlimited email accounts", "24/7 monitoring", "Dedicated support"] },
];

export function WebCloudPricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Web & Cloud Hosting Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Fast, secure, and always online. Pick the plan that matches your scale.</p>
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
        <PricingCards category="web-cloud" billing={billing} currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a tailored hosting environment? Let's design a solution that perfectly fits your infrastructure needs." enterpriseFeatures={["Dedicated server environments", "Custom storage & bandwidth", "Managed security & compliance", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
