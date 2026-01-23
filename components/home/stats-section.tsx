"use client";

const stats = [
  { label: "Happy Customers", value: "10+" },
  { label: "Projects Completed", value: "6+" },
  { label: "Years of Experience", value: "2+" },
  { label: "Team Members", value: "8+" },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      {/* Same margin system as ShowcaseSection */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 p-8 group"
              >
                {/* Internal Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>

                {/* Hover Animation Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div>
            <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
              Results & Analytics
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
              Performance Insights and Analytics Overview
            </h2>

            <div className="space-y-4">
              <p className="text-gray-500 font-medium">
                Trusted by Leading Brands
              </p>

              {/* Brand Logos */}
              <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                {[
                  "Lira University",
                  "Tuchi Shop",
                  "Thermonsnoop",
                  "Oyster",
                  "You Screen",
                ].map((brand) => (
                  <div
                    key={brand}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
