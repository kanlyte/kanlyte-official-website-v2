import { CreateServiceSchema, UpdateServiceSchema } from "../dtos";
import type { CreateServiceInput, UpdateServiceInput } from "../dtos";
import { serviceRepository } from "../repositories";
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
      await prisma.pricingPlanCategory.create({ data: { name: data.title, slug: data.slug, ownerType: "service", ownerSlug: data.slug } });
    }
    return service;
  },

  async update(id: string, input: UpdateServiceInput) {
    await serviceService.getById(id);
    const data = UpdateServiceSchema.parse(input);
    if (data.slug) {
      const existing = await serviceRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    return await serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await serviceService.getById(id);
    return await serviceRepository.delete(id);
  },
};
