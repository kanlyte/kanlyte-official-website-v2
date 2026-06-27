import { z } from "zod";

export const CreatePartnerSchema = z.object({
  name: z.string().min(1),
  logo: z.string().min(1),
  url: z.string().url().optional().or(z.literal("")),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdatePartnerSchema = CreatePartnerSchema.partial();

export type CreatePartnerInput = z.infer<typeof CreatePartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof UpdatePartnerSchema>;
