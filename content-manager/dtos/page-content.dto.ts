import { z } from "zod";

export const CreatePageContentSchema = z.object({
  slug: z.string().min(1),
  pageType: z.enum(["product", "service"]),
  badge: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  primaryBtnLabel: z.string().min(1),
  primaryBtnHref: z.string().min(1),
  secondaryBtnLabel: z.string().min(1),
  secondaryBtnHref: z.string().min(1),
  annotationLine1: z.string().min(1),
  annotationLine2: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const UpdatePageContentSchema = CreatePageContentSchema.partial();

export type CreatePageContentInput = z.infer<typeof CreatePageContentSchema>;
export type UpdatePageContentInput = z.infer<typeof UpdatePageContentSchema>;
