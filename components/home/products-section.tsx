import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

type Product = { id: string; title: string; slug: string; description: string; image?: string | null; icon: string };

const FALLBACK_PRODUCTS: Product[] = [
  { id: "1", title: "Odoo ERP", slug: "odoo", description: "All-in-one business management platform for accounting, inventory, CRM and more.", image: "/images/odoo.png", icon: "Cpu" },
  { id: "2", title: "School Sync", slug: "school-sync", description: "Complete school management system for students, fees, academics and parents.", image: "/images/image3.jpg", icon: "School" },
  { id: "3", title: "Lyte App", slug: "lyte", description: "Find and book verified hostels and rental houses across Uganda.", image: "/images/lyteapp1.jpeg", icon: "Building2" },
];

export function ProductsSection({ products: dbProducts }: { products?: Product[] }) {
  const products = dbProducts?.length ? dbProducts : FALLBACK_PRODUCTS;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-1.5 mb-4">
            {/* <span className="w-2 h-2 rounded-full bg-[#6EBE45] animate-pulse" /> */}
            {/* <span className="text-sm font-semibold text-[#6EBE45]">Our Products</span> */}
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Our <span className="text-[#6EBE45]">Products</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            Ready-to-use platforms built by Kanlyte to power your business, school, or property.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#6EBE45]/20 to-[#4A9E2E]/10 flex items-center justify-center">
                    <DynamicIcon name={product.icon} className="w-16 h-16 text-[#6EBE45]/40" />
                  </div>
                )}
                {/* Green overlay on hover */}
                <div className="absolute inset-0 bg-[#6EBE45]/0 group-hover:bg-[#6EBE45]/10 transition-colors duration-300" />
                {/* Icon badge */}
                <div className="absolute top-3 left-3 w-9 h-9 bg-white rounded-xl shadow flex items-center justify-center">
                  <DynamicIcon name={product.icon} className="w-4 h-4 text-[#6EBE45]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#6EBE45] transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{product.description}</p>
                <div className="flex items-center gap-1 text-[#6EBE45] text-sm font-semibold mt-2">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 w-0 bg-[#6EBE45] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
