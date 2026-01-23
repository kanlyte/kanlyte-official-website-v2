"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Award,
  Clock,
  Laptop,
  GraduationCap,
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Expert Team",
    description:
      "Dedicated professionals with expertise in cutting-edge web and mobile development, trained through our own coding school.",
  },
  {
    icon: Target,
    title: "Client-Centric Approach",
    description:
      "Tailoring solutions to meet your unique business needs, from e-commerce to inventory management systems.",
  },
  {
    icon: Award,
    title: "Proven Experience",
    description:
      "Successfully delivering impactful digital solutions across diverse industries in Uganda and beyond.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "Meeting deadlines consistently with our efficient development processes and skilled team.",
  },
  {
    icon: Laptop,
    title: "Fullstack Solutions",
    description:
      "Ensuring seamless performance across all devices with our expertise in both web and mobile technologies.",
  },
  {
    icon: GraduationCap,
    title: "Education Integration",
    description:
      "Unique blend of professional services and tech education, constantly evolving our skills and nurturing new talent.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background diagonal lines */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="absolute top-1/4 left-1/4 h-64 w-px bg-green-500/20 rotate-45"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="absolute top-1/4 right-1/4 h-64 w-px bg-green-500/20 -rotate-45"
      />

      {/* Same margin system for consistency */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
            Why Us
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Why Desishub Stands Out
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600">
            Discover why Desishub excels in delivering innovative,
            client-focused web and mobile solutions in Uganda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/5"
            >
              {/* Internal Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />

              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <reason.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-600">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
