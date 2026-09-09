import { invalidate } from "./cached";

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

// Pages render dynamically on every request (see app/(home)/layout.tsx), so
// there's no route-level cache to bust here -- this just clears the
// in-memory data cache (lib/cached.ts) so the next request re-reads the
// database instead of serving what this resource looked like before the edit.
export function revalidateResource(resource: Resource) {
  invalidate(`${resource}:`);
}
