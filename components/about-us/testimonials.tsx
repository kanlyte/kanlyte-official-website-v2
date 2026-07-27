"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTestimonials } from "@/content-manager/hooks/useTestimonials";

const FALLBACK_TESTIMONIALS = [
  {
    id: "1",
    name: "Opolot Nelson",
    location: "Kampala, Uganda",
    text: "Working with this IT team was a game changer for our e-commerce business. The infrastructure they built is top-notch, and it performs even better under high traffic than we expected. The support team was incredibly helpful throughout the entire process.",
    image: "/team-images/gaston.jpg",
  },
  {
    id: "2",
    name: "Aggi John",
    location: "Soroti, Uganda",
    text: "Their cloud migration strategy saved us thousands in monthly overhead. The transition was seamless, and the performance gains were immediate. They truly understand modern digital needs.",
    image: "/team-images/aggi.jpg",
  },
];

type Testimonial = { id: string; name: string; location: string; text: string; image: string };

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { data: dbTestimonials } = useTestimonials(true);
  const testimonials: Testimonial[] = dbTestimonials?.length ? dbTestimonials : FALLBACK_TESTIMONIALS;
  const total = testimonials.length;
  const safe = Math.min(current, total - 1);
  const active = testimonials[safe];

  useEffect(() => {
    if (current >= total) setCurrent(0);
  }, [current, total]);

  const next = () => setCurrent((previous) => (previous + 1) % total);
  const previous = () => setCurrent((value) => (value - 1 + total) % total);

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#f7faf5] px-5 py-12 md:px-10 md:py-16 lg:px-14">
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#6EBE45]/10 blur-3xl" />

      <div className="relative mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#6EBE45]">Client stories</p>
          <h2 className="text-3xl font-bold leading-tight text-[#212529] md:text-5xl">
            Trusted by the people <span className="text-[#6EBE45]">we build for.</span>
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-gray-600">
            Real feedback from clients who trusted Kanlyte to turn their ideas and operational needs into dependable digital solutions.
          </p>
        </div>

        {total > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={previous}
              className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-[#6EBE45] hover:text-[#6EBE45]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              className="flex size-11 items-center justify-center rounded-full bg-[#6EBE45] text-white shadow-sm transition-all hover:bg-[#5a9e3a]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#6EBE45]/15 bg-white shadow-xl shadow-slate-900/5">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid min-h-[360px] lg:grid-cols-[340px_1fr]"
          >
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#212529] p-8 text-white md:p-10">
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#6EBE45]/20" />
              <Quote className="size-12 text-[#6EBE45]" fill="currentColor" />

              <div className="relative mt-12">
                <div className="mb-5 size-20 overflow-hidden rounded-2xl border-2 border-[#6EBE45] bg-white shadow-lg">
                  <Image
                    src={active.image || "/placeholder.svg"}
                    alt={active.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{active.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="size-4 text-[#6EBE45]" /> {active.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="mb-7 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-5 fill-[#f5b942] text-[#f5b942]" />
                ))}
              </div>
              <blockquote className="max-w-3xl text-xl font-medium leading-relaxed text-gray-700 md:text-2xl md:leading-relaxed">
                &ldquo;{active.text}&rdquo;
              </blockquote>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#6EBE45]">Verified client feedback</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${index === safe ? "w-8 bg-[#6EBE45]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === safe ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
