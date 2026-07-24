"use client";

import Image from "next/image";
import { Hero } from "@/components/about-us/hero";
import { useGalleryImages } from "@/content-manager/hooks/useGalleryImages";

export default function GalleryPage() {
  const { data: images = [], isLoading } = useGalleryImages(true);

  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="Kanlyte Gallery"
        title="Our Gallery"
        highlightedTitle="Gallery"
        tagline="Moments at Kanlyte"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", isActive: true },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-20">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading gallery...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-muted-foreground">No gallery images yet. Check back soon.</p>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {images.map((img: { id: string; title: string; image: string; category?: string }) => (
              <div key={img.id} className="relative break-inside-avoid rounded-2xl overflow-hidden group">
                <Image
                  src={img.image}
                  alt={img.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold text-sm">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
