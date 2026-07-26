"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePricingPlans } from "@/content-manager/hooks/usePricingPlans";

const primaryColor = "#6EBE45";

interface FallbackPlan {
  tier: string;
  title: string;
  description: string;
  priceUGX: string;
  priceUSD?: string;
  priceUGXMonthly?: string;
  priceUSDMonthly?: string;
  isPopular?: boolean;
  buttonText: string;
  features: string[];
}

interface PricingCardsProps {
  category: string;
  billing: string;
  currency: string;
  fallbackPlans: FallbackPlan[];
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterpriseFeatures?: string[];
}

export function PricingCards({
  category,
  billing,
  currency,
  fallbackPlans,
  enterpriseTitle = "Custom Enterprise Solution",
  enterpriseDescription = "Need a tailored solution for your business? Let's create a custom plan together.",
  enterpriseFeatures = [
    "Customised features and functionality",
    "Scalable architecture for future growth",
    "Dedicated support and maintenance",
    "Integration with existing systems",
  ],
}: PricingCardsProps) {
  const { data: dbData } = usePricingPlans(category);

  const pricingEnabled = dbData?.pricingEnabled ?? true;
  const dbPlans = dbData?.plans;

  if (!pricingEnabled) return null;

  const plans: FallbackPlan[] = dbPlans?.length
    ? dbPlans.map((p: {
        tier: string; title: string; description: string;
        priceUGX: string; priceUSD?: string;
        priceUGXMonthly?: string; priceUSDMonthly?: string;
        isPopular: boolean; buttonText: string;
        features: { text: string; order: number }[];
      }) => ({
        tier: p.tier,
        title: p.title,
        description: p.description,
        priceUGX: p.priceUGX,
        priceUSD: p.priceUSD,
        priceUGXMonthly: p.priceUGXMonthly,
        priceUSDMonthly: p.priceUSDMonthly,
        isPopular: p.isPopular,
        buttonText: p.buttonText,
        features: p.features.map((f) => f.text),
      }))
    : fallbackPlans;

  function getPrice(plan: FallbackPlan): string {
    const isMonthly = billing === "monthly";
    if (currency === "USD") {
      if (isMonthly) return plan.priceUSDMonthly ?? plan.priceUSD ?? plan.priceUGX;
      return plan.priceUSD ?? plan.priceUGX;
    }
    if (isMonthly) return plan.priceUGXMonthly ?? plan.priceUGX;
    return plan.priceUGX;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.tier}
            className={`relative overflow-hidden flex flex-col ${plan.isPopular ? "shadow-lg" : "border-slate-200 bg-white shadow-sm"}`}
            style={plan.isPopular ? { borderColor: primaryColor, borderWidth: "2px" } : {}}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <Badge className="rounded-t-none rounded-b-lg px-6 py-1 text-white font-medium border-none" style={{ backgroundColor: primaryColor }}>
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className={`pb-4 ${plan.isPopular ? "pt-10" : ""}`}>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-slate-900">{plan.title}</CardTitle>
                <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{getPrice(plan)}</span>
              </div>
              <CardDescription className="mt-2 text-slate-500">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href="/contact-us">
                <Button className="w-full mb-6 text-white hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                  {plan.buttonText}
                </Button>
              </Link>
              <div className="space-y-4">
                <p className="font-semibold text-sm text-slate-900">What&apos;s included:</p>
                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise card */}
      <Card className="max-w-7xl mx-auto border-slate-200 bg-slate-50">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">{enterpriseTitle}</CardTitle>
              <CardDescription className="mt-2 text-slate-600">{enterpriseDescription}</CardDescription>
            </div>
            <Star className="w-4 h-4 text-slate-400 fill-slate-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {enterpriseFeatures.map((item, i) => (
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
    </>
  );
}
