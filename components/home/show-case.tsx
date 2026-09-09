import Image from "next/image";
import { Check } from "lucide-react";

const FALLBACK = {
  badge: "Innovation Showcase",
  subtitle: "Digital solutions",
  title: "Discover A Wider World Of",
  highlight: "Innovation",
  description:
    "Kanlyte Uganda Limited provides you with innovative solutions to all your needs and challenges. We've streamlined our plans to give you the most reliable innovative I.T solutions at affordable prices.",
  highlights: ["Our Hands-on Trainings", "Fast Support 24*7", "Affordable Prices"],
  image1: "/images/about-04.jpg",
  image2: "/images/about-05.jpg",
};

const FALLBACK_BADGE = { value: "2+", label: "Years of experience" };

type ShowcaseContent = {
  badge?: string | null; subtitle?: string | null; title?: string | null;
  highlight?: string | null; description?: string | null; primaryBtnLabel?: string | null;
  annotationLine1?: string | null; annotationLine2?: string | null;
  secondaryBtnLabel?: string | null; secondaryBtnHref?: string | null;
};

type ShowcaseStat = { label: string; value: string };

export function ExperienceShowcase({
  pageContent: db,
  stats = [],
}: { pageContent?: ShowcaseContent | null; stats?: ShowcaseStat[] }) {

  const badge = stats.find((s) =>
    s.label.toLowerCase().includes("year")
  ) ?? FALLBACK_BADGE;

  // highlights come from primaryBtnLabel, annotationLine1, annotationLine2
  const highlights: string[] = db
    ? [db.primaryBtnLabel, db.annotationLine1, db.annotationLine2].filter((item): item is string => Boolean(item))
    : FALLBACK.highlights;

  function isValidImage(val?: string | null) {
    return !!val && (val.startsWith("/") || val.startsWith("http"));
  }

  const content = {
    badge: db?.badge ?? FALLBACK.badge,
    subtitle: db?.subtitle ?? FALLBACK.subtitle,
    title: db?.title ?? FALLBACK.title,
    highlight: db?.highlight ?? FALLBACK.highlight,
    description: db?.description ?? FALLBACK.description,
    image1: isValidImage(db?.secondaryBtnLabel) ? db!.secondaryBtnLabel! : FALLBACK.image1,
    image2: isValidImage(db?.secondaryBtnHref) ? db!.secondaryBtnHref! : FALLBACK.image2,
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Collage */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-start-1 col-end-9 relative aspect-square rounded-3xl overflow-hidden shadow-xl z-0">
                <Image src={content.image1} alt="Innovation showcase" fill className="object-cover" />
              </div>
              <div className="col-start-5 col-end-13 -mt-32 relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-background z-10">
                <Image src={content.image2} alt="Digital solutions" fill className="object-cover" />
              </div>
            </div>

            {/* Badge — dynamic from Stats */}
            <div className="absolute bottom-12 left-0 z-20 bg-[#22C55E] p-8 rounded-3xl shadow-2xl text-white min-w-[200px]">
              <div className="text-5xl font-extrabold mb-1">{badge.value}</div>
              <div className="text-sm font-medium opacity-90">{badge.label}</div>
            </div>

            <svg
              className="absolute top-0 right-0 w-32 h-32 text-primary opacity-50 -translate-y-1/2 translate-x-1/2"
              viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M10,50 Q30,10 50,50 T90,50" />
            </svg>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-[#6EBE45] uppercase tracking-widest">{content.badge}</p>
              <p className="text-lg font-bold text-muted-foreground">{content.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                {content.title}{" "}
                <span className="text-muted-foreground/60">{content.highlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{content.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item: string, idx: number) => (
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
