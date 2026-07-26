import type { PricingPlan } from "@prisma/client";
import { CreatePricingPlanSchema, UpdatePricingPlanSchema } from "../dtos";
import type { CreatePricingPlanInput, UpdatePricingPlanInput } from "../dtos";
import { pricingPlanRepository } from "../repositories";

export const pricingPlanService = {
  async getAll() {
    return await pricingPlanRepository.findAll();
  },

  async getByCategory(category: string) {
    return await pricingPlanRepository.findByCategory(category);
  },

  async updateCategory(slug: string, pricingEnabled: boolean) {
    return await pricingPlanRepository.updateCategory(slug, { pricingEnabled });
  },

  async getById(id: string) {
    const plan = await pricingPlanRepository.findById(id);
    if (!plan) throw new Error(`Pricing plan ${id} not found`);
    return plan;
  },

  async create(input: CreatePricingPlanInput) {
    const data = CreatePricingPlanSchema.parse(input);
    const existing = await pricingPlanRepository.findByCategory(data.category);
    const tierExists = existing.some((p: PricingPlan) => p.tier === data.tier);
    if (tierExists) throw new Error(`Tier "${data.tier}" already exists in category "${data.category}"`);
    return await pricingPlanRepository.create(data);
  },

  async update(id: string, input: UpdatePricingPlanInput) {
    const current = await pricingPlanService.getById(id);
    const data = UpdatePricingPlanSchema.parse(input);
    if (data.tier && data.tier !== current.tier) {
      const existing = await pricingPlanRepository.findByCategory(data.category ?? current.category);
      const tierExists = existing.some((p: PricingPlan) => p.tier === data.tier && p.id !== id);
      if (tierExists) throw new Error(`Tier "${data.tier}" already exists in this category`);
    }
    return await pricingPlanRepository.update(id, data);
  },

  async delete(id: string) {
    await pricingPlanService.getById(id);
    return await pricingPlanRepository.delete(id);
  },
};
