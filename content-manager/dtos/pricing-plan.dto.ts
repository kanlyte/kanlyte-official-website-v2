import { z } from "zod";

export const PricingPlanFeatureSchema = z.object({
  text: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const CreatePricingPlanSchema = z.object({
  category: z.string().min(1),
  tier: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  priceUGX: z.string().min(1),
  priceUSD: z.string().optional(),
  period: z.string().optional(),
  tagline: z.string().optional(),
  isPopular: z.boolean().default(false),
  borderColor: z.string().optional(),
  buttonText: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
  features: z.array(PricingPlanFeatureSchema).min(1),
});

export const UpdatePricingPlanSchema = CreatePricingPlanSchema.partial();

export type PricingPlanFeatureInput = z.infer<typeof PricingPlanFeatureSchema>;
export type CreatePricingPlanInput = z.infer<typeof CreatePricingPlanSchema>;
export type UpdatePricingPlanInput = z.infer<typeof UpdatePricingPlanSchema>;
