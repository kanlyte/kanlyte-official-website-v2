import { z } from "zod";

export const ContactInfoSchema = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  schedule: z.string().min(1),
});

export type ContactInfoInput = z.infer<typeof ContactInfoSchema>;
