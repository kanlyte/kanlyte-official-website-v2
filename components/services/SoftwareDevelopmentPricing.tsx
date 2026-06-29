"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PRICES = {
  UGX: { starter: "From 2,000,000 UGX", business: "From 8,000,000 UGX" },
  USD: { starter: "From $540", business: "From $2,160" },
};

const features = {
  starter: ["Up to 5 core features", "Mobile or web app", "UI/UX design included", "3 months support", "Source code handover"],
  business: ["Custom feature set", "Web + Mobile", "API integrations", "Admin dashboard", "6 months support", "Staff training"],
  enterprise: ["Unlimited complexity", "Multi-platform", "Legacy migration", "DevOps & CI/CD", "SLA support contract", "Dedicated team"],
};

const primaryColor = "#6EBE45";

export function SoftwareDevelopmentPricing() {
  const [currency, setCurrency] = useState("UGX");
  const prices = PRICES[currency as "UGX" | "USD"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Software Development Packages</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Every project is unique. These packages give you a starting point — we&apos;ll tailor the scope to your needs.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
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
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Starter</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{prices.starter}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Small apps & MVPs — one-time project fee.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Get a Quote</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.starter.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg relative overflow-hidden flex flex-col" style={{ borderColor: primaryColor, borderWidth: "2px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Badge className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none" style={{ backgroundColor: primaryColor }}>
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Business</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{prices.business}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Full-featured business systems — one-time project fee.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Start Your Project</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.business.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Enterprise</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">Custom</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Large-scale systems & ERP — scoped to your needs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Contact Sales</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.enterprise.map((f, i) => (
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
                <CardDescription className="mt-2 text-slate-600">Need a tailored solution for your business? Let&apos;s create a custom plan together.</CardDescription>
              </div>
              <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Customised features and functionality", "Scalable architecture for future growth", "Dedicated support and maintenance", "Integration with existing systems"].map((item, i) => (
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
