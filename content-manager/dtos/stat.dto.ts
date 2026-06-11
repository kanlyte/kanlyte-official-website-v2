import { z } from "zod";

export const CreateStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const UpdateStatSchema = CreateStatSchema.partial();

export type CreateStatInput = z.infer<typeof CreateStatSchema>;
export type UpdateStatInput = z.infer<typeof UpdateStatSchema>;
