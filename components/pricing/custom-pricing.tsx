"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PRICING_DATA = {
  "web-hosting": {
    label: "Web Hosting Packages",
    monthly: {
      USD: { core: "$23", advanced: "$40", premium: "$100" },
      UGX: { core: "85,000 UGX", advanced: "145,000 UGX", premium: "365,000 UGX" },
    },
    yearly: {
      USD: { core: "$225", advanced: "$335", premium: "$835" },
      UGX: { core: "800,000 UGX", advanced: "1,200,000 UGX", premium: "3,000,000 UGX" },
    },
    descriptions: {
      core: "For individuals & small blogs.",
      advanced: "Advanced features for growing businesses.",
      premium: "Enterprise-grade solutions for complex requirements.",
    },
    features: {
      core: ["Domain name", "3 Professional emails", "WordPress website", "3 GB SSD hosting space", "Standard SSL", "Support & Maintenance"],
      advanced: ["Domain name", "10 Professional emails", "Custom developed website", "10 GB SSD hosting space", "Premium SSL", "Support & Maintenance", "Monthly backup", "Basic SEO Setup"],
      premium: ["Domain name", "Unlimited professional emails", "Custom developed website", "E-Commerce website (if needed)", "30 GB SSD hosting space", "Premium SSL", "Monthly backup", "Support & maintenance", "Advanced SEO setup", "User training"],
    },
    buttons: { core: "Select Package", advanced: "Select Package", premium: "Select Package" },
  },
  "email-hosting": {
    label: "Email Hosting",
    monthly: {
      USD: { core: "$5", advanced: "$12", premium: "$25" },
      UGX: { core: "18,500 UGX", advanced: "45,000 UGX", premium: "92,500 UGX" },
    },
    yearly: {
      USD: { core: "$50", advanced: "$120", premium: "$250" },
      UGX: { core: "180,000 UGX", advanced: "432,000 UGX", premium: "900,000 UGX" },
    },
    descriptions: {
      core: "For solo professionals.",
      advanced: "For teams & small businesses.",
      premium: "For large organisations.",
    },
    features: {
      core: ["5 GB storage", "Up to 10 accounts", "Webmail access", "Basic spam protection", "IMAP/POP3 support"],
      advanced: ["25 GB storage", "Up to 50 accounts", "Ad-free interface", "Advanced threat protection", "Shared calendars", "Mobile sync"],
      premium: ["100 GB storage", "Unlimited accounts", "Premium filtering", "White-labeling", "Archiving & eDiscovery", "24/7 Priority support"],
    },
    buttons: { core: "Get Started", advanced: "Buy Now", premium: "Contact Sales" },
  },
  odoo: {
    label: "Odoo ERP",
    monthly: {
      USD: { core: "$20", advanced: "$45", premium: "$99" },
      UGX: { core: "75,000 UGX", advanced: "168,000 UGX", premium: "370,000 UGX" },
    },
    yearly: {
      USD: { core: "$192", advanced: "$432", premium: "$950" },
      UGX: { core: "720,000 UGX", advanced: "1,613,000 UGX", premium: "3,552,000 UGX" },
    },
    descriptions: {
      core: "Open source, self-hosted version.",
      advanced: "Basic Odoo Online plan.",
      premium: "Enterprise-grade solution.",
    },
    features: {
      core: ["Accounting module", "CRM basics", "Up to 5 users", "Standard support", "Cloud hosting", "Basic reporting"],
      advanced: ["All Basic features", "Inventory management", "Sales & Purchase", "Up to 20 users", "Priority support", "Custom workflows", "Mobile app access"],
      premium: ["All Standard features", "Manufacturing (MRP)", "Multi-company setup", "Unlimited users", "Dedicated account manager", "Custom module development", "Full API access"],
    },
    buttons: { core: "Get Started", advanced: "Buy Now", premium: "Contact Sales" },
  },
  "school-sync": {
    label: "School Sync",
    monthly: {
      USD: { core: "$42", advanced: "$83", premium: "$139" },
      UGX: { core: "150,000 UGX", advanced: "300,000 UGX", premium: "500,000 UGX" },
    },
    yearly: {
      USD: { core: "$417", advanced: "$833", premium: "$1,389" },
      UGX: { core: "1,500,000 UGX", advanced: "3,000,000 UGX", premium: "5,000,000 UGX" },
    },
    descriptions: {
      core: "Perfect for small schools getting started.",
      advanced: "For growing schools with more needs.",
      premium: "Enterprise-grade for large institutions.",
    },
    features: {
      core: ["Up to 200 students", "Student & fee management", "Basic attendance tracking", "Parent SMS notifications", "Email support", "1 campus"],
      advanced: ["Up to 1,000 students", "Full academic management", "Timetabling & exams", "Parent portal", "Priority support", "2 campuses"],
      premium: ["Unlimited students", "Multi-campus support", "Advanced analytics", "Custom report cards", "API access & integrations", "Dedicated support"],
    },
    buttons: { core: "Get Started", advanced: "Buy Now", premium: "Contact Sales" },
  },
};

const primaryColor = "#6EBE45";

export function PricingSection() {
  const [service, setService] = useState("web-hosting");
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const data = PRICING_DATA[service as keyof typeof PRICING_DATA];
  const prices = data[billing as "monthly" | "yearly"][currency as "USD" | "UGX"];
  const { features, descriptions, buttons } = data;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Filters */}
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Core */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Core Package</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.core}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">{descriptions.core}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                  {buttons.core}
                </Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.core.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Advanced — Most Popular */}
          <Card className="shadow-lg relative overflow-hidden flex flex-col" style={{ borderColor: primaryColor, borderWidth: "2px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Badge className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none" style={{ backgroundColor: primaryColor }}>
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Advanced Package</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.advanced}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">{descriptions.advanced}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                  {buttons.advanced}
                </Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.advanced.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Premium */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Premium Package</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.premium}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">{descriptions.premium}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                  {buttons.premium}
                </Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.premium.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise */}
        <Card className="max-w-7xl mx-auto border-slate-200 bg-slate-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Custom Enterprise Solution</CardTitle>
                <CardDescription className="mt-2 text-slate-600">Need a tailored solution for your business? Let&apos;s create a custom plan together.</CardDescription>
              </div>
              <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 max-w-3xl">Our team of experts will work with you to understand your unique requirements and design a solution that perfectly fits your business needs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Customized features and functionality", "Scalable architecture for future growth", "Dedicated support and maintenance", "Integration with existing systems"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <Check className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/contact-us">
              <Button className="text-white hover:opacity-90 px-8" style={{ backgroundColor: primaryColor }}>Contact Sales</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
