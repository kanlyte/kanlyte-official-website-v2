import { z } from "zod";

export const CreatePageCapabilitySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdatePageCapabilitySchema = CreatePageCapabilitySchema.partial();

export type CreatePageCapabilityInput = z.infer<typeof CreatePageCapabilitySchema>;
export type UpdatePageCapabilityInput = z.infer<typeof UpdatePageCapabilitySchema>;
