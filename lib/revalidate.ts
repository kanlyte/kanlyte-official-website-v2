import { revalidatePath } from "next/cache";

type Resource =
  | "services"
  | "projects"
  | "hero-slides"
  | "news-posts"
  | "partners"
  | "team-members"
  | "products"
  | "testimonials"
  | "milestones"
  | "gallery-images"
  | "odoo-apps"
  | "stats"
  | "faqs"
  | "pricing-plans"
  | "process-steps"
  | "page-content"
  | "page-capabilities"
  | "sectors-we-serve"
  | "careers"
  | "social-links"
  | "contact-info";

const RESOURCE_PATHS: Record<Resource, string[]> = {
  "hero-slides":       ["/"],
  "stats":             ["/"],
  "partners":          ["/", "/about-us"],
  "testimonials":      ["/", "/about-us"],
  "process-steps":     ["/"],
  "faqs":              ["/"],
  "services":          ["/", "/services"],
  "projects":          ["/", "/projects"],
  "news-posts":        ["/", "/news"],
  "team-members":      ["/about-us"],
  "milestones":        ["/about-us"],
  "gallery-images":    ["/gallery"],
  "odoo-apps":         ["/odoo"],
  "pricing-plans":     ["/pricing"],
  "products":          ["/"],
  "page-content":      ["/"],
  "page-capabilities": ["/"],
  "sectors-we-serve":  ["/"],
  "careers":           ["/careers"],
  "social-links":      ["/"],
  "contact-info":      ["/contact-us"],
};

export function revalidateResource(resource: Resource) {
  const paths = RESOURCE_PATHS[resource] ?? [];
  for (const path of paths) {
    revalidatePath(path);
  }
}
