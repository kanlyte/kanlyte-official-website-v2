"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const FALLBACK_SLIDES = [
  {
    id: "1",
    image: "/images/image4.png",
    title: "Odoo ERP",
    subtitle: "All-in-One Business Management",
    description: "Streamline your operations with a fully integrated ERP solution",
    buttonText: "Explore Odoo",
    buttonLink: "/products/odoo",
  },
  {
    id: "2",
    image: "/images/image3.jpg",
    title: "School Sync",
    subtitle: "Smart School Management",
    description: "Manage students, fees, academics and administration in one place",
    buttonText: "Discover School Sync",
    buttonLink: "/products/school-sync",
  },
  {
    id: "3",
    image: "/images/image1.jpg",
    title: "Lyte App",
    subtitle: "Hostel & House Booking",
    description: "Find and book accommodation with ease — built for Africa",
    buttonText: "Explore Lyte",
    buttonLink: "/products/lyte",
  },
  {
    id: "4",
    image: "/images/image2.jpg",
    title: "Software Development",
    subtitle: "Custom Solutions for Your Business",
    description: "From web apps to enterprise systems — built with modern technologies",
    buttonText: "View Our Services",
    buttonLink: "/services/software-development",
  },
];

export default function HeroSlider({ slides: dbSlides }: { slides?: typeof FALLBACK_SLIDES }) {
  const slides = dbSlides?.length ? dbSlides : FALLBACK_SLIDES;
  const total = slides.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const safeIndex = Math.min(currentSlide, total - 1);

  const nextSlide = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev >= total - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  const prevSlide = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev <= 0 ? total - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === safeIndex || total <= 1) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, safeIndex, total]
  );

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prevSlide(); }
      if (e.key === "ArrowRight") { e.preventDefault(); nextSlide(); }
      if (e.key === " ") { e.preventDefault(); setIsAutoPlaying((prev) => !prev); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  const slide = slides[safeIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={safeIndex === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#6EBE45]/30 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6"
              >
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                </div>

                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>

                <div className="overflow-hidden pt-2 md:pt-4">
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-xl md:text-2xl lg:text-3xl text-white/95 font-light tracking-wide"
                  >
                    {slide.description}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-6 md:pt-8"
                >
                  <Link href={slide.buttonLink} className="inline-block">
                    <button
                      className="px-6 md:px-8 py-3 md:py-4 bg-[#6EBE45] text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-[#5AB22E] hover:shadow-lg hover:shadow-[#6EBE45]/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                      aria-label={`${slide.buttonText} about ${slide.title}`}
                    >
                      <span className="flex items-center gap-2">
                        {slide.buttonText}
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls — hidden when only 1 slide */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 backdrop-blur-sm bg-black/20 rounded-full px-3 py-2 border border-white/10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6EBE45]"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4 md:h-5 md:w-5 text-white" />
              ) : (
                <Play className="h-4 w-4 md:h-5 md:w-5 text-white" />
              )}
            </button>

            <div className="flex items-center gap-2 md:gap-3">
              {slides.map((_: unknown, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                  disabled={isAnimating}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === safeIndex
                        ? "bg-[#6EBE45] shadow-[0_0_8px_rgba(110,190,69,0.8)]"
                        : "bg-white/50 hover:bg-white/70"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Arrows — hidden on mobile and when only 1 slide */}
      {total > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-[#6EBE45] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-[#6EBE45] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Progress bar — hidden when only 1 slide */}
      {total > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 hidden md:block">
          {isAutoPlaying && (
            <motion.div
              key={safeIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#6EBE45] to-[#4A9E2E]"
            />
          )}
        </div>
      )}

      {/* Slide counter — hidden when only 1 slide */}
      {total > 1 && (
        <div className="absolute top-8 right-8 z-20 hidden md:block">
          <div className="backdrop-blur-sm bg-black/30 rounded-xl px-3 py-1.5 border border-white/10">
            <div className="text-white font-medium text-sm">
              <span className="text-[#A5E68A]">{safeIndex + 1}</span>
              <span className="text-white/60"> / {total}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
