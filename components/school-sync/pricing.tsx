"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "starter", title: "Starter", description: "Perfect for small schools getting started.", priceUGX: "1,500,000 UGX", priceUSD: "$417", buttonText: "Get Started", features: ["Up to 200 students", "Student & fee management", "Basic attendance tracking", "Parent SMS notifications", "Email support", "1 campus"] },
  { tier: "standard", title: "Standard", description: "For growing schools with more needs.", priceUGX: "3,000,000 UGX", priceUSD: "$833", isPopular: true, buttonText: "Buy Now", features: ["Up to 1,000 students", "Full academic management", "Timetabling & exams", "Parent portal", "Priority support", "2 campuses"] },
  { tier: "pro", title: "Pro", description: "Enterprise-grade for large institutions.", priceUGX: "5,000,000 UGX", priceUSD: "$1,389", buttonText: "Contact Sales", features: ["Unlimited students", "Multi-campus support", "Advanced analytics", "Custom report cards", "API access & integrations", "Dedicated support"] },
];

export function SchoolSyncPricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple School Sync Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Affordable pricing for every school size. No hidden fees.</p>
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
        <PricingCards category="school-sync" currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a tailored School Sync deployment for your institution network? Let's build it together." enterpriseFeatures={["Multi-institution management", "Custom integrations & API", "Dedicated support and maintenance", "White-label branding options"]} />
      </div>
    </section>
  );
}
