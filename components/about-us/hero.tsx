"use client";
import Image from "next/image";
import { ReactNode } from "react";

interface HeroProps {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  highlightedTitle?: string;
  tagline: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
  children?: ReactNode;
  accentColor?: string;
  showDecorations?: boolean;
  showScrollIndicator?: boolean;
}

export function Hero({
  backgroundImage,
  backgroundAlt,
  title,
  highlightedTitle,
  tagline,
  breadcrumbs,
  children,
  accentColor = "#6EBE45",
  showDecorations = true,
  showScrollIndicator = true,
}: HeroProps) {
  const highlightIndex = title.indexOf(highlightedTitle || "");
  const titleParts = highlightedTitle
    ? [
        title.substring(0, highlightIndex),
        title.substring(
          highlightIndex,
          highlightIndex + highlightedTitle.length
        ),
        title.substring(highlightIndex + highlightedTitle.length),
      ]
    : [title];

  return (
    <section className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Dual Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Green overlay with varying opacity */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{ backgroundColor: accentColor }}
        />
        {/* Optional gradient overlay for smooth transition */}
        <div
          className="absolute inset-0 bg-gradient-to-r via-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${accentColor}20, transparent, ${accentColor}20)`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-1 z-10"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1 z-10"
        style={{ backgroundColor: accentColor }}
      />

      {/* Animated floating elements */}
      {showDecorations && (
        <>
          <div
            className="absolute top-10 left-10 w-20 h-20 border-2 rounded-full animate-pulse"
            style={{ borderColor: `${accentColor}30` }}
          />
          <div
            className="absolute bottom-10 right-10 w-16 h-16 border-2 rounded-full animate-pulse delay-1000"
            style={{ borderColor: `${accentColor}30` }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-12 h-12 border-2 rounded-full animate-pulse delay-500"
            style={{ borderColor: `${accentColor}30` }}
          />
        </>
      )}

      <div className="relative z-20 text-center text-white">
        {children || (
          <>
            <div className="mb-6">
              <span
                className="inline-block px-4 py-2 backdrop-blur-sm rounded-full font-semibold border mb-4"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                  borderColor: `${accentColor}30`,
                }}
              >
                {tagline}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              {titleParts.map((part, index) => (
                <span
                  key={index}
                  className={
                    index === 1 && highlightedTitle ? "drop-shadow-lg" : ""
                  }
                  style={{
                    color:
                      index === 1 && highlightedTitle ? accentColor : "inherit",
                  }}
                >
                  {part}
                </span>
              ))}
            </h1>

            <div className="flex items-center justify-center gap-3 text-lg font-medium">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.label} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      className="text-[#6EBE45]"
                      style={{ color: accentColor }}
                    >
                      /
                    </span>
                  )}
                  <span
                    className={
                      crumb.isActive
                        ? "font-semibold"
                        : "text-white/90 hover-opacity-80 transition-colors duration-300"
                    }
                    style={{
                      color: crumb.isActive ? accentColor : "inherit",
                      cursor: crumb.href ? "pointer" : "default",
                    }}
                    onClick={() =>
                      crumb.href && (window.location.href = crumb.href)
                    }
                  >
                    {crumb.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle accent line */}
            <div
              className="mt-8 w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: `${accentColor}70` }}
          >
            <div
              className="w-1 h-3 rounded-full mt-2 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
