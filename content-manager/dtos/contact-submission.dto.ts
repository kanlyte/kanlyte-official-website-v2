import { z } from "zod";

export const ContactSubmissionStatus = z.enum(["pending", "contacted", "resolved"]);

export const CreateContactSubmissionSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  subject: z.string().min(2),
  service: z.string().min(1),
  message: z.string().min(10),
  subscribe: z.boolean().default(false),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export const UpdateContactSubmissionSchema = z.object({
  status: ContactSubmissionStatus.optional(),
  contactedAt: z.coerce.date().optional(),
});

export type CreateContactSubmissionInput = z.infer<typeof CreateContactSubmissionSchema>;
export type UpdateContactSubmissionInput = z.infer<typeof UpdateContactSubmissionSchema>;
