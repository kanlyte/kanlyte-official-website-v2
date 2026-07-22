"use client";

import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { usePartners } from "@/content-manager/hooks/usePartners";

const FALLBACK_PARTNERS = [
  { id: "1", name: "Lira University", logo: "/logos/lira-uni.png" },
  { id: "2", name: "Thermosnoop", logo: "/logos/thermosnoop.png" },
  { id: "3", name: "Oyster Productions", logo: "" },
  { id: "4", name: "Base Volt and Wak Innovations", logo: "" },
  { id: "5", name: "Buggade Sacco", logo: "" },
];

export function PartnersSlider() {
  const { data: dbPartners } = usePartners(true);
  const partners = dbPartners?.length ? dbPartners : FALLBACK_PARTNERS;

  return (
    <section className="py-16 bg-white text-center">
      <div className="container px-4">
        <h2 className="text-[#6EBE45] font-bold text-lg mb-4 tracking-wide">
          OUR PARTNERS AND BENEFACTORS
        </h2>
        <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed mb-12">
          We are proud to collaborate with esteemed partners who share our
          vision for innovation and excellence.
          <br />
          <span className="font-semibold block mt-2 text-gray-700">
            Together We Shape The Future
          </span>
        </p>

        <TooltipProvider delayDuration={0}>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-8 md:gap-16">
              {[...partners, ...partners].map((partner: { id: string; name: string; logo: string }, index: number) => (
                <Tooltip key={`${partner.id}-${index}`}>
                  <TooltipTrigger asChild>
                    <div className="relative h-24 w-40 md:h-28 md:w-48 shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-white border-none text-xs rounded-none py-1 px-3">
                    <p>{partner.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
