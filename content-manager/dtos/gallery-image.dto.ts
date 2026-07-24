import { z } from "zod";

export const CreateGalleryImageSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  category: z.string().optional(),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateGalleryImageSchema = CreateGalleryImageSchema.partial();

export type CreateGalleryImageInput = z.infer<typeof CreateGalleryImageSchema>;
export type UpdateGalleryImageInput = z.infer<typeof UpdateGalleryImageSchema>;
