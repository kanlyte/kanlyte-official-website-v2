import Link from "next/link";
import { ArrowRight, Code2, Cloud, GraduationCap, Lightbulb } from "lucide-react";

const OFFERINGS = [
  { label: "Software & App Development", icon: Code2 },
  { label: "Web & Cloud Services", icon: Cloud },
  { label: "ICT Training & Consultancy", icon: GraduationCap },
  { label: "Research & Innovation", icon: Lightbulb },
];

export function AboutKanlyteSection() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
              About Kanlyte Uganda
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
              Perfectly Digital, Purposefully Built
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Kanlyte Uganda Limited is a technology company delivering
              custom software, web and cloud solutions, ICT training, and
              research-driven innovation to organizations across Uganda and
              beyond. We partner with education institutions, NGOs, private
              companies, government bodies, communities, and financial
              institutions to turn technology into practical, lasting impact.
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-[#6EBE45] font-semibold hover:gap-3 transition-all"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {OFFERINGS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#6EBE45] rounded flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
