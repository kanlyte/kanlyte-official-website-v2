import { z } from "zod";

export const CreateNewsletterSubscriberSchema = z.object({
  email: z.string().email(),
});

export const UpdateNewsletterSubscriberSchema = z.object({
  isActive: z.boolean(),
});

export type CreateNewsletterSubscriberInput = z.infer<typeof CreateNewsletterSubscriberSchema>;
export type UpdateNewsletterSubscriberInput = z.infer<typeof UpdateNewsletterSubscriberSchema>;
