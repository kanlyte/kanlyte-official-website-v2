import { notFound } from "next/navigation";
import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { EntityPricingSection } from "@/components/pricing/entity-pricing-section";
import { productService } from "@/content-manager/services/product.service";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="Kanlyte Uganda office"
        title={product.title}
        tagline={`${product.title} — Kanlyte Uganda`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title, isActive: true },
        ]}
      />
      <ServiceHero
        slug={slug}
        badge={`${product.title} — Kanlyte Uganda`}
        title={product.title}
        highlight="by Kanlyte Uganda"
        subtitle="Powerful, reliable, *affordable!"
        description={product.description}
        primaryBtn={{ label: "Get Started", href: "/contact-us" }}
        secondaryBtn={{ label: "Learn More", href: "/contact-us" }}
        annotation={{ line1: "Built for", line2: "your business" }}
      />
      <ServiceCapabilities
        slug={slug}
        title={`${product.title} Capabilities`}
        subtitle="Everything you need, built in."
        capabilities={[]}
        tagline="Imagine your business without it"
        ctaLabel="Talk to Us"
        ctaHref="/contact-us"
      />
      <EntityPricingSection ownerType="product" ownerId={product.id} ownerTitle={product.title} />
    </>
  );
}
