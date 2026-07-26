import { z } from "zod";

export const CreateSectorWeServeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateSectorWeServeSchema = CreateSectorWeServeSchema.partial();

export type CreateSectorWeServeInput = z.infer<typeof CreateSectorWeServeSchema>;
export type UpdateSectorWeServeInput = z.infer<typeof UpdateSectorWeServeSchema>;
