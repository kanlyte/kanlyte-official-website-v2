import { Hero } from "@/components/about-us/hero";
import { ServiceContent } from "@/components/home/service-content";
import { ServiceSidebar } from "@/components/home/service-sidebar";
import React from "react";

export default function page() {
  return (
    <>
      <Hero
        backgroundImage="/images/image3.jpg"
        backgroundAlt="Odoo Background"
        title="Website Development"
        highlightedTitle="Website"
        tagline="Website Development"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Website", isActive: true },
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
            <ServiceContent />
          </div>
        </div>
      </div>
    </>
  );
}
