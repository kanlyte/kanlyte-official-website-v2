"use client";

import { useState } from "react";
import { ChevronRight, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Inventory Management Software",
    subtitle: "Supports Multi-organisation and POS",
    shortDesc: "Multi-Organization Inventory...",
    description:
      "A comprehensive Next.js inventory management solution supporting multiple organizations with point-of-sale integration, real-time stock tracking, and advanced reporting.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "ecommerce",
    featured: true,
    hasPreview: true,
  },
  {
    id: 2,
    title: "Next.js SaaS Starter Kit with Landing Page",
    shortDesc:
      "A complete Next.js SaaS application starter featuring dual user roles, Stripe integration...",
    description:
      "A complete Next.js SaaS application starter featuring dual user roles, Stripe integration, authentication, and a marketing landing page.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "starter",
    featured: false,
    hasPreview: true,
  },
  {
    id: 3,
    title: "Next.js Enterprise Starter Kit with Admin Dashboard",
    shortDesc:
      "A production-ready Next.js enterprise application starter featuring comprehensive...",
    description:
      "A production-ready Next.js enterprise application featuring comprehensive admin dashboard, user management, analytics, and multi-tenant architecture.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "enterprise",
    featured: false,
    hasPreview: true,
  },
  {
    id: 4,
    title: "Bulk SMS & Email Marketing Tool",
    description:
      "A comprehensive Next.js marketing communication system for managing contacts, sending bulk SMS and email campaigns, and tracking marketing performance.",
    tags: ["Next JS", "React", "Node.js", "MongoDB"],
    category: "marketing",
    featured: true,
    hasPreview: false,
  },
  {
    id: 5,
    title: "Logistics Shipment Tracking System with Real-Time Updates",
    description:
      "A Next.js logistics application for creating, managing, and tracking shipments with automated receipt generation and detailed status updates.",
    tags: ["Next JS", "Typescript", "WebSocket", "PostgreSQL"],
    category: "logistics",
    featured: true,
    hasPreview: false,
  },
  {
    id: 6,
    title: "Cargo & Shipment Tracking App",
    description:
      "Mobile-first cargo tracking application with real-time GPS updates and customer notifications.",
    tags: ["React Native", "Firebase", "Node.js"],
    category: "logistics",
    featured: false,
    hasPreview: false,
  },
  {
    id: 7,
    title: "Tours & Travel For Agencies",
    subtitle: "New Dashboard - Admin Dashboard",
    shortDesc: "Google admin Research",
    description:
      "A comprehensive travel agency management system with booking, customer management, and admin dashboard.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "travel",
    featured: true,
    hasPreview: false,
  },
  {
    id: 8,
    title: "Tours and Travel Agency Template",
    description:
      "The Tours and Travel Agency Template is a full-stack, production-ready solution for travel businesses.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "travel",
    featured: false,
    hasPreview: true,
  },
  {
    id: 9,
    title: "Personal Portfolio Template",
    subtitle: "ZERO to PORTFOLIO - 4 IN 1",
    description:
      "The Personal Portfolio Template is a sleek, frontend-only solution designed for creatives and professionals.",
    tags: ["Next JS", "Typescript", "Tailwind", "+1"],
    category: "portfolio",
    featured: false,
    hasPreview: true,
  },
  {
    id: 10,
    title: "Shop Dashboard Pro",
    subtitle: "Google Sheets-Powered Inventory System",
    shortDesc: "Shop Dashboard Pro: Google...",
    description:
      "You will get a complete, ready-to-deploy inventory management solution with secure Google Sheets integration.",
    tags: ["Next JS", "Typescript", "PostgreSQL", "+1"],
    category: "ecommerce",
    featured: false,
    hasPreview: false,
  },
  {
    id: 11,
    title: "Hospital Website with Appointment Booking",
    description:
      "A comprehensive Next.js hospital website solution featuring online appointment booking, department management, and patient portal integration.",
    tags: ["Next JS", "Typescript", "MySQL", "Stripe"],
    category: "healthcare",
    featured: true,
    hasPreview: false,
  },
  {
    id: 12,
    title: "E-learning Platform with LMS",
    description:
      "A complete learning management system with course creation, student tracking, and progress analytics.",
    tags: ["Next JS", "Typescript", "MongoDB", "Stripe"],
    category: "education",
    featured: false,
    hasPreview: true,
  },
];

const categories = [
  "E-commerce",
  "Education",
  "FinTech",
  "Food & Delivery",
  "Gaming",
  "Healthcare",
  "Real Estate",
  "Social Media",
  "Travel & Hospitality",
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) =>
          categories.some(
            (cat) =>
              cat.toLowerCase().includes(selectedCategory.toLowerCase()) &&
              project.category ===
                selectedCategory
                  .toLowerCase()
                  .replace(" & ", "")
                  .replace(" ", "")
          )
        );

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">DESISHUB</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Client Projects
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Featured Projects
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Explore our systems
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Contact Us
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Start Project
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search projects...
              </h2>

              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        category
                          .toLowerCase()
                          .replace(" & ", "")
                          .replace(" ", "")
                      )
                    }
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory ===
                      category.toLowerCase().replace(" & ", "").replace(" ", "")
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Our Client Projects®
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {indexOfFirstProject + 1} –{" "}
                  {Math.min(indexOfLastProject, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
                </p>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-8">
              {currentProjects.map((project) => (
                <div
                  key={project.id}
                  className="border-b border-gray-200 pb-8 last:border-b-0"
                >
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-gray-600 font-medium mt-1">
                          {project.subtitle}
                        </p>
                      )}
                      {project.shortDesc && (
                        <p className="text-gray-500 text-sm mt-1">
                          {project.shortDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                      {project.hasPreview && (
                        <button className="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          Preview
                        </button>
                      )}
                    </div>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Case Study Button for specific projects */}
                  {(project.id === 4 ||
                    project.id === 5 ||
                    project.id === 11) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Case Study
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <div className="text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 border rounded ${
                      currentPage === i + 1
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gray-50 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don&apos;t see the project you&apos;re looking for?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We specialize in creating custom solutions tailored to your
                specific needs. Tell us about your project idea, and our team
                will help bring it to life.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
