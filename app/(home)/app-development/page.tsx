import { Hero } from "@/components/about-us/hero";
import { ServiceSidebar } from "@/components/home/service-sidebar";
import { AppDevelopmentContent } from "@/components/services/AppDevelopment";
import { AppDevelopmentPricing } from "@/components/services/AppDevelopmentPricing";
import React from "react";

export default function page() {
  return (
    <>
      <Hero
        backgroundImage="/images/appdev-bg.avif"
        backgroundAlt="Odoo Background"
        title="App Development"
        highlightedTitle="app-development"
        tagline="App Development"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "App-Development", isActive: true },
        ]}
      />
      <div className="bg-white py-16">
        {/* Same margin system for consistency */}
        <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr]">
            {/* Sidebar with consistent spacing */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <ServiceSidebar />
            </div>

            {/* Main content */}
            <AppDevelopmentContent />
          </div>
        </div>
      </div>
      <AppDevelopmentPricing />
    </>
  );
}
