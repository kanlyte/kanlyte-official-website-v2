"use client";

import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel, CarouselContent, CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { usePartners } from "@/content-manager/hooks/usePartners";

const FALLBACK_PARTNERS = [
  { id: "1", name: "Tuchi Online Shop", logo: "/logos/tuchi-shop.png" },
  { id: "2", name: "Lira University - The Beacon", logo: "/logos/lira-uni.png" },
  { id: "3", name: "You Screen Uganda", logo: "/logos/youscreen.png" },
  { id: "4", name: "Thermosnoop Uganda", logo: "/logos/thermosnoop.png" },
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
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4 md:-ml-8 items-center">
              {[...partners, ...partners].map((partner: { id: string; name: string; logo: string }, index: number) => (
                <CarouselItem
                  key={`${partner.id}-${index}`}
                  className="pl-4 md:pl-8 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative aspect-square w-full max-w-[240px] mx-auto transition-transform duration-300 hover:scale-105 cursor-pointer">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TooltipProvider>
      </div>
    </section>
  );
}
