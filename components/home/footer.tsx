import Link from "next/link";
import { socialLinkService } from "@/content-manager/services/social-link.service";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

type SocialLink = { id: string; platform: string; icon: string; url: string; color: string };

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "News", href: "/news" },
  ],
  services: [
    { label: "Research & Innovation", href: "/services/research-innovation" },
    { label: "Web & Cloud Services", href: "/services/web-cloud" },
    { label: "Software Development", href: "/services/software-development" },
    { label: "ICT Training & Consultancy", href: "/services/ict-training" },
  ],
  products: [
    { label: "School Sync", href: "/products/school-sync" },
    { label: "Lyte App", href: "/products/lyte" },
    { label: "Odoo ERP", href: "/products/odoo" },
  ],
};

export async function Footer() {
  const dbSocial = await socialLinkService.getActive().catch(() => []);
  const socialLinks: SocialLink[] = dbSocial?.length ? dbSocial : [];
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
              Unleashing the power of software through a comprehensive digital
              transformation.
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
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
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
          <div className="flex gap-4">
            {socialLinks.map((social: { id: string; platform: string; icon: string; url: string; color: string }) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.platform} page`}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#6EBE45] flex items-center justify-center transition-colors"
              >
                <DynamicIcon name={social.icon} className="w-4 h-4 text-gray-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
