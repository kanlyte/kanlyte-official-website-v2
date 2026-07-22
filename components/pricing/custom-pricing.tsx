"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingCards } from "@/components/pricing/pricing-cards";

const FALLBACK: Record<string, { label: string; plans: Parameters<typeof PricingCards>[0]["fallbackPlans"]; enterpriseFeatures: string[] }> = {
  "web-hosting": {
    label: "Web Hosting Packages",
    plans: [
      { tier: "core", title: "Core Package", description: "For individuals & small blogs.", priceUGX: "800,000 UGX", priceUSD: "$225", priceUGXMonthly: "80,000 UGX", priceUSDMonthly: "$23", buttonText: "Select Package", features: ["Domain name", "3 Professional emails", "WordPress website", "3 GB SSD hosting space", "Standard SSL", "Support & Maintenance"] },
      { tier: "advanced", title: "Advanced Package", description: "Advanced features for growing businesses.", priceUGX: "1,200,000 UGX", priceUSD: "$335", priceUGXMonthly: "120,000 UGX", priceUSDMonthly: "$33", isPopular: true, buttonText: "Select Package", features: ["Domain name", "10 Professional emails", "Custom developed website", "10 GB SSD hosting space", "Premium SSL", "Support & Maintenance", "Monthly backup", "Basic SEO Setup"] },
      { tier: "premium", title: "Premium Package", description: "Enterprise-grade solutions for complex requirements.", priceUGX: "3,000,000 UGX", priceUSD: "$835", priceUGXMonthly: "290,000 UGX", priceUSDMonthly: "$83", buttonText: "Select Package", features: ["Domain name", "Unlimited professional emails", "Custom developed website", "E-Commerce website (if needed)", "30 GB SSD hosting space", "Premium SSL", "Monthly backup", "Support & maintenance", "Advanced SEO setup", "User training"] },
    ],
    enterpriseFeatures: ["Customized features and functionality", "Scalable architecture for future growth", "Dedicated support and maintenance", "Integration with existing systems"],
  },
  "email-hosting": {
    label: "Email Hosting",
    plans: [
      { tier: "core", title: "Basic", description: "For solo professionals.", priceUGX: "300,000 UGX", priceUSD: "$81", priceUGXMonthly: "30,000 UGX", priceUSDMonthly: "$8", buttonText: "Get Started", features: ["5 email accounts", "5 GB storage per account", "Webmail access", "Spam & virus protection", "SSL security", "Email support"] },
      { tier: "advanced", title: "Business", description: "For teams & small businesses.", priceUGX: "800,000 UGX", priceUSD: "$216", priceUGXMonthly: "80,000 UGX", priceUSDMonthly: "$22", isPopular: true, buttonText: "Buy Now", features: ["25 email accounts", "25 GB storage per account", "Mobile sync (iOS/Android)", "Shared calendar & contacts", "Daily backups", "Priority support"] },
      { tier: "premium", title: "Enterprise", description: "For large organisations.", priceUGX: "2,000,000 UGX", priceUSD: "$540", priceUGXMonthly: "200,000 UGX", priceUSDMonthly: "$54", buttonText: "Contact Sales", features: ["Unlimited email accounts", "100 GB storage per account", "Advanced admin controls", "Compliance & archiving", "Dedicated IP", "24/7 support"] },
    ],
    enterpriseFeatures: ["Custom domain & branding", "Scalable mailbox management", "Dedicated support and maintenance", "Integration with existing systems"],
  },
  odoo: {
    label: "Odoo ERP",
    plans: [
      { tier: "core", title: "Odoo Community", description: "Open source, self-hosted version.", priceUGX: "900,000 UGX", priceUSD: "$243", priceUGXMonthly: "100,000 UGX", priceUSDMonthly: "$27", buttonText: "Get Started", features: ["Full Odoo Community Edition", "Self-hosted (On-premise)", "Unlimited users", "All community apps included", "Community support", "Customization at agreed cost"] },
      { tier: "advanced", title: "Standard", description: "Basic Odoo Online plan — per user.", priceUGX: "1,200,000 UGX", priceUSD: "$324", priceUGXMonthly: "130,000 UGX", priceUSDMonthly: "$35", isPopular: true, buttonText: "Buy Now", features: ["Access to all standard apps", "Odoo Online hosting", "Standard support", "One Company per database", "No Integrations", "Basic customization"] },
      { tier: "premium", title: "Custom", description: "Enterprise-grade solution — per user.", priceUGX: "1,700,000 UGX", priceUSD: "$459", priceUGXMonthly: "185,000 UGX", priceUSDMonthly: "$50", buttonText: "Contact Sales", features: ["All apps + Odoo Studio", "Odoo Online/On-premise", "Multi-company ready", "External API access", "One-time implementation fee", "Priority support"] },
    ],
    enterpriseFeatures: ["Custom module development", "Multi-company & multi-currency", "Dedicated Odoo consultant", "Integration with existing systems"],
  },
  "school-sync": {
    label: "School Sync",
    plans: [
      { tier: "core", title: "Starter", description: "Perfect for small schools getting started.", priceUGX: "1,500,000 UGX", priceUSD: "$417", priceUGXMonthly: "150,000 UGX", priceUSDMonthly: "$42", buttonText: "Get Started", features: ["Up to 200 students", "Student & fee management", "Basic attendance tracking", "Parent SMS notifications", "Email support", "1 campus"] },
      { tier: "advanced", title: "Standard", description: "For growing schools with more needs.", priceUGX: "3,000,000 UGX", priceUSD: "$833", priceUGXMonthly: "300,000 UGX", priceUSDMonthly: "$83", isPopular: true, buttonText: "Buy Now", features: ["Up to 1,000 students", "Full academic management", "Timetabling & exams", "Parent portal", "Priority support", "2 campuses"] },
      { tier: "premium", title: "Pro", description: "Enterprise-grade for large institutions.", priceUGX: "5,000,000 UGX", priceUSD: "$1,389", priceUGXMonthly: "500,000 UGX", priceUSDMonthly: "$139", buttonText: "Contact Sales", features: ["Unlimited students", "Multi-campus support", "Advanced analytics", "Custom report cards", "API access & integrations", "Dedicated support"] },
    ],
    enterpriseFeatures: ["Multi-institution management", "Custom integrations & API", "Dedicated support and maintenance", "White-label branding options"],
  },
};

export function PricingSection() {
  const [service, setService] = useState("web-hosting");
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const current = FALLBACK[service];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="w-[220px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-hosting">Web Hosting Packages</SelectItem>
              <SelectItem value="email-hosting">Email Hosting</SelectItem>
              <SelectItem value="odoo">Odoo ERP</SelectItem>
              <SelectItem value="school-sync">School Sync</SelectItem>
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

        <PricingCards
          category={service}
          billing={billing}
          currency={currency}
          fallbackPlans={current.plans}
          enterpriseFeatures={current.enterpriseFeatures}
        />
      </div>
    </section>
  );
}
