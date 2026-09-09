import { z } from "zod";

const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() ? v.trim() : undefined),
  z.string().url().optional(),
);

export const TeamMemberSocialSchema = z.object({
  instagram: optionalUrl,
  twitter: optionalUrl,
  linkedin: optionalUrl,
  github: optionalUrl,
  tiktok: optionalUrl,
});

export const CreateTeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
  social: TeamMemberSocialSchema.optional(),
});

export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial();

export type TeamMemberSocialInput = z.infer<typeof TeamMemberSocialSchema>;
export type CreateTeamMemberInput = z.infer<typeof CreateTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof UpdateTeamMemberSchema>;
