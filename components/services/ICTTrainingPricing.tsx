"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "individual", title: "Individual", description: "For self-paced learners.", priceUGX: "1,500,000 UGX", priceUSD: "$405", priceUGXMonthly: "150,000 UGX", priceUSDMonthly: "$41", buttonText: "Enroll Now", features: ["Access to 1 course track", "Hands-on lab exercises", "Certificate of completion", "Community forum access", "Email support"] },
  { tier: "team", title: "Team", description: "For small teams (up to 10).", priceUGX: "5,000,000 UGX", priceUSD: "$1,350", priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$135", isPopular: true, buttonText: "Get Started", features: ["Access to all course tracks", "Instructor-led sessions", "Team progress dashboard", "Recognised certificates", "Priority support", "Custom schedule"] },
  { tier: "corporate", title: "Corporate", description: "Tailored programmes for organisations.", priceUGX: "Custom", priceUSD: "Custom", priceUGXMonthly: "Custom", priceUSDMonthly: "Custom", buttonText: "Request a Quote", features: ["Unlimited staff", "On-site or remote delivery", "Custom curriculum", "Mentorship & coaching", "Progress reporting", "Dedicated trainer"] },
];

export function ICTTrainingPricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">ICT Training Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Invest in skills that pay back. Flexible plans for individuals and organisations.</p>
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
        <PricingCards category="ict-training" billing={billing} currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Training" enterpriseDescription="Need a fully tailored training programme for your organisation? Let's design it together." enterpriseFeatures={["Custom curriculum design", "On-site or hybrid delivery", "Certification pathways", "Ongoing mentorship & support"]} />
      </div>
    </section>
  );
}
