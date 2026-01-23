"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PRICING_DATA = {
  "web-hosting-packages": {
    label: "Web Hosting Packages",
    USD: {
      symbol: "$",
      core: "225",
      renewal_core: "85",
      advanced: "335",
      premium: "835",
    },
    UGX: {
      symbol: "UGX ",
      core: "800,000",
      reneral_core: "300,000",
      advanced: "1,200,000",
      premium: "3,000,000",
    },
    features: {
      core: [
        "Domain name",
        "3 Professional emails",
        "Wordpress website",
        "3GB SSD hosting space",
        "Standard SSL",
        "Support and Maintenance",
      ],
      advanced: [
        "Domain name",
        "10 Professional emails",
        "Custom developed website",
        "10GB SSD hosting space",
        "Premium SSL",
        "Support and Maintenance",
        "Monthly backup",
        "Basic SEO Setup",
      ],
      premium: [
        "Domain name",
        "Unlimited professional emails",
        "Custom developed website",
        "E-Commerce website (if needed)",
        "30GB SSD hosting space",
        "Premium SSL",
        "Monthly backup",
        "Support and maintenance",
        "Advanced SEO setup",
        "User training",
      ],
    },
  },

  odoo: {
    label: "Odoo ERP",
    USD: { symbol: "$", core: "20", advanced: "45", premium: "99" },
    UGX: {
      symbol: "UGX ",
      core: "75,000",
      advanced: "168,000",
      premium: "370,000",
    },
    features: {
      core: [
        "Accounting module",
        "CRM basics",
        "Up to 5 users",
        "Standard support",
        "Cloud hosting",
        "Basic reporting",
      ],
      advanced: [
        "All Basic features",
        "Inventory management",
        "Sales & Purchase",
        "Up to 20 users",
        "Priority support",
        "Custom workflows",
        "Mobile app access",
      ],
      premium: [
        "All Standard features",
        "Manufacturing (MRP)",
        "Multi-company setup",
        "Unlimited users",
        "Dedicated account manager",
        "Custom module development",
        "Full API access",
      ],
    },
  },
  "email-hosting": {
    label: "Email Hosting",
    USD: { symbol: "$", core: "5", advanced: "12", premium: "25" },
    UGX: {
      symbol: "UGX ",
      core: "18,500",
      advanced: "45,000",
      premium: "92,500",
    },
    features: {
      core: [
        "5GB Storage",
        "Up to 10 accounts",
        "Webmail access",
        "Basic spam protection",
        "IMAP/POP3 support",
      ],
      advanced: [
        "25GB Storage",
        "Up to 50 accounts",
        "Ad-free interface",
        "Advanced threat protection",
        "Shared calendars",
        "Mobile sync",
      ],
      premium: [
        "100GB Storage",
        "Unlimited accounts",
        "Premium filtering",
        "White-labeling",
        "Archiving & eDiscovery",
        "24/7 Priority support",
      ],
    },
  },
};

export function PricingSection() {
  const [service, setService] = useState("web-hosting-packages");
  const [currency, setCurrency] = useState("USD");

  const currentPricing =
    PRICING_DATA[service as keyof typeof PRICING_DATA][
      currency as "USD" | "UGX"
    ];
  const currentFeatures =
    PRICING_DATA[service as keyof typeof PRICING_DATA].features;

  const primaryColor = "#6EBE45";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Selectors */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="w-[240px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-hosting-packages">
                Web Hosting Packages
              </SelectItem>
              <SelectItem value="odoo">Odoo ERP</SelectItem>
              <SelectItem value="email-hosting">Email Hosting</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="UGX">UGX</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Basic */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Core Package
                </CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">
                  {currentPricing.symbol}
                  {currentPricing.core}
                </span>
              </div>
              <CardDescription className="mt-2 text-slate-500">
                Renewal Fees: UGX: 300,000/yr
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button
                className="w-full mb-6 text-white hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Select Package
              </Button>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">
                  What&apos;s included:
                </p>
                <ul className="space-y-3">
                  {currentFeatures.core.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: primaryColor }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Standard (Highlighted) */}
          <Card
            className="shadow-lg relative overflow-hidden flex flex-col"
            style={{ borderColor: primaryColor, borderWidth: "2px" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Badge
                className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none"
                style={{ backgroundColor: primaryColor }}
              >
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Advanced Package
                </CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">
                  {currentPricing.symbol}
                  {currentPricing.advanced}
                </span>
              </div>
              <CardDescription className="mt-2 text-slate-500">
                Advanced features for growing businesses.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button
                className="w-full mb-6 text-white hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Select Package
              </Button>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">
                  What&apos;s included:
                </p>
                <ul className="space-y-3">
                  {currentFeatures.advanced.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: primaryColor }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Premium Package
                </CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">
                  {currentPricing.symbol}
                  {currentPricing.premium}
                </span>
              </div>
              <CardDescription className="mt-2 text-slate-500">
                Enterprise-grade solutions for complex requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button
                className="w-full mb-6 text-white hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Select Package
              </Button>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">
                  What&apos;s included:
                </p>
                <ul className="space-y-3">
                  {currentFeatures.premium.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: primaryColor }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Full Width Card */}
        <Card className="max-w-7xl mx-auto border-slate-200 bg-slate-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Custom Enterprise Solution
                </CardTitle>
                <CardDescription className="mt-2 text-slate-600">
                  Need a tailored solution for your business? Let&apos;s create
                  a custom plan together.
                </CardDescription>
              </div>
              <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 max-w-3xl">
              Our team of experts will work with you to understand your unique
              requirements and design a solution that perfectly fits your
              business needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Customized features and functionality",
                "Scalable architecture for future growth",
                "Dedicated support and maintenance",
                "Integration with existing systems",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <Check
                    className="w-4 h-4 shrink-0"
                    style={{ color: primaryColor }}
                  />
                  {item}
                </div>
              ))}
            </div>
            <Button
              className="text-white hover:opacity-90 px-8"
              style={{ backgroundColor: primaryColor }}
            >
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
