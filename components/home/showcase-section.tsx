"use client";

import { motion } from "framer-motion";
import {
  Play,
  Layers,
  Globe,
  Smartphone,
  Database,
  ShoppingCart,
  BookOpen,
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Full-Stack Web Development",
    description:
      "Modern, scalable web applications using Next.js, React, TypeScript, and Node.js. From dynamic websites to complex enterprise platforms.",
    features: [
      "Responsive Design",
      "API Integration",
      "Performance Optimization",
    ],
    color: "blue",
    projects: ["Corporate Websites", "Web Applications", "Admin Dashboards"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications using React Native for iOS and Android. Native-like performance with shared codebase.",
    features: ["iOS & Android", "Push Notifications", "Offline Capabilities"],
    color: "purple",
    projects: ["Business Apps", "E-commerce Apps", "Social Platforms"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Complete online store development with secure payment gateways, inventory management, and customer relationship tools.",
    features: ["Payment Integration", "Inventory Tracking", "Order Management"],
    color: "green",
    projects: ["Online Stores", "Marketplaces", "Booking Systems"],
  },
  {
    icon: Database,
    title: "Custom Business Software",
    description:
      "Tailored software solutions for inventory management, CRM systems, booking portals, and medical practice management.",
    features: ["Custom Workflows", "Data Analytics", "Multi-user Access"],
    color: "orange",
    projects: ["Inventory Systems", "Medical Software", "Booking Portals"],
  },
  {
    icon: BookOpen,
    title: "Tech Education & Training",
    description:
      "Comprehensive coding bootcamps and workshops that transform beginners into job-ready developers in 3-6 months.",
    features: [
      "Live Coding Sessions",
      "Project-Based Learning",
      "Career Support",
    ],
    color: "pink",
    projects: ["Bootcamps", "Corporate Training", "Workshops"],
  },
  {
    icon: Globe,
    title: "Digital Strategy & Consulting",
    description:
      "Strategic planning and consulting to help businesses leverage technology for growth, efficiency, and competitive advantage.",
    features: ["Tech Audits", "Digital Roadmaps", "Implementation Planning"],
    color: "cyan",
    projects: [
      "Digital Transformation",
      "Tech Stack Selection",
      "Process Automation",
    ],
  },
];

export function ShowcaseSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Increased margin from screen edges */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Our Services
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See How We Can Help Your Brand
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            We provide end-to-end digital solutions that help businesses grow,
            innovate, and succeed in the digital world.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-gray-50 to-gray-100 aspect-video flex items-center justify-center group">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

            {/* Internal Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Animated border */}
            <div className="absolute inset-0 border-2 border-transparent rounded-2xl animate-border-spin">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-6 w-6 text-white fill-white ml-0.5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white/80">
                  Watch Our Story
                </div>
                <div className="font-bold">See How We Work</div>
              </div>
            </motion.button>

            {/* Video stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-white">2:45 min</span>
              </div>
              <div className="text-white/70 text-sm">
                Client Success Story • Case Study
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid - 2x3 layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500`}
              />

              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                {/* Internal Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Color accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${service.color}-50 to-white border border-${service.color}-100 flex items-center justify-center mb-6`}
                  >
                    <service.icon
                      className={`h-7 w-7 text-${service.color}-600`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="pt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-xs font-medium bg-${service.color}-50 text-${service.color}-700 rounded-full border border-${service.color}-100`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Project types */}
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-500 mb-2">
                          TYPICAL PROJECTS:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.projects.map((project, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Digital Presence?
            </h3>
            <p className="text-gray-600 mb-8">
              Join 50+ businesses that trust us with their digital
              transformation. Let&apos;s build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
                Start Your Project
              </button>
              <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Book a Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
