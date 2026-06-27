import { z } from "zod";

export const CreateSocialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().min(1).refine((v) => {
    try { new URL(v); return true; } catch { return false; }
  }, { message: "Must be a valid URL (include https://)"}),
  color: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateSocialLinkSchema = CreateSocialLinkSchema.partial();

export type CreateSocialLinkInput = z.infer<typeof CreateSocialLinkSchema>;
export type UpdateSocialLinkInput = z.infer<typeof UpdateSocialLinkSchema>;
