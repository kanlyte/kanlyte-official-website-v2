import { z } from "zod";

export const CreateProcessStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const UpdateProcessStepSchema = CreateProcessStepSchema.partial();

export type CreateProcessStepInput = z.infer<typeof CreateProcessStepSchema>;
export type UpdateProcessStepInput = z.infer<typeof UpdateProcessStepSchema>;
