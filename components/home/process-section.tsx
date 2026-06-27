"use client";

import { FeatureCard } from "./feature-card";
import { useProcessSteps } from "@/content-manager/hooks/useProcessSteps";

const FALLBACK_STEPS = [
  { id: "1", step: "Step 01", icon: "Search", title: "Discovery & Planning", description: "Understanding your business needs, objectives, and target audience to define project scope and technical requirements.", order: 0 },
  { id: "2", step: "Step 02", icon: "PenTool", title: "Design & Prototyping", description: "Creating initial design concepts and interactive prototypes based on insights gathered during the discovery phase.", order: 1 },
  { id: "3", step: "Step 03", icon: "Code", title: "Development & Testing", description: "Building robust full-stack solutions, ensuring functionality and compatibility across web and mobile platforms.", order: 2 },
  { id: "4", step: "Step 04", icon: "Rocket", title: "Launch & Support", description: "Deploying the finalized solution and providing ongoing support and maintenance to ensure long-term success.", order: 3 },
  { id: "5", step: "Step 05", icon: "RefreshCw", title: "Iteration & Enhancement", description: "Continuously improving the solution based on user feedback and evolving business needs.", order: 4 },
];

export function ProcessSection() {
  const { data: dbSteps } = useProcessSteps();
  const steps = dbSteps?.length ? dbSteps : FALLBACK_STEPS;

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
            Process
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Our Development Process
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our streamlined approach to creating bespoke web and mobile solutions that align with your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step: { id: string; step: string; icon: string; title: string; description: string }) => (
            <FeatureCard
              key={step.id}
              step={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
