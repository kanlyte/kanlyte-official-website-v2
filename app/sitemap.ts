import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Same reason as app/(home)/layout.tsx: builds happen locally without DB
// access, so this can't be prerendered at build time.
export const dynamic = "force-dynamic";

const BASE = "https://kanlyte.com";
const BUILD_DATE = new Date();

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,               priority: 1.0, changeFrequency: "weekly",  lastModified: BUILD_DATE },
  { url: `${BASE}/about-us`,       priority: 0.8, changeFrequency: "monthly", lastModified: BUILD_DATE },
  { url: `${BASE}/pricing`,        priority: 0.8, changeFrequency: "weekly",  lastModified: BUILD_DATE },
  { url: `${BASE}/contact-us`,     priority: 0.9, changeFrequency: "monthly", lastModified: BUILD_DATE },
  { url: `${BASE}/news`,           priority: 0.8, changeFrequency: "daily",   lastModified: BUILD_DATE },
  { url: `${BASE}/projects`,       priority: 0.7, changeFrequency: "monthly", lastModified: BUILD_DATE },
  { url: `${BASE}/gallery`,        priority: 0.5, changeFrequency: "monthly", lastModified: BUILD_DATE },
  { url: `${BASE}/careers`,        priority: 0.6, changeFrequency: "weekly",  lastModified: BUILD_DATE },
  { url: `${BASE}/odoo`,           priority: 0.7, changeFrequency: "monthly", lastModified: BUILD_DATE },
  { url: `${BASE}/systems`,        priority: 0.6, changeFrequency: "monthly", lastModified: BUILD_DATE },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [newsPosts, projects, products, services] = await Promise.all([
    prisma.newsPost.findMany({
      where: { isActive: true },
      select: { id: true, publishedAt: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.project.findMany({
      where: { isActive: true },
      select: { id: true, createdAt: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true },
    }),
    prisma.service.findMany({
      where: { isActive: true, slug: { not: null } },
      select: { slug: true, kind: true },
    }),
  ]);

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${BASE}/news/${post.id}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE}/projects/${project.id}`,
    lastModified: project.createdAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE}/products/${product.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => s.slug)
    .map((service) => ({
      url: `${BASE}/services/${service.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: service.kind === "main" ? 0.8 : 0.7,
    }));

  return [
    ...STATIC_ROUTES,
    ...productRoutes,
    ...serviceRoutes,
    ...newsRoutes,
    ...projectRoutes,
  ];
}
