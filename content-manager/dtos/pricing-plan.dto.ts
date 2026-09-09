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
  priceUSD: z.string().optional().nullable().transform(v => v || null),
  priceUGXMonthly: z.string().optional().nullable().transform(v => v || null),
  priceUSDMonthly: z.string().optional().nullable().transform(v => v || null),
  period: z.string().optional().nullable().transform(v => v || null),
  tagline: z.string().optional().nullable().transform(v => v || null),
  isPopular: z.boolean().default(false),
  borderColor: z.string().optional().nullable().transform(v => v || null),
  buttonText: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
  features: z.array(PricingPlanFeatureSchema).min(1),
});

export const UpdatePricingPlanSchema = z.object({
  category: z.string().min(1).optional(),
  tier: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  priceUGX: z.string().min(1).optional(),
  priceUSD: z.string().optional().nullable().transform(v => v || null),
  priceUGXMonthly: z.string().optional().nullable().transform(v => v || null),
  priceUSDMonthly: z.string().optional().nullable().transform(v => v || null),
  period: z.string().optional().nullable().transform(v => v || null),
  tagline: z.string().optional().nullable().transform(v => v || null),
  isPopular: z.boolean().optional(),
  borderColor: z.string().optional().nullable().transform(v => v || null),
  buttonText: z.string().min(1).optional(),
  order: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
  features: z.array(PricingPlanFeatureSchema).optional(),
});

export type PricingPlanFeatureInput = z.infer<typeof PricingPlanFeatureSchema>;
export type CreatePricingPlanInput = z.infer<typeof CreatePricingPlanSchema>;
export type UpdatePricingPlanInput = z.infer<typeof UpdatePricingPlanSchema>;
