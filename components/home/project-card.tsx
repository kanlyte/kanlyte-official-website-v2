import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  viewDetailsHref?: string;
  previewHref?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  viewDetailsHref = "#",
  previewHref = "#",
}: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
      {/* Image Container */}
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`Project screenshot: ${title}`}
          width={400}
          height={250}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-none bg-secondary/50 text-muted-foreground font-medium hover:bg-secondary"
            >
              {tag}
            </Badge>
          ))}

          {tags.length > 3 && (
            <Badge
              variant="secondary"
              className="border-none bg-secondary/50 text-muted-foreground font-medium"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={viewDetailsHref}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {previewHref !== "#" && (
            <Link
              href={previewHref}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Live preview of ${title}`}
            >
              Preview
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
