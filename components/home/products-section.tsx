"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/content-manager/hooks/useProducts";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

const FALLBACK_PRODUCTS = [
  { id: "1", title: "Odoo ERP", slug: "odoo", description: "All-in-one business management", icon: "Cpu" },
  { id: "2", title: "School Sync", slug: "school-sync", description: "School management system", icon: "School" },
  { id: "3", title: "Lyte App", slug: "lyte", description: "Hostel & house booking", icon: "Building2" },
];

export function ProductsSection() {
  const { data: dbProducts } = useProducts(true);
  const products = dbProducts?.length ? dbProducts : FALLBACK_PRODUCTS;

  return (
    <section className="py-20 bg-white">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold text-[#0F172A] mb-4">
            Our Products
          </h2>
          <p className="text-[#6EBE45] font-semibold text-xs md:text-sm max-w-2xl mx-auto uppercase">
            Ready-to-use platforms built by Kanlyte to power your business, school, or property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: { id: string; title: string; slug: string; description: string; icon: string }) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md hover:-translate-y-1 hover:border-[#1A569E]/20 border border-transparent">
                <CardContent className="p-8">
                  <div className="w-10 h-10 bg-[#6EBE45] rounded flex items-center justify-center mb-6">
                    <DynamicIcon name={product.icon} className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#6EBE45] mb-3">{product.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">{product.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
