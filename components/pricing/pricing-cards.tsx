"use client";

import { useEffect } from "react";
import { Check, Star, MessageCircle } from "lucide-react";
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
  tagline?: string | null;
  period?: string | null;
  isPopular?: boolean;
  buttonText: string;
  features: string[];
}

interface PricingCardsProps {
  category: string;
  billing: string;
  currency: string;
  fallbackPlans: FallbackPlan[];
  onCapabilities?: (caps: { hasMonthly: boolean; hasUSD: boolean }) => void;
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterpriseFeatures?: string[];
}

export function PricingCards({
  category,
  billing,
  currency,
  fallbackPlans,
  onCapabilities,
  enterpriseTitle = "Custom Enterprise Solution",
  enterpriseDescription = "Need a tailored solution for your business? Let's create a custom plan together.",
  enterpriseFeatures = [
    "Customised features and functionality",
    "Scalable architecture for future growth",
    "Dedicated support and maintenance",
    "Integration with existing systems",
  ],
}: PricingCardsProps) {
  const { data: dbData, isLoading } = usePricingPlans(category);

  const dbPlans = dbData?.plans;
  const pricingEnabled = dbData?.pricingEnabled;

  const plans: FallbackPlan[] = dbPlans?.length
    ? dbPlans.map((p: {
        tier: string; title: string; description: string;
        priceUGX: string; priceUSD?: string;
        priceUGXMonthly?: string; priceUSDMonthly?: string;
        tagline?: string | null; period?: string | null;
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
        tagline: p.tagline,
        period: p.period,
        isPopular: p.isPopular,
        buttonText: p.buttonText,
        features: p.features.map((f) => f.text),
      }))
    : fallbackPlans;

  const hasMonthly = plans.some((p) => p.priceUGXMonthly || p.priceUSDMonthly);
  const hasUSD = plans.some((p) => p.priceUSD || p.priceUSDMonthly);
  const effectiveBilling = hasMonthly ? billing : "yearly";
  const effectiveCurrency = hasUSD ? currency : "UGX";

  // Must be before any conditional returns
  useEffect(() => {
    if (plans.length) onCapabilities?.({ hasMonthly, hasUSD });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMonthly, hasUSD, plans.length]);

  if (isLoading) return null;
  if (dbData?.exists && !pricingEnabled) return null;

  function getPrice(plan: FallbackPlan): string {
    const isMonthly = effectiveBilling === "monthly";
    if (effectiveCurrency === "USD") {
      if (isMonthly) return plan.priceUSDMonthly ?? plan.priceUSD ?? plan.priceUGX;
      return plan.priceUSD ?? plan.priceUGX;
    }
    if (isMonthly) return plan.priceUGXMonthly ?? plan.priceUGX;
    return plan.priceUGX;
  }

  if (!plans.length) return (
    <div className="max-w-2xl mx-auto text-center py-16 px-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6EBE45]/10 mb-6">
        <MessageCircle className="w-7 h-7 text-[#6EBE45]" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">Pricing on Request</h3>
      <p className="text-slate-500 mb-8 leading-relaxed">
        Pricing for this service is tailored to your specific needs. Get in touch with our team and we&apos;ll put together a custom quote for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/contact-us">
          <Button className="text-white px-8 py-5" style={{ backgroundColor: primaryColor }}>
            Get a Custom Quote
          </Button>
        </Link>
        <Link href="/contact-us">
          <Button variant="outline" className="px-8 py-5 border-slate-200 text-slate-700 hover:border-[#6EBE45] hover:text-[#6EBE45]">
            Talk to Our Team
          </Button>
        </Link>
      </div>
    </div>
  );

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
                {plan.period && <span className="ml-1 text-sm text-slate-500">{plan.period}</span>}
              </div>
              {plan.tagline && (
                <p className="text-xs font-bold mt-1" style={{ color: primaryColor }}>{plan.tagline}</p>
              )}
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
