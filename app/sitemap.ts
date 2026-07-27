import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about-us",
  "/services/software-development",
  "/services/web-cloud",
  "/services/ict-training",
  "/services/research-innovation",
  "/products/odoo",
  "/products/school-sync",
  "/products/lyte",
  "/website-development",
  "/app-development",
  "/email-hosting",
  "/pricing",
  "/projects",
  "/gallery",
  "/news",
  "/careers",
  "/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `https://kanlyte.com${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact-us" ? 0.8 : 0.7,
  }));
}
