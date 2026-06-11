import { z } from "zod";

export const CreateMilestoneSchema = z.object({
  year: z.string().min(4),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const UpdateMilestoneSchema = CreateMilestoneSchema.partial();

export type CreateMilestoneInput = z.infer<typeof CreateMilestoneSchema>;
export type UpdateMilestoneInput = z.infer<typeof UpdateMilestoneSchema>;
