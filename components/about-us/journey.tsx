"use client";

import Image from "next/image";
import { useMilestones } from "@/content-manager/hooks/useMilestones";

const FALLBACK_MILESTONES = [
  { id: "1", title: "Our Founding & Vision", description: "Kanlyte Uganda Limited was founded with a clear vision: to unleash the power of software through comprehensive digital transformation. Incorporated in Uganda and registered by the Uganda Registration Bureau of Standards (URSB), we began our journey committed to delivering innovative solutions while empowering communities through technology.", year: "2022", image: "/team-images/team-1.jpg", imageAlt: "Kanlyte office establishment and founding team", order: 0 },
  { id: "2", title: "Service Portfolio Expansion", description: "We rapidly expanded our services to include software & systems design, mobile app development, website design, UI/UX design, graphics design, domain registry, professional emails, and web hosting. Our commitment to integrity, honesty, reliability, timeliness, quality, and affordability established us across public, private, NGO, startup, and individual sectors.", year: "2023", image: "/images/beacon.jpg", imageAlt: "Kanlyte team working on diverse projects and services", order: 1 },
  { id: "3", title: "Technological Advancements", description: "Embracing cutting-edge technologies, we introduced cloud computing, Artificial Intelligence, data analytics, virtualization, automations, and Internet of Things solutions. Our ICT training and skilling programs began empowering digital professionals, while our ERP partnerships with Odoo and Moodle expanded our enterprise capabilities.", year: "2024-2025", image: "/images/odoo-team.jpg", imageAlt: "Kanlyte technology stack and innovation center", order: 2 },
  { id: "4", title: "Digital Infrastructure Growth", description: "We established comprehensive cloud services including data backup, project management tools, and automated business services. Our expertise expanded to network installation, security systems, smart devices, time and attendance systems, and business automation - providing integrated solutions for residential and commercial environments.", year: "2025", image: "/images/lyteapp1.jpeg", imageAlt: "Kanlyte digital infrastructure and network setup", order: 3 },
  { id: "5", title: "Future Vision & Impact", description: "Looking ahead, Kanlyte continues its mission of empowering individuals and communities through software. With applications like Iyte app and GET IT ON in production, we're committed to achieving 90% client retention, engaging in community outreach, and impacting the younger generation.", year: "2025+", image: "/images/aaa.jpg", imageAlt: "Kanlyte team planning future projects and innovations", order: 4 },
];

export function Journey() {
  const { data: dbMilestones } = useMilestones();
  const milestones = dbMilestones?.length ? dbMilestones : FALLBACK_MILESTONES;

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50/30">
      <div className="text-center mb-24 px-4">
        <p className="text-[#6EBE45] uppercase tracking-widest text-sm font-semibold mb-3">
          Kanlyte&apos;s Timeline
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Journey Through <span className="text-[#6EBE45]">Time</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          From our founding to future aspirations - tracing Kanlyte&apos;s evolution as a pioneering force in Uganda&apos;s digital transformation landscape.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#6EBE45]/20 via-[#6EBE45]/40 to-[#6EBE45]/20 hidden md:block" />

        {milestones.map((item: { id: string; title: string; description: string; year: string; image: string; imageAlt: string }, index: number) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12 md:mb-[-12px] relative z-10 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex">
              <div className="w-16 h-16 bg-white rounded-full border-4 border-[#6EBE45] flex items-center justify-center shadow-lg">
                <span className="text-[#6EBE45] font-bold text-sm">{item.year}</span>
              </div>
            </div>

            <div className="md:hidden w-full text-center mb-4">
              <div className="inline-block px-4 py-2 bg-[#6EBE45]/10 rounded-full border border-[#6EBE45]/20">
                <span className="text-[#6EBE45] font-bold text-sm">{item.year}</span>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 flex justify-center">
              <div className={`relative p-2 border-[12px] border-[#6EBE45]/20 bg-white w-full max-w-[500px] aspect-[1.2/1] ${index % 2 === 0 ? "rounded-l-[1000px] border-r-0 rounded-r-none" : "rounded-r-[1000px] border-l-0 rounded-l-none"}`}>
                <div className={`w-full h-full overflow-hidden ${index % 2 === 0 ? "rounded-l-[950px]" : "rounded-r-[950px]"}`}>
                  <div className="relative w-full h-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#6EBE45]/20 mix-blend-overlay" />
                  </div>
                </div>
                <div className={`absolute ${index % 2 === 0 ? "left-6" : "right-6"} top-6 bg-[#6EBE45] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg`}>
                  {item.year}
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 flex flex-col justify-center space-y-5 py-12 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-0.5 bg-[#6EBE45]" />
                <span className="text-sm font-semibold text-[#6EBE45] uppercase tracking-wide">Milestone {index + 1}</span>
                <div className="w-10 h-0.5 bg-[#6EBE45]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{item.description}</p>
              <div className="md:hidden mt-6">
                <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-[#6EBE45]/20">
                  <Image src={item.image || "/placeholder.svg"} alt={item.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[#6EBE45]/10" />
                </div>
              </div>
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6EBE45]/10 rounded-lg border border-[#6EBE45]/20">
                  <div className="w-2 h-2 bg-[#6EBE45] rounded-full animate-pulse" />
                  <span className="text-[#6EBE45] font-medium text-sm">Year: {item.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-20 px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Visual Timeline Summary</h3>
            <p className="text-gray-600">Key moments in Kanlyte&apos;s journey captured through our work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.slice(0, 3).map((item: { id: string; title: string; image: string; imageAlt: string; year: string }, index: number) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 border-2 border-[#6EBE45]/10">
                  <Image src={item.image || "/placeholder.svg"} alt={item.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-semibold">{item.year}</div>
                    <div className="text-xs opacity-90">{item.title.split("&")[0].trim()}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-center">{item.title.split("&")[0].trim()}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
