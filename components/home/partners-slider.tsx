import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const FALLBACK_PARTNERS = [
  { id: "1", name: "Lira University", logo: "/logos/lira-uni.png" },
  { id: "2", name: "Thermosnoop", logo: "/logos/thermosnoop.png" },
  { id: "3", name: "Oyster Productions", logo: "" },
  { id: "4", name: "Base Volt and Wak Innovations", logo: "" },
  { id: "5", name: "Buggade Sacco", logo: "" },
];

type Partner = { id: string; name: string; logo: string };

export function PartnersSlider({ partners: dbPartners }: { partners?: Partner[] }) {
  const partners = dbPartners?.length ? dbPartners : FALLBACK_PARTNERS;

  return (
    <section className="py-8 bg-white text-center">
      <div className="container px-4">
        <h2 className="text-[#6EBE45] font-bold text-lg mb-3 tracking-wide">
          OUR CLIENT BASE
        </h2>
        <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed mb-8">
          We are proud to collaborate with esteemed partners who share our
          vision for innovation and excellence.
          <br />
          <span className="font-semibold block mt-2 text-gray-700">
            Together We Shape The Future
          </span>
        </p>

        <TooltipProvider delayDuration={0}>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee gap-6 md:gap-12">
              {[...partners, ...partners].map((partner: { id: string; name: string; logo: string }, index: number) => (
                <Tooltip key={`${partner.id}-${index}`}>
                  <TooltipTrigger asChild>
                    <div className="relative h-40 w-64 md:h-48 md:w-72 shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain p-1"
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
