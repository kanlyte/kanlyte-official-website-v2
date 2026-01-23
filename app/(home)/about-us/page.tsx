import { Hero } from "@/components/about-us/hero";
import { Journey } from "@/components/about-us/journey";
import { Team } from "@/components/about-us/team";
import { Testimonials } from "@/components/about-us/testimonials";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="About Us Background"
        title="About"
        highlightedTitle="Us"
        tagline="Welcome to Our Story"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", isActive: true },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        <Journey />
        <Team />
        <Testimonials />
      </div>
    </main>
  );
}
