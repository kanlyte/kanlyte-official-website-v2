import { z } from "zod";

export const CreatePageContentSchema = z.object({
  slug: z.string().min(1),
  pageType: z.enum(["product", "service", "section"]),
  badge: z.string().default(""),
  title: z.string().default(""),
  highlight: z.string().default(""),
  subtitle: z.string().default(""),
  description: z.string().default(""),
  primaryBtnLabel: z.string().default(""),
  primaryBtnHref: z.string().default(""),
  secondaryBtnLabel: z.string().default(""),
  secondaryBtnHref: z.string().default(""),
  annotationLine1: z.string().default(""),
  annotationLine2: z.string().default(""),
  annotationLines: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const UpdatePageContentSchema = CreatePageContentSchema.partial();

export type CreatePageContentInput = z.infer<typeof CreatePageContentSchema>;
export type UpdatePageContentInput = z.infer<typeof UpdatePageContentSchema>;
