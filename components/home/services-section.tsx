"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useServices } from "@/content-manager/hooks/useServices";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

const FALLBACK_SERVICES = [
  { id: "1", title: "Software Development", description: "Custom software solutions tailored to your business needs, built with modern technologies and best practices.", icon: "Code" },
  { id: "2", title: "Odoo ERP Customizations", description: "Extend and customize Odoo ERP to perfectly match your business workflows and requirements.", icon: "Cpu" },
  { id: "3", title: "Web Hosting", description: "Reliable, secure, and high-performance web hosting with 99.9% uptime guarantee and 24/7 support.", icon: "Cloud" },
  { id: "4", title: "Email Hosting", description: "Professional business email hosting with advanced security, spam filtering, and large storage capacity.", icon: "Mail" },
  { id: "5", title: "App Development", description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.", icon: "Smartphone" },
  { id: "6", title: "School Management Systems", description: "Comprehensive school management solutions for student records, fees, academics, and administration.", icon: "School" },
  { id: "7", title: "Website Development", description: "Responsive, modern websites with SEO optimization, fast loading speeds, and excellent user experience.", icon: "Globe" },
];

export function FeaturesGrid() {
  const { data: dbServices } = useServices(true);
  const services = dbServices?.length ? dbServices : FALLBACK_SERVICES;

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold text-[#0F172A] mb-4">
            Our Software Services
          </h2>
          <p className="text-[#6EBE45] font-semibold text-xs md:text-sm max-w-2xl mx-auto uppercase">
            Comprehensive digital solutions tailored to empower your business growth and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: { id: string; title: string; description: string; icon: string }) => (
            <Card
              key={service.id}
              className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md hover:-translate-y-1 hover:border-[#1A569E]/20 border border-transparent"
            >
              <CardContent className="p-8">
                <div className="w-10 h-10 bg-[#6EBE45] rounded flex items-center justify-center mb-6">
                  <DynamicIcon name={service.icon} className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#6EBE45] mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
