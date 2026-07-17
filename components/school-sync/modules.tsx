"use client";

import { ArrowRight, Users, CreditCard, MessageSquare, Bell, BarChart2, FileText, Shield, Settings } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    icon: Users,
    name: "Student Enrollment Management",
    description: "Organize and manage student admissions with structured workflows.",
    benefits: [
      "Centralized student record database",
      "Automated admission workflows",
      "Class placement and section assignment",
      "Student status tracking",
      "Quick enrollment lookup",
    ],
  },
  {
    icon: CreditCard,
    name: "School Fees Management",
    description: "Track fees collection and improve your school's financial visibility.",
    benefits: [
      "Fee structure management",
      "Payment tracking and reconciliation",
      "Outstanding balance visibility",
      "Multiple payment method support",
      "Financial reporting and analytics",
    ],
  },
  {
    icon: MessageSquare,
    name: "Bulk SMS Communication",
    description: "Send instant messages to parents, guardians, and staff at scale.",
    benefits: [
      "Quick message to large groups",
      "Message templates for efficiency",
      "Delivery confirmation",
      "Archive and reporting",
      "Scheduled messages",
    ],
  },
  {
    icon: Bell,
    name: "School Fees Reminders",
    description: "Reduce late payments with automated, targeted reminder workflows.",
    benefits: [
      "Automated reminder scheduling",
      "Targeted to outstanding balances",
      "Customizable reminder messages",
      "Payment tracking integration",
      "Escalation workflows",
    ],
  },
  {
    icon: BarChart2,
    name: "Marks Entry & Management",
    description: "Simplify marks capture, review, and management by subject and term.",
    benefits: [
      "Structured marks entry by subject",
      "Real-time grading workflows",
      "Assessment data review",
      "Term and session management",
      "Performance analytics",
    ],
  },
  {
    icon: FileText,
    name: "Report Card Generation",
    description: "Create professional report cards quickly with automated generation.",
    benefits: [
      "Template-based report generation",
      "Bulk report card production",
      "Customizable report formats",
      "Parent-ready output",
      "Digital and print-ready versions",
    ],
  },
  {
    icon: Shield,
    name: "User Access & Control",
    description: "Configure who has access to what with role-based permissions.",
    benefits: [
      "Role-based access control (RBAC)",
      "Custom permission configurations",
      "Audit trail of system changes",
      "Data privacy controls",
      "Multi-level approval workflows",
    ],
  },
  {
    icon: Settings,
    name: "School Administration",
    description: "Configure your school structure and operational settings.",
    benefits: [
      "School setup and configuration",
      "Class and section management",
      "Term and session scheduling",
      "Staff and user management",
      "System preferences and branding",
    ],
  },
];

export function SchoolSyncModules() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-[#6EBE45]/10 text-[#6EBE45] font-semibold rounded-full mb-4 text-sm">Platform Capabilities</span>
          <h2 className="text-4xl font-bold text-[#212529] mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Eight comprehensive modules designed to handle every aspect of school operations in one unified platform.</p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {modules.map((mod) => (
            <div key={mod.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6EBE45]/30 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6EBE45]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#6EBE45] transition-colors">
                  <mod.icon className="w-6 h-6 text-[#6EBE45] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-[#212529] text-lg">{mod.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{mod.description}</p>
                </div>
              </div>
              <div className="pl-16 space-y-1.5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Benefits</p>
                {mod.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-[#6EBE45] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights — removed */}

        <div className="text-center bg-white rounded-2xl p-10 border border-[#6EBE45]/20 shadow-sm">
          <h3 className="text-2xl font-bold text-[#212529] mb-3">See Every Feature in Action</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Walk through each module with our team and see exactly how School Sync fits your school&apos;s workflows.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://schoolsync.ac" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#6EBE45] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5a9e3a] transition-colors">
              Book a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="https://schoolsync.ac" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#6EBE45] text-[#6EBE45] px-8 py-3 rounded-full font-semibold hover:bg-[#6EBE45] hover:text-white transition-colors">
              Visit schoolsync.ac
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 mt-8 border-t border-gray-200">
          <span className="text-[#714B67] font-semibold text-lg italic mb-6 md:mb-0">Imagine managing your school without School Sync</span>
          <Link href="https://schoolsync.ac" target="_blank" rel="noopener noreferrer"
            className="flex items-center text-[#007A7E] font-bold text-xl hover:underline group">
            Explore All Features <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
