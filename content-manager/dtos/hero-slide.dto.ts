import { z } from "zod";

export const CreateHeroSlideSchema = z.object({
  order: z.number().int().nonnegative(),
  image: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  buttonText: z.string().min(1),
  buttonLink: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const UpdateHeroSlideSchema = CreateHeroSlideSchema.partial();

export type CreateHeroSlideInput = z.infer<typeof CreateHeroSlideSchema>;
export type UpdateHeroSlideInput = z.infer<typeof UpdateHeroSlideSchema>;
