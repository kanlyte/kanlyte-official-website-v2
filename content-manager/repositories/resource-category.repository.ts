import { prisma } from "@/lib/prisma";
import type { CreateResourceCategoryInput, ResourceCategoryKind } from "../dtos";

export const resourceCategoryRepository = {
  findAll(kind: ResourceCategoryKind) {
    switch (kind) {
      case "product":
        return prisma.productCategory.findMany({ orderBy: { name: "asc" } });
      case "service":
        return prisma.serviceCategory.findMany({ orderBy: { name: "asc" } });
      case "pricing-plan":
        return prisma.pricingPlanCategory.findMany({ orderBy: { name: "asc" } });
      case "gallery":
        return prisma.galleryCategory.findMany({ orderBy: { name: "asc" } });
    }
  },

  findBySlug(kind: ResourceCategoryKind, slug: string) {
    switch (kind) {
      case "product":
        return prisma.productCategory.findUnique({ where: { slug } });
      case "service":
        return prisma.serviceCategory.findUnique({ where: { slug } });
      case "pricing-plan":
        return prisma.pricingPlanCategory.findUnique({ where: { slug } });
      case "gallery":
        return prisma.galleryCategory.findUnique({ where: { slug } });
    }
  },

  create(kind: ResourceCategoryKind, data: CreateResourceCategoryInput) {
    switch (kind) {
      case "product":
        return prisma.productCategory.create({ data });
      case "service":
        return prisma.serviceCategory.create({ data });
      case "pricing-plan":
        return prisma.pricingPlanCategory.create({ data });
      case "gallery":
        return prisma.galleryCategory.create({ data });
    }
  },
};
