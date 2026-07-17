"use client";

import Link from "next/link";
import { useSocialLinks } from "@/content-manager/hooks/useSocialLinks";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Our Team", href: "/about-us" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact-us" },
  ],
  services: [
    { label: "Web Development", href: "/web-development" },
    { label: "Mobile Apps", href: "/app-development" },
    { label: "E-commerce", href: "/projects" },
    { label: "Custom Solutions", href: "/odoo" },
  ],
  learning: [
    { label: "Coding School", href: "#" },
    { label: "Free Courses", href: "https://www.youtube.com/@kanlyteug" },
    { label: "YouTube Channel", href: "https://www.youtube.com/@kanlyteug" },
    { label: "Blog", href: "#blog" },
  ],
};

export function Footer() {
  const { data: dbSocial } = useSocialLinks(true);
  const socialLinks = dbSocial?.length ? dbSocial : [];
  return (
    <footer className="bg-[#050816] border-t border-blue-900/20 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">
                <span className="text-[#6EBE45]">Kanlyte</span>
                <span className="text-white">Uganda Limited</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Leveraging Technology to transform businesses with innovative web
              and mobile solutions across Uganda and beyond.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social: { id: string; platform: string; icon: string; url: string; color: string }) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#6EBE45] hover:bg-orange-400 flex items-center justify-center transition-colors"
                >
                  <DynamicIcon name={social.icon} className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Learning</h3>
            <ul className="space-y-3">
              {footerLinks.learning.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Kanlyte Uganda. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#cookies"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
