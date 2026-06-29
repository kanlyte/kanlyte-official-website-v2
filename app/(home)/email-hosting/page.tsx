import { Hero } from "@/components/about-us/hero";
import { ServiceHero } from "@/components/services-pages/service-hero";
import { ServiceCapabilities } from "@/components/services-pages/service-capabilities";
import { ServiceSidebar } from "@/components/home/service-sidebar";
import { EmailHostingContent } from "@/components/services/EmailHosting";
import { EmailHostingPricing } from "@/components/services/EmailHostingPricing";
import { Mail, Shield, Server, Zap, Globe, Users, Lock, Headphones, RefreshCw, Database } from "lucide-react";
import React from "react";

const capabilities = [
  { name: "Custom Domain Email", icon: Mail },
  { name: "Spam Protection", icon: Shield },
  { name: "Enterprise Servers", icon: Server },
  { name: "Fast Delivery", icon: Zap },
  { name: "Webmail Access", icon: Globe },
  { name: "Team Mailboxes", icon: Users },
  { name: "Data Encryption", icon: Lock },
  { name: "24/7 Support", icon: Headphones },
  { name: "Daily Backups", icon: RefreshCw },
  { name: "IMAP/POP3", icon: Database },
];

export default function EmailHostingPage() {
  return (
    <>
      <Hero
        backgroundImage="/images/email-bg.jpg"
        backgroundAlt="Email Hosting"
        title="Professional"
        highlightedTitle="Email Hosting"
        tagline="Business Email — Powered by Kanlyte"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Email Hosting", isActive: true },
        ]}
      />
      <ServiceHero
        slug="email-hosting"
        badge="Email Hosting — Kanlyte Uganda"
        title="Professional email,"
        highlight="your domain."
        subtitle="Secure, reliable, *always delivered!"
        description="Get a professional business email address with your own domain. Kanlyte's email hosting comes with enterprise-grade security, spam protection, and 99.9% uptime — at competitive rates."
        primaryBtn={{ label: "Get Started", href: "/contact-us" }}
        secondaryBtn={{ label: "View Pricing", href: "/pricing" }}
        annotation={{ line1: "99.9%", line2: "uptime guaranteed" }}
      />
      <ServiceCapabilities
        slug="email-hosting"
        title="What's Included"
        subtitle="Everything your business needs for professional email communication."
        capabilities={capabilities}
        tagline="Imagine your business still using a free Gmail address"
        ctaLabel="Get Business Email"
        ctaHref="/contact-us"
      />
      <div className="bg-white py-16">
        <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr]">
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <ServiceSidebar />
            </div>
            <EmailHostingContent />
          </div>
        </div>
      </div>
      <EmailHostingPricing />
    </>
  );
}
