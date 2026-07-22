"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useHeroSlides } from "@/content-manager/hooks/useHeroSlides";

const FALLBACK_SLIDES = [
  {
    id: "1",
    image: "/images/image1.jpg",
    title: "Empowering",
    subtitle: "Technology in Healthcare",
    description: "To Love and Serve",
    buttonText: "For more info",
    buttonLink: "/contact-us",
  },
  {
    id: "2",
    image: "/images/image2.jpg",
    title: "Digital Transformation",
    subtitle: "Technology in Healthcare",
    description: "To Love and Serve",
    buttonText: "For more info",
    buttonLink: "/contact-us",
  },
  {
    id: "3",
    image: "/images/image3.jpg",
    title: "Tech Education",
    subtitle: "For Future Innovators",
    description: "Building Africa's Next Tech Leaders",
    buttonText: "View Our School System",
    buttonLink: "/school-systems",
  },
  {
    id: "4",
    image: "/images/image4.png",
    title: "Software & systems Developments",
    subtitle: "Tailored to Your Needs",
    description: "Perfectly Digital",
    buttonText: "Explore Our Services",
    buttonLink: "/odoo",
  },
];

export default function HeroSlider() {
  const { data: dbSlides } = useHeroSlides(true);
  const slides = dbSlides?.length ? dbSlides : FALLBACK_SLIDES;
  const total = slides.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Always clamp so we never access an out-of-bounds index
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

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const preloadImages = slides.map((slide: { image: string }) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => resolve();
        img.onerror = () => { console.warn(`Failed to load image: ${slide.image}`); resolve(); };
      })
    );
    Promise.all(preloadImages).then(() => { if (isMounted) setIsLoaded(true); });
    return () => { isMounted = false; };
  }, []);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying || !isLoaded || total <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoaded, nextSlide]);

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
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-3 border-gray-300 border-t-[#6EBE45] animate-spin mx-auto mb-4" />
            <div className="text-gray-600 font-medium">Loading...</div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {isLoaded && (
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
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="absolute inset-0 bg-black/10" />
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
        )}
      </AnimatePresence>

      {/* Bottom controls — hidden when only 1 slide */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 backdrop-blur-sm bg-black/20 rounded-full px-3 py-2 border border-white/10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6EBE45]"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
              disabled={!isLoaded}
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
                  disabled={isAnimating || !isLoaded}
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
            disabled={isAnimating || !isLoaded}
          >
            <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group focus:outline-none focus:ring-2 focus:ring-[#6EBE45] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
            disabled={isAnimating || !isLoaded}
          >
            <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Progress bar — hidden when only 1 slide */}
      {total > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 hidden md:block">
          {isAutoPlaying && isLoaded && (
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
