import { Hero } from "@/components/about-us/hero";
import { SchoolSyncHero } from "@/components/school-sync/hero";
import { SchoolSyncModules } from "@/components/school-sync/modules";
import { SchoolSyncPricing } from "@/components/school-sync/pricing";

export default function SchoolSyncPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/image3.jpg"
        backgroundAlt="School Sync"
        title="School Management"
        highlightedTitle="Simplified"
        tagline="School Sync — Powered by Kanlyte"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/school-sync" },
          { label: "School Sync", isActive: true },
        ]}
      />
      <SchoolSyncHero />
      <SchoolSyncModules />
      <SchoolSyncPricing />
    </>
  );
}
