"use client";

import { FeatureCard } from "./feature-card";
import { Search, PenTool, Code, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Planning",
    description:
      "Understanding your business needs, objectives, and target audience to define project scope and technical requirements.",
    step: "Step 01",
  },
  {
    icon: PenTool,
    title: "Design & Prototyping",
    description:
      "Creating initial design concepts and interactive prototypes based on insights gathered during the discovery phase.",
    step: "Step 02",
  },
  {
    icon: Code,
    title: "Development & Testing",
    description:
      "Building robust full-stack solutions, ensuring functionality and compatibility across web and mobile platforms.",
    step: "Step 03",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description:
      "Deploying the finalized solution and providing ongoing support and maintenance to ensure long-term success.",
    step: "Step 04",
  },
  {
    icon: RefreshCw,
    title: "Iteration & Enhancement",
    description:
      "Continuously improving the solution based on user feedback and evolving business needs.",
    step: "Step 05",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      {/* Same margin system for consistency */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
            Process
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Our Development Process
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our streamlined approach to creating bespoke web and mobile
            solutions that align with your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <FeatureCard key={step.title} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
