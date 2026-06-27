"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Software Development",
      href: "/software-development",
    },
    {
      title: "Email Hosting",
      href: "/email-hosting",
    },
    {
      title: "App Development",
      href: "/app-development",
    },
    {
      title: "School Systems",
      href: "/school-systems",
    },
    {
      title: "Website Development",
      href: "/website-development",
    },
  ];

  const handleLoginClick = () => {
    toast.error("Login Portal Coming Soon", {
      description:
        "We're working on the login functionality. Please check back later!",
      duration: 4000,
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
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
            {/* <Link
              href="/projects"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Our Projects
            </Link> */}

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Our Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 group transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-[#6EBE45]">
                            {service.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Pricing
            </Link>

            {/* Odoo ERP - Now just a simple link */}
            <Link
              href="/odoo"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Odoo ERP
            </Link>

            <Link
              href="/about-us"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6EBE45] px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              About Us
            </Link>
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                {/* <Link
                  href="/projects"
                  className="flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Our Projects</span>
                </Link> */}

                {/* Services Mobile Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() =>
                      setIsMobileServicesOpen(!isMobileServicesOpen)
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>Our Services</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isMobileServicesOpen && (
                    <div className="ml-4 space-y-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 animate-in fade-in">
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div>
                            <div className="font-medium text-slate-900">
                              {service.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/pricing"
                  className="flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Pricing</span>
                </Link>

                {/* Odoo ERP - Simple link in mobile */}
                <Link
                  href="/odoo"
                  className="rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Odoo ERP
                </Link>

                <Link
                  href="/about-us"
                  className="rounded-lg px-4 py-3.5 text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
