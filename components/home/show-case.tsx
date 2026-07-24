import Image from "next/image";
import { Check } from "lucide-react";

export function ExperienceShowcase() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* Same margin system for consistency */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Collage Side */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-start-1 col-end-9 relative aspect-square rounded-3xl overflow-hidden shadow-xl z-0">
                <Image
                  src="/images/about-04.jpg"
                  alt="Innovation showcase"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-start-5 col-end-13 -mt-32 relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-background z-10">
                <Image
                  src="/images/about-05.jpg"
                  alt="Digital solutions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-12 left-0 z-20 bg-[#22C55E] p-8 rounded-3xl shadow-2xl text-white min-w-[200px]">
              <div className="text-5xl font-extrabold mb-1">2+</div>
              <div className="text-sm font-medium opacity-90">
                Years of experience
              </div>
            </div>

            {/* Decorative Swirl - approximated with SVG */}
            <svg
              className="absolute top-0 right-0 w-32 h-32 text-primary opacity-50 -translate-y-1/2 translate-x-1/2"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10,50 Q30,10 50,50 T90,50" />
            </svg>
          </div>

          {/* Right Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Discover A Wider{" "}
                <span className="text-muted-foreground/60">World Of</span>{" "}
                Innovation
              </h2>
              <p className="text-xl font-bold text-primary">
                Kanlyte Uganda Limited provides you with innovative solutions to
                all your needs and challenges.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;ve streamlined our plans to give you the most reliable
                innovative I.T solutions at affordable prices.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Our Hands-on Trainings",
                "Fast Support 24*7",
                "Affordable Prices",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
