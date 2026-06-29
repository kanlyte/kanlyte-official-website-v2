"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PRICES = {
  monthly: {
    UGX: { community: "100,000 UGX", standard: "1,200,000 UGX", custom: "1,700,000 UGX" },
    USD: { community: "$27", standard: "$324", custom: "$459" },
  },
  yearly: {
    UGX: { community: "900,000 UGX", standard: "1,200,000 UGX", custom: "1,700,000 UGX" },
    USD: { community: "$243", standard: "$324", custom: "$459" },
  },
};

const features = {
  community: ["Full Odoo Community Edition", "Self-hosted (On-premise)", "Unlimited users", "All community apps included", "Community support", "Customization at agreed cost"],
  standard: ["Access to all standard apps", "Odoo Online hosting", "Standard support", "One Company per database", "No Integrations", "Basic customization"],
  custom: ["All apps + Odoo Studio", "Odoo Online/On-premise", "Multi-company ready", "External API access", "One-time implementation fee", "Priority support"],
};

const primaryColor = "#6EBE45";

export function Pricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const prices = PRICES[billing as "monthly" | "yearly"][currency as "UGX" | "USD"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple & Flexible Odoo Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose the perfect plan for your business. All plans include our expert implementation support.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Community */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Odoo Community</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.community}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Open source, self-hosted version.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Get Started Now</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.community.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Standard — Most Popular */}
          <Card className="shadow-lg relative overflow-hidden flex flex-col" style={{ borderColor: primaryColor, borderWidth: "2px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Badge className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none" style={{ backgroundColor: primaryColor }}>
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Standard</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.standard}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Basic Odoo Online plan — per user.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Buy Now</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.standard.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Custom */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Custom</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.custom}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Enterprise-grade solution — per user.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Contact Sales</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.custom.map((f, i) => (
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

        <Card className="max-w-7xl mx-auto border-slate-200 bg-slate-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Custom Enterprise Solution</CardTitle>
                <CardDescription className="mt-2 text-slate-600">Need a fully tailored Odoo implementation? Let&apos;s design the perfect ERP solution for your business.</CardDescription>
              </div>
              <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Custom module development", "Multi-company & multi-currency", "Dedicated Odoo consultant", "Integration with existing systems"].map((item, i) => (
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
