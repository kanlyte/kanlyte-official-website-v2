"use client";

import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Hero } from "@/components/about-us/hero";
import { useCareers } from "@/content-manager/hooks/useCareers";

export default function CareersPage() {
  const { data: careers = [], isLoading } = useCareers(true);

  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="Careers at Kanlyte"
        title="Careers at Kanlyte"
        highlightedTitle="Kanlyte"
        tagline="Join Our Team"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", isActive: true },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 py-20">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading openings...</p>
        ) : careers.length === 0 ? (
          <p className="text-center text-muted-foreground">
            There are no open positions right now. Check back soon or send us your CV at{" "}
            <a href="mailto:info@kanlyte.com" className="text-[#6EBE45] font-semibold">info@kanlyte.com</a>.
          </p>
        ) : (
          <div className="space-y-6">
            {careers.map((job: { id: string; title: string; department: string; location: string; type: string; description: string; applyEmail: string }) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{job.type}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6EBE45] text-white rounded-full font-semibold text-sm hover:bg-[#5AB22E] transition-colors shrink-0"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
