import { CreateServiceSchema, UpdateServiceSchema } from "../dtos";
import type { CreateServiceInput, UpdateServiceInput } from "../dtos";
import { serviceRepository as _serviceRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const serviceRepository = withCache("services", _serviceRepository);
import { prisma } from "@/lib/prisma";

export const serviceService = {
  async getAll() {
    return await serviceRepository.findAll();
  },

  async getActive() {
    return await serviceRepository.findActive();
  },

  async getById(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) throw new Error(`Service ${id} not found`);
    return service;
  },

  async getBySlug(slug: string) {
    return await serviceRepository.findBySlug(slug);
  },

  async create(input: CreateServiceInput) {
    const data = CreateServiceSchema.parse(input);
    if (data.kind === "main" && data.parentId) throw new Error("A main service cannot have a parent");
    if (data.kind === "offering" && data.parentId) {
      const parent = await serviceRepository.findById(data.parentId);
      if (!parent || parent.kind !== "main") throw new Error("Offerings must belong to a main service");
    }
    const existing = await serviceRepository.findBySlug(data.slug);
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    const service = await serviceRepository.create(data);
    // Auto-create PageContent skeleton so the page is immediately manageable
    const hasPageContent = await prisma.pageContent.findFirst({ where: { slug: data.slug } });
    if (!hasPageContent) {
      await prisma.pageContent.create({
        data: {
          slug: data.slug,
          pageType: "service",
          badge: `${data.title} — Kanlyte Uganda`,
          title: data.title,
          highlight: "by Kanlyte Uganda",
          subtitle: "Practical, reliable, *affordable!",
          description: data.description,
          primaryBtnLabel: "Enquire Now",
          primaryBtnHref: "/contact-us",
          secondaryBtnLabel: "Learn More",
          secondaryBtnHref: "/contact-us",
          annotationLine1: "Trusted by",
          annotationLine2: "Ugandan businesses",
          isActive: true,
        },
      });
    }
    // Auto-create PricingPlanCategory so pricing plans can be added immediately
    const hasPricingCategory = await prisma.pricingPlanCategory.findUnique({ where: { slug: data.slug } });
    if (!hasPricingCategory) {
      await prisma.pricingPlanCategory.create({
        data: { name: data.title, slug: data.slug, ownerType: "service", ownerSlug: data.slug, serviceId: service.id },
      });
    } else if (!hasPricingCategory.serviceId) {
      await prisma.pricingPlanCategory.update({
        where: { id: hasPricingCategory.id },
        data: { serviceId: service.id, ownerType: "service", ownerSlug: data.slug },
      });
    }
    return service;
  },

  async update(id: string, input: UpdateServiceInput) {
    const current = await serviceService.getById(id);
    const data = UpdateServiceSchema.parse(input);
    const nextKind = data.kind ?? current.kind;
    const nextParentId = data.parentId === undefined ? current.parentId : data.parentId;
    if (nextKind === "main" && nextParentId) throw new Error("A main service cannot have a parent");
    if (nextParentId === id) throw new Error("A service cannot be its own parent");
    if (nextKind === "offering" && nextParentId) {
      const parent = await serviceRepository.findById(nextParentId);
      if (!parent || parent.kind !== "main") throw new Error("Offerings must belong to a main service");
    }
    if (data.slug) {
      const existing = await serviceRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    const oldSlug = current.slug;
    const updated = await serviceRepository.update(id, {
      ...data,
      parentId: nextKind === "main" ? null : data.parentId,
    });
    if (data.slug && oldSlug && data.slug !== oldSlug) {
      await prisma.$transaction([
        prisma.pageContent.updateMany({ where: { slug: oldSlug }, data: { slug: data.slug } }),
        prisma.pageCapability.updateMany({ where: { slug: oldSlug }, data: { slug: data.slug } }),
        prisma.pricingPlanCategory.updateMany({
          where: { ownerType: "service", ownerSlug: oldSlug },
          data: { ownerSlug: data.slug, slug: data.slug },
        }),
      ]);
    }
    return updated;
  },

  async delete(id: string) {
    await serviceService.getById(id);
    return await serviceRepository.delete(id);
  },
};
