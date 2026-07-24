import { z } from "zod";

export const CreateServiceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateServiceSchema = CreateServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceInput = z.infer<typeof UpdateServiceSchema>;
