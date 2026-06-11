import { z } from "zod";

export const TeamMemberSocialSchema = z.object({
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  tiktok: z.string().url().optional(),
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
