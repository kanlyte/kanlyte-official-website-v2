import { CloudDownload } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-4 text-center bg-white overflow-hidden">
      {/* Subtle Grid Background for Light Mode */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-green-600/30 px-4 py-1.5 text-xs font-medium text-green-700 bg-green-50/50">
          Download Pricing
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-2xl mx-auto leading-[1.1]">
          You don&apos;t have to break the bank
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          From inventory systems to e-commerce platforms, we deliver custom
          solutions that fit your budget. Explore our affordable packages and
          find the perfect fit for your business growth.
        </p>

        {/* Action Area with surrounding border */}
        <div className="pt-8 flex justify-center">
          <div className="inline-flex items-center p-1.5 rounded-full border border-green-600/20 bg-white shadow-sm">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md active:scale-95">
              <CloudDownload className="w-5 h-5" />
              Download Pricing List
            </button>
            <Link href="/pricing">
              <button className="px-6 py-2.5 text-green-700 font-medium hover:text-green-800 transition-colors">
                See Custom Pricing
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle decorative circles to mimic the screenshot curves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-green-600/5 rounded-[100%] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-green-600/5 rounded-[100%] pointer-events-none" />
    </section>
  );
}
