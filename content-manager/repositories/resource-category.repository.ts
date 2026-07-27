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
        return prisma.pricingPlanCategory.findMany({
          include: {
            service: { select: { id: true, title: true, kind: true, parent: { select: { id: true, title: true } } } },
            product: { select: { id: true, title: true } },
            _count: {
              select: {
                plans: { where: { isActive: true } },
              },
            },
          },
          orderBy: { name: "asc" },
        });
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

  findById(kind: ResourceCategoryKind, id: string) {
    switch (kind) {
      case "product":
        return prisma.productCategory.findUnique({ where: { id } });
      case "service":
        return prisma.serviceCategory.findUnique({ where: { id } });
      case "pricing-plan":
        return prisma.pricingPlanCategory.findUnique({ where: { id } });
      case "gallery":
        return prisma.galleryCategory.findUnique({ where: { id } });
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

  update(kind: ResourceCategoryKind, id: string, name: string) {
    switch (kind) {
      case "product":
        return prisma.productCategory.update({ where: { id }, data: { name } });
      case "service":
        return prisma.serviceCategory.update({ where: { id }, data: { name } });
      case "pricing-plan":
        return prisma.pricingPlanCategory.update({ where: { id }, data: { name } });
      case "gallery":
        return prisma.galleryCategory.update({ where: { id }, data: { name } });
    }
  },

  delete(kind: ResourceCategoryKind, id: string) {
    switch (kind) {
      case "product":
        return prisma.productCategory.delete({ where: { id } });
      case "service":
        return prisma.serviceCategory.delete({ where: { id } });
      case "pricing-plan":
        return prisma.pricingPlanCategory.delete({ where: { id } });
      case "gallery":
        return prisma.galleryCategory.delete({ where: { id } });
    }
  },
};
