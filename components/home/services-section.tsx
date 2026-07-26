"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useServices } from "@/content-manager/hooks/useServices";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

type Service = { id: string; title: string; slug?: string | null; description: string; icon: string; category?: string | null };

const CATEGORIES = [
  { slug: "software-development", label: "Software Development" },
  { slug: "web-cloud", label: "Web & Cloud Services" },
  { slug: "ict-training", label: "ICT Training & Consultancy" },
  { slug: "research-innovation", label: "Research & Innovation" },
];

const FALLBACK_SERVICES: Service[] = [
  { id: "1", title: "Custom Software", slug: "custom-software", description: "Bespoke software solutions built from scratch to solve your unique business challenges.", icon: "Code2", category: "software-development" },
  { id: "2", title: "Odoo ERP Customizations", slug: "odoo-erp-customizations", description: "Extend and customize Odoo ERP to perfectly match your business workflows and requirements.", icon: "Monitor", category: "software-development" },
  { id: "3", title: "App Development", slug: "app-development", description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.", icon: "Smartphone", category: "software-development" },
  { id: "4", title: "School Management Systems", slug: "school-management-systems", description: "Comprehensive school management solutions for student records, fees, academics, and administration.", icon: "School", category: "software-development" },
  { id: "5", title: "Website Development", slug: "website-development", description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.", icon: "Globe", category: "web-cloud" },
  { id: "6", title: "Web Hosting", slug: "web-hosting", description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.", icon: "Server", category: "web-cloud" },
  { id: "7", title: "Email Hosting", slug: "email-hosting", description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.", icon: "Mail", category: "web-cloud" },
  { id: "8", title: "Cloud Infrastructure", slug: "cloud-infrastructure", description: "Scalable cloud server setup, management, and monitoring for businesses of all sizes.", icon: "Cloud", category: "web-cloud" },
  { id: "9", title: "ICT Training", slug: "ict-training", description: "Hands-on technology training programmes covering web dev, mobile, databases, and more.", icon: "GraduationCap", category: "ict-training" },
  { id: "10", title: "IT Consultancy", slug: "it-consultancy", description: "Strategic IT consultancy to help your organisation make smarter technology decisions.", icon: "Briefcase", category: "ict-training" },
  { id: "11", title: "Corporate Training", slug: "corporate-training", description: "Customised technology training packages designed for teams and organisations.", icon: "Users", category: "ict-training" },
  { id: "12", title: "AI & Machine Learning", slug: "ai-machine-learning", description: "Applied AI and ML solutions that turn your data into actionable business intelligence.", icon: "Cpu", category: "research-innovation" },
  { id: "13", title: "IoT Solutions", slug: "iot-solutions", description: "Internet of Things integrations that connect your physical assets to smart digital systems.", icon: "Wifi", category: "research-innovation" },
  { id: "14", title: "Digital Transformation", slug: "digital-transformation", description: "End-to-end digital transformation strategies that modernise your business operations.", icon: "TrendingUp", category: "research-innovation" },
];

// Map slugs that have dedicated pages
const PAGE_ROUTES: Record<string, string> = {
  "app-development": "/app-development",
  "email-hosting": "/email-hosting",
  "website-development": "/website-development",
  "software-development": "/services/software-development",
  "web-cloud": "/services/web-cloud",
  "ict-training": "/services/ict-training",
  "research-innovation": "/services/research-innovation",
};

function getHref(slug?: string | null, category?: string | null): string {
  if (!slug) return "/contact-us";
  if (PAGE_ROUTES[slug]) return PAGE_ROUTES[slug];
  // fallback to parent category page
  if (category && PAGE_ROUTES[category]) return PAGE_ROUTES[category];
  return `/services/${slug}`;
}

export function FeaturesGrid() {
  const { data: dbServices } = useServices(true);
  const all: Service[] = dbServices?.length ? dbServices : FALLBACK_SERVICES;

  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = active === "all" ? all : all.filter((s) => s.category === active);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Build tab list — only show categories that have services
  const availableCategories = CATEGORIES.filter((c) => all.some((s) => s.category === c.slug));

  function changeTab(slug: string) {
    setActive(slug);
    setPage(1);
  }

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[2.5rem] font-bold text-[#0F172A] mb-4">Our Featured Services</h2>
          <p className="text-[#6EBE45] font-semibold text-xs md:text-sm max-w-2xl mx-auto uppercase">
            Comprehensive digital solutions tailored to empower your business growth and efficiency.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => changeTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              active === "all"
                ? "bg-[#6EBE45] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#6EBE45] hover:text-[#6EBE45]"
            }`}
          >
            All Services
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => changeTab(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat.slug
                  ? "bg-[#6EBE45] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#6EBE45] hover:text-[#6EBE45]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((service) => (
            <Link key={service.id} href={getHref(service.slug, service.category)} className="group">
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-md hover:-translate-y-1 border border-transparent hover:border-[#6EBE45]/20">
                <CardContent className="p-8">
                  <div className="w-10 h-10 bg-[#6EBE45] rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <DynamicIcon name={service.icon} className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#6EBE45] mb-3">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-4">{service.description}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#6EBE45] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:border-[#6EBE45] hover:text-[#6EBE45] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                  page === n
                    ? "bg-[#6EBE45] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#6EBE45] hover:text-[#6EBE45]"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:border-[#6EBE45] hover:text-[#6EBE45] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
