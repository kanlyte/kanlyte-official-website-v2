import { z } from "zod";

export const ResourceCategoryKindSchema = z.enum([
  "product",
  "service",
  "pricing-plan",
  "gallery",
]);

export const CreateResourceCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  slug: z.string().trim().min(1, "Category slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
});

export type ResourceCategoryKind = z.infer<typeof ResourceCategoryKindSchema>;
export type CreateResourceCategoryInput = z.infer<typeof CreateResourceCategorySchema>;
