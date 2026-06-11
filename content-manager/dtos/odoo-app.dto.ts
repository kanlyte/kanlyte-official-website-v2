import { z } from "zod";

export const CreateOdooAppSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateOdooAppSchema = CreateOdooAppSchema.partial();

export type CreateOdooAppInput = z.infer<typeof CreateOdooAppSchema>;
export type UpdateOdooAppInput = z.infer<typeof UpdateOdooAppSchema>;
