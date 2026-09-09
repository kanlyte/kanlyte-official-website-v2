"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useProducts } from "@/content-manager/hooks/useProducts";
import { useServices } from "@/content-manager/hooks/useServices";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const { data: dbProducts } = useProducts(true, { enabled: hasInteracted });
  const products: { title: string; href: string }[] = (dbProducts ?? []).map((p: { title: string; slug: string }) => ({
    title: p.title,
    href: `/products/${p.slug}`,
  }));

  const { data: dbServices } = useServices(true, { enabled: hasInteracted });
  const services: { title: string; href: string; children: { title: string; href: string }[] }[] = (dbServices ?? [])
    .filter((service: { kind: string }) => service.kind === "main")
    .map((service: { title: string; slug: string; children?: { title: string; slug: string }[] }) => ({
      title: service.title,
      href: `/services/${service.slug}`,
      children: (service.children ?? []).map((child) => ({
        title: child.title,
        href: `/services/${child.slug}`,
      })),
    }));

  const resources = [
    { title: "Projects", href: "/projects" },
    { title: "News", href: "/news" },
    { title: "Careers", href: "/careers" },
    { title: "Gallery", href: "/gallery" },
    { title: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl flex h-20 items-center justify-between">
          {/* Logo with Image and Text */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <Image
                src="/logos/logo-transparent.png"
                alt="Kanlyte Uganda Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Text next to logo - two lines */}
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold text-slate-900 leading-tight">
                Kanlyte Uganda
              </div>
              <div className="text-xs font-medium text-slate-600 leading-tight">
                Perfectly Digital
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden items-center gap-8 lg:flex">

            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}
              onMouseEnter={() => { setHasInteracted(true); setIsProductsOpen(true); setIsServicesOpen(false); }}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {isProductsOpen && (
                <div className="absolute left-0 top-full w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5 animate-in fade-in slide-in-from-top-2">
                  {products.map((p) => (
                    <Link key={p.title} href={p.href}
                      className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsProductsOpen(false)}>
                      <span className="font-medium text-slate-900 hover:text-[#6EBE45] text-sm">{p.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}
              onMouseEnter={() => { setHasInteracted(true); setIsServicesOpen(true); setIsProductsOpen(false); }}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute left-1/2 top-full grid w-[680px] -translate-x-1/2 grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 animate-in fade-in slide-in-from-top-2">
                  {services.map((s) => (
                    <div key={s.title} className="rounded-lg border border-slate-100 p-3">
                      <Link href={s.href} className="mb-2 block text-sm font-bold text-slate-900 hover:text-[#6EBE45]" onClick={() => setIsServicesOpen(false)}>
                        {s.title}
                      </Link>
                      <div className="space-y-1">
                        {s.children.slice(0, 4).map((child) => (
                          <Link key={child.href} href={child.href} className="block rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-50 hover:text-[#6EBE45]" onClick={() => setIsServicesOpen(false)}>
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}
              onMouseEnter={() => { setHasInteracted(true); setIsResourcesOpen(true); setIsProductsOpen(false); setIsServicesOpen(false); }}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {isResourcesOpen && (
                <div className="absolute left-0 top-full w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5 animate-in fade-in slide-in-from-top-2">
                  {resources.map((r) => (
                    <Link key={r.title} href={r.href}
                      className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                      onClick={() => setIsResourcesOpen(false)}>
                      <span className="font-medium text-slate-900 hover:text-[#6EBE45] text-sm">{r.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50">Pricing</Link>
            <Link href="/about-us" className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50">About Us</Link>
          </div>

          {/* Right Section - Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#6EBE45] to-[#5EA83A] px-6 hover:opacity-90"
            >
              <Link href="/contact-us" className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-lg p-2 hover:bg-slate-100 transition-colors"
            onClick={() => { setHasInteracted(true); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-20 border-t border-slate-100 bg-white lg:hidden animate-in fade-in slide-in-from-top-2">
            <div className="mx-8 md:mx-14 px-4 py-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-[#6EBE45] focus:outline-none focus:ring-2 focus:ring-[#6EBE45]/20"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {/* Products Mobile */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>Products</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isMobileProductsOpen && (
                    <div className="ml-4 space-y-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 animate-in fade-in">
                      {products.map((p) => (
                        <Link key={p.title} href={p.href}
                          className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}>
                          <span className="font-medium text-slate-900 text-sm">{p.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services Mobile */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>Services</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isMobileServicesOpen && (
                    <div className="ml-4 space-y-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 animate-in fade-in">
                      {services.map((s) => (
                        <div key={s.title} className="rounded-lg bg-white p-3">
                          <Link href={s.href} className="block text-sm font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>
                            {s.title}
                          </Link>
                          {s.children.map((child) => (
                            <Link key={child.href} href={child.href} className="mt-2 block pl-3 text-xs text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resources Mobile */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>Resources</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isMobileResourcesOpen && (
                    <div className="ml-4 space-y-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 animate-in fade-in">
                      {resources.map((r) => (
                        <Link key={r.title} href={r.href}
                          className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}>
                          <span className="font-medium text-slate-900 text-sm">{r.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/pricing"
                  className="flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Pricing</span>
                </Link>

                <Link href="/about-us"
                  className="rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  About Us
                </Link>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-8 space-y-3">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-[#6EBE45] to-[#5EA83A] py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link
                    href="/contact-us"
                    className="flex items-center justify-center gap-2"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
