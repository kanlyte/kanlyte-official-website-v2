import { z } from "zod";

export const CreateTestimonialSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  text: z.string().min(1),
  image: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export const UpdateTestimonialSchema = CreateTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof UpdateTestimonialSchema>;
