"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK_PLANS = [
  { tier: "basic", title: "Basic", description: "For solo professionals.", priceUGX: "300,000 UGX", priceUSD: "$81", buttonText: "Get Started", features: ["5 email accounts", "5 GB storage per account", "Webmail access", "Spam & virus protection", "SSL security", "Email support"] },
  { tier: "business", title: "Business", description: "For teams & small businesses.", priceUGX: "800,000 UGX", priceUSD: "$216", isPopular: true, buttonText: "Buy Now", features: ["25 email accounts", "25 GB storage per account", "Mobile sync (iOS/Android)", "Shared calendar & contacts", "Daily backups", "Priority support"] },
  { tier: "enterprise", title: "Enterprise", description: "For large organisations.", priceUGX: "2,000,000 UGX", priceUSD: "$540", buttonText: "Contact Sales", features: ["Unlimited email accounts", "100 GB storage per account", "Advanced admin controls", "Compliance & archiving", "Dedicated IP", "24/7 support"] },
];

export function EmailHostingPricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Email Hosting Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Professional email with your own domain. Secure, reliable, and affordable.</p>
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
        <PricingCards category="email-hosting" billing={billing} currency={currency} fallbackPlans={FALLBACK_PLANS} enterpriseTitle="Custom Enterprise Solution" enterpriseDescription="Need a tailored email solution for your business? Let's create a custom plan together." enterpriseFeatures={["Custom domain & branding", "Scalable mailbox management", "Dedicated support and maintenance", "Integration with existing systems"]} />
      </div>
    </section>
  );
}
