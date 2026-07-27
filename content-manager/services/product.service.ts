import { CreateProductSchema, UpdateProductSchema } from "../dtos";
import type { CreateProductInput, UpdateProductInput } from "../dtos";
import { productRepository } from "../repositories";
import { prisma } from "@/lib/prisma";

export const productService = {
  async getAll() {
    return await productRepository.findAll();
  },

  async getActive() {
    return await productRepository.findActive();
  },

  async getById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error(`Product ${id} not found`);
    return product;
  },

  async getBySlug(slug: string) {
    return await productRepository.findBySlug(slug);
  },

  async create(input: CreateProductInput) {
    const data = CreateProductSchema.parse(input);
    const existing = await productRepository.findBySlug(data.slug);
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    const product = await productRepository.create(data);
    // Auto-create PageContent skeleton so the page is immediately manageable
    const hasPageContent = await prisma.pageContent.findFirst({ where: { slug: data.slug } });
    if (!hasPageContent) {
      await prisma.pageContent.create({
        data: {
          slug: data.slug,
          pageType: "product",
          badge: `${data.title} — Kanlyte Uganda`,
          title: data.title,
          highlight: "by Kanlyte Uganda",
          subtitle: "Powerful, reliable, *affordable!",
          description: data.description,
          primaryBtnLabel: "Get Started",
          primaryBtnHref: "/contact-us",
          secondaryBtnLabel: "Learn More",
          secondaryBtnHref: "/contact-us",
          annotationLine1: "Built for",
          annotationLine2: "your business",
          isActive: true,
        },
      });
    }
    // Auto-create PricingPlanCategory so pricing plans can be added immediately
    const hasPricingCategory = await prisma.pricingPlanCategory.findUnique({ where: { slug: data.slug } });
    if (!hasPricingCategory) {
      await prisma.pricingPlanCategory.create({ data: { name: data.title, slug: data.slug, ownerType: "product", ownerSlug: data.slug } });
    }
    return product;
  },

  async update(id: string, input: UpdateProductInput) {
    await productService.getById(id);
    const data = UpdateProductSchema.parse(input);
    if (data.slug) {
      const existing = await productRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    return await productRepository.update(id, data);
  },

  async delete(id: string) {
    await productService.getById(id);
    return await productRepository.delete(id);
  },
};
