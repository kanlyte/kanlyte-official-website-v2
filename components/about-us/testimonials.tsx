"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Opolot Nelson",
    location: "Kampala, Uganda",
    text: "Working with this IT team was a game changer for our e-commerce business. The infrastructure they built is top-notch, and it looks even better under high traffic than we ever expected. Plus, the support team was incredibly helpful throughout the entire process. Highly recommend.",
    image: "/team-images/gaston.jpg",
  },
  {
    name: "Aggi John",
    location: "Soroti, Uganda",
    text: "Their cloud migration strategy saved us thousands in monthly overhead. The transition was seamless, and the performance gains were immediate. They truly understand modern digital needs.",
    image: "/team-images/aggi.jpg",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-bold max-w-xl leading-[1.15] text-[#1a1a1a]">
          {"Don't take our word,"}
          <br />
          see what our clients say
        </h2>
        <div className="flex gap-4 pt-4">
          <button
            onClick={prev}
            className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm bg-white"
          >
            <ChevronLeft className="w-6 h-6 text-[#d97706]" />
          </button>
          <button
            onClick={next}
            className="w-16 h-12 rounded-full bg-[#ca8a04] text-white flex items-center justify-center hover:bg-[#b45309] transition-colors shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-[#6EBE45] text-white p-6 md:p-12 flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Image Section */}
            <div className="w-full md:w-[400px] shrink-0 aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={testimonials[current].image || "/placeholder.svg"}
                alt={testimonials[current].name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-8 relative py-4">
              <div className="relative">
                <Star className="w-12 h-12 text-white/10 absolute -top-8 -left-8" />

                <p className="text-xl md:text-2xl font-normal leading-relaxed opacity-90 relative z-10 pr-8">
                  {testimonials[current].text}
                </p>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-2xl font-semibold tracking-tight">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-white font-medium italic mt-1">
                    - {testimonials[current].location}
                  </p>
                </div>

                <Star className="w-16 h-16 text-white/5 absolute -bottom-4 right-12" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
