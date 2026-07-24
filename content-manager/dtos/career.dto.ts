import { z } from "zod";

export const CreateCareerSchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  applyEmail: z.string().email(),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateCareerSchema = CreateCareerSchema.partial();

export type CreateCareerInput = z.infer<typeof CreateCareerSchema>;
export type UpdateCareerInput = z.infer<typeof UpdateCareerSchema>;
