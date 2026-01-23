"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function Pricing() {
  const [isMonthly, setIsMonthly] = useState(false);

  const pricingPlans = [
    {
      title: "Odoo Community",
      price: isMonthly ? "100,000" : "900,000",
      priceSuffix: " UGX",
      period: isMonthly ? "/ month" : "",
      description: "Open source, self-hosted version",
      features: [
        "Full Odoo Community Edition",
        "Self-hosted (On-premise)",
        "Unlimited users",
        "All community apps included",
        "Community support",
        "Customization at an agreed cost",
      ],
      buttonText: "Get Started Now",
      buttonVariant: "primary",
      borderColor: "#6EBE45",
      tagline: "Open Source Solution",
    },
    {
      title: "Odoo.sh",
      price: isMonthly ? "300,000" : "2,371,200",
      priceSuffix: " UGX",
      period: "/ one user",
      description: "Odoo's hosting platform",
      features: [
        "All Odoo apps included",
        "Odoo.sh hosting",
        "Daily automated backups",
        "Staging & production",
        "1,500,000 Renewable annually**",
        "Technical support",
      ],
      buttonText: "Start Trial",
      buttonVariant: "outline",
      borderColor: "#3B82F6",
      tagline: "Managed Cloud Hosting",
    },
    {
      title: "Standard",
      price: "1,200,000",
      priceSuffix: " UGX",
      period: "/ one user",
      description: "Basic Odoo Online plan",
      features: [
        "Access to all standard apps",
        "Odoo Online hosting",
        "Standard support",
        "One Company per database",
        "No Integrations",
        "Basic customization",
      ],
      buttonText: "Buy Now",
      buttonVariant: "primary",
      borderColor: "#F06666",
      tagline: "Most Popular",
      isPopular: true,
    },
    {
      title: "Custom",
      price: "1,700,000",
      priceSuffix: " UGX",
      period: "/ one user",
      description: "Enterprise-grade solution",
      features: [
        "All apps + Odoo Studio",
        "Odoo Online/On-premise",
        "Multi-company ready",
        "External API access",
        "one time implementation fee",
        "Priority support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "primary",
      borderColor: "#8B5CF6",
      tagline: "Enterprise Solution",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-4">
            Simple & Flexible Odoo Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include our
            expert implementation support.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16 bg-white p-4 rounded-2xl shadow-sm inline-flex">
          <span
            className={`text-sm font-semibold transition-colors ${
              !isMonthly ? "text-[#212529]" : "text-gray-400"
            }`}
          >
            Yearly Billing (Save 20%)
          </span>
          <Switch
            checked={isMonthly}
            onCheckedChange={setIsMonthly}
            className="data-[state=checked]:bg-[#6EBE45]"
          />
          <span
            className={`text-sm font-semibold transition-colors ${
              isMonthly ? "text-[#212529]" : "text-gray-400"
            }`}
          >
            Monthly Billing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-white rounded-2xl shadow-lg border-t-4 p-6 flex flex-col items-start text-left relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.isPopular
                  ? "lg:scale-105 lg:z-10 ring-2 ring-[#6EBE45]/20"
                  : ""
              }`}
              style={{ borderColor: plan.borderColor }}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#6EBE45] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                    {plan.tagline}
                  </span>
                </div>
              )}

              {!plan.isPopular && (
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {plan.tagline}
                </span>
              )}

              <h3 className="text-2xl font-bold text-[#212529] mb-2">
                {plan.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#212529]">
                    {plan.price}
                  </span>
                  <span className="text-2xl font-bold text-[#212529]">
                    {plan.priceSuffix}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                  {plan.title === "Odoo Community" && isMonthly && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Annual: 900,000 UGX
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-[#6EBE45] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="w-full space-y-3 mt-auto">
                <Button
                  className={`w-full py-4 text-base font-semibold rounded-xl transition-all duration-300 ${
                    plan.buttonVariant === "primary"
                      ? "bg-[#6EBE45] hover:bg-[#5EA83A] text-white"
                      : "bg-white border-2 border-[#6EBE45] text-[#6EBE45] hover:bg-[#6EBE45] hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>

                {plan.title !== "Odoo Community" && (
                  <Button
                    variant="ghost"
                    className="w-full py-3 text-sm text-gray-600 hover:text-[#6EBE45]"
                  >
                    Learn More →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gradient-to-r from-[#6EBE45]/5 to-[#6EBE45]/10 rounded-2xl border border-[#6EBE45]/20">
          <h3 className="text-xl font-bold text-[#212529] mb-3">
            🌟 Why Choose Our Odoo Implementation?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="bg-[#6EBE45] text-white p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212529]">
                  Expert Implementation
                </p>
                <p className="text-sm text-gray-600">
                  Professional setup & configuration
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#6EBE45] text-white p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212529]">24/7 Support</p>
                <p className="text-sm text-gray-600">
                  Round-the-clock technical support
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#6EBE45] text-white p-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#212529]">
                  Custom Development
                </p>
                <p className="text-sm text-gray-600">
                  Tailored solutions for your business
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            * Prices in USD are per user per month, billed annually. UGX prices
            are for annual licenses.
            <br />
            ** All plans include implementation support from our certified Odoo
            experts.
          </p>
        </div>
      </div>
    </section>
  );
}
