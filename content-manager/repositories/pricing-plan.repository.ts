import { prisma } from "@/lib/prisma";
import type { CreatePricingPlanInput, UpdatePricingPlanInput } from "../dtos";

export const pricingPlanRepository = {
  async findAll() {
    return await prisma.pricingPlan.findMany({ include: { features: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } });
  },

  async findByCategory(category: string) {
    const cat = await prisma.pricingPlanCategory.findUnique({ where: { slug: category } });
    const plans = await prisma.pricingPlan.findMany({
      where: { category, isActive: true },
      include: { features: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return {
      exists: Boolean(cat),
      pricingEnabled: cat?.pricingEnabled ?? false,
      ownerType: cat?.ownerType ?? null,
      ownerSlug: cat?.ownerSlug ?? null,
      plans,
    };
  },

  async updateCategory(slug: string, data: { pricingEnabled: boolean }) {
    return await prisma.pricingPlanCategory.update({ where: { slug }, data });
  },

  async findById(id: string) {
    return await prisma.pricingPlan.findUnique({ where: { id }, include: { features: { orderBy: { order: "asc" } } } });
  },

  async create(data: CreatePricingPlanInput) {
    const { features, ...rest } = data;
    return await prisma.pricingPlan.create({
      data: { ...rest, features: { create: features } },
      include: { features: { orderBy: { order: "asc" } } },
    });
  },

  async update(id: string, data: UpdatePricingPlanInput) {
    const { features, ...rest } = data;
    return await prisma.pricingPlan.update({
      where: { id },
      data: {
        ...rest,
        ...(features && {
          features: { deleteMany: {}, create: features },
        }),
      },
      include: { features: { orderBy: { order: "asc" } } },
    });
  },

  async delete(id: string) {
    return await prisma.pricingPlan.delete({ where: { id } });
  },
};
