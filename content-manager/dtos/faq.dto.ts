import { z } from "zod";

export const CreateFAQSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateFAQSchema = CreateFAQSchema.partial();

export type CreateFAQInput = z.infer<typeof CreateFAQSchema>;
export type UpdateFAQInput = z.infer<typeof UpdateFAQSchema>;
