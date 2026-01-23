"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";

const apps = [
  { name: "Accounting", icon: "/odoo/icon-acc.svg" },
  { name: "Knowledge", icon: "/odoo/icon-knowledge.svg" },
  { name: "Sign", icon: "/odoo/icon-esign.svg" },
  { name: "CRM", icon: "/odoo/icon-crm.svg" },
  { name: "Studio", icon: "/odoo/icon-studio.svg" },
  { name: "Subscriptions", icon: "/odoo/icon-subs.svg" },
  { name: "Rental", icon: "/odoo/icon-rental.svg" },
  { name: "Point of Sale", icon: "/odoo/icon-pos.svg" },
  { name: "Appraisal", icon: "/odoo/icon-appraisal.svg" },
  { name: "Documents", icon: "/odoo/icon-doc.svg" },
  { name: "Project", icon: "/odoo/icon-project.svg" },
  { name: "Timeoff", icon: "/odoo/icon-timeoff.svg" },
  { name: "Field Service", icon: "/odoo/icon-field.svg" },
  { name: "Planning", icon: "/odoo/icon-planning.svg" },
  { name: "Helpdesk", icon: "/odoo/icon-help-desk.svg" },
  { name: "Website", icon: "/odoo/icon-web.svg" },
  { name: "Social Marketing", icon: "/odoo/icon-social.svg" },
  { name: "Email Marketing", icon: "/odoo/icon-email.svg" },
  { name: "Purchase", icon: "/odoo/icon-purch.svg" },
  { name: "Inventory", icon: "/odoo/icon-inv.svg" },
  { name: "Manufacturing", icon: "/odoo/icon-man.svg" },
  { name: "Sales", icon: "/odoo/icon-sales.svg" },
  { name: "Invoice", icon: "/odoo/icon-invo.svg" },
  { name: "Expenses", icon: "/odoo/icon-expen.svg" },
];

export function AppGrid() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 mb-20">
          {apps.map((app) => (
            <div
              key={app.name}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200">
                <Image
                  src={app.icon || "/placeholder.svg"}
                  alt={app.name}
                  width={60}
                  height={60}
                />
              </div>
              <span className="text-[#212529] font-semibold text-sm">
                {app.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-200">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="relative">
              <Switch className="data-[state=checked]:bg-[#714B67]" />
              <svg
                className="absolute -left-8 -top-8 text-[#00A09D]"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <path
                  d="M10 30L20 10L30 30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-[#714B67] font-semibold text-lg italic">
              Imagine without odoo
            </span>
          </div>

          <button className="flex items-center text-[#007A7E] font-bold text-xl hover:underline group">
            View all Apps{" "}
            <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
