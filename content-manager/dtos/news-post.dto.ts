import { z } from "zod";

export const CreateNewsPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  image: z.string().default(""),
  publishedAt: z.coerce.date(),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateNewsPostSchema = CreateNewsPostSchema.partial();

export type CreateNewsPostInput = z.infer<typeof CreateNewsPostSchema>;
export type UpdateNewsPostInput = z.infer<typeof UpdateNewsPostSchema>;
