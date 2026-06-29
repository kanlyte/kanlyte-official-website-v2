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
    UGX: { basic: "50,000 UGX", pro: "120,000 UGX" },
    USD: { basic: "$14", pro: "$32" },
  },
  yearly: {
    UGX: { basic: "500,000 UGX", pro: "1,200,000 UGX" },
    USD: { basic: "$135", pro: "$324" },
  },
};

const features = {
  basic: ["Up to 5 listings", "Photo galleries", "Booking management", "Tenant messaging", "Basic analytics"],
  pro: ["Unlimited listings", "Priority placement", "Advanced analytics", "Verified badge", "Dedicated support"],
};

const primaryColor = "#6EBE45";

export function LytePricing() {
  const [billing, setBilling] = useState("yearly");
  const [currency, setCurrency] = useState("UGX");

  const prices = PRICES[billing as "monthly" | "yearly"][currency as "UGX" | "USD"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple Lyte Plans</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Tenants browse free. Landlords choose a plan that fits.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap">
          <Select value={billing} onValueChange={setBilling}>
            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Billing Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save 17%)</SelectItem>
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
          {/* Tenant Free */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Tenant Free</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">Free</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">Find your space at no cost — forever.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Download App</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {["Browse all listings", "Save favourites", "Direct messaging", "Map view", "Push notifications"].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Basic — Most Popular */}
          <Card className="shadow-lg relative overflow-hidden flex flex-col" style={{ borderColor: primaryColor, borderWidth: "2px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Badge className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none" style={{ backgroundColor: primaryColor }}>
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-10">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Landlord Basic</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.basic}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">List and manage your properties.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Get Started</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.basic.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Pro */}
          <Card className="border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">Landlord Pro</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{prices.pro}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">For agents & property managers.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>Contact Sales</Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.pro.map((f, i) => (
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
                <CardDescription className="mt-2 text-slate-600">Need a branded property portal for a large agency or developer? Let&apos;s build it together.</CardDescription>
              </div>
              <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Branded property portal", "Custom integrations", "Bulk listing management", "Dedicated account manager"].map((item, i) => (
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
