import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional().nullable(),
  icon: z.string().min(1),
  category: z.string().optional().nullable().transform(v => v || null),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
