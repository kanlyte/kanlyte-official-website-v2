"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Hero } from "@/components/about-us/hero";
import { useGalleryImages } from "@/content-manager/hooks/useGalleryImages";
import { Button } from "@/components/ui/button";

const IMAGES_PER_PAGE = 12;

export default function GalleryPage() {
  const { data: images = [], isLoading } = useGalleryImages(true);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(images.length / IMAGES_PER_PAGE));
  const visibleImages = images.slice((page - 1) * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

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
          <>
            <div className="columns-2 gap-4 space-y-4 md:columns-3">
            {visibleImages.map((img: { id: string; title: string; image: string; category?: string }) => (
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

            {totalPages > 1 && (
              <nav className="mt-14 flex flex-col items-center gap-4" aria-label="Gallery pagination">
                <p className="text-sm text-muted-foreground">
                  Showing {(page - 1) * IMAGES_PER_PAGE + 1}–{Math.min(page * IMAGES_PER_PAGE, images.length)} of {images.length} images
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    aria-label="Previous gallery page"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === page ? "default" : "outline"}
                      size="icon"
                      className={pageNumber === page ? "bg-[#6EBE45] hover:bg-[#5a9e3a]" : ""}
                      onClick={() => setPage(pageNumber)}
                      aria-label={`Gallery page ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                    >
                      {pageNumber}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    aria-label="Next gallery page"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}
