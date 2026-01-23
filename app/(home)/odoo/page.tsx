import { Hero } from "@/components/about-us/hero";
import { AppGrid } from "@/components/odoo/app-grid";
import OdooCombined from "@/components/odoo/odoo-combined";
import { Pricing } from "@/components/odoo/pricing";
import React from "react";

export default function page() {
  return (
    <>
      <Hero
        backgroundImage="/images/odoo19.png"
        backgroundAlt="Odoo Background"
        title="All Your Business in One Place"
        highlightedTitle="Odoo"
        tagline="Odoo ERP Solutions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Odoo", isActive: true },
        ]}
      />
      <OdooCombined />
      <AppGrid />
      <Pricing />
    </>
  );
}
